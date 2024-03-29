// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },

  css: ['~/assets/scss/app.scss'],

  modules: [
    '@nuxtjs/tailwindcss',
    'nuxt-swiper',
    '@vueuse/nuxt',
    'nuxt-tiptap-editor',
  ],

  swiper: {
    modules: ['autoplay', 'navigation', 'pagination'],
  },
});
