import type { NextConfig } from 'next';

import initializeBundleAnalyzer from '@next/bundle-analyzer';

// https://www.npmjs.com/package/@next/bundle-analyzer
const withBundleAnalyzer = initializeBundleAnalyzer({
    enabled: process.env.BUNDLE_ANALYZER_ENABLED === 'true'
});

const nextConfig: NextConfig = {
    webpack(config) {
        // Grab the existing rule that handles SVG imports
        interface FileLoaderRule {
            test?: {
                test: (path: string) => boolean;
            };
            issuer?: any;
            resourceQuery?: {
                not: RegExp[];
            };
            exclude?: RegExp;
        }

        const fileLoaderRule: FileLoaderRule = config.module.rules.find((rule: FileLoaderRule) =>
            rule.test?.test?.('.svg')
        );

        config.module.rules.push(
            // Reapply the existing rule, but only for svg imports ending in ?url
            {
                ...fileLoaderRule,
                test: /\.svg$/i,
                resourceQuery: /url/ // *.svg?url
            },
            // Convert all other *.svg imports to React components
            {
                test: /\.svg$/i,
                issuer: fileLoaderRule.issuer,
                resourceQuery: { not: [...(fileLoaderRule.resourceQuery?.not || []), /url/] }, // exclude if *.svg?url
                use: ['@svgr/webpack']
            }
        );

        // Modify the file loader rule to ignore *.svg, since we have it handled now.
        fileLoaderRule.exclude = /\.svg$/i;

        return config;
    }
};

export default withBundleAnalyzer(nextConfig);
