<template>
    <v-container class="ma-0 pa-0 all-container">
        <v-container class="header-container pa-0">
            <header class="header">
                <HeaderCharacters/>
            </header>
        </v-container>
       <body>
            <BodyCharacters/>
       </body>
       <footer>
       </footer>
    </v-container>
</template>

<script>

export default {
  name: 'Characters',
  components: {
    HeaderCharacters: () => import('@/components/HeaderCharacters.vue'),
    BodyCharacters: () => import('@/components/BodyCharacters.vue')
  }
}
</script>
<style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Montserrat&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Lato:wght@700&family=Montserrat&display=swap');
  .header{
      width: 94%;
      height: 455px;
      margin: 0 auto;
  }
  .all-container{
      max-width: 100%;
  }
  .header-container{
       max-width: 100%;
      background-color: #000;
  }
</style>
