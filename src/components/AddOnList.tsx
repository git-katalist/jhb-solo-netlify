import type { AddOn } from '../content/pricing'
import { formatZar } from '../lib/money'

export function AddOnList({ addOns }: { addOns: AddOn[] }) {
  return (
    <section className="card">
      <h3 className="h3">Popular add-ons</h3>
      <div className="addonGrid">
        {addOns.map((addon) => (
          <div key={addon.name} className="addonItem">
            <div className="addonHeader">
              <div className="addonName">{addon.name}</div>
              <div className="addonPrice">from {formatZar(addon.fromZar)}</div>
            </div>
            <p className="muted">{addon.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

