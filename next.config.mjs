/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },

  async headers() {
    return [
      {
        // Apply security headers to all routes
        source: "/(.*)",
        headers: [
          // ─── Transport Security ──────────────────────────────
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },

          // ─── Content Security Policy ─────────────────────────
          {
            key: "Content-Security-Policy",
            value: [
              // Default: block everything not explicitly allowed
              "default-src 'self'",

              // Scripts: self + Intercom widget + inline (Next.js requires it)
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://widget.intercom.io https://js.intercomcdn.com https://app.intercom.io",

              // Styles: self + inline (required for styled-jsx, Tailwind, Framer Motion)
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",

              // Images: self + data URIs + Intercom + common CDNs
              "img-src 'self' data: blob: https://*.intercomcdn.com https://*.intercom-mail.com https://static.intercomassets.com https://uploads.intercomcdn.com",

              // Fonts: self + Google Fonts + Intercom
              "font-src 'self' data: https://fonts.gstatic.com https://js.intercomcdn.com",

              // Connect: API calls to self + Intercom + status
              "connect-src 'self' https://api-iam.intercom.io https://*.intercom.io https://status.usenubis.com https://via.intercom.io wss://*.intercom.io https://api.croct.io https://*.croct.io",

              // Frames: status badge iframe + Intercom
              "frame-src 'self' https://status.usenubis.com https://intercom-sheets.com https://www.intercom-reporting.com https://www.youtube.com",

              // Media: self (for any future video/audio)
              "media-src 'self' https://js.intercomcdn.com",

              // Workers: self + blob (Intercom uses service workers)
              "worker-src 'self' blob:",

              // Child src: same as frame-src fallback
              "child-src 'self' blob:",

              // Form actions: self only
              "form-action 'self'",

              // Base URI: self only
              "base-uri 'self'",

              // Object/embed: none (blocks Flash, Java applets)
              "object-src 'none'",
            ].join("; "),
          },

          // ─── Clickjacking Protection ─────────────────────────
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },

          // ─── MIME Type Sniffing Protection ────────────────────
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },

          // ─── XSS Protection (legacy browsers) ────────────────
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },

          // ─── Referrer Policy ──────────────────────────────────
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },

          // ─── Permissions Policy ───────────────────────────────
          // Restrict access to browser APIs
          {
            key: "Permissions-Policy",
            value: [
              "camera=()",
              "microphone=()",
              "geolocation=()",
              "interest-cohort=()",
              "browsing-topics=()",
              "payment=(self)",
              "usb=()",
              "magnetometer=()",
              "gyroscope=()",
              "accelerometer=()",
            ].join(", "),
          },

          // ─── DNS Prefetch Control ─────────────────────────────
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
        ],
      },
    ]
  },
}

export default nextConfig
