import { Link } from '@tanstack/react-router'
import { Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'

function NavLink({
  to,
  label,
  onClick,
}: {
  to: string
  label: string
  onClick?: () => void
}) {
  return (
    <Link
      to={to}
      className="navLink"
      activeProps={{ className: 'navLink navLinkActive' }}
      onClick={onClick}
    >
      {label}
    </Link>
  )
}

export function SiteNav() {
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setMobileOpen(false)
    }
    if (mobileOpen) window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [mobileOpen])

  return (
    <header className="topNav">
      <div className="navPill" role="navigation" aria-label="Primary">
        <div className="navBrand">
          <Link to="/" className="navBrandLink">
            JHB Web Studio
          </Link>
        </div>

        <nav className="navLinks" aria-label="Primary links">
          <NavLink to="/" label="Home" />
          <NavLink to="/pricing" label="Pricing" />
          <NavLink to="/process" label="Process" />
          <NavLink to="/contact" label="Contact" />
        </nav>

        <button
          type="button"
          className="navMenuBtn"
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
        >
          {mobileOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {mobileOpen ? (
        <div className="navMobileLayer" role="presentation">
          <button
            type="button"
            className="navMobileBackdrop"
            aria-label="Close menu"
            onClick={() => setMobileOpen(false)}
          />
          <nav className="navMobileMenu" aria-label="Mobile menu">
            <NavLink to="/" label="Home" onClick={() => setMobileOpen(false)} />
            <NavLink to="/pricing" label="Pricing" onClick={() => setMobileOpen(false)} />
            <NavLink to="/process" label="Process" onClick={() => setMobileOpen(false)} />
            <NavLink to="/contact" label="Contact" onClick={() => setMobileOpen(false)} />
          </nav>
        </div>
      ) : null}
    </header>
  )
}
