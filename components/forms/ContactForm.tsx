"use client";

import {
  ChangeEvent,
  DragEvent,
  FormEvent,
  useMemo,
  useRef,
  useState,
} from "react";
import { FileUp, LoaderCircle, Paperclip, Trash2 } from "lucide-react";

const SERVICE_OPTIONS = [
  "Air Ticketing",
  "Travel & Visa Services",
  "AI & Automation",
  "Digital Solutions",
  "General Inquiry",
] as const;

type FormState = {
  fullName: string;
  email: string;
  phoneOrLineId: string;
  companyName: string;
  serviceInterest: string;
  message: string;
};

type StatusState =
  | { type: "idle" }
  | { type: "success"; message: string }
  | { type: "error"; message: string };

const INITIAL_FORM: FormState = {
  fullName: "",
  email: "",
  phoneOrLineId: "",
  companyName: "",
  serviceInterest: "",
  message: "",
};

const MAX_FILE_SIZE = 10 * 1024 * 1024;
const ALLOWED_MIME_TYPES = new Set([
  "application/pdf",
  "image/jpeg",
  "image/png",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);
const ALLOWED_EXTENSIONS = new Set(["pdf", "jpg", "jpeg", "png", "doc", "docx"]);

function getFileExtension(fileName: string) {
  const parts = fileName.split(".");
  return parts.length > 1 ? parts.at(-1)?.toLowerCase() ?? "" : "";
}

function validateAttachment(file: File) {
  const extension = getFileExtension(file.name);

  if (!ALLOWED_EXTENSIONS.has(extension) || !ALLOWED_MIME_TYPES.has(file.type)) {
    return "Unsupported file type. Allowed: PDF, JPG, JPEG, PNG, DOC, DOCX.";
  }

  if (file.size > MAX_FILE_SIZE) {
    return "File size must be 10MB or less.";
  }

  return null;
}

function formatFileSize(bytes: number) {
  if (bytes < 1024) {
    return `${bytes} B`;
  }

  const kb = bytes / 1024;
  if (kb < 1024) {
    return `${kb.toFixed(1)} KB`;
  }

  return `${(kb / 1024).toFixed(2)} MB`;
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export default function ContactForm() {
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [attachment, setAttachment] = useState<File | null>(null);
  const [isDragActive, setIsDragActive] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [status, setStatus] = useState<StatusState>({ type: "idle" });
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const messageLength = useMemo(() => form.message.trim().length, [form.message]);

  function handleAttachmentSelection(nextFile: File | null) {
    if (!nextFile) {
      setAttachment(null);
      return;
    }

    const validationError = validateAttachment(nextFile);
    if (validationError) {
      setAttachment(null);
      setStatus({ type: "error", message: validationError });
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      return;
    }

    setStatus({ type: "idle" });
    setAttachment(nextFile);
  }

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    handleAttachmentSelection(event.target.files?.[0] ?? null);
  }

  function handleDrop(event: DragEvent<HTMLLabelElement>) {
    event.preventDefault();
    setIsDragActive(false);
    handleAttachmentSelection(event.dataTransfer.files?.[0] ?? null);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus({ type: "idle" });

    if (!form.fullName.trim()) {
      setStatus({ type: "error", message: "Full name is required." });
      return;
    }

    if (!form.email.trim() || !isValidEmail(form.email.trim())) {
      setStatus({ type: "error", message: "Please enter a valid email address." });
      return;
    }

    if (!form.serviceInterest.trim()) {
      setStatus({ type: "error", message: "Please select a service interest." });
      return;
    }

    if (messageLength < 10) {
      setStatus({
        type: "error",
        message: "Message must be at least 10 characters.",
      });
      return;
    }

    if (attachment) {
      const validationError = validateAttachment(attachment);
      if (validationError) {
        setStatus({ type: "error", message: validationError });
        return;
      }
    }

    setSubmitting(true);
    setUploadProgress(0);

    try {
      const formData = new FormData();
      formData.append("fullName", form.fullName);
      formData.append("email", form.email);
      formData.append("phoneOrLineId", form.phoneOrLineId);
      formData.append("companyName", form.companyName);
      formData.append("serviceInterest", form.serviceInterest);
      formData.append("message", form.message);
      if (attachment) {
        formData.append("attachment", attachment);
      }

      const payload = await new Promise<{
        ok: boolean;
        body: { success: boolean; error?: string; message?: string };
      }>((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open("POST", "/api/contact");

        xhr.upload.onprogress = (progressEvent) => {
          if (!progressEvent.lengthComputable) {
            return;
          }
          const progress = Math.min(
            100,
            Math.round((progressEvent.loaded / progressEvent.total) * 100)
          );
          setUploadProgress(progress);
        };

        xhr.onload = () => {
          try {
            const parsed = JSON.parse(xhr.responseText) as {
              success: boolean;
              error?: string;
              message?: string;
            };
            resolve({ ok: xhr.status >= 200 && xhr.status < 300, body: parsed });
          } catch {
            reject(new Error("Invalid server response."));
          }
        };

        xhr.onerror = () => reject(new Error("Network error."));
        xhr.send(formData);
      });

      if (!payload.ok || !payload.body.success) {
        setStatus({
          type: "error",
          message:
            payload.body.error ??
            "Unable to send your message right now. Please try again shortly.",
        });
        return;
      }

      setForm(INITIAL_FORM);
      setAttachment(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      setStatus({
        type: "success",
        message: payload.body.message ?? "Thank you. Your message has been sent.",
      });
    } catch {
      setStatus({
        type: "error",
        message: "Network error. Please try again.",
      });
    } finally {
      setSubmitting(false);
      setUploadProgress(null);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="space-y-2 text-sm">
          <span className="font-medium text-slate-700">Full name *</span>
          <input
            value={form.fullName}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, fullName: event.target.value }))
            }
            name="fullName"
            autoComplete="name"
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-slate-900 outline-none transition focus:border-slate-500"
            placeholder="Your full name"
            required
          />
        </label>

        <label className="space-y-2 text-sm">
          <span className="font-medium text-slate-700">Email address *</span>
          <input
            value={form.email}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, email: event.target.value }))
            }
            type="email"
            name="email"
            autoComplete="email"
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-slate-900 outline-none transition focus:border-slate-500"
            placeholder="you@company.com"
            required
          />
        </label>

        <label className="space-y-2 text-sm">
          <span className="font-medium text-slate-700">Phone / LINE ID</span>
          <input
            value={form.phoneOrLineId}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, phoneOrLineId: event.target.value }))
            }
            name="phoneOrLineId"
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-slate-900 outline-none transition focus:border-slate-500"
            placeholder="+66... or LINE ID"
          />
        </label>

        <label className="space-y-2 text-sm">
          <span className="font-medium text-slate-700">Company name</span>
          <input
            value={form.companyName}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, companyName: event.target.value }))
            }
            name="companyName"
            autoComplete="organization"
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-slate-900 outline-none transition focus:border-slate-500"
            placeholder="Company / Organization"
          />
        </label>

        <label className="space-y-2 text-sm sm:col-span-2">
          <span className="font-medium text-slate-700">Service interest *</span>
          <select
            value={form.serviceInterest}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, serviceInterest: event.target.value }))
            }
            name="serviceInterest"
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-slate-900 outline-none transition focus:border-slate-500"
            required
          >
            <option value="">Select a service</option>
            {SERVICE_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>

        <label className="space-y-2 text-sm sm:col-span-2">
          <span className="font-medium text-slate-700">Message *</span>
          <textarea
            value={form.message}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, message: event.target.value }))
            }
            name="message"
            rows={6}
            maxLength={5000}
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-slate-500"
            placeholder="Tell us about your travel-tech or AI support needs..."
            required
          />
          <div className="text-xs text-slate-500">{messageLength}/5000 characters</div>
        </label>

        <div className="space-y-2 text-sm sm:col-span-2">
          <span className="font-medium text-slate-700">Attachment (optional)</span>
          <label
            onDragOver={(event) => {
              event.preventDefault();
              setIsDragActive(true);
            }}
            onDragEnter={(event) => {
              event.preventDefault();
              setIsDragActive(true);
            }}
            onDragLeave={(event) => {
              event.preventDefault();
              setIsDragActive(false);
            }}
            onDrop={handleDrop}
            className={[
              "group flex cursor-pointer items-center justify-between gap-4 rounded-2xl border border-dashed px-4 py-4 transition",
              isDragActive
                ? "border-slate-700 bg-slate-100"
                : "border-slate-300 bg-slate-50 hover:border-slate-500 hover:bg-slate-100",
            ].join(" ")}
          >
            <div className="flex items-center gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white text-slate-700 shadow-sm">
                <FileUp size={18} />
              </span>
              <div>
                <p className="text-sm font-medium text-slate-800">
                  Drag and drop a file, or click to browse
                </p>
                <p className="text-xs text-slate-500">
                  PDF, JPG, JPEG, PNG, DOC, DOCX up to 10MB
                </p>
              </div>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              name="attachment"
              accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
              className="sr-only"
              onChange={handleFileChange}
            />
          </label>

          {attachment ? (
            <div className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3">
              <div className="flex min-w-0 items-center gap-2">
                <Paperclip size={15} className="shrink-0 text-slate-500" />
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-slate-700">
                    {attachment.name}
                  </p>
                  <p className="text-xs text-slate-500">
                    {formatFileSize(attachment.size)}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setAttachment(null);
                  if (fileInputRef.current) {
                    fileInputRef.current.value = "";
                  }
                }}
                className="inline-flex items-center gap-1 rounded-lg border border-slate-300 px-2.5 py-1.5 text-xs font-medium text-slate-600 transition hover:bg-slate-100"
              >
                <Trash2 size={14} />
                Remove
              </button>
            </div>
          ) : null}
        </div>
      </div>

      {submitting && uploadProgress !== null ? (
        <div className="mt-5 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span className="inline-flex items-center gap-1">
              <LoaderCircle size={14} className="animate-spin" />
              Uploading and sending...
            </span>
            <span>{uploadProgress}%</span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200">
            <div
              className="h-full rounded-full bg-slate-800 transition-all"
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
        </div>
      ) : null}

      {status.type === "success" ? (
        <p className="mt-5 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
          {status.message}
        </p>
      ) : null}

      {status.type === "error" ? (
        <p className="mt-5 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
          {status.message}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={submitting}
        className="mt-6 inline-flex items-center justify-center rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {submitting ? "Sending..." : "Send message"}
      </button>
    </form>
  );
}