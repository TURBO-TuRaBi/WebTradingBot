export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss'],
  compatibilityDate: '2025-04-02',
  ssr: false,
  app: {
    head: {
      script: [
        {
          src: 'https://cdn.pulse.is/livechat/loader.js',
          'data-live-chat-id': '67efd120a3b3b16ebf0110d0',
          async: true
        }
      ]
    }
  }
});