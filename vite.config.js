import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_');
  const configuredOrigin = env.VITE_SITE_URL?.trim();
  let origin = '';
  if (configuredOrigin) {
    const url = new URL(configuredOrigin);
    if (!['https:', 'http:'].includes(url.protocol)) throw new Error('VITE_SITE_URL must be an HTTP(S) URL.');
    origin = url.origin;
  }
  return {
    plugins: [{
      name: 'spark-sharing-metadata',
      transformIndexHtml(html) {
        const pageUrl = origin ? `<meta property="og:url" content="${origin}/"><link rel="canonical" href="${origin}/">` : '';
        return html.replaceAll('__SOCIAL_IMAGE_URL__', `${origin}/images/social-preview.png`).replace('__CANONICAL_METADATA__', pageUrl);
      },
    }],
  };
});
