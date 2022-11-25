<template>
  <div class="overflow-hidden">
    <v-app-bar :color="$vuetify.theme.dark ? 'dark' : 'primary'" :dark="$vuetify.theme.dark"
      class="px-sm text-left shadow-sm" flat height="200" absolute prominent>
      <v-container class="d-flex align-center mt-6">
        <v-progress-linear :active="getThemeMode.isLoading" :indeterminate="getThemeMode.isLoading" absolute bottom
          color="primary" />

        <v-toolbar-title class="white--text">
          <v-avatar>
            <img src="~/assets/images/logo_tcia.png" alt />
          </v-avatar>
          Transport de Colis Inter-Agences
        </v-toolbar-title>

        <v-spacer />
        <div class="white--text" v-if="$auth.loggedIn">
          {{ this.$auth.user.name }}
        </div>
        <v-menu offset-y min-width="150">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color dark v-bind="attrs" v-on="on" icon>
              <v-icon large color="darken-2"> mdi-account </v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item>
              <v-list-item-title>
                <v-btn @click="logout">
                  <v-icon class="mr-1">mdi-logout</v-icon>
                  Déconnexion
                </v-btn>
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-container>
    </v-app-bar>
    <!-- userDrawer -->
    <!-- <v-navigation-drawer
      v-model="userDrawer"
      fixed
      right
      height="100%"
      temporary
      floating
      width="350"
    >
      <template v-slot:append>
        <div class="my-4 mx-4">
          <base-hover-button
            text="Logout"
            block
            bg-color="bg-blue-200"
            icon-name="mdi-logout"
          />
        </div>
      </template>
    </v-navigation-drawer> -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'VerticallAppBar',

  computed: {
    ...mapGetters('themeConfig', ['getThemeMode']),

  },
  methods: {
    logout() {
      let token = this.$auth.$storage.getState("api_token");
      if (token) {
        fetch(`http://localhost:8765/api/tcia/users/logout?token=${token}`, {
          method: "POST",
          headers:
          {
            "Content-Type": "application/x-www-form-urlencoded",
            Accept: 'application/json',
            Authorization: token,
          },
          responseType: 'json',
        }
        )
          .then(this.$auth.$storage.removeState("api_token"))
          .then(this.$auth.$storage.removeUniversal("code"))
          .then(this.$auth.logout(/* .... */));
      }

      else {
        this.$auth.logout(/* .... */)
      }
      //this.$store.dispatch('auth/logout').then(() => this.$router.push({ name: '/login', params: {} })) 
    },
  },
}
</script>
