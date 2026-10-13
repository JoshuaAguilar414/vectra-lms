"use client";

import { useState } from "react";

export default function VectraNotifyForm() {
  const [email, setEmail] = useState("");

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const value = email.trim();
    if (!value) return;
    const subject = encodeURIComponent("VECTRA website go-live notice");
    const body = encodeURIComponent(`Please notify me when the new VECTRA website is live.\n\nEmail: ${value}`);
    window.location.href = `mailto:info@vectra-intl.com?subject=${subject}&body=${body}`;
  }

  return (
    <form className="vectra-footer-notify-form" onSubmit={onSubmit}>
      <label className="sr-only" htmlFor="vectra-footer-notify-email">
        Your email
      </label>
      <input
        id="vectra-footer-notify-email"
        className="vectra-footer-notify-input"
        type="email"
        name="email"
        required
        autoComplete="email"
        placeholder="Your email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />
      <button className="vectra-footer-notify-btn" type="submit">
        Notify me
      </button>
    </form>
  );
}
