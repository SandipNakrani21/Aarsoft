"use client";

import { useRef, useState, type FormEvent } from "react";
import { AlertCircle, Loader2 } from "lucide-react";
import { serviceNames } from "@/data/service-options";
import { site } from "@/lib/site-config";
import { isValidPhone } from "@/lib/contact-validation";
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

  if (!isValidPhone(values.phone)) {
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
  const [status, setStatus] = useState<"idle" | "submitting" | "draft">("idle");
  const formRef = useRef<HTMLFormElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
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

    const subject = encodeURIComponent(`Aarsoft Website Enquiry | ${values.service}`);
    const body = encodeURIComponent([
      "Hello Aarsoft Team,",
      "I would like to discuss the following project.",
      [
        `Name: ${values.name.trim()}`,
        `Email: ${values.email.trim()}`,
        `Company: ${values.company.trim() || "Not provided"}`,
        `Phone: ${values.phone.trim() || "Not provided"}`,
        `Service: ${values.service}`,
        `Budget: ${values.budget || "Not specified"}`,
      ].join("\r\n"),
      `Project Details:\r\n${values.details.trim()}`,
      `Regards,\r\n${values.name.trim()}`,
    ].join("\r\n\r\n"));
    window.location.assign('mailto:' + site.contact.email + '?subject=' + subject + '&body=' + body);
    setStatus("draft");
  };

  const clearError = (field: Field) =>
    setErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });

  const errorList = Object.entries(errors) as [Field, string][];

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      action={`mailto:${site.contact.email}`}
      method="post"
      encType="text/plain"
      noValidate
      className="hairline min-w-0 rounded-[var(--radius-lg)] bg-white p-5 sm:p-7 md:p-10"
    >
      {status === "draft" && <p role="status" className="mb-6 rounded-md bg-lavender-soft p-4 text-ink-900">Your email draft is ready. Send it from your email app to complete your enquiry. Opening a draft does not submit it. If the app did not open, <a className="underline" href={`mailto:${site.contact.email}`}>email us directly</a>.</p>}
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

      <p className="mb-6 text-[1rem] text-ink-700">This form prepares an email draft. Please send it from your email app; online submission is not yet available.</p>
      <div className="grid min-w-0 gap-6 sm:grid-cols-2">
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
          options={serviceNames}
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

      <div className="mt-7 flex min-w-0 flex-col items-start gap-5 border-t border-ink-100 pt-8">
        <p className="max-w-[40ch] text-[0.9375rem] leading-relaxed text-ink-500">
          We use your details only to respond to this enquiry. Your email provider processes messages you choose to send.
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
              Prepare Email Enquiry
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
    "placeholder:text-ink-500 transition-[border-color,box-shadow] duration-200",
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
        <span className="text-ink-500" aria-hidden="true">
          *
        </span>
      )}
      {optional && (
        <span className="text-[0.8125rem] font-normal text-ink-500">
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
    maxLength: name === "details" ? 2000 : name === "email" ? 254 : name === "phone" ? 30 : 150,
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
          className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-500"
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
