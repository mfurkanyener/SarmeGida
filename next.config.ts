// next.config.ts
import createNextIntlPlugin from 'next-intl/plugin';
import type {NextConfig} from 'next';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts'); // ✅ önemli

const nextConfig: NextConfig = {reactStrictMode: true};
export default withNextIntl(nextConfig);