import { createFileRoute, Link } from '@tanstack/react-router'

import { AddOnList } from '../../components/AddOnList'
import { TierCard } from '../../components/TierCard'
import { services } from '../../content/pricing'
import { SITE_NAME, buildMeta } from '../../lib/seo'

export const Route = createFileRoute('/pricing/')({
  head: () => ({
    meta: buildMeta({
      title: `Pricing | ${SITE_NAME}`,
      description:
        'Transparent Johannesburg web design and development pricing for marketing websites, e-commerce stores, and blogging or content platforms.',
    }),
  }),
  component: PricingIndex,
})

function PricingIndex() {
  return (
    <div className="page">
      <section className="container pageHeader">
        <h1 className="h1">Pricing</h1>
        <p className="lead">
          Transparent tiers for marketing sites, e-commerce stores, and blogging platforms. All
          pricing is in ZAR and quoted per scope.
        </p>
        <div className="pageActions">
          <Link to="/contact" className="btn btnPrimary">
            Get a quote
          </Link>
          <a className="btn btnGhost" href="mailto:hello@jhbwebstudio.co.za">
            Email
          </a>
        </div>
      </section>

      <section className="container section">
        {services.map((service) => (
          <div key={service.slug} className="servicePricingBlock" id={service.slug}>
            <div className="servicePricingHeader">
              <div>
                <h2 className="h2">{service.name}</h2>
                <p className="muted">{service.summary}</p>
              </div>
              <Link
                to="/pricing/$service"
                params={{ service: service.slug }}
                className="btn btnSecondary"
              >
                Compare tiers
              </Link>
            </div>

            <div className="tierGrid">
              {service.tiers.map((tier) => (
                <TierCard key={tier.slug} service={service} tier={tier} />
              ))}
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
          </div>
        ))}
      </section>
    </div>
  )
}
