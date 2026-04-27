import { Link, createFileRoute } from '@tanstack/react-router'

import { services } from '../content/pricing'
import { SITE_NAME, buildMeta } from '../lib/seo'

export const Route = createFileRoute('/')({
  head: () => ({
    meta: buildMeta({
      title: `${SITE_NAME} | Web Developer & Designer in Johannesburg`,
      description:
        'Custom marketing websites, e-commerce stores, and content platforms for Johannesburg businesses that need fast, clear, conversion-focused web design and development.',
    }),
  }),
  component: Home,
})

function Home() {
  return (
    <div className="page">
      <section className="container hero">
        <div className="heroCopy">
          <p className="eyebrow">Solo web developer and designer</p>
          <h1 className="h1">
            Websites built for real businesses in Johannesburg.
          </h1>
          <p className="lead">
            I design and build marketing sites, e-commerce stores, and blogging platforms that
            load fast, look sharp, and convert.
          </p>
          <div className="heroActions">
            <Link to="/pricing" className="btn btnPrimary">
              View pricing
            </Link>
            <Link to="/contact" className="btn btnGhost">
              Book a call
            </Link>
          </div>
          <div className="heroMeta">
            <div className="metaPill">Johannesburg</div>
            <div className="metaPill">South Africa</div>
            <div className="metaPill">ZAR pricing</div>
          </div>
          <div className="heroPathGrid" aria-label="Choose a project path">
            <Link to="/pricing/$service" params={{ service: "marketing" }} className="heroPathCard">
              <span className="heroPathLabel">Need leads</span>
              <span className="heroPathTitle">Marketing site</span>
            </Link>
            <Link
              to="/pricing/$service"
              params={{ service: "ecommerce" }}
              className="heroPathCard"
            >
              <span className="heroPathLabel">Need checkout</span>
              <span className="heroPathTitle">E-commerce store</span>
            </Link>
            <Link to="/pricing/$service" params={{ service: "blogging" }} className="heroPathCard">
              <span className="heroPathLabel">Need publishing</span>
              <span className="heroPathTitle">Content platform</span>
            </Link>
          </div>
        </div>
        <div className="heroVisual">
          <div className="heroArtwork card">
            <img
              src="/illustrations/hero-studio.svg"
              alt="Illustrated website studio dashboard with warm earthy tones."
              className="illustrationImage"
            />
          </div>
          <div className="heroPanel card">
            <div className="heroPanelTitle">What you get</div>
            <ul className="list">
              <li className="listItem">Clear scope and timelines</li>
              <li className="listItem">Mobile-first, accessible design</li>
              <li className="listItem">SEO-ready structure</li>
              <li className="listItem">Clean handover and support options</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="container section">
        <div className="sectionHeader">
          <h2 className="h2">Services</h2>
          <p className="muted">
            Three focused website solutions with tiered options to match your stage.
          </p>
        </div>
        <div className="serviceGrid">
          {services.map((service) => (
            <article key={service.slug} className="card serviceCard">
              <h3 className="h3">{service.name}</h3>
              <p className="muted">{service.summary}</p>
              <div className="serviceCardFooter">
                <Link
                  to="/pricing/$service"
                  params={{ service: service.slug }}
                  className="btn btnSecondary"
                >
                  See tiers
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="container section">
        <div className="aboutBand">
          <div className="aboutBandCopy">
            <p className="eyebrow">About the studio</p>
            <h2 className="h2">A solo studio built for businesses that want clarity, not agency fog.</h2>
            <p className="lead">
              JHB Web Studio is a one-person practice focused on practical websites that look
              sharp, load fast, and support a real commercial goal. That usually means more direct
              communication, fewer handoffs, and decisions made with the build in mind from day one.
            </p>
            <p className="muted">
              The sweet spot is working with service businesses, independent brands, and growing
              teams that need a site to explain the offer clearly and move someone toward action.
            </p>
            <div className="aboutBandActions">
              <Link to="/contact" className="btn btnPrimary">
                Start a conversation
              </Link>
              <Link to="/process" className="btn btnGhost">
                See the process
              </Link>
            </div>
          </div>
          <div className="aboutBandPanel card">
            <div className="aboutBandGrid">
              <div className="aboutFact">
                <div className="aboutFactValue">1</div>
                <div className="aboutFactLabel">point of contact from scope to launch</div>
              </div>
              <div className="aboutFact">
                <div className="aboutFactValue">Fast</div>
                <div className="aboutFactLabel">feedback loops and lean decision-making</div>
              </div>
              <div className="aboutFact">
                <div className="aboutFactValue">Local</div>
                <div className="aboutFactLabel">Johannesburg context, pricing, and timelines</div>
              </div>
            </div>
            <div className="divider" />
            <ul className="list">
              <li className="listItem">Strategy, content structure, and implementation stay connected.</li>
              <li className="listItem">Each project is scoped around the business model, not a template package.</li>
              <li className="listItem">The handover is clean enough that you are not trapped after launch.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="container section">
        <div className="sectionHeader">
          <h2 className="h2">How I work</h2>
          <p className="muted">
            A lightweight process that keeps feedback tight and delivery predictable.
          </p>
        </div>
        <div className="steps">
          <div className="step card">
            <div className="stepNum">01</div>
            <div className="stepBody">
              <div className="stepTitle">Scope and plan</div>
              <div className="muted">We confirm goals, pages, content, and integrations.</div>
            </div>
          </div>
          <div className="step card">
            <div className="stepNum">02</div>
            <div className="stepBody">
              <div className="stepTitle">Design</div>
              <div className="muted">Wireframe to visual design, then a click-through review.</div>
            </div>
          </div>
          <div className="step card">
            <div className="stepNum">03</div>
            <div className="stepBody">
              <div className="stepTitle">Build and launch</div>
              <div className="muted">Implementation, QA, and a clean handover.</div>
            </div>
          </div>
        </div>
        <div className="sectionCta">
          <Link to="/process" className="btn btnGhost">
            Full process
          </Link>
        </div>
      </section>
    </div>
  )
}
