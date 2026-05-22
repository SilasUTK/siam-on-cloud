import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

const SERVICE_OPTIONS = new Set([
  "Air Ticketing",
  "Travel & Visa Services",
  "AI & Automation",
  "Digital Solutions",
  "General Inquiry",
]);

const MAX_FIELD_LENGTH = 200;
const MAX_MESSAGE_LENGTH = 5000;
const MAX_FILE_SIZE = 10 * 1024 * 1024;
const ALLOWED_MIME_TYPES = new Set([
  "application/pdf",
  "image/jpeg",
  "image/png",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);
const ALLOWED_EXTENSIONS = new Set(["pdf", "jpg", "jpeg", "png", "doc", "docx"]);

function sanitizeText(value: unknown, maxLength: number) {
  if (typeof value !== "string") {
    return "";
  }

  return value
    .replace(/[\u0000-\u001F\u007F]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maxLength);
}

function sanitizeMessage(value: unknown) {
  if (typeof value !== "string") {
    return "";
  }

  return value
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "")
    .trim()
    .slice(0, MAX_MESSAGE_LENGTH);
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function getFileExtension(fileName: string) {
  const parts = fileName.split(".");
  return parts.length > 1 ? parts.at(-1)?.toLowerCase() ?? "" : "";
}

function sanitizeFileName(fileName: string) {
  const cleaned = fileName.replace(/[^a-zA-Z0-9._-]/g, "_").slice(0, 120);
  return cleaned || "attachment";
}

export async function POST(request: Request) {
  const contentType = request.headers.get("content-type") || "";
  if (!contentType.toLowerCase().includes("multipart/form-data")) {
    return NextResponse.json(
      { success: false, error: "Expected multipart/form-data request." },
      { status: 400 }
    );
  }

  let formData: FormData;

  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid form submission." },
      { status: 400 }
    );
  }

  const fullName = sanitizeText(formData.get("fullName"), MAX_FIELD_LENGTH);
  const email = sanitizeText(formData.get("email"), MAX_FIELD_LENGTH).toLowerCase();
  const phoneOrLineId = sanitizeText(formData.get("phoneOrLineId"), MAX_FIELD_LENGTH);
  const companyName = sanitizeText(formData.get("companyName"), MAX_FIELD_LENGTH);
  const serviceInterest = sanitizeText(formData.get("serviceInterest"), MAX_FIELD_LENGTH);
  const message = sanitizeMessage(formData.get("message"));
  const attachmentInput = formData.get("attachment");

  if (!fullName) {
    return NextResponse.json(
      { success: false, error: "Full name is required." },
      { status: 400 }
    );
  }

  if (!email || !isValidEmail(email)) {
    return NextResponse.json(
      { success: false, error: "A valid email address is required." },
      { status: 400 }
    );
  }

  if (!serviceInterest || !SERVICE_OPTIONS.has(serviceInterest)) {
    return NextResponse.json(
      { success: false, error: "Please select a valid service interest." },
      { status: 400 }
    );
  }

  if (!message || message.length < 10) {
    return NextResponse.json(
      {
        success: false,
        error: "Message is required and must be at least 10 characters.",
      },
      { status: 400 }
    );
  }

  let attachment:
    | {
        filename: string;
        content: string;
      }
    | undefined;

  if (attachmentInput instanceof File && attachmentInput.size > 0) {
    const extension = getFileExtension(attachmentInput.name);

    if (
      !ALLOWED_EXTENSIONS.has(extension) ||
      !ALLOWED_MIME_TYPES.has(attachmentInput.type)
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "Unsupported file type. Allowed: PDF, JPG, JPEG, PNG, DOC, DOCX.",
        },
        { status: 400 }
      );
    }

    if (attachmentInput.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { success: false, error: "File size must be 10MB or less." },
        { status: 400 }
      );
    }

    const arrayBuffer = await attachmentInput.arrayBuffer();
    attachment = {
      filename: sanitizeFileName(attachmentInput.name),
      content: Buffer.from(arrayBuffer).toString("base64"),
    };
  }

  const resendApiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL || "info@siamon.cloud";
  const fromEmail =
    process.env.CONTACT_FROM_EMAIL || "Siam On Cloud <onboarding@resend.dev>";

  if (!resendApiKey) {
    return NextResponse.json(
      { success: false, error: "Server email configuration is missing." },
      { status: 500 }
    );
  }

  const resend = new Resend(resendApiKey);

  const emailText = [
    "New contact form submission",
    "",
    `Full name: ${fullName}`,
    `Email: ${email}`,
    `Phone / LINE ID: ${phoneOrLineId || "-"}`,
    `Company name: ${companyName || "-"}`,
    `Service interest: ${serviceInterest}`,
    "",
    "Message:",
    message,
  ].join("\n");

  try {
    const { error } = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      replyTo: email,
      subject: `Contact Form: ${serviceInterest} - ${fullName}`,
      text: emailText,
      attachments: attachment ? [attachment] : undefined,
    });

    if (error) {
      return NextResponse.json(
        {
          success: false,
          error: "Unable to send email at this time. Please try again later.",
        },
        { status: 502 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Your message has been sent successfully.",
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        error: "Unexpected server error while sending your message.",
      },
      { status: 500 }
    );
  }
}