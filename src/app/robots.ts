import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/private/'],
        },
        sitemap: 'https://erayaexperience.com/sitemap.xml',
        host: 'https://erayaexperience.com',
    };
}
