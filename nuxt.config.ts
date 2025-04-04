export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss'],
  compatibilityDate: '2025-04-02',
  ssr: false,
  // اضافه کردن اسکریپت چت زنده
  app: {
    head: {
      script: [
        {
          src: 'https://app.gapify.ai/packs/js/sdk.js',
          defer: true,
          async: true,
          },
          {
            innerHTML: `
              document.addEventListener('DOMContentLoaded', function () {
                window.gapifySDK.run({
                  websiteToken: 'UuSerRZnFX8dDNLDo3VXCXJG',
                  baseUrl: 'https://app.gapify.ai'
                });
              });
            `,
            type: 'text/javascript'
        }
      ]
    }
  }
});