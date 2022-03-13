<template>
  <div class="home">
    <v-container class="text-center mt-8">
      <v-img src="@/assets/img/suazo.png" width="135" class="logo-img"></v-img>
      <v-img src="@/assets/img/rickyAndMortyLogo.png" width="664" class="logo-img"></v-img>
      <h2 class="generic title-home">Bienvenido a Ricky and Morty</h2>
      <h3 class="generic text-home">En esta prueba, evaluaremos su capacidad para construir la aplicación mediante el análisis de código y la reproducción
        del siguiente diseño</h3>
      <v-btn @click="$router.push('Characters') " rounded class="pa-6 btn-continue text-capitalize mt-11" color="#11555F" dark>Continuar</v-btn>
    </v-container>
  </div>
</template>

<script>

export default {
  name: 'Home',
  components: {
  }
}
</script>
<style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Montserrat&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Lato:wght@700&family=Montserrat&display=swap');
  .generic{
    font-family: "Montserrat" , sans-serif;
    color: #fff;
    font-weight: 400;
    font-style: normal;
    text-align: center;
  }
  .logo-img{
    margin: 0 auto;
  }
  .title-home{
    font-size: 36px;
    line-height: 44px;
  }
  .text-home{
    font-size: 18px;
    line-height: 30px;
    width: 872px;
    margin: 0 auto;
    padding-top: 20px;
  }
  .btn-continue{
    font-family: "Lato";
    font-style: normal;
    font-weight: 700;
    line-height: 22px;
  }
  .v-btn.v-size--default{
    font-size: 18px!important;
  }
  .home{
    background-image: url("../assets/img/background.png");
    background-size: 100%;
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }
</style>
