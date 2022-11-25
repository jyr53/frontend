import colors from 'vuetify/es5/util/colors'

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'TCIA',
    htmlAttrs: {
      lang: 'fr'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Archivo:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap',
      },
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['@/assets/scss/octavia-design-system/octavia-design-system.scss'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/octavia.kit',
    '~/plugins/v-perfect-scrollbar.client.js',
    '~/plugins/vue-navigation-bar.client.js'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    '@nuxtjs/vuetify'
  ],
  router: {
    middleware: [
      'gestion',
      'auth'
    ],
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: '/'
  },
  auth: {
    strategies: {
      google: {
        clientId: "301673015379-s3mf2m909ehc8qsjiqtt2omaj36hnsd3.apps.googleusercontent.com",
        //  clientId: process.env.CLIENT_ID_GOOGLE,
        codeChallengeMethod: '',
        responseType: 'code',
        scope: ['https://mail.google.com/'],
        endpoints: {
          token: 'http://localhost:8765/api/tcia/users/verifgoogle/',
          userInfo: 'https://www.googleapis.com/oauth2/v3/userinfo'
        }
      },

    },


    cookie: {
      options: {
        secure: process.env.NODE_ENV === 'production', // Enable in Prod only!
        sameSite: 'lax'
      }
    },
    localStorage: true,
    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {
    },
    redirect: {
      logout: "/login"
    }
  },
  publicRuntimeConfig: {
    baseURLOSII: process.env.DOMAIN_OSII_API,
    baseURLAPI: process.env.DOMAIN_LOGICIA_API

  },
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    treeShake: true,
    theme: {
      dark: false,
      themes: {
        light: {
          primary: '#00416D',
          secondary: '#6AA5CB',
          success: '#A0D5F8',
          danger: '#A71E26',
          warning: '#E6A520',
          info: '#00416D',
          gris: '#575756',
          background: '#e0e0e0',
          text: '#7a7a7a',
          jaune: '#E6A520',
          rouge: '#A71E26',
        },
        dark: {
          primary: colors.blue,
          secondary: '#304156',
          success: colors.green,
          danger: colors.red,
          warning: colors.deepOrange,
          info: colors.indigo,
        },
      },
    },
  },



}
