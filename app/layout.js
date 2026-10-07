import { Bodoni_Moda, Manrope, Noto_Serif_JP } from 'next/font/google';
import './globals.css';
import AppShell from '@/components/ui/AppShell';
import { business } from '@/data/businessData';

const display = Bodoni_Moda({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  variable: '--font-display',
  display: 'swap',
});

const body = Manrope({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

// Decorative labels only (a few glyphs). Latin subset keeps the bundle small; glyphs fall back to the system CJK serif.
const jp = Noto_Serif_JP({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-jp',
  display: 'swap',
  preload: false,
});

export const metadata = {
  title: 'Café 1809 — Brunch & coffee in Glen Waverley',
  description: business.description,
  openGraph: {
    title: 'Café 1809 — Brunch & coffee in Glen Waverley',
    description: business.description,
    type: 'website',
    locale: 'en_AU',
  },
};

export const viewport = {
  themeColor: '#151827',
  width: 'device-width',
  initialScale: 1,
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CafeOrCoffeeShop',
  name: business.name,
  telephone: business.phone.intl,
  email: business.email,
  url: business.menuSourceUrl,
  address: {
    '@type': 'PostalAddress',
    streetAddress: business.address.street,
    addressLocality: business.address.suburb,
    addressRegion: business.address.state,
    postalCode: business.address.postcode,
    addressCountry: 'AU',
  },
  openingHoursSpecification: [
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '07:30', closes: '15:30' },
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Saturday', 'Sunday'], opens: '08:30', closes: '15:00' },
  ],
  sameAs: [business.social.instagram, business.social.facebook],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en-AU" className={`${display.variable} ${body.variable} ${jp.variable}`}>
      <body>
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[300] focus:rounded-full focus:bg-persimmon focus:px-5 focus:py-3 focus:font-bold focus:text-ink">
          Skip to content
        </a>
        <AppShell>{children}</AppShell>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
