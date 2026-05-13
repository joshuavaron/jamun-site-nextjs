"use client";

import { useState, useRef, useCallback } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Users, School } from "lucide-react";
import { Container, Heading, PillButton, ArrowLink } from "@/components/ui";
import { fontBody, fontHeading, bodySize } from "@/lib/typography";
import { DiagonalSpread } from "@/components/sections/DiagonalSpread";
import { TestimonialSpread } from "@/components/sections/TestimonialSpread";
import { SectionIntro } from "@/components/sections/SectionIntro";
import { FaqAccordion } from "@/components/sections/FaqAccordion";
import type { FaqItem } from "@/components/sections/FaqAccordion";

// ────────── Types ──────────

interface RegistrationFormData {
  email: string;
  programs: string[];
  acknowledgments: string[];
  title: string;
  firstName: string;
  lastName: string;
  phone: string;
  orgName: string;
  orgAddress: string;
  city: string;
  additionalAdvisors: string;
  additionalAdvisorEmails: string;
  expectedStudents: string;
  experienceLevel: string;
  committeePreferences: string;
  paymentAck: boolean;
  liabilityAck: boolean;
  prepAck: boolean;
  comments: string;
  permissionEvents: string;
  permissionClassroom: string;
}

const INITIAL_DATA: RegistrationFormData = {
  email: "",
  programs: [],
  acknowledgments: [],
  title: "",
  firstName: "",
  lastName: "",
  phone: "",
  orgName: "",
  orgAddress: "",
  city: "",
  additionalAdvisors: "",
  additionalAdvisorEmails: "",
  expectedStudents: "",
  experienceLevel: "",
  committeePreferences: "",
  paymentAck: false,
  liabilityAck: false,
  prepAck: false,
  comments: "",
  permissionEvents: "",
  permissionClassroom: "",
};

// ────────── Photos ──────────

const PHOTOS = {
  hero: "/images/conferences/DSC01032.webp",
  quote: "/images/conferences/DSCF9448.webp",
  cta: "/images/conferences/DSCF9356.webp",
} as const;

// ────────── Constants ──────────

const TITLE_OPTIONS = ["Miss", "Ms.", "Mrs.", "Mr.", "Dr.", "Prof."];

// ────────── Submission stub ──────────
// To connect: set APPS_SCRIPT_URL to your deployed Google Apps Script web app URL.
// The function will POST the form data as JSON.

const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxQwCXmAPyZT_gh7xF3zo2kUY6wjZ1y9cq_o4UhE-JQFAfBKWn4WICcXI-CS8siX3BR/exec";

async function submitRegistration(
  data: RegistrationFormData,
): Promise<void> {
  if (APPS_SCRIPT_URL) {
    await fetch(APPS_SCRIPT_URL, {
      method: "POST",
      body: JSON.stringify(data),
      mode: "no-cors",
    });
    return;
  }
  // Stub: simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1500));
  console.log("[RegisterPage] Submission payload:", data); // eslint-disable-line no-console
}

// ────────── Shared input styles ──────────

const inputBase =
  "w-full rounded-xl border border-neutral-200 px-4 py-3 text-base text-[#0a0a0a] " +
  "placeholder:text-neutral-400 outline-none transition-colors " +
  "focus:border-[#397bce] focus:ring-2 focus:ring-[#397bce]/20";

const labelBase = "block text-sm font-medium text-[#0a0a0a] mb-1.5";
const errorText = "text-sm text-red-500 mt-1";

// ────────── Form input helpers ──────────

function FieldLabel({
  htmlFor,
  required,
  children,
}: {
  htmlFor: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label htmlFor={htmlFor} style={fontBody} className={labelBase}>
      {children}
      {required && <span className="text-red-400 ml-0.5">*</span>}
    </label>
  );
}

function FieldError({ error }: { error?: string }) {
  if (!error) return null;
  return (
    <p style={fontBody} className={errorText} role="alert">
      {error}
    </p>
  );
}

