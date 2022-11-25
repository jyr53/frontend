<template>
  <v-app>
    <!-- <keep-alive> -->
    <component :is="getThemeMode.layout" />
    <!-- </keep-alive> -->
  </v-app>
</template>

<script>
import { mapGetters, mapActions, mapState } from "vuex";

export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters("themeConfig", [
      "getThemeMode",
      // Here you can import other getters from the products.js
    ]),
    getThemeLayout() {
      return this.$store.state.themeConfig.themeMode;
    },
  },
  created() {},
  // mounted() {
  //   if (this.$route.params.layout) {
  //     this.changeThemeLayout(this.$route.params.layout);
  //   }
  // },
  methods: {
    ...mapActions({
      changeThemeLayout: "themeConfig/changeThemeLayout",
    }),

    ...mapState({
      islogged: state => state.auth.islogged,
      token: state => state.auth.token,
    }),
  },
};
</script>
  