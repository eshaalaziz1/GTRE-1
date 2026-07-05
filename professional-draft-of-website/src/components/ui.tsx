"use client";

// Small shared primitives so the portal, admin, and auth screens stay visually
// consistent and DRY. All styling uses the site's existing navy/gold tokens.

import { useState, type ReactNode } from "react";

export function Field({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  required,
  name,
  autoComplete,
}: {
  label: string;
  type?: string;
  value?: string;
  onChange?: (v: string) => void;
  placeholder?: string;
  required?: boolean;
  name?: string;
  autoComplete?: string;
}) {
  return (
    <label className="block">
      <span className="text-[12px] font-semibold text-navy uppercase tracking-wide">{label}</span>
      <input
        name={name}
        required={required}
        type={type}
        value={value}
        autoComplete={autoComplete}
        onChange={onChange ? (e) => onChange(e.target.value) : undefined}
        placeholder={placeholder}
        className="mt-1.5 w-full px-3.5 py-2.5 border border-border rounded-lg text-sm outline-none focus:border-navy transition-colors"
      />
    </label>
  );
}

export function TextArea({
  label,
  value,
  onChange,
  placeholder,
  required,
  rows = 4,
}: {
  label: string;
  value?: string;
  onChange?: (v: string) => void;
  placeholder?: string;
  required?: boolean;
  rows?: number;
}) {
  return (
    <label className="block">
      <span className="text-[12px] font-semibold text-navy uppercase tracking-wide">{label}</span>
      <textarea
        required={required}
        rows={rows}
        value={value}
        onChange={onChange ? (e) => onChange(e.target.value) : undefined}
        placeholder={placeholder}
        className="mt-1.5 w-full px-3.5 py-2.5 border border-border rounded-lg text-sm outline-none focus:border-navy transition-colors resize-y"
      />
    </label>
  );
}

export function Select({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <label className="block">
      <span className="text-[12px] font-semibold text-navy uppercase tracking-wide">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1.5 w-full px-3.5 py-2.5 border border-border rounded-lg text-sm outline-none focus:border-navy bg-white transition-colors"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}

export function Button({
  children,
  onClick,
  type = "button",
  variant = "solid",
  className = "",
  disabled,
}: {
  children: ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
  variant?: "solid" | "outline" | "gold" | "danger" | "ghost";
  className?: string;
  disabled?: boolean;
}) {
  const base =
    "px-5 py-2.5 rounded-md text-sm font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed";
  const styles: Record<string, string> = {
    solid: "bg-navy text-white hover:bg-navy-deep",
    outline: "border border-navy text-navy hover:bg-surface",
    gold: "bg-gold text-navy hover:bg-gold-hover",
    danger: "border border-red-300 text-red-700 hover:bg-red-50",
    ghost: "text-secondary hover:text-navy",
  };
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={`${base} ${styles[variant]} ${className}`}>
      {children}
    </button>
  );
}

export function Badge({
  children,
  tone = "navy",
}: {
  children: ReactNode;
  tone?: "navy" | "gold" | "green" | "amber" | "red" | "gray";
}) {
  const tones: Record<string, string> = {
    navy: "bg-navy/10 text-navy",
    gold: "bg-gold-soft text-navy",
    green: "bg-green-100 text-green-800",
    amber: "bg-amber-100 text-amber-800",
    red: "bg-red-100 text-red-800",
    gray: "bg-surface-2 text-secondary",
  };
  return (
    <span className={`inline-block text-[11px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded ${tones[tone]}`}>
      {children}
    </span>
  );
}

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`bg-white border border-border rounded-xl p-6 ${className}`}>{children}</div>
  );
}

export function EmptyState({ title, body }: { title: string; body?: string }) {
  return (
    <div className="text-center border border-dashed border-border rounded-xl py-12 px-6">
      <div className="text-navy font-semibold">{title}</div>
      {body && <p className="text-sm text-secondary mt-2 max-w-md mx-auto">{body}</p>}
    </div>
  );
}

/** A controlled banner for success/error feedback. */
export function Notice({ tone, children }: { tone: "success" | "error" | "info"; children: ReactNode }) {
  const tones = {
    success: "bg-green-50 text-green-800 border-green-200",
    error: "bg-red-50 text-red-800 border-red-200",
    info: "bg-navy/5 text-navy border-navy/15",
  };
  return <div className={`text-sm rounded-lg border px-4 py-3 ${tones[tone]}`}>{children}</div>;
}

/** Reusable tab strip. Controlled by the parent. */
export function Tabs({
  tabs,
  active,
  onChange,
}: {
  tabs: { key: string; label: string }[];
  active: string;
  onChange: (key: string) => void;
}) {
  return (
    <div className="flex gap-1 overflow-x-auto border-b border-border">
      {tabs.map((t) => (
        <button
          key={t.key}
          onClick={() => onChange(t.key)}
          className={`px-4 py-2.5 text-sm font-semibold whitespace-nowrap border-b-2 -mb-px transition-colors ${
            active === t.key
              ? "border-gold text-navy"
              : "border-transparent text-secondary hover:text-navy"
          }`}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}

/** Confirm-before-delete helper used by list rows. */
export function ConfirmDelete({ onConfirm, label = "Delete" }: { onConfirm: () => void; label?: string }) {
  const [armed, setArmed] = useState(false);
  if (!armed) {
    return (
      <button
        onClick={() => setArmed(true)}
        className="text-[13px] font-semibold text-secondary hover:text-red-700"
      >
        {label}
      </button>
    );
  }
  return (
    <span className="flex items-center gap-2 text-[13px]">
      <button onClick={onConfirm} className="font-semibold text-red-700">
        Confirm
      </button>
      <button onClick={() => setArmed(false)} className="text-secondary">
        Cancel
      </button>
    </span>
  );
}