function TextInput({
  id,
  label,
  value,
  onChange,
  error,
  required,
  type = "text",
  placeholder,
  helper,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  required?: boolean;
  type?: string;
  placeholder?: string;
  helper?: string;
}) {
  return (
    <div>
      <FieldLabel htmlFor={id} required={required}>
        {label}
      </FieldLabel>
      {helper && (
        <p style={fontBody} className="text-xs text-neutral-400 mb-1.5">
          {helper}
        </p>
      )}
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={fontBody}
        className={`${inputBase} ${error ? "border-red-400 focus:border-red-400 focus:ring-red-400/20" : ""}`}
        aria-required={required}
        aria-invalid={!!error}
      />
      <FieldError error={error} />
    </div>
  );
}

function TextareaInput({
  id,
  label,
  value,
  onChange,
  error,
  required,
  placeholder,
  helper,
  rows = 3,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  required?: boolean;
  placeholder?: string;
  helper?: string;
  rows?: number;
}) {
  return (
    <div>
      <FieldLabel htmlFor={id} required={required}>
        {label}
      </FieldLabel>
      {helper && (
        <p style={fontBody} className="text-xs text-neutral-400 mb-1.5">
          {helper}
        </p>
      )}
      <textarea
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        style={fontBody}
        className={`${inputBase} resize-y ${error ? "border-red-400 focus:border-red-400 focus:ring-red-400/20" : ""}`}
        aria-required={required}
        aria-invalid={!!error}
      />
      <FieldError error={error} />
    </div>
  );
}

function SelectInput({
  id,
  label,
  value,
  onChange,
  options,
  error,
  required,
  placeholder = "Select...",
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
  error?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      <FieldLabel htmlFor={id} required={required}>
        {label}
      </FieldLabel>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={fontBody}
        className={`${inputBase} appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%3E%3Cpath%20fill%3D%22%239ca3af%22%20d%3D%22M6%208.825L.35%203.175l.825-.825L6%207.175l4.825-4.825.825.825z%22%2F%3E%3C%2Fsvg%3E')] bg-[length:12px] bg-[right_16px_center] bg-no-repeat pr-10 ${error ? "border-red-400" : ""}`}
        aria-required={required}
        aria-invalid={!!error}
      >
        <option value="">{placeholder}</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
      <FieldError error={error} />
    </div>
  );
}

function CheckboxGroup({
  label,
  options,
  selected,
  onChange,
  error,
  required,
}: {
  label: string;
  options: string[];
  selected: string[];
  onChange: (v: string[]) => void;
  error?: string;
  required?: boolean;
}) {
  const toggle = (option: string) => {
    onChange(
      selected.includes(option)
        ? selected.filter((s) => s !== option)
        : [...selected, option],
    );
  };

  return (
    <div>
      <p style={fontBody} className={labelBase}>
        {label}
        {required && <span className="text-red-400 ml-0.5">*</span>}
      </p>
      <div className="space-y-2.5 mt-1">
        {options.map((option) => (
          <label
            key={option}
            className="flex items-start gap-3 cursor-pointer group"
          >
            <input
              type="checkbox"
              checked={selected.includes(option)}
              onChange={() => toggle(option)}
              className="mt-0.5 h-[18px] w-[18px] shrink-0 rounded border-neutral-300 text-[#397bce] focus:ring-[#397bce]/20"
            />
            <span
              style={fontBody}
              className="text-sm text-neutral-700 leading-relaxed"
            >
              {option}
            </span>
          </label>
        ))}
      </div>
      <FieldError error={error} />
    </div>
  );
}

function SingleCheckbox({
  id,
  label,
  checked,
  onChange,
  error,
}: {
  id: string;
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
  error?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="flex items-start gap-3 cursor-pointer">
        <input
          id={id}
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="mt-0.5 h-[18px] w-[18px] shrink-0 rounded border-neutral-300 text-[#397bce] focus:ring-[#397bce]/20"
        />
        <span
          style={fontBody}
          className="text-sm text-neutral-700 leading-relaxed"
        >
          {label}
        </span>
      </label>
      <FieldError error={error} />
    </div>
  );
}

function RadioGroup({
  label,
  name,
  value,
  onChange,
  error,
  required,
  yesLabel,
  noLabel,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  required?: boolean;
  yesLabel: string;
  noLabel: string;
}) {
  const options = [
    { display: yesLabel, val: "yes" },
    { display: noLabel, val: "no" },
  ];

  return (
    <div>
      <p style={fontBody} className={labelBase}>
        {label}
        {required && <span className="text-red-400 ml-0.5">*</span>}
      </p>
      <div className="flex gap-6 mt-1">
        {options.map((opt) => (
          <label key={opt.val} className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name={name}
              value={opt.val}
              checked={value === opt.val}
              onChange={(e) => onChange(e.target.value)}
              className="h-[18px] w-[18px] border-neutral-300 text-[#397bce] focus:ring-[#397bce]/20"
            />
            <span style={fontBody} className="text-sm text-neutral-700">
              {opt.display}
            </span>
          </label>
        ))}
      </div>
      <FieldError error={error} />
    </div>
  );
}

