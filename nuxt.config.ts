export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss'],
  compatibilityDate: '2025-04-02',
  ssr: false,

  app: {
    head: {
      script: [
        {
          src: "https://embed.tawk.to/67efeba42980661919b8fe4d/1io0j0vj0",
          async: true,
          crossorigin: "anonymous"
        }
      ]
    }
  }
})