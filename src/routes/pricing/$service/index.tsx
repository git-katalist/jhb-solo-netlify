import { createFileRoute, Link } from '@tanstack/react-router'

import { AddOnList } from '../../../components/AddOnList'
import { ServiceTabs } from '../../../components/ServiceTabs'
import { TierCard } from '../../../components/TierCard'
import { getService, services } from '../../../content/pricing'
import { SITE_NAME, buildMeta } from '../../../lib/seo'

export const Route = createFileRoute('/pricing/$service/')({
  head: ({ params }) => {
    const service = getService(params.service)

    if (!service) {
      return {
        meta: buildMeta({
          title: `Pricing | ${SITE_NAME}`,
          description: 'Browse website pricing by service and compare available tiers.',
        }),
      }
    }

    return {
      meta: buildMeta({
        title: `${service.name} Pricing | ${SITE_NAME}`,
        description: `${service.summary} Compare Starter, Growth, and Pro pricing tiers for ${service.name.toLowerCase()}.`,
      }),
    }
  },
  component: ServicePricing,
})

function ServicePricing() {
  const { service: serviceSlug } = Route.useParams()
  const service = getService(serviceSlug)

  if (!service) {
    return (
      <div className="page">
        <section className="container pageHeader">
          <h1 className="h1">Pricing</h1>
          <p className="lead">That service was not found.</p>
          <Link to="/pricing" className="btn btnPrimary">
            Back to pricing
          </Link>
        </section>
      </div>
    )
  }

  return (
    <div className="page">
      <section className="container pageHeader">
        <h1 className="h1">{service.name}</h1>
        <p className="lead">{service.summary}</p>
        <div className="pageActions">
          <Link to="/contact" search={{ service: service.slug }} className="btn btnPrimary">
            Start a project
          </Link>
          <Link to="/pricing" className="btn btnGhost">
            See all services
          </Link>
        </div>
      </section>

      <section className="container section">
        <ServiceTabs services={services} active={service.slug} />

        <div className="selectionSummary card">
          <div>
            <div className="selectionSummaryTitle">Need a recommendation?</div>
            <p className="muted">
              If you know the service but not the tier, send the brief first and I will suggest
              the leanest option that fits your scope.
            </p>
          </div>
          <Link to="/contact" search={{ service: service.slug }} className="btn btnSecondary">
            Get a guided recommendation
          </Link>
        </div>

        <div className="tierGrid">
          {service.tiers.map((tier) => (
            <TierCard key={tier.slug} service={service} tier={tier} />
          ))}
        </div>

        <div className="compareGrid card">
          <h2 className="h2">What changes between tiers</h2>
          <div className="compareCols">
            {service.tiers.map((tier) => (
              <section key={tier.slug} className="compareCol">
                <div className="compareTitle">{tier.name}</div>
                <ul className="list dense">
                  {tier.includes.map((item) => (
                    <li key={item} className="listItem">
                      {item}
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </div>

        <div className="serviceExtras">
          <AddOnList addOns={service.addOns} />
          <div className="finePrint">
            {service.finePrint.map((line) => (
              <p key={line} className="finePrintLine">
                {line}
              </p>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