// ────────── Step indicator ──────────

function StepIndicator({
  current,
  total,
  stepLabels,
}: {
  current: number;
  total: number;
  stepLabels: string[];
}) {
  return (
    <div className="mb-10 md:mb-12">
      {/* Circles + lines row — items-center aligns lines to circle centers */}
      <div className="flex items-center justify-center">
        {Array.from({ length: total }, (_, i) => {
          const stepNum = i + 1;
          const isComplete = stepNum < current;
          const isActive = stepNum === current;

          return (
            <div key={stepNum} className="flex items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${
                  isComplete
                    ? "bg-[#397bce] text-white"
                    : isActive
                      ? "border-2 border-[#397bce] text-[#397bce]"
                      : "border border-neutral-200 text-neutral-400"
                }`}
                style={fontBody}
                aria-current={isActive ? "step" : undefined}
              >
                {isComplete ? <Check className="w-5 h-5" /> : stepNum}
              </div>
              {stepNum < total && (
                <div
                  className={`w-12 md:w-20 h-0.5 mx-2 ${
                    stepNum < current ? "bg-[#397bce]" : "bg-neutral-200"
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Labels row — separate so it doesn't affect line alignment */}
      <div className="hidden md:flex justify-center mt-2">
        {Array.from({ length: total }, (_, i) => {
          const stepNum = i + 1;
          const isComplete = stepNum < current;
          const isActive = stepNum === current;

          return (
            <div key={stepNum} className="flex items-center">
              <div className="w-10 flex justify-center">
                <span
                  style={fontBody}
                  className={`text-xs whitespace-nowrap ${
                    isActive
                      ? "font-semibold text-[#397bce]"
                      : isComplete
                        ? "text-[#397bce]"
                        : "text-neutral-400"
                  }`}
                >
                  {stepLabels[i]}
                </span>
              </div>
              {stepNum < total && <div className="w-12 md:w-20 mx-2" />}
            </div>
          );
        })}
      </div>

      {/* Mobile: single label for current step */}
      <div className="md:hidden text-center mt-2">
        <span
          style={fontBody}
          className="text-xs font-semibold text-[#397bce]"
        >
          {stepLabels[current - 1]}
        </span>
      </div>
    </div>
  );
}

// ────────── Experience level pills ──────────

function ExperiencePills({
  value,
  onChange,
  error,
  questionLabel,
  experienceLabels,
}: {
  value: string;
  onChange: (v: string) => void;
  error?: string;
  questionLabel: string;
  experienceLabels: string[];
}) {
  return (
    <div>
      <p style={fontBody} className={labelBase}>
        {questionLabel}
        <span className="text-red-400 ml-0.5">*</span>
      </p>
      <div className="flex flex-wrap gap-2 mt-2">
        {experienceLabels.map((label, i) => {
          const level = String(i + 1);
          const selected = value === level;
          return (
            <button
              key={level}
              type="button"
              onClick={() => onChange(level)}
              style={fontBody}
              className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                selected
                  ? "bg-[#397bce] text-white"
                  : "border border-neutral-200 text-neutral-700 hover:border-neutral-300"
              }`}
            >
              <span className="font-semibold">{level}</span>
              <span className="hidden sm:inline"> &mdash; {label}</span>
            </button>
          );
        })}
      </div>
      <FieldError error={error} />
    </div>
  );
}

// ────────── Review summary ──────────

function ReviewSummary({
  data,
  t,
}: {
  data: RegistrationFormData;
  t: ReturnType<typeof useTranslations>;
}) {
  const experienceLabels = [
    t("step3.experienceLabels.noExperience"),
    t("step3.experienceLabels.beginner"),
    t("step3.experienceLabels.intermediate"),
    t("step3.experienceLabels.advanced"),
    t("step3.experienceLabels.veryExperienced"),
  ];

  const rows = [
    { label: t("step4.reviewLabels.name"), value: `${data.title} ${data.firstName} ${data.lastName}` },
    { label: t("step4.reviewLabels.email"), value: data.email },
    { label: t("step4.reviewLabels.programs"), value: data.programs.join(", ") },
    { label: t("step4.reviewLabels.phone"), value: data.phone },
    { label: t("step4.reviewLabels.organization"), value: data.orgName },
    { label: t("step4.reviewLabels.city"), value: data.city },
    {
      label: t("step4.reviewLabels.expectedStudents"),
      value: data.expectedStudents,
    },
    {
      label: t("step4.reviewLabels.experienceLevel"),
      value: data.experienceLevel
        ? `${data.experienceLevel} \u2014 ${experienceLabels[parseInt(data.experienceLevel) - 1]}`
        : "",
    },
  ];

  return (
    <div className="rounded-2xl border border-neutral-100 bg-neutral-50/50 p-5 md:p-6 mb-8">
      <p
        style={{ ...fontBody, fontWeight: 600 }}
        className="text-sm text-[#0a0a0a] mb-4"
      >
        {t("step4.reviewYourInformation")}
      </p>
      <div className="space-y-2">
        {rows
          .filter((r) => r.value)
          .map((r) => (
            <div
              key={r.label}
              className="flex justify-between gap-4 text-sm py-1.5 border-b border-neutral-100 last:border-0"
            >
              <span style={fontBody} className="text-neutral-500 shrink-0">
                {r.label}
              </span>
              <span
                style={fontBody}
                className="text-[#0a0a0a] text-right"
              >
                {r.value}
              </span>
            </div>
          ))}
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════
// RegisterPage
// ════════════════════════════════════════════════════════

export function RegisterPage() {
  const t = useTranslations("RegisterPage");

  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [formData, setFormData] = useState<RegistrationFormData>(INITIAL_DATA);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const formRef = useRef<HTMLDivElement>(null);

  // ────────── Data arrays (depend on t()) ──────────

  const STEP_LABELS = [
    t("stepLabels.advisorInfo"),
    t("stepLabels.organization"),
    t("stepLabels.delegates"),
    t("stepLabels.review"),
  ];

  const PROGRAM_OPTIONS = [
    t("step1.programOptions.modelUn"),
    t("step1.programOptions.mockTrial"),
    t("step1.programOptions.mathletes"),
  ];

  const ACKNOWLEDGMENT_OPTIONS = [
    t("step1.acknowledgmentOptions.adultAge"),
    t("step1.acknowledgmentOptions.schoolEmployee"),
    t("step1.acknowledgmentOptions.independentSponsor"),
    t("step1.acknowledgmentOptions.noneOfAbove"),
  ];

  const EXPERIENCE_LABELS = [
    t("step3.experienceLabels.noExperience"),
    t("step3.experienceLabels.beginner"),
    t("step3.experienceLabels.intermediate"),
    t("step3.experienceLabels.advanced"),
    t("step3.experienceLabels.veryExperienced"),
  ];

  const HERO_STATS = [
    { icon: Users, value: t("hero.stats.studentsValue"), label: t("hero.stats.studentsLabel") },
    { icon: School, value: t("hero.stats.schoolsValue"), label: t("hero.stats.schoolsLabel") },
  ];

  const TRUST_BADGES = [
    t("hero.trustBadges.freeResources"),
    t("hero.trustBadges.grantsAvailable"),
    t("hero.trustBadges.beginnerFriendly"),
  ];

  const REGISTER_FAQS: FaqItem[] = [
    {
      q: t("faq.items.whoShouldFill.q"),
      a: t("faq.items.whoShouldFill.a"),
    },
    {
      q: t("faq.items.registrationFee.q"),
      a: t("faq.items.registrationFee.a"),
    },
    {
      q: t("faq.items.multipleSchools.q"),
      a: t("faq.items.multipleSchools.a"),
    },
    {
      q: t("faq.items.unknownCount.q"),
      a: t("faq.items.unknownCount.a"),
    },
    {
      q: t("faq.items.priorExperience.q"),
      a: t("faq.items.priorExperience.a"),
    },
    {
      q: t("faq.items.financialAssistance.q"),
      a: t("faq.items.financialAssistance.a"),
    },
  ];

  // ────────── Validation ──────────

  function validateStep(
    step: number,
    data: RegistrationFormData,
  ): Record<string, string> {
    const errors: Record<string, string> = {};

    if (step === 1) {
      if (!data.email.trim()) errors.email = t("validation.emailRequired");
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
        errors.email = t("validation.emailInvalid");
      if (data.programs.length === 0)
        errors.programs = t("validation.programsRequired");
      if (data.acknowledgments.length === 0)
        errors.acknowledgments = t("validation.acknowledgmentsRequired");
      if (!data.title) errors.title = t("validation.titleRequired");
      if (!data.firstName.trim()) errors.firstName = t("validation.firstNameRequired");
      if (!data.lastName.trim()) errors.lastName = t("validation.lastNameRequired");
      if (!data.phone.trim()) errors.phone = t("validation.phoneRequired");
      else if (data.phone.replace(/\D/g, "").length < 7)
        errors.phone = t("validation.phoneInvalid");
    }

    if (step === 2) {
      if (!data.orgName.trim())
        errors.orgName = t("validation.orgNameRequired");
      if (!data.city.trim()) errors.city = t("validation.cityRequired");
    }

    if (step === 3) {
      if (!data.expectedStudents.trim())
        errors.expectedStudents = t("validation.expectedStudentsRequired");
      else if (
        !/^\d+$/.test(data.expectedStudents.trim()) ||
        parseInt(data.expectedStudents) < 1
      )
        errors.expectedStudents = t("validation.expectedStudentsInvalid");
      if (!data.experienceLevel)
        errors.experienceLevel = t("validation.experienceLevelRequired");
    }

    if (step === 4) {
      if (!data.paymentAck)
        errors.paymentAck = t("validation.paymentAckRequired");
      if (!data.liabilityAck)
        errors.liabilityAck = t("validation.liabilityAckRequired");
      if (!data.prepAck)
        errors.prepAck = t("validation.prepAckRequired");
      if (!data.permissionEvents)
        errors.permissionEvents = t("validation.permissionEventsRequired");
      if (!data.permissionClassroom)
        errors.permissionClassroom = t("validation.permissionClassroomRequired");
    }

    return errors;
  }

  const updateField = useCallback(
    <K extends keyof RegistrationFormData>(
      key: K,
      value: RegistrationFormData[K],
    ) => {
      setFormData((prev) => ({ ...prev, [key]: value }));
      setErrors((prev) => {
        if (prev[key]) {
          const next = { ...prev };
          delete next[key];
          return next;
        }
        return prev;
      });
    },
    [],
  );

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleNext = () => {
    const stepErrors = validateStep(step, formData);
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      return;
    }
    setErrors({});
    setDirection(1);
    setStep((s) => s + 1);
    setTimeout(scrollToForm, 100);
  };

  const handleBack = () => {
    setDirection(-1);
    setErrors({});
    setStep((s) => s - 1);
    setTimeout(scrollToForm, 100);
  };

  const handleSubmit = async () => {
    const stepErrors = validateStep(4, formData);
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      return;
    }
    setStatus("submitting");
    try {
      await submitRegistration(formData);
      setStatus("success");
      setTimeout(scrollToForm, 100);
    } catch {
      setStatus("error");
    }
  };

  // ────────── Step renderers ──────────

  const renderStep1 = () => (
    <div className="space-y-5">
      <TextInput
        id="email"
        label={t("step1.emailLabel")}
        type="email"
        value={formData.email}
        onChange={(v) => updateField("email", v)}
        error={errors.email}
        required
        placeholder={t("step1.emailPlaceholder")}
      />
      <CheckboxGroup
        label={t("step1.programsLabel")}
        options={PROGRAM_OPTIONS}
        selected={formData.programs}
        onChange={(v) => updateField("programs", v)}
        error={errors.programs}
        required
      />
      <CheckboxGroup
        label={t("step1.acknowledgmentsLabel")}
        options={ACKNOWLEDGMENT_OPTIONS}
        selected={formData.acknowledgments}
        onChange={(v) => updateField("acknowledgments", v)}
        error={errors.acknowledgments}
        required
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <SelectInput
          id="title"
          label={t("step1.titleLabel")}
          value={formData.title}
          onChange={(v) => updateField("title", v)}
          options={TITLE_OPTIONS}
          error={errors.title}
          required
          placeholder={t("step1.titlePlaceholder")}
        />
        <TextInput
          id="phone"
          label={t("step1.phoneLabel")}
          type="tel"
          value={formData.phone}
          onChange={(v) => updateField("phone", v)}
          error={errors.phone}
          required
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <TextInput
          id="firstName"
          label={t("step1.firstNameLabel")}
          value={formData.firstName}
          onChange={(v) => updateField("firstName", v)}
          error={errors.firstName}
          required
        />
        <TextInput
          id="lastName"
          label={t("step1.lastNameLabel")}
          value={formData.lastName}
          onChange={(v) => updateField("lastName", v)}
          error={errors.lastName}
          required
        />
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-5">
      <TextInput
        id="orgName"
        label={t("step2.orgNameLabel")}
        value={formData.orgName}
        onChange={(v) => updateField("orgName", v)}
        error={errors.orgName}
        required
        helper={t("step2.orgNameHelper")}
        placeholder={t("step2.orgNamePlaceholder")}
      />
      <TextInput
        id="orgAddress"
        label={t("step2.orgAddressLabel")}
        value={formData.orgAddress}
        onChange={(v) => updateField("orgAddress", v)}
        placeholder={t("step2.orgAddressPlaceholder")}
      />
      <TextInput
        id="city"
        label={t("step2.cityLabel")}
        value={formData.city}
        onChange={(v) => updateField("city", v)}
        error={errors.city}
        required
        placeholder={t("step2.cityPlaceholder")}
      />
      <TextareaInput
        id="additionalAdvisors"
        label={t("step2.additionalAdvisorsLabel")}
        value={formData.additionalAdvisors}
        onChange={(v) => updateField("additionalAdvisors", v)}
        placeholder={t("step2.additionalAdvisorsPlaceholder")}
        helper={t("step2.additionalAdvisorsHelper")}
      />
      <TextareaInput
        id="additionalAdvisorEmails"
        label={t("step2.additionalAdvisorEmailsLabel")}
        value={formData.additionalAdvisorEmails}
        onChange={(v) => updateField("additionalAdvisorEmails", v)}
        placeholder={t("step2.additionalAdvisorEmailsPlaceholder")}
        helper={t("step2.additionalAdvisorEmailsHelper")}
      />
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-5">
      <TextInput
        id="expectedStudents"
        label={t("step3.expectedStudentsLabel")}
        type="text"
        value={formData.expectedStudents}
        onChange={(v) => updateField("expectedStudents", v)}
        error={errors.expectedStudents}
        required
        placeholder={t("step3.expectedStudentsPlaceholder")}
      />
      <ExperiencePills
        value={formData.experienceLevel}
        onChange={(v) => updateField("experienceLevel", v)}
        error={errors.experienceLevel}
        questionLabel={t("step3.experienceQuestion")}
        experienceLabels={EXPERIENCE_LABELS}
      />
      <TextareaInput
        id="committeePreferences"
        label={t("step3.committeePreferencesLabel")}
        value={formData.committeePreferences}
        onChange={(v) => updateField("committeePreferences", v)}
        placeholder={t("step3.committeePreferencesPlaceholder")}
        rows={3}
      />
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-5">
      <ReviewSummary data={formData} t={t} />

      <div className="space-y-4">
        <p
          style={{ ...fontBody, fontWeight: 600 }}
          className="text-sm text-[#0a0a0a]"
        >
          {t("step4.acknowledgePrompt")}
        </p>
        <SingleCheckbox
          id="paymentAck"
          label={t("step4.paymentAck")}
          checked={formData.paymentAck}
          onChange={(v) => updateField("paymentAck", v)}
          error={errors.paymentAck}
        />
        <SingleCheckbox
          id="liabilityAck"
          label={t("step4.liabilityAck")}
          checked={formData.liabilityAck}
          onChange={(v) => updateField("liabilityAck", v)}
          error={errors.liabilityAck}
        />
        <SingleCheckbox
          id="prepAck"
          label={t("step4.prepAck")}
          checked={formData.prepAck}
          onChange={(v) => updateField("prepAck", v)}
          error={errors.prepAck}
        />
      </div>

      <TextareaInput
        id="comments"
        label={t("step4.commentsLabel")}
        value={formData.comments}
        onChange={(v) => updateField("comments", v)}
        placeholder={t("step4.commentsPlaceholder")}
        rows={3}
      />

      <RadioGroup
        label={t("step4.permissionEventsLabel")}
        name="permissionEvents"
        value={formData.permissionEvents}
        onChange={(v) => updateField("permissionEvents", v)}
        error={errors.permissionEvents}
        required
        yesLabel={t("step4.yes")}
        noLabel={t("step4.no")}
      />
      <RadioGroup
        label={t("step4.permissionClassroomLabel")}
        name="permissionClassroom"
        value={formData.permissionClassroom}
        onChange={(v) => updateField("permissionClassroom", v)}
        error={errors.permissionClassroom}
        required
        yesLabel={t("step4.yes")}
        noLabel={t("step4.no")}
      />

      {status === "error" && (
        <div
          className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700"
          style={fontBody}
          role="alert"
        >
          {t("errorMessage.text")}
          <a
            href="mailto:contact@jamun.org"
            className="underline underline-offset-2"
          >
            {t("errorMessage.contactEmail")}
          </a>
          .
        </div>
      )}
    </div>
  );

  const renderCurrentStep = () => {
    switch (step) {
      case 1:
        return renderStep1();
      case 2:
        return renderStep2();
      case 3:
        return renderStep3();
      case 4:
        return renderStep4();
      default:
        return null;
    }
  };

  // ────────── Success state ──────────

  const renderSuccess = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7 }}
      className="text-center py-16 md:py-24"
    >
      <div className="w-20 h-20 mx-auto mb-8 rounded-full bg-[#10b981]/10 flex items-center justify-center">
        <Check className="w-10 h-10 text-[#10b981]" />
      </div>
      <Heading size="section">{t("success.heading")}</Heading>
      <p
        style={fontBody}
        className="mt-4 max-w-lg mx-auto text-base md:text-lg text-neutral-700 leading-relaxed"
      >
        {t("success.thankYouBefore")}{formData.firstName}{t("success.thankYouRegistration")}
        <span className="font-medium text-[#0a0a0a]">
          {formData.orgName}
        </span>
        {t("success.thankYouConfirmation")}
        <span className="font-medium text-[#0a0a0a]">{formData.email}</span>
        {t("success.thankYouAfter")}
      </p>
      <p style={fontBody} className="mt-4 text-sm text-neutral-500">
        {t("success.noEmailReceived")}
        <a
          href="mailto:contact@jamun.org"
          className="text-[#397bce] underline underline-offset-2"
        >
          {t("success.contactEmail")}
        </a>
      </p>
      <div className="mt-10 flex flex-wrap justify-center gap-3">
        <PillButton href="/programs" tone="outline">
          {t("success.explorePrograms")}
        </PillButton>
        <PillButton href="/modelun/resources">{t("success.browseResources")}</PillButton>
      </div>
    </motion.div>
  );

  // ────────── Render ──────────

  return (
    <div className="bg-white text-[#0a0a0a]">
      {/* ───── Hero ───── */}
      <DiagonalSpread
        photoSide="right"
        photoSrc={PHOTOS.hero}
        photoAlt={t("heroPhotoAlt")}
        photoPriority
        clip="diagonal"
        minHeight="min-h-[calc(100svh-3.5rem)] md:min-h-[calc(100svh-4rem)]"
        animation="entry"
      >
        <Heading size="hero">
          {t("hero.headingBefore")}
          <span className="text-[#397bce]">{t("hero.headingHighlight")}</span>
        </Heading>
        <p
          style={fontBody}
          className={`mt-6 max-w-md ${bodySize.lead}`}
        >
          {t("hero.description")}
        </p>

        {/* Inline stats */}
        <div className="mt-8 flex flex-wrap gap-6 md:gap-8">
          {HERO_STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + i * 0.1, duration: 0.6 }}
              className="flex items-center gap-2.5"
            >
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: "#397bce1a" }}
              >
                <s.icon className="w-[18px] h-[18px] text-[#397bce]" />
              </div>
              <div>
                <div
                  style={{ ...fontHeading, fontWeight: 600 }}
                  className="text-lg leading-none"
                >
                  {s.value}
                </div>
                <div
                  style={fontBody}
                  className="text-xs text-neutral-500 mt-0.5"
                >
                  {s.label}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-6 flex flex-wrap gap-x-5 gap-y-1"
        >
          {TRUST_BADGES.map(
            (badge) => (
              <span
                key={badge}
                style={fontBody}
                className="flex items-center gap-1.5 text-[13px] text-neutral-400"
              >
                <Check className="w-3.5 h-3.5 text-[#10b981]" />
                {badge}
              </span>
            ),
          )}
        </motion.div>

        <div className="mt-8">
          <PillButton onClick={scrollToForm} withArrow>
            {t("hero.startRegistration")}
          </PillButton>
        </div>
      </DiagonalSpread>

      {/* ───── Registration form ───── */}
      <section className="bg-white" ref={formRef}>
        <Container className="py-14 md:py-20">
          {status === "success" ? (
            renderSuccess()
          ) : (
            <>
              <SectionIntro
                title={t("form.title")}
                subtitle={t("form.subtitle")}
                spacing="tight"
              />

              {/* Step indicator */}
              <div className="relative">
                <StepIndicator current={step} total={4} stepLabels={STEP_LABELS} />
              </div>

              {/* Form body */}
              <div className="max-w-2xl mx-auto">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, x: direction > 0 ? 24 : -24 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: direction > 0 ? -24 : 24 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    {renderCurrentStep()}
                  </motion.div>
                </AnimatePresence>

                {/* Navigation buttons */}
                <div className="flex justify-between mt-10">
                  {step > 1 ? (
                    <PillButton
                      onClick={handleBack}
                      tone="outline"
                      size="md"
                    >
                      {t("navigation.back")}
                    </PillButton>
                  ) : (
                    <div />
                  )}
                  {step < 4 ? (
                    <PillButton onClick={handleNext} size="md" withArrow>
                      {t("navigation.continue")}
                    </PillButton>
                  ) : (
                    <PillButton
                      onClick={handleSubmit}
                      size="lg"
                      disabled={status === "submitting"}
                    >
                      {status === "submitting"
                        ? t("navigation.submitting")
                        : t("navigation.submitRegistration")}
                    </PillButton>
                  )}
                </div>
              </div>
            </>
          )}
        </Container>
      </section>

      {/* ───── Educator testimonial (blue) ───── */}
      <TestimonialSpread
        bg="#397bce"
        photoSide="left"
        photoSrc={PHOTOS.quote}
        photoAlt={t("educatorPhotoAlt")}
        heading={t("testimonial.heading")}
        quote={t("testimonial.quote")}
        attribution={t("testimonial.attribution")}
      />

      {/* ───── FAQ ───── */}
      <section className="bg-white">
        <Container className="py-12 md:py-16">
          <SectionIntro
            title={t("faq.title")}
            subtitle={t("faq.subtitle")}
          />
          <div className="max-w-3xl mx-auto">
            <FaqAccordion items={REGISTER_FAQS} />
          </div>
          <div className="text-center mt-12">
            <p style={fontBody} className="text-base text-neutral-700 mb-2">
              {t("faq.haveAnotherQuestion")}
            </p>
            <ArrowLink external="mailto:contact@jamun.org">
              {t("faq.getInTouch")}
            </ArrowLink>
          </div>
        </Container>
      </section>

      {/* ───── Final CTA ───── */}
      <DiagonalSpread
        photoSide="right"
        photoSrc={PHOTOS.cta}
        photoAlt={t("ctaPhotoAlt")}
        clip="none"
        minHeight="min-h-[70svh]"
        panelClassName="py-16 md:py-0"
      >
        <Heading size="ctaHero" className="mb-6 text-[#0a0a0a]">
          {t("finalCta.headingBefore")}
          <span className="text-[#397bce]">{t("finalCta.headingHighlight")}</span>
        </Heading>
        <p style={fontBody} className={`${bodySize.lead} mb-9`}>
          {t("finalCta.description")}
        </p>
        <div className="flex flex-wrap gap-3">
          <PillButton onClick={scrollToForm} withArrow>
            {t("finalCta.registerNow")}
          </PillButton>
          <PillButton
            href="/grants"
            tone="outline"
          >
            {t("finalCta.applyForGrant")}
          </PillButton>
        </div>
        <div className="mt-6">
          <ArrowLink external="mailto:contact@jamun.org" color="#397bce">
            {t("finalCta.emailUsAt")}
          </ArrowLink>
        </div>
      </DiagonalSpread>
    </div>
  );
}
