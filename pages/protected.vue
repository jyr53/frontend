<!-- eslint-disable vue/multiline-html-element-content-newline -->
<template>
  <section class="section">
    {{ $auth.user.email }} <br>
    {{ $auth.user .name }} <br>
    <p v-if="$auth.loggedIn==true">
      vous etes authentifier avec google
    </p>
    <p v-else>
      vous n'etes pas authentifier avec google
    </p>
  </section>
</template>

<script>
export default {
  middleware: 'auth'
}

</script>
