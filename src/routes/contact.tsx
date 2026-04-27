import { createFileRoute, Link } from "@tanstack/react-router"
import { useEffect, useMemo, useState } from "react"

import {
  getService,
  getTier,
  services,
  type ServiceSlug,
  type TierSlug,
} from "../content/pricing"
import { SITE_NAME, buildMeta } from "../lib/seo"

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: buildMeta({
      title: `Contact | ${SITE_NAME}`,
      description:
        "Send a project brief to JHB Web Studio for a recommended website tier, scoped quote, timeline, and next steps.",
    }),
  }),
  validateSearch: (search: Record<string, unknown>) => ({
    service: typeof search.service === "string" ? search.service : undefined,
    tier: typeof search.tier === "string" ? search.tier : undefined,
  }),
  component: Contact,
})

const CONTACT_EMAIL = "hello@jhbwebstudio.co.za"

function Contact() {
  const search = Route.useSearch()
  const initialService = (getService(search.service ?? "")?.slug ??
    "marketing") as ServiceSlug
  const initialTier = (getTier(getService(initialService)!, search.tier ?? "")?.slug ??
    "") as TierSlug | ""

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [company, setCompany] = useState("")
  const [service, setService] = useState<ServiceSlug>(initialService)
  const [tier, setTier] = useState<TierSlug | "">(initialTier)
  const [budget, setBudget] = useState("Not sure yet")
  const [timeline, setTimeline] = useState("This month")
  const [notes, setNotes] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitState, setSubmitState] = useState<{
    tone: "success" | "error"
    message: string
  } | null>(null)

  const selectedService = getService(service) ?? services[0]
  const selectedTier = tier ? getTier(selectedService, tier) : undefined

  useEffect(() => {
    const nextService = getService(search.service ?? "")?.slug
    if (nextService && nextService !== service) {
      setService(nextService)
    }
  }, [search.service, service])

  useEffect(() => {
    const nextService = getService(search.service ?? "")?.slug ?? service
    const resolvedService = getService(nextService) ?? selectedService
    const nextTier = search.tier
      ? getTier(resolvedService, search.tier)?.slug ?? ""
      : ""

    if (nextTier && nextTier !== tier) {
      setTier(nextTier)
      return
    }

    if (!resolvedService.tiers.some((candidate) => candidate.slug === tier)) {
      setTier("")
    }
  }, [search.tier, search.service, service, selectedService, tier])

  const mailtoHref = useMemo(() => {
    const subject = `Website project enquiry${company ? ` - ${company}` : ""}`
    const bodyLines = [
      `Name: ${name || "-"}`,
      `Email: ${email || "-"}`,
      `Company: ${company || "-"}`,
      `Service: ${selectedService.name}`,
      `Preferred tier: ${selectedTier?.name ?? "Not specified"}`,
      `Budget: ${budget}`,
      `Timeline: ${timeline}`,
      "",
      "Notes:",
      notes || "-",
      "",
      "Links (optional):",
      "- Current website:",
      "- Competitors / inspiration:",
    ]
    const body = bodyLines.join("\n")
    return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`
  }, [budget, company, email, name, notes, selectedService.name, selectedTier?.name, timeline])

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    setIsSubmitting(true)
    setSubmitState(null)

    try {
      const response = await fetch("/.netlify/functions/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name || "-",
          email: email || "-",
          company: company || "-",
          service: selectedService.name,
          service_slug: selectedService.slug,
          preferred_tier: selectedTier?.name ?? "Not specified",
          preferred_tier_slug: selectedTier?.slug ?? "not-specified",
          budget,
          timeline,
          notes: notes || "-",
          reply_to: email || CONTACT_EMAIL,
          source: "JHB Web Studio contact form",
          submitted_at: new Date().toISOString(),
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || "Failed to send")
      }

      setSubmitState({
        tone: "success",
        message: "Brief sent. I will reply with next steps and a recommendation.",
      })
      setName("")
      setEmail("")
      setCompany("")
      setBudget("Not sure yet")
      setTimeline("This month")
      setNotes("")
    } catch {
      setSubmitState({
        tone: "error",
        message: "Email failed to send. Use the direct email link below or try again shortly.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="page">
      <section className="container pageHeader">
        <h1 className="h1">Contact</h1>
        <p className="lead">
          Send a short brief and I will reply with next steps, questions, and a scoped
          quote.
        </p>
        <div className="pageActions">
          <a className="btn btnPrimary" href={mailtoHref}>
            Open email draft
          </a>
          <Link to="/pricing" className="btn btnGhost">
            View pricing
          </Link>
        </div>
      </section>

      <section className="container section">
        <div className="contactGrid">
          <article className="card">
            <h2 className="h2">Quick brief</h2>
            <p className="muted">
              Fill this in, then send it directly or open the email fallback.
            </p>

            <div className="selectionSummary compact">
              <div>
                <div className="selectionSummaryTitle">Current selection</div>
                <p className="muted">
                  {selectedService.name}
                  {selectedTier
                    ? ` · ${selectedTier.name} tier`
                    : " · tier still open"}
                </p>
              </div>
            </div>

            <form className="contactForm" onSubmit={handleSubmit}>
              <div className="formGrid">
                <label className="field">
                  <div className="label">Name</div>
                  <input
                    className="input"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    required
                  />
                </label>
                <label className="field">
                  <div className="label">Company</div>
                  <input
                    className="input"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="Company or brand"
                  />
                </label>
                <label className="field">
                  <div className="label">Email</div>
                  <input
                    className="input"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                  />
                </label>
                <label className="field">
                  <div className="label">Service</div>
                  <select
                    className="input"
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                  >
                    {services.map((serviceOption) => (
                      <option
                        key={serviceOption.slug}
                        value={serviceOption.slug}
                      >
                        {serviceOption.name}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="field">
                  <div className="label">Preferred tier</div>
                  <select
                    className="input"
                    value={tier}
                    onChange={(e) => setTier(e.target.value as TierSlug | "")}
                  >
                    <option value="">Not sure yet</option>
                    {selectedService.tiers.map((tierOption) => (
                      <option key={tierOption.slug} value={tierOption.slug}>
                        {tierOption.name}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="field">
                  <div className="label">Budget range</div>
                  <select
                    className="input"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                  >
                    <option value="Not sure yet">Not sure yet</option>
                    <option value="Under R15k">Under R15k</option>
                    <option value="R15k–R35k">R15k–R35k</option>
                    <option value="R35k–R75k">R35k–R75k</option>
                    <option value="R75k+">R75k+</option>
                  </select>
                </label>
                <label className="field">
                  <div className="label">Ideal timeline</div>
                  <select
                    className="input"
                    value={timeline}
                    onChange={(e) => setTimeline(e.target.value)}
                  >
                    <option value="This month">This month</option>
                    <option value="Next month">Next month</option>
                    <option value="In 2–3 months">In 2–3 months</option>
                    <option value="In 3+ months">In 3+ months</option>
                  </select>
                </label>
                <label className="field fieldFull">
                  <div className="label">Notes</div>
                  <textarea
                    className="input textarea"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="What do you sell, what should the website do, and what pages do you think you need?"
                    required
                  />
                </label>
              </div>

              {submitState ? (
                <div
                  className={
                    submitState.tone === "success"
                      ? "formNotice success"
                      : "formNotice error"
                  }
                  role="status"
                >
                  {submitState.message}
                </div>
              ) : null}

              <div className="formActions">
                <button
                  className="btn btnPrimary"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending brief..." : "Send brief"}
                </button>
                <a className="btn btnSecondary" href={mailtoHref}>
                  Open email draft
                </a>
                <a className="btn btnGhost" href={`mailto:${CONTACT_EMAIL}`}>
                  Email directly
                </a>
              </div>
            </form>
          </article>

          <aside className="card">
            <img
              src="/illustrations/contact-scene.svg"
              alt="Illustrated contact and planning scene."
              className="asideIllustration"
            />
            <h2 className="h2">What happens next</h2>
            <ul className="list dense">
              <li className="listItem">
                I review your brief and reply with clarifying questions if needed.
              </li>
              <li className="listItem">
                You get a recommended tier or a scoped custom quote.
              </li>
              <li className="listItem">
                If it fits, we confirm timeline, deposit, and kickoff.
              </li>
            </ul>

            <div className="divider" />

            <h2 className="h2">Details</h2>
            <div className="contactDetails">
              <div className="detailRow">
                <div className="detailLabel">Email</div>
                <div className="detailValue">
                  <a className="link" href={`mailto:${CONTACT_EMAIL}`}>
                    {CONTACT_EMAIL}
                  </a>
                </div>
              </div>
              <div className="detailRow">
                <div className="detailLabel">Location</div>
                <div className="detailValue">Johannesburg, South Africa</div>
              </div>
              <div className="detailRow">
                <div className="detailLabel">Response time</div>
                <div className="detailValue">Typically within 1 working day</div>
              </div>
            </div>

            <div className="divider" />

            <h3 className="h3">Before you reach out</h3>
            <ul className="list dense">
              <li className="listItem">Have 2–3 competitor links ready.</li>
              <li className="listItem">
                Know your primary CTA (call, form, checkout, subscribe).
              </li>
              <li className="listItem">
                If content is not ready, add copywriting as an add-on.
              </li>
            </ul>
          </aside>
        </div>
      </section>
    </div>
  )
}