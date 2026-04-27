import { HeadContent, Outlet, createRootRoute } from "@tanstack/react-router"
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools"
import { TanStackDevtools } from "@tanstack/react-devtools"

import appCss from "../styles.css?url"
import { SiteNav } from "../components/SiteNav"
import { DEFAULT_DESCRIPTION, SITE_NAME, buildMeta } from "../lib/seo"

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "theme-color", content: "#f7f1e8" },
      ...buildMeta({
        title: `${SITE_NAME} | Web Developer & Designer in Johannesburg`,
        description: DEFAULT_DESCRIPTION,
      }),
    ],
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  component: RootComponent,
})

function RootComponent() {
  return (
    <>
      <HeadContent />
      <SiteNav />
      <main className="appMain">
        <Outlet />
      </main>
      <footer className="appFooter">
        <div className="container footerInner">
          <div className="footerLeft">
            <div className="footerBrand">JHB Web Studio</div>
            <div className="muted">Johannesburg, South Africa</div>
          </div>
          <div className="footerRight">
            <a className="footerLink" href="mailto:hello@jhbwebstudio.co.za">
              hello@jhbwebstudio.co.za
            </a>
            <span className="footerSep" aria-hidden="true">
              ·
            </span>
            <a className="footerLink" href="tel:+27700000000">
              +27 70 000 0000
            </a>
          </div>
        </div>
      </footer>
      {import.meta.env.DEV ? (
        <TanStackDevtools
          config={{
            position: "bottom-right",
          }}
          plugins={[
            {
              name: "Tanstack Router",
              render: <TanStackRouterDevtoolsPanel />,
            },
          ]}
        />
      ) : null}
    </>
  )
}