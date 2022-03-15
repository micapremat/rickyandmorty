<template>
<div v-if="isOpenModal">
    <v-dialog
    v-model="isOpenModal"
    width="740"
    >
        <v-card>
            <v-img src="@/assets/img/modalHeader.png"></v-img>
            <div class="info-profile">
            <v-row class="ricky-div">
                <v-img :src="character.image" width="155" class="ricky-img"></v-img>
            </v-row>
            <v-card-text class="text-center status pa-2">{{character.status}}</v-card-text>
            <v-card-text class="text-center name pa-2">{{character.name}}</v-card-text>
            <v-card-text class="text-center status pa-2">{{character.species}}</v-card-text>
            </div>
            <v-row class="mx-2 mt-1">
                <v-card-title class="information">Información</v-card-title>
            </v-row>
            <v-row justify="space-between" class="mx-5">
                <v-col cols="3" md="3" class="area">
                    <v-icon size="13" color="#828282">mdi-information</v-icon>
                    <span class="gender-origin-type ml-2">Gender</span>
                    <p class="info-p mb-1">{{character.gender}}</p>
                </v-col>
                <v-col cols="3" md="3" class="area">
                    <v-icon size="13" color="#828282">mdi-information</v-icon>
                    <span class="gender-origin-type ml-2">Origin</span>
                    <p class="info-p mb-1">{{character.origin.name}}</p>
                </v-col>
                <v-col cols="3" md="3" class="area">
                    <v-icon size="13" color="#828282">mdi-information</v-icon>
                    <span class="gender-origin-type ml-2">Type</span>
                    <p class="info-p mb-1" v-if="character.type !== ''">{{character.type}}</p>
                    <p class="info-p mb-1" v-else>Unknown</p>
                </v-col>
            </v-row>
            <v-divider class="mt-10"></v-divider>
            <v-row class="mx-2 mt-1">
                <v-card-title class="information">Episodios</v-card-title>
            </v-row>
            <v-row class="mx-5" justify="space-between">
                <v-col cols="3" class="area col-size mb-6" v-for="e in episodes" :key="e.id">
                    <span class="gender-origin-type ml-2">{{e.name}}</span>
                    <p class="info-p mb-1 ml-2">{{e.episode}}</p>
                    <span class="gender-origin-type ml-2">{{new Date(e.created).toDateString('es-ES')}}</span>
                </v-col>
            </v-row>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                color="primary"
                text
                @click="closeModal()"
                >
                I accept
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</div>
</template>
<script>

export default {
  name: 'CharacterModal',
  props: {
    isOpenModal: {
      default: false,
      type: Boolean
    },
    character: {
      default: undefined,
      type: Object
    }
  },
  components: {
  },
  data () {
    return {
      episodes: [],
      filterEpisodes: []
    }
  },
  mounted () {
    this.episodesIds()
  },
  computed: {
  },
  watch: {
  },
  methods: {
    closeModal () {
      this.$emit('close', false)
    },
    getEpisodes (ids) {
      console.log(this.character)
      this.$request.getEpisodes(ids).then(resp => {
        this.episodes = resp.data
        console.log(resp.data)
      })
        .catch((e) => {
          console.log('Error: ', e)
        })
    },
    episodesIds () {
      const ids = []
      this.character.episode.forEach(e => {
        console.log(e)
        const idEpisode = e.substring(e.lastIndexOf('/') + 1)
        ids.push(idEpisode)
      })
      this.getEpisodes(ids)
    }
  }
}
</script>
<style scoped>
    @import url('https://fonts.googleapis.com/css2?family=Lato:wght@700&family=Montserrat:wght@400;500;600&display=swap');
    .ricky-img{
        margin-top: -80px;
        border-radius: 50%;
        border: 5px solid #fff;
    }
    .ricky-div{
        width: 155px;
        margin: 0 auto;
    }
    .status{
        font-family: "Montserrat" , sans-serif;
        font-weight: 500;
        font-style: normal;
        font-size: 12px;
        line-height: 15px;
        color: #4F4F4F;
    }
    .name{
        font-family: "Montserrat" , sans-serif;
        font-weight: 600;
        font-style: normal;
        font-size: 20px;
        line-height: 24px;
        color: #081F32;
    }
    .info-profile{
        background-color: #F2F2F2;
    }
    .information{
        font-family: "Montserrat" , sans-serif;
        font-weight: 600;
        font-style: normal;
        font-size: 22px;
        line-height: 24px;
    }
    .area{
        border: 1px solid #ccc;
        border-radius: 6px;
    }
    .gender-origin-type{
        font-family: "Montserrat" , sans-serif;
        font-weight: 400;
        font-style: normal;
        font-size: 11px;
        line-height: 13px;
        color: #828282;
    }
    .info-p{
        font-family: "Montserrat" , sans-serif;
        font-weight: 600;
        font-style: normal;
        font-size: 17px;
        line-height: 22px;
        color: #081F32;
    }
    .col-size.col-3{
        flex: 0 0 23%!important;
    }
</style>
