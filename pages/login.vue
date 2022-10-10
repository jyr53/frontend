<template>
  <section class="section">
    <b-button icon-left="google" @click="loginWithGoogle()">
      Sign in with Google
    </b-button>
  </section>
</template>

<script>
export default {
  methods: {
    loginWithGoogle () {
      this.$auth.loginWith('google')
    }
  }
}
</script>
