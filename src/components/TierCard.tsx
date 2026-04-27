import { Link } from '@tanstack/react-router'

import type { Service, Tier } from '../content/pricing'
import { formatZar } from '../lib/money'

export function TierCard({
  service,
  tier,
}: {
  service: Service
  tier: Tier
}) {
  return (
    <article className="card tierCard">
      <header className="tierCardHeader">
        <div className="tierCardTitle">
          <h3 className="h3">{tier.name}</h3>
          <p className="muted">{tier.bestFor}</p>
        </div>
        <div className="tierPrice">
          <div className="tierPriceValue">{formatZar(tier.price.onceOffZar)}</div>
          <div className="tierPriceNote">{tier.price.note}</div>
        </div>
      </header>

      <ul className="list">
        {tier.highlights.map((item) => (
          <li key={item} className="listItem">
            {item}
          </li>
        ))}
      </ul>

      <div className="tierCardFooter">
        <div className="metaLine">
          <span className="metaLabel">Timeline</span>
          <span className="metaValue">{tier.timeline}</span>
        </div>
        <div className="tierCardActions">
          <Link
            to="/pricing/$service/$tier"
            params={{ service: service.slug, tier: tier.slug }}
            className="btn btnPrimary"
          >
            View details
          </Link>
          <Link
            to="/contact"
            search={{ service: service.slug, tier: tier.slug }}
            className="btn btnSecondary"
          >
            Start with this tier
          </Link>
        </div>
      </div>
    </article>
  )
}
