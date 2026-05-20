"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { z } from "zod";
import { cn } from "@/lib/utils/cn";

type FormState = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  message: string;
};

type Errors = Partial<Record<keyof FormState, string>>;

const INITIAL: FormState = {
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  message: "",
};

export function ContactForm() {
  const t = useTranslations("Contact.form");
  const [values, setValues] = useState<FormState>(INITIAL);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success">(
    "idle",
  );

  const required = { error: () => t("errorRequired") };
  const schema = z.object({
    firstName: z
      .string(required)
      .trim()
      .min(1, { error: t("errorRequired") }),
    lastName: z
      .string(required)
      .trim()
      .min(1, { error: t("errorRequired") }),
    phone: z
      .string(required)
      .trim()
      .min(1, { error: t("errorRequired") }),
    email: z
      .string(required)
      .trim()
      .min(1, { error: t("errorRequired") })
      .email({ error: t("errorEmail") }),
    message: z
      .string(required)
      .trim()
      .min(10, { error: t("errorMessageMin") }),
  });

  const sanitize = (field: keyof FormState, value: string): string => {
    if (field === "phone") {
      return value.replace(/[^0-9+\s\-()]/g, "");
    }
    return value;
  };

  const onChange =
    (field: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const next = sanitize(field, e.target.value);
      setValues((v) => ({ ...v, [field]: next }));
      if (errors[field]) {
        setErrors((prev) => {
          const { [field]: _omit, ...rest } = prev;
          return rest;
        });
      }
    };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(values);
    if (!parsed.success) {
      const fieldErrors: Errors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof FormState;
        if (!fieldErrors[key]) fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    setStatus("submitting");
    // eslint-disable-next-line no-console
    console.log("[ContactForm] submission:", parsed.data);
    await new Promise((r) => setTimeout(r, 600));
    setStatus("success");
  };

  const reset = () => {
    setValues(INITIAL);
    setErrors({});
    setStatus("idle");
  };

  if (status === "success") {
    return (
      <div className="border border-gold/30 bg-elevated/20 p-8 md:p-10">
        <p className="text-xs uppercase tracking-[0.3em] text-gold">
          {t("successTitle")}
        </p>
        <p className="mt-4 text-base leading-relaxed text-foreground md:text-lg">
          {t("successBody")}
        </p>
        <button
          type="button"
          onClick={reset}
          className="mt-6 inline-flex cursor-pointer items-center text-xs uppercase tracking-[0.2em] text-foreground transition-colors hover:text-gold"
        >
          ← {t("submit")}
        </button>
      </div>
    );
  }

  const submitting = status === "submitting";

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-8">
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
        <Field
          id="firstName"
          label={t("firstName")}
          value={values.firstName}
          onChange={onChange("firstName")}
          error={errors.firstName}
        />
        <Field
          id="lastName"
          label={t("lastName")}
          value={values.lastName}
          onChange={onChange("lastName")}
          error={errors.lastName}
        />
      </div>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
        <Field
          id="phone"
          type="tel"
          label={t("phone")}
          value={values.phone}
          onChange={onChange("phone")}
          error={errors.phone}
        />
        <Field
          id="email"
          type="email"
          label={t("email")}
          value={values.email}
          onChange={onChange("email")}
          error={errors.email}
        />
      </div>
      <Field
        id="message"
        label={t("message")}
        value={values.message}
        onChange={onChange("message")}
        error={errors.message}
        textarea
      />
      <button
        type="submit"
        disabled={submitting}
        className={cn(
          "inline-flex cursor-pointer items-center justify-center gap-3 self-start bg-gold px-9 py-4 text-sm font-medium uppercase tracking-[0.15em] text-background transition-colors duration-200 hover:bg-gold-light",
          submitting && "opacity-70 pointer-events-none",
        )}
      >
        {submitting ? t("submitting") : t("submit")}
        {!submitting && (
          <svg
            width="18"
            height="18"
            viewBox="0 0 22 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden
          >
            <path
              d="M4 11h14M12 5l6 6-6 6"
              stroke="currentColor"
              strokeWidth="1.3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </button>
    </form>
  );
}

type FieldProps = {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  error?: string;
  type?: string;
  textarea?: boolean;
};

function Field({ id, label, value, onChange, error, type, textarea }: FieldProps) {
  const base = cn(
    "block w-full border-b bg-transparent py-3 text-base text-foreground outline-none transition-colors placeholder:text-subtle",
    error ? "border-red-400/60" : "border-border focus:border-gold",
  );
  return (
    <label htmlFor={id} className="block">
      <span className="text-[0.65rem] uppercase tracking-[0.25em] text-gold">
        {label}
      </span>
      {textarea ? (
        <textarea
          id={id}
          name={id}
          rows={5}
          value={value}
          onChange={onChange}
          className={cn(base, "resize-none")}
        />
      ) : (
        <input
          id={id}
          name={id}
          type={type ?? "text"}
          value={value}
          onChange={onChange}
          className={base}
        />
      )}
      {error && (
        <span className="mt-2 block text-xs text-red-400/90">{error}</span>
      )}
    </label>
  );
}
