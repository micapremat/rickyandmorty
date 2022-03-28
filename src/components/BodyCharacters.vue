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
      Mostrar favoritos:
      <v-btn text class="mt-n2 ml-1 mb-5" icon @click="showAllFavorites()" v-if="!showFavorites">
        <v-icon>mdi-star-outline</v-icon>
      </v-btn>
      <v-btn text class="mt-n2 ml-1 mb-5" icon @click="showAllFavorites()" v-else>
        <v-icon class="btn-inside-yellow">mdi-star</v-icon>
      </v-btn>
    </v-row>
    <v-row class="body-characters" v-if="filteredCharacters.length > 0">
        <v-col cols="4" v-for="character in filteredCharacters" :key="character.id+changeKey">
          <v-row>
          <v-row class="card mr-1 mb-1" @click="openCharModal(character)">
            <v-col class="pa-0">
              <v-img :src="character.image" width="140" class="char-img">
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
          <v-btn text icon class="btn-star" @click="favorite(character)" v-if="!character.isFavorite">
                <v-icon class="btn-inside" >mdi-star-outline</v-icon>
                </v-btn>
                <v-btn text icon class="btn-star btn-star-yellow"  @click="favorite(character)"  v-else>
                <v-icon class="btn-inside-yellow">mdi-star</v-icon>
                </v-btn>
    </v-row>
        </v-col>
    </v-row>
    <v-row class="no-content no-content-text" v-if="noResults">
      <h2 class="no-content-text no-content-title mt-12">Uh-oh!</h2>
      <h3 class="no-content-text mt-5">¡Pareces perdido en tu viaje!</h3>
      <v-btn rounded @click="cleanFilter()" class="no-content-text no-content-btn text-capitalize my-5" color="#11555F" dark>Eliminar filtros </v-btn>
    </v-row>
    <div class="text-center mb-2" v-if="!showFavorites">
      <v-pagination
        v-model="page"
        :length="allPages"
        circle
        :total-visible="5"
        @input="getCharacterByPage()"
      ></v-pagination>
    </div>
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
      character: undefined,
      page: 1,
      allPages: 1,
      isFavorite: false,
      arrayFavorites: [],
      changeKey: 0,
      showFavorites: false,
      maxPages: 0
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
        this.allPages = resp.data.info.pages
        this.maxPages = this.allPages
        console.log(resp.data.info.pages)
      })
        .catch((e) => {
          console.log('Error: ', e)
        })
    },
    getCharacterByPage () {
      this.$request.getCharacterByPage(this.page).then(resp => {
        this.filteredCharacters = resp.data.results
        console.log(resp.data)
        resp.data.forEach(e => {
          e.isFavorite = false
        })
      })
        .catch((e) => {
          console.log('Error: ', e)
        })
    },
    async filter (gender) {
      if (gender === 'all') {
        this.filteredCharacters = this.allCharacters
        this.allPages = this.maxPages
        this.showFavorites = false
      } else {
        await this.$request.getFilteredCharacters('gender', gender).then(resp => {
          this.filteredCharacters = resp.data.results
          this.allPages = resp.data.info.pages
          this.showFavorites = false
        })
          .catch((e) => {
            console.log('Error: ', e)
          })
      }
      this.filteredCharacters.forEach(e => {
        const isFavorite = this.arrayFavorites.filter(f => e.id === f.id)
        if (isFavorite.length > 0) {
          e.isFavorite = true
        }
      })
      this.changeKey++
    },
    cleanFilter () {
      this.filteredCharacters = this.allCharacters
      this.page = 1
    },
    close () {
      this.openModal = false
    },
    openCharModal (c) {
      this.character = c
      this.openModal = true
    },
    favorite (character) {
      this.changeKey++
      character.isFavorite = !character.isFavorite
      if (character.isFavorite) {
        this.arrayFavorites.push(character)
      } else {
        this.arrayFavorites = this.arrayFavorites.filter(e => e.id !== character.id)
      }
    },
    showAllFavorites () {
      this.showFavorites = !this.showFavorites
      if (this.showFavorites) {
        this.filteredCharacters = this.arrayFavorites
      } else {
        this.page = 1
        this.filteredCharacters = this.allCharacters
      }
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
    font-size: 34px!important;
    cursor: pointer;
  }
  .btn-inside-yellow{
    color: #e0d31d!important;
    font-size: 34px!important;
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
  .btn-star{
    position: relative;
    top: 90px;
    right: 200px;
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
