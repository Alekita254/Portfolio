import React from 'react'
import Head from 'next/head';
import identity from '../../config/identity';

export default function Meta() {
    const hasDomain = identity.portfolioDomain && !identity.portfolioDomain.startsWith('YOUR_');
    const canonicalUrl = hasDomain ? `https://${identity.portfolioDomain}` : '';
    const pageTitle = identity.seo.siteTitle;
    const pageDescription = identity.seo.siteDescription;

    return (
        <Head>
            <title>{pageTitle}</title>
            <meta charSet="utf-8" />
            <meta name="title" content={pageTitle} />
            <meta name="description" content={pageDescription} />
            <meta name="author" content={identity.name} />
            <meta name="robots" content="index, follow" />
            <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
            <meta name="language" content="English" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta name="theme-color" content="#E95420" />
            {canonicalUrl ? <link rel="canonical" href={canonicalUrl} /> : null}

            <meta itemProp="name" content={pageTitle} />
            <meta itemProp="description" content={pageDescription} />
            <meta name="twitter:card" content="summary" />
            <meta name="twitter:title" content={pageTitle} />
            <meta name="twitter:description" content={pageDescription} />
            <meta name="twitter:site" content={identity.name} />
            <meta name="twitter:creator" content={identity.name} />

            <meta property="og:title" content={pageTitle} />
            <meta property="og:description" content={pageDescription} />
            <meta property="og:type" content="website" />
            {canonicalUrl ? <meta property="og:url" content={canonicalUrl} /> : null}

            <link rel="icon" href="images/logos/fevicon.svg" />
            <link rel="apple-touch-icon" href="images/logos/fevicon.png" />
            <link rel="preload" href="https://fonts.googleapis.com/css2?family=Ubuntu:wght@300;400;500;700&display=swap" as="style" />
            <link href="https://fonts.googleapis.com/css2?family=Ubuntu:wght@300;400;500;700&display=swap" rel="stylesheet"></link>
        </Head>
    )
}
