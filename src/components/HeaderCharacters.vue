/* eslint-disable keyword-spacing */
<template>
  <v-container class="header-background">
        <v-img src="@/assets/img/rickyAndMortyLogo.png" width="347" class="logo-img"></v-img>
        <v-combobox
        filled
        background-color="#081F32"
        prepend-inner-icon="mdi-magnify"
        class="search-bar text-center"
        dark
        label="Buscar personaje..."
        append-icon=""
        :items="allCharacters"
        item-value="name"
        item-text="name"
        v-model="search"
        >
        </v-combobox>
  </v-container>
</template>

<script>
export default {
  name: 'HeaderCharacters',

  data () {
    return {
    }
  },
  computed: {
    allCharacters: {
      get () {
        return this.$store.getters.getAllCharacters
      }
    },
    search: {
      get () {
        return this.$store.getters.getSearch
      },
      set (value) {
        return this.$store.commit('setSearch', value)
      }
    }
  },
  watch: {
    search (newVal, oldVal) {
      if (newVal !== oldVal) {
        console.log(newVal)
        this.$store.commit('setSearch', newVal)
      }
    }
  },
  mounted () {
  },
  methods: {
  }
}
</script>
<style scoped>
    @import url('https://fonts.googleapis.com/css2?family=Montserrat&display=swap');
    .header-background{
        background-image: url("../assets/img/headerBackground.png");
        background-size: 100%;
        max-width: 100%;
        height: 100%;
    }
    .logo-img{
        margin: 0 auto;
        margin-top: 90px;
    }
    .search-bar{
        width: 500px;
        margin: 0 auto!important;
        border-radius: 8px;
    }
</style>
<style >
    .search-bar .v-input__control{
        border: 2px solid #fff!important;
        height: 60px!important;
    }
    .search-bar .v-input__slot:after{
        border: none!important;
    }
    .search-bar .v-input__slot:before{
        border: none!important;
    }
    .search-bar .v-label{
        font-family: "Montserrat" , sans-serif;
        font-weight: 400;
        font-style: normal;
        font-size: 18px;
        line-height: 22px;
        color: #fff!important;
        padding-left: 10px;
    }
</style>
