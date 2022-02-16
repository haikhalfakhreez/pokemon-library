import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration } from 'remix'
import type { LinksFunction, MetaFunction } from 'remix'

import appStylesUrl from './styles/app.css'
import globalStylesUrl from './styles/global.css'

export const links: LinksFunction = () => {
  return [
    {
      rel: 'preconnect',
      href: 'https://fonts.googleapis.com',
    },
    {
      rel: 'preconnect',
      href: 'https://fonts.gstatic.com',
      crossOrigin: 'true',
    },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap',
    },
    {
      rel: 'stylesheet',
      href: appStylesUrl,
    },
    {
      rel: 'stylesheet',
      href: globalStylesUrl,
    },
  ]
}

export const WEBSITE_TITLE = `Pokémon Library | Haikhal Fakhreez`
export const WEBSITE_DESCRIPTION = `List of all available Pokémons`
export const WEBSITE_URL: string = `https://github.com/haikhalfakhreez/pokemon-library`
const OG_IMAGE_PATH: string = '/images/pokelib.png'

export const meta: MetaFunction = () => {
  return {
    description: WEBSITE_DESCRIPTION,
    keywords: 'Pokemon, Pokemon Library, Pokemon API, PokeAPI',
    'og:type': 'website',
    'og:url': WEBSITE_URL,
    'og:title': WEBSITE_TITLE,
    'og:description': WEBSITE_DESCRIPTION,
    'og:image': OG_IMAGE_PATH,
    'twitter:card': 'summary_large_image',
    'twitter:title': WEBSITE_TITLE,
    'twitter:description': WEBSITE_DESCRIPTION,
    'twitter:site': '@ekaliacid',
    'twitter:creator': '@ekaliacid',
    'twitter:image': OG_IMAGE_PATH,
    'twitter:alt': WEBSITE_TITLE,

    // <meta property="og:type" content="website" />
    // <meta property="og:url" content="https://www.haikhalfakhreez.com/" />
    // <meta property="og:title" content="Portfolio | Haikhal Fakhreez" />
    // <meta property="og:description" content="Haikhal Fakhreez's personal website" />
    // <meta property="og:image" content="/haikhal-portfolio.png" />
    // <meta name="twitter:card" content="summary_large_image" />
    // <meta name="twitter:title" content="Portfolio | Haikhal Fakhreez" />
    // <meta name="twitter:description" content="Haikhal Fakhreez's personal website" />
    // <meta name="twitter:site" content="@ekaliacid" />
    // <meta name="twitter:creator" content="@ekaliacid" />
    // <meta name="twitter:image" content="/haikhal-portfolio.png" />
    // <meta name="twitter:alt" content="Portfolio | Haikhal Fakhreez" />
  }
}

function Document({ children, title = WEBSITE_TITLE }: { children: React.ReactNode; title?: string }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <link rel="canonical" href={WEBSITE_URL} />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicons/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicons/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicons/favicon-16x16.png" />
        <link rel="icon" href="/favicon.ico" />
        <title>{title}</title>
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === 'development' ? <LiveReload /> : null}
      </body>
    </html>
  )
}

export default function App() {
  return (
    <Document>
      <Outlet />
    </Document>
  )
}
