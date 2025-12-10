import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import { imagetools } from 'vite-imagetools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    imagetools({
      // Auto-optimize images
      defaultDirectives: (url) => {
        if (url.searchParams.has('skipCompression')) {
          return new URLSearchParams()
        }
        return new URLSearchParams({
          format: 'webp',
          quality: '80',
        })
      }
    }),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['**/*.{png,jpg,jpeg,svg,ico,mp3,webp}'],
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,jpg,jpeg,svg,mp3,webp}'],
        maximumFileSizeToCacheInBytes: 5 * 1024 * 1024, // 5MB max per file
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          }
        ]
      },
      manifest: {
        name: 'Le Avventure di Rocco e Zara',
        short_name: 'Dream Adventure',
        description: 'Un\'avventura interattiva nel Regno dei Sogni',
        theme_color: '#667eea',
        background_color: '#faf5ff',
        display: 'standalone',
        orientation: 'portrait',
        scope: '/',
        start_url: '/',
        icons: [
          {
            src: '/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any maskable'
          },
          {
            src: '/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      },
      devOptions: {
        enabled: true, // Enable in dev for testing
        type: 'module'
      }
    })
  ],
})
