// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },

  css: ['~/assets/scss/app.scss'],

  modules: ['@unocss/nuxt', 'nuxt-swiper', '@vueuse/nuxt'],

  swiper: {
    modules: ['autoplay', 'navigation', 'pagination'],
  },
});
