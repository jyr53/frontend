<template>
  <section class="section">
    <div class="connection">
      <p>connexion avec google</p>
      <b-button class="centreTitre" icon-left="google" @click="googlelogin()">
        connexion
      </b-button>
    </div>
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
  padding: 10px ;
  border-radius: 10px;
  background-color: rgb(67, 72, 146);
  color: white;
  font-size: 1.5rem;
  text-transform: uppercase;
}
.connection{
  display: flex;
  flex-direction: column;
  align-items: center;
width: 30wh;
}
.connection p{
  font-size: 1.5rem;
  text-transform: uppercase;
}
.section{
  width: 30wh;
  align-items: center;
 
  margin: 80px 0px 80px 0px;
}

</style>