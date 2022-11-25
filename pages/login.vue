<template>
  <section class="section">
    <b-button icon-left="google" @click="loginWithGoogle()">
      Sign in with Google
    </b-button>
  </section>
</template>

<script>

export default {
  name: 'login',


  methods: {
    googlelogin() {
      this.$auth.loginWith('google')
    },
  },
}
</script>
<style>
.centreTitre {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 20px;
  border-radius: 20px;
}
</style>