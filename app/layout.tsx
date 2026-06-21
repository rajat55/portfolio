import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeInitScript } from "@/components/theme-init-script";
import { Analytics } from "@vercel/analytics/next"
import "./globals.css";

export const metadata: Metadata = {
  title: "Rajat Gupta — Software Engineer",
  description: "Software Developer specializing in Java, Spring Boot, and scalable backend systems.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Rajat Gupta",
    "url": "https://rajatrajgupta.com",
    "jobTitle": "Software Engineer",
    "worksFor": {
      "@type": "Organization",
      "name": "Newgen Software"
    },
    "sameAs": [
      "https://www.linkedin.com/in/rajat-raj-gupta-117a4b169/",
      "https://github.com/rajat55",
      "https://rajatrajgupta.com"
    ]
  };

  const title = "Rajat Gupta | Software Engineer | Spring Boot | Microservices";
  const description = "Java Backend Engineer with 3.5 years of experience in Spring Boot, Microservices, PostgreSQL, Kafka, Redis, AWS, System Design, and DSA.";

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ThemeInitScript />
        <link rel="icon" href="/favicon.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon.png" />
        <link rel="manifest" href="/site.webmanifest" />

        <link rel="canonical" href="https://rajatrajgupta.com" />
        <meta name="robots" content="index, follow" />
        <meta name="description" content={description} />
        <meta name="keywords" content="Rajat Gupta, Java Backend Engineer, Software Engineer, Spring Boot, Microservices, PostgreSQL, Kafka, Redis, AWS, System Design, DSA" />

        {/* Open Graph */}
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content="https://rajatrajgupta.com/og-image.svg" />
        <meta property="og:url" content="https://rajatrajgupta.com" />
        <meta property="og:type" content="website" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content="https://rajatrajgupta.com/og-image.svg" />

        {/* Structured data */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} />

      </head>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
