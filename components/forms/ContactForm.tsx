"use client";

import { useRef, useState, type FormEvent } from "react";
import { AlertCircle, Check, Loader2 } from "lucide-react";
import { services } from "@/data/services";
import { ArrowIcon, Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

type Field =
  | "name"
  | "email"
  | "company"
  | "phone"
  | "service"
  | "budget"
  | "details";

type Errors = Partial<Record<Field, string>>;

const budgets = [
  "Under $10,000",
  "$10,000 – $25,000",
  "$25,000 – $50,000",
  "$50,000 – $100,000",
  "Over $100,000",
  "Not sure yet",
];

/* Rejects addresses without a dot-separated domain, which catches most typos. */
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
/* Digits, spaces and the usual separators; length checked separately. */
const phonePattern = /^[+()\-.\s\d]{7,20}$/;

function validate(values: Record<Field, string>): Errors {
  const errors: Errors = {};

  if (!values.name.trim()) {
    errors.name = "Please enter your name.";
  } else if (values.name.trim().length < 2) {
    errors.name = "Please enter your full name.";
  }

  if (!values.email.trim()) {
    errors.email = "Please enter your work email.";
  } else if (!emailPattern.test(values.email.trim())) {
    errors.email = "Please enter a valid email address, for example name@company.com.";
  }

  if (values.phone.trim() && !phonePattern.test(values.phone.trim())) {
    errors.phone = "Please enter a valid phone number, or leave this blank.";
  }

  if (!values.service) {
    errors.service = "Please choose the service you are interested in.";
  }

  if (!values.details.trim()) {
    errors.details = "Please tell us a little about the project.";
  } else if (values.details.trim().length < 20) {
    errors.details = "Please add a bit more detail, at least 20 characters.";
  }

  return errors;
}

export function ContactForm() {
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
  const formRef = useRef<HTMLFormElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const values = {
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      company: String(data.get("company") ?? ""),
      phone: String(data.get("phone") ?? ""),
      service: String(data.get("service") ?? ""),
      budget: String(data.get("budget") ?? ""),
      details: String(data.get("details") ?? ""),
    };

    const found = validate(values);
    setErrors(found);

    if (Object.keys(found).length > 0) {
      // Move focus to the summary so screen readers announce the problems.
      requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }

    setStatus("submitting");

    /*
     * No backend is wired up yet. Connect this to your inbox, CRM or an API
     * route here — the validated `values` object is ready to send.
     */
    await new Promise((resolve) => setTimeout(resolve, 900));

    setStatus("success");
    formRef.current?.reset();
  };

  const clearError = (field: Field) =>
    setErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });

  if (status === "success") {
    return (
      <div
        role="status"
        className="hairline flex flex-col items-start rounded-[var(--radius-lg)] bg-white p-9 md:p-12"
      >
        <span
          className="flex h-12 w-12 items-center justify-center rounded-full"
          style={{ background: "var(--gradient-primary)" }}
        >
          <Check className="h-5 w-5 text-ink-900" aria-hidden="true" />
        </span>
        <h2 className="fluid-h3 mt-7 text-ink-900">Thank you — your enquiry is in.</h2>
        <p className="mt-3 max-w-[48ch] text-[1.125rem] leading-relaxed text-ink-500">
          We read every project enquiry properly rather than sending an automated
          reply. Expect a response within one business day.
        </p>
        <Button
          type="button"
          variant="secondary"
          className="mt-8"
          onClick={() => setStatus("idle")}
        >
          Send another enquiry
        </Button>
      </div>
    );
  }

  const errorList = Object.entries(errors) as [Field, string][];

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      noValidate
      className="hairline rounded-[var(--radius-lg)] bg-white p-7 md:p-10"
    >
      {errorList.length > 0 && (
        <div
          ref={summaryRef}
          tabIndex={-1}
          role="alert"
          className="mb-8 rounded-[var(--radius-sm)] border border-ink-300 bg-surface p-5"
        >
          <p className="flex items-center gap-2.5 font-medium text-ink-900">
            <AlertCircle className="h-4 w-4" aria-hidden="true" />
            Please fix {errorList.length}{" "}
            {errorList.length === 1 ? "field" : "fields"} before sending.
          </p>
          <ul className="mt-3 space-y-1.5 pl-7 text-[1.125rem] text-ink-500">
            {errorList.map(([field, message]) => (
              <li key={field}>
                <a
                  href={`#field-${field}`}
                  className="underline decoration-ink-300 underline-offset-4 hover:decoration-ink-900"
                >
                  {message}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="grid gap-6 sm:grid-cols-2">
        <TextField
          name="name"
          label="Name"
          required
          autoComplete="name"
          placeholder="Your full name"
          error={errors.name}
          onInput={() => clearError("name")}
        />
        <TextField
          name="email"
          label="Work Email"
          type="email"
          required
          autoComplete="email"
          placeholder="name@company.com"
          error={errors.email}
          onInput={() => clearError("email")}
        />
        <TextField
          name="company"
          label="Company"
          autoComplete="organization"
          placeholder="Company name"
          optional
        />
        <TextField
          name="phone"
          label="Phone"
          type="tel"
          autoComplete="tel"
          placeholder="+91 XXXXX XXXXX"
          optional
          error={errors.phone}
          onInput={() => clearError("phone")}
        />

        <SelectField
          name="service"
          label="Service"
          required
          error={errors.service}
          onChange={() => clearError("service")}
          options={services.map((s) => s.title)}
          placeholder="Select a service"
        />
        <SelectField
          name="budget"
          label="Budget"
          optional
          options={budgets}
          placeholder="Select a range"
        />

        <div className="sm:col-span-2">
          <TextField
            name="details"
            label="Project Details"
            required
            multiline
            placeholder="What are you trying to build or change? Include any deadlines or constraints we should know about."
            error={errors.details}
            onInput={() => clearError("details")}
          />
        </div>
      </div>

      <div className="mt-7 flex flex-col gap-5 border-t border-ink-100 pt-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-[40ch] text-[0.9375rem] leading-relaxed text-ink-400">
          We use your details only to respond to this enquiry. Nothing is shared
          with third parties.
        </p>
        <Button
          type="submit"
          size="lg"
          disabled={status === "submitting"}
          className="w-full sm:w-auto"
        >
          {status === "submitting" ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              Sending…
            </>
          ) : (
            <>
              Send Project Inquiry
              <ArrowIcon />
            </>
          )}
        </Button>
      </div>
    </form>
  );
}

/* ------------------------------------------------------------------ */
/* Fields                                                              */
/* ------------------------------------------------------------------ */

const fieldClasses = (hasError: boolean) =>
  cn(
    "w-full rounded-[var(--radius-sm)] border bg-white px-4 py-3 text-[1.125rem] text-ink-900",
    /* Box-shadow is included so the focus ring eases in with the border. */
    "placeholder:text-ink-300 transition-[border-color,box-shadow] duration-200",
    "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white",
    hasError
      ? "border-ink-900 focus:ring-ink-900"
      : "border-ink-200 hover:border-ink-300 focus:border-ink-900 focus:ring-lavender",
  );

function Label({
  htmlFor,
  children,
  required,
  optional,
}: {
  htmlFor: string;
  children: string;
  required?: boolean;
  optional?: boolean;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="mb-2 flex items-baseline gap-2 text-[1.125rem] font-medium text-ink-900"
    >
      {children}
      {required && (
        <span className="text-ink-400" aria-hidden="true">
          *
        </span>
      )}
      {optional && (
        <span className="text-[0.8125rem] font-normal text-ink-400">
          optional
        </span>
      )}
    </label>
  );
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-2 flex items-start gap-1.5 text-[0.9375rem] text-ink-700">
      <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
      {message}
    </p>
  );
}

function TextField({
  name,
  label,
  type = "text",
  required,
  optional,
  placeholder,
  autoComplete,
  multiline,
  error,
  onInput,
}: {
  name: Field;
  label: string;
  type?: string;
  required?: boolean;
  optional?: boolean;
  placeholder?: string;
  autoComplete?: string;
  multiline?: boolean;
  error?: string;
  onInput?: () => void;
}) {
  const id = `field-${name}`;
  const errorId = `${id}-error`;

  const shared = {
    id,
    name,
    placeholder,
    autoComplete,
    onInput,
    "aria-invalid": error ? (true as const) : undefined,
    "aria-describedby": error ? errorId : undefined,
    required,
    className: fieldClasses(Boolean(error)),
  };

  return (
    <div>
      <Label htmlFor={id} required={required} optional={optional}>
        {label}
      </Label>
      {multiline ? (
        <textarea {...shared} rows={6} className={cn(shared.className, "resize-y")} />
      ) : (
        <input {...shared} type={type} />
      )}
      <FieldError id={errorId} message={error} />
    </div>
  );
}

function SelectField({
  name,
  label,
  options,
  placeholder,
  required,
  optional,
  error,
  onChange,
}: {
  name: Field;
  label: string;
  options: string[];
  placeholder: string;
  required?: boolean;
  optional?: boolean;
  error?: string;
  onChange?: () => void;
}) {
  const id = `field-${name}`;
  const errorId = `${id}-error`;

  return (
    <div>
      <Label htmlFor={id} required={required} optional={optional}>
        {label}
      </Label>
      <div className="relative">
        <select
          id={id}
          name={name}
          defaultValue=""
          required={required}
          onChange={onChange}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          className={cn(fieldClasses(Boolean(error)), "appearance-none pr-10")}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <svg
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden="true"
          className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400"
        >
          <path
            d="m4 6 4 4 4-4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <FieldError id={errorId} message={error} />
    </div>
  );
}
