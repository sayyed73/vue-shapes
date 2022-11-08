export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  ssr: false,
  target: 'static',
  head: {
    title: 'App',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'App' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [ 
      {
        rel: 'stylesheet',
        type: "text/css",
        href: 'https://cdn.syncfusion.com/ej2/bootstrap5.css'
      },
      {
        rel: 'stylesheet',
        type: "text/css",
        href: 'https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css'
      },
      {
        rel: 'stylesheet',
        href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css',
        crossorigin: 'anonymous',
        type: "text/css"
      }
    ],
    script: [
      { src: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js' },
      { src: 'https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js' }
    ]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    '~/assets/css/site.css',
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // '@nuxt/typescript-build'
  ],
  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
  ],
  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    devtools: true,
    transpile: ["lodash-es"],

    extractCSS: true,
    babel: {
      compact: false,
    },
    extend(config, { isClient }) {
      config.resolve.alias.vue = 'vue/dist/vue.common';

      config.module.rules.push({
        test: /\.mjs$/,
        include: /node_modules/,
        type: "javascript/auto"
      });
    }
  }
}
