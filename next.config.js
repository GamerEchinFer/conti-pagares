const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  staticPageGenerationTimeout: 2000,
}

module.exports = nextConfig

module.exports = {
  env: { 
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
    NEXT_PUBLIC_API_TIME_OUT: process.env.NEXT_PUBLIC_API_TIME_OUT,
    NEXT_PUBLIC_SUSCRIPTION_KEY: process.env.NEXT_PUBLIC_SUSCRIPTION_KEY,
    NEXT_PUBLIC_CLIENT_SECRET: process.env.NEXT_PUBLIC_CLIENT_SECRET,
    NEXT_PUBLIC_CLIENTE_ID: process.env.NEXT_PUBLIC_CLIENTE_ID,    
    NEXT_PUBLIC_HOST_VALIDO: process.env.NEXT_PUBLIC_HOST_VALIDO,    
    NEXT_PUBLIC_URL_REDIRECT: process.env.NEXT_PUBLIC_URL_REDIRECT, 
    NEXT_PUBLIC_CLIENTE_ID_KEYCLOAK: process.env.NEXT_PUBLIC_CLIENTE_ID_KEYCLOAK,
    NEXT_PUBLIC_URL_KEYCLOAK: process.env.NEXT_PUBLIC_URL_KEYCLOAK,
    NEXT_PUBLIC_KEY_AES: process.env.NEXT_PUBLIC_KEY_AES,
  },
  async headers() {
    return [      
      {
        source: '/api/datos/token',
        headers: [
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          },
          {
            key: 'Access-Control-Allow-Origin',
            value: '*'
          },
          {
            key: 'Access-Control-Expose-Headers',
            value: '*'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-XSS-Protection',
            value: '1'
          },
          {
            key: 'mode',
            value: 'block'
          },
        ]
      },
    ]
  },
};
