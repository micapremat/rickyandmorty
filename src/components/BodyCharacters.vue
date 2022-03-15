<template>
    <v-container class="ma-0 pa-0 characters-container">
      <v-container class="ma-0 pa-0 menu-container">
        <v-app-bar class="bar">
        <v-tabs color="#34C759" centered>
              <v-tab class="tab-menu text-capitalize" @click="filter('all')">All</v-tab>
              <v-tab class="tab-menu text-capitalize" @click="filter('Unknown')">Unknown</v-tab>
              <v-tab class="tab-menu text-capitalize" @click="filter('Female')">Female</v-tab>
              <v-tab class="tab-menu text-capitalize" @click="filter('Male')">Male</v-tab>
              <v-tab class="tab-menu text-capitalize" @click="filter('Genderless')">Genderless</v-tab>
            </v-tabs>
        </v-app-bar>
      </v-container>
    <v-row class="mt-8 body-characters">
      Mostrar favoritos: <v-btn text class="mt-n1"><v-icon>mdi-star-outline</v-icon></v-btn>
    </v-row>
    <v-row class="body-characters" v-if="filteredCharacters.length > 0">
        <v-col cols="4" v-for="character in filteredCharacters" :key="character.id">
          <v-row class="card mr-1 mb-1" @click="openCharModal(character)">
            <v-col class="pa-0">
              <v-img :src="character.image" width="140" class="char-img">
                <v-icon class="btn-inside">mdi-star-outline</v-icon>
              </v-img>
            </v-col>
            <v-col class="card-character">
              <v-row class="mt-1">
                <v-icon class="alive-icon mr-2" :class="character.status == 'Alive' ? 'isAlive' : 'isDead' ">mdi-checkbox-blank-circle</v-icon>
                <span class="status-char generic">{{character.status}} - {{character.species}}</span>
              </v-row>
              <v-row>
                <p class="name-char generic mt-1 mb-2">{{character.name}}</p>
              </v-row>
              <v-row>
                <p class="subtitle-char generic mb-0">Last known location:</p>
              </v-row>
              <v-row>
                <span class="generic location-char mt-1">{{character.location.name}}</span>
              </v-row>
              <v-row>
                <p class="subtitle-char generic mt-2 mb-1">First seen in:</p>
              </v-row>
              <v-row>
                <span class="generic location-char">{{character.origin.name}}</span>
              </v-row>
            </v-col>
          </v-row>
        </v-col>
    </v-row>
    <v-row class="no-content no-content-text" v-if="noResults">
      <h2 class="no-content-text no-content-title mt-12">Uh-oh!</h2>
      <h3 class="no-content-text mt-5">¡Pareces perdido en tu viaje!</h3>
      <v-btn rounded @click="cleanFilter()" class="no-content-text no-content-btn text-capitalize my-5" color="#11555F" dark>Eliminar filtros </v-btn>
    </v-row>
    <CharacterModal v-if="openModal" :isOpenModal="openModal" :character="character" @close="close"/>
    </v-container>
</template>

<script>

export default {
  name: 'BodyCharacters',
  components: {
    CharacterModal: () => import('@/components/CharacterModal.vue')
  },
  data () {
    return {
      filteredCharacters: [],
      noResults: false,
      openModal: false,
      character: undefined
    }
  },
  mounted () {
    this.getCharacters()
  },
  computed: {
    allCharacters: {
      get () {
        return this.$store.getters.getAllCharacters
      },
      set (value) {
        return this.$store.commit('setAllCharacters', value)
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
      console.log(newVal)
      if (newVal !== null && newVal !== oldVal) {
        this.noResults = false
        if (newVal.name !== undefined) {
          this.filteredCharacters = this.allCharacters.filter(c => c.name.toLowerCase() === newVal?.name.toLowerCase())
        } else {
          this.noResults = true
          this.filteredCharacters = []
        }
      }
      if (newVal === null) {
        this.filteredCharacters = this.allCharacters
      }
    }
  },
  methods: {
    getCharacters () {
      this.$request.getCharacters().then(resp => {
        this.allCharacters = resp.data.results
        this.filteredCharacters = resp.data.results
        console.log(this.allCharacters)
      })
        .catch((e) => {
          console.log('Error: ', e)
        })
    },
    filter (gender) {
      if (gender === 'all') {
        this.filteredCharacters = this.allCharacters
      } else {
        this.filteredCharacters = this.allCharacters.filter(c => c.gender.toLowerCase() === gender.toLowerCase())
      }
    },
    cleanFilter () {
      this.filteredCharacters = this.allCharacters
    },
    close () {
      this.openModal = false
    },
    openCharModal (c) {
      this.character = c
      this.openModal = true
    }
  }
}
</script>
<style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Lato:wght@700&family=Montserrat&display=swap');
  .characters-container{
    max-width: 100%;
  }
  .menu-container{
      max-width: 100%;
      height: 80px;
      width: 100%;
  }
  .bar{
      width: 100%;
  }
  .tab-menu{
        font-family: "Montserrat" , sans-serif;
        font-weight: 400;
        font-style: normal;
        font-size: 18px;
        line-height: 22px;
        color: #000!important;
        margin: 0 60px;
  }
  .generic{
    font-family: "Montserrat" , sans-serif;
    font-weight: 400;
    font-style: normal;
  }
  .body-characters{
      max-width: 65%!important;
      margin: 0 auto!important;
  }
  .card-character{
    width: 20px;
  }
  .btn-inside{
    position: absolute!important;
    right: 0!important;
    bottom: 0!important;
    font-size: 30px!important;
    cursor: pointer;
  }
  .card{
    border: 1px solid #ccc;
    border-radius: 10px;
    cursor: pointer;
  }
  .char-img{
    border-bottom-left-radius: 10px;
    border-top-left-radius: 10px;
  }
  .alive-icon{
    font-size: 8px!important;
  }
  .isAlive{
    color: #27AE60!important;
  }
  .isDead{
    color: #EB5757!important;
  }
  .status-char{
    font-size: 10px;
    line-height: 12px;
  }
  .name-char{
    font-size: 16px;
    line-height: 19px;
    color: #000;
  }
  .subtitle-char{
    font-size: 10px;
    line-height: 12px;
    color: #828282;
  }
  .location-char{
    color: #000!important;
    font-size: 12px;
    line-height: 15px;
  }
  .no-content{
    margin: 0 auto;
    text-align: center;
    width: 80%;
  }
  .no-content-text{
    display: block!important;
    text-align: center;
  }
  .no-content-btn{
    margin: 0 auto;
  }
  .no-content-title{
    font-family: "Lato" , sans-serif;
    font-weight: 700;
    font-style: normal;
    font-size: 36px;
    line-height: 43px;
  }
</style>
