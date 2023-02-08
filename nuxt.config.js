import colors from 'vuetify/es5/util/colors'

export default {
  head: {
    titleTemplate: '%s',
    title: 'nuxt2-boiler-hasura',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  css: [],

  plugins: [
    { src: '@/plugins/set_token.js', mode: 'client' },
    {
      src: '@/plugins/intitial_app.js',
      mode: 'client',
    },
  ],

  components: true,

  buildModules: ['@nuxtjs/vuetify', '@nuxtjs/pwa'],

  modules: ['@nuxtjs/firebase', '@nuxtjs/apollo', '@nuxtjs/i18n'],

  i18n: {
    // fallbackLocale: 'en',
    locales: [
      {
        code: 'en',
        file: 'en.json',
        name: 'English',
      },
      {
        code: 'lo',
        file: 'lo.json',
        name: 'ພາສາລາວ',
      },
    ],
    strategy: 'no_prefix',
    langDir: 'locales/',
    lazy: false,
    defaultLocale: 'en',
  },

  apollo: {
    cookieAttributes: {
      expires: 7,
    },

    defaultOptions: {
      $query: {
        loadingKey: 'loading',
        fetchPolicy: 'no-cache',
        errorPolicy: 'all',
      },
    },
    clientConfigs: {
      default: {
        // YOUR ENDPOINT OF YOUR APOLLO CLIENT OR HASURA ENDPOINT
        httpEndpoint: 'https://big-baboon-88.hasura.app/v1/graphql',
        wsEndpoint: 'wss://big-baboon-88.hasura.app/v1/graphql',
        tokenName: 'access_token',
        includeNodeModules: true,
        authenticationType: 'Bearer',
        httpLinkOptions: {
          headers: {
            'content-type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,PUT,PATCH,OPTIONS,DELETE,POST',
          },
        },
      },
    },
  },

  //FIREBASE INNITAL APP
  firebase: {
    // YOUR FIREBASE CONFIG
    lazy: false,
    config: {
      apiKey: 'AIzaSyAt5qx2oIZtXGsmcT-NxsXnxJu1aHf-e-U',
      authDomain: 'blacklist-242fb.firebaseapp.com',
      projectId: 'blacklist-242fb',
      storageBucket: 'blacklist-242fb.appspot.com',
      messagingSenderId: '1004308029758',
      appId: '1:1004308029758:web:2ae37a779bc8af6fc90c6f',
    },
    services: {
      auth: {
        // persistence: 'local',
        initialize: {
          onAuthStateChangedAction: 'onAuthStateChanged',
        },
        ssr: true,
      },
    },
  },

  pwa: {
    workbox: {
      importScripts: ['/firebase-auth-sw.js'],
      dev: process.env.NODE_ENV === 'development',
    },
  },

  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      // dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
        light: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      },
    },
  },

  build: {},
}
