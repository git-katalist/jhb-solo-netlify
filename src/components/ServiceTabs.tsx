import { Link } from '@tanstack/react-router'

import type { Service } from '../content/pricing'

export function ServiceTabs({
  services,
  active,
}: {
  services: Service[]
  active: Service['slug']
}) {
  return (
    <div className="segmented" role="tablist" aria-label="Service">
      {services.map((service) => (
        <Link
          key={service.slug}
          to="/pricing/$service"
          params={{ service: service.slug }}
          role="tab"
          aria-selected={active === service.slug}
          className={active === service.slug ? 'segmentedItem active' : 'segmentedItem'}
        >
          {service.name}
        </Link>
      ))}
    </div>
  )
}

