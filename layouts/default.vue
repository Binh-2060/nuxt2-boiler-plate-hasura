<template>
  <v-app :dark="true">
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <template v-slot:append>
        <div class="pa-2">
          <v-btn block @click.stop="signOut()"> Logout </v-btn>
        </div>
      </template>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>
      <v-btn icon @click.stop="clipped = !clipped">
        <v-icon>mdi-application</v-icon>
      </v-btn>
      <v-btn icon @click.stop="fixed = !fixed">
        <v-icon>mdi-minus</v-icon>
      </v-btn>
      <v-toolbar-title>{{ title }}</v-toolbar-title>
      <!-- <v-switch
        v-model="$vuetify.theme.dark"
        hint="This toggles the global state of the Vuetify theme"
        inset
        label="Vuetify Theme Dark"
        persistent-hint
      ></v-switch> -->
      <v-spacer />

      <v-menu rounded="rounded" offset-y class="">
        <template v-slot:activator="{ attrs, on }">
          <v-btn
            class="black--text font-weight-black mr-3"
            v-bind="attrs"
            v-on="on"
            fab
            icon
          >
            <v-icon dark>mdi-google-translate</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item
            v-for="(locale, index) in availableLocales"
            :key="`locale-${index}`"
            link
            @click.prevent.stop="$i18n.setLocale(locale.code)"
          >
            <v-list-item-title v-text="locale.name"></v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

      <v-btn
        class="black--text font-weight-black"
        fab
        icon
        @click="toggleTheme()"
      >
        <v-icon dark>mdi-white-balance-sunny</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>

    <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import Cookies from 'js-cookie'
export default {
  name: 'DefaultLayout',
  created() {
    // if (process.client) {
    const dark = process.client ? localStorage.getItem('dark') : false
    if (dark === 'true') {
      this.$vuetify.theme.dark = true
    } else {
      this.$vuetify.theme.dark = false
    }
    // }
  },

  computed: {
    availableLocales() {
      return this.$i18n.locales.filter((i) => i.code)
    },
  },
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      theme: false,
      btns: [
        ['Removed', '0'],
        ['Large', 'lg'],
        ['Custom', 'b-xl'],
      ],
      colors: ['deep-purple accent-4', 'error', 'teal darken-1'],
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/',
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire',
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js',
    }
  },

  methods: {
    async signOut() {
      await this.$fire.auth
        .signOut()
        .then((res) => {
          Cookies.remove('access_token')
          this.$router.push({
            path: '/login',
          })
        })
        .catch((e) => {
          console.error(e)
        })
    },

    toggleTheme() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark
      console.log(this.$vuetify.theme.dark)
      localStorage.setItem('dark', this.$vuetify.theme.dark)
    },
  },
}
</script>
