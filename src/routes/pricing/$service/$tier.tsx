import { createFileRoute, Link } from '@tanstack/react-router'

import { AddOnList } from '../../../components/AddOnList'
import { getService, getTier } from '../../../content/pricing'
import { formatZar } from '../../../lib/money'
import { SITE_NAME, buildMeta } from '../../../lib/seo'

export const Route = createFileRoute('/pricing/$service/$tier')({
  head: ({ params }) => {
    const service = getService(params.service)
    const tier = service ? getTier(service, params.tier) : undefined

    if (!service || !tier) {
      return {
        meta: buildMeta({
          title: `Tier Details | ${SITE_NAME}`,
          description: 'Review service tier details, inclusions, exclusions, pricing, and timeline.',
        }),
      }
    }

    return {
      meta: buildMeta({
        title: `${tier.name} ${service.name} Tier | ${SITE_NAME}`,
        description: `${tier.bestFor} Review pricing, timeline, highlights, inclusions, and add-ons for the ${tier.name} tier of ${service.name}.`,
      }),
    }
  },
  component: TierDetail,
})

function TierDetail() {
  const { service: serviceSlug, tier: tierSlug } = Route.useParams()
  const service = getService(serviceSlug)

  if (!service) {
    return (
      <div className="page">
        <section className="container pageHeader">
          <h1 className="h1">Tier details</h1>
          <p className="lead">That service was not found.</p>
          <Link to="/pricing" className="btn btnPrimary">
            Back to pricing
          </Link>
        </section>
      </div>
    )
  }

  const tier = getTier(service, tierSlug)
  if (!tier) {
    return (
      <div className="page">
        <section className="container pageHeader">
          <h1 className="h1">{service.name}</h1>
          <p className="lead">That tier was not found.</p>
          <Link
            to="/pricing/$service"
            params={{ service: service.slug }}
            className="btn btnPrimary"
          >
            Back to tiers
          </Link>
        </section>
      </div>
    )
  }

  return (
    <div className="page">
      <section className="container pageHeader">
        <div className="breadcrumbs">
          <Link to="/pricing" className="crumb">
            Pricing
          </Link>
          <span className="crumbSep" aria-hidden="true">
            /
          </span>
          <Link to="/pricing/$service" params={{ service: service.slug }} className="crumb">
            {service.name}
          </Link>
        </div>
        <h1 className="h1">
          {tier.name} tier
          <span className="h1Sub"> for {service.name}</span>
        </h1>
        <p className="lead">{tier.bestFor}</p>
        <div className="tierHeroMeta">
          <div className="tierHeroPrice">
            <div className="tierHeroValue">{formatZar(tier.price.onceOffZar)}</div>
            <div className="tierHeroNote">{tier.price.note}</div>
          </div>
          <div className="tierHeroTimeline">
            <div className="metaLabel">Typical timeline</div>
            <div className="metaValue">{tier.timeline}</div>
          </div>
        </div>
        <div className="pageActions">
          <Link
            to="/contact"
            search={{ service: service.slug, tier: tier.slug }}
            className="btn btnPrimary"
          >
            Start this tier
          </Link>
          <Link to="/pricing/$service" params={{ service: service.slug }} className="btn btnGhost">
            Compare tiers
          </Link>
        </div>
      </section>

      <section className="container section">
        <div className="detailGrid">
          <article className="card">
            <h2 className="h2">Highlights</h2>
            <ul className="list">
              {tier.highlights.map((item) => (
                <li key={item} className="listItem">
                  {item}
                </li>
              ))}
            </ul>
          </article>

          <article className="card">
            <h2 className="h2">Included</h2>
            <ul className="list">
              {tier.includes.map((item) => (
                <li key={item} className="listItem">
                  {item}
                </li>
              ))}
            </ul>
          </article>

          <article className="card">
            <h2 className="h2">Not included</h2>
            <p className="muted">
              To keep pricing predictable, some items are optional add-ons.
            </p>
            <ul className="list">
              {tier.excludes.map((item) => (
                <li key={item} className="listItem">
                  {item}
                </li>
              ))}
            </ul>
          </article>
        </div>

        <div className="serviceExtras">
          <AddOnList addOns={service.addOns} />
          <div className="card">
            <h3 className="h3">How add-ons work</h3>
            <p className="muted">
              Add-ons are scoped as small, fixed deliverables. You can choose them upfront or add
              them after launch without rebuilding the whole site.
            </p>
            <div className="addonNotes">
              <div className="addonNote">
                <div className="addonNoteTitle">Content readiness</div>
                <p className="muted">
                  If you already have final copy and images, delivery is faster and your build cost
                  stays closer to the listed price.
                </p>
              </div>
              <div className="addonNote">
                <div className="addonNoteTitle">Care plans</div>
                <p className="muted">
                  Monthly care is optional but recommended for security updates, small changes, and
                  performance monitoring.
                </p>
              </div>
              <div className="addonNote">
                <div className="addonNoteTitle">Complex integrations</div>
                <p className="muted">
                  If you need CRMs, ERP/POS, bookings, or custom logic, I scope that separately so
                  it is not hidden inside a tier.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
