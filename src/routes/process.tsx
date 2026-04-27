import { createFileRoute, Link } from '@tanstack/react-router'
import { SITE_NAME, buildMeta } from '../lib/seo'

export const Route = createFileRoute('/process')({
  head: () => ({
    meta: buildMeta({
      title: `Process | ${SITE_NAME}`,
      description:
        'See the project process for website design and development: discovery, design, build, QA, launch, and handover.',
    }),
  }),
  component: Process,
})

function Process() {
  return (
    <div className="page">
      <section className="container pageHeader">
        <h1 className="h1">Process</h1>
        <p className="lead">
          A structured workflow that keeps the project calm: clear scope, tight feedback loops, and
          a clean launch.
        </p>
        <div className="pageActions">
          <Link to="/contact" className="btn btnPrimary">
            Book a call
          </Link>
          <Link to="/pricing" className="btn btnGhost">
            View pricing
          </Link>
        </div>
      </section>

      <section className="container section">
        <div className="featureBand card">
          <div className="featureBandCopy">
            <p className="eyebrow">Delivery rhythm</p>
            <h2 className="h2">A visible process, not a black box.</h2>
            <p className="muted">
              Each stage has a concrete output, so the project keeps moving and review points stay
              obvious.
            </p>
          </div>
          <img
            src="/illustrations/process-scene.svg"
            alt="Illustrated four-stage website project workflow."
            className="featureBandImage"
          />
        </div>

        <div className="processGrid">
          <article className="card processCard">
            <div className="processNum">01</div>
            <h2 className="h2">Discovery</h2>
            <p className="muted">
              Goals, target audience, competitors, and the pages you actually need. We align on
              what success looks like.
            </p>
            <ul className="list dense">
              <li className="listItem">Scope and sitemap</li>
              <li className="listItem">Content checklist</li>
              <li className="listItem">Technical requirements</li>
            </ul>
          </article>

          <article className="card processCard">
            <div className="processNum">02</div>
            <h2 className="h2">Design</h2>
            <p className="muted">
              Wireframes first for structure, then a clean visual system. You review a
              click-through before build begins.
            </p>
            <ul className="list dense">
              <li className="listItem">Layout and hierarchy</li>
              <li className="listItem">Typography and colour system</li>
              <li className="listItem">Component set</li>
            </ul>
          </article>

          <article className="card processCard">
            <div className="processNum">03</div>
            <h2 className="h2">Build</h2>
            <p className="muted">
              Implementation with performance, accessibility, and SEO structure in mind. Regular
              check-ins keep surprises out.
            </p>
            <ul className="list dense">
              <li className="listItem">Responsive build</li>
              <li className="listItem">Forms and tracking</li>
              <li className="listItem">Integrations (where needed)</li>
            </ul>
          </article>

          <article className="card processCard">
            <div className="processNum">04</div>
            <h2 className="h2">QA and launch</h2>
            <p className="muted">
              Cross-device testing, content pass, and launch checklist. You get a handover that
              makes future changes painless.
            </p>
            <ul className="list dense">
              <li className="listItem">Pre-launch review</li>
              <li className="listItem">Analytics verification</li>
              <li className="listItem">Handover + care options</li>
            </ul>
          </article>
        </div>
      </section>
    </div>
  )
}
