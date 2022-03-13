<template>
    <v-container class="ma-0 pa-0 menu-container">
    <v-app-bar class="bar">
    <v-tabs color="#34C759" centered>
          <v-tab class="px-14 tab-menu text-capitalize">All</v-tab>
          <v-tab class="px-14 tab-menu text-capitalize">Unknown</v-tab>
          <v-tab class="px-14 tab-menu text-capitalize">Female</v-tab>
          <v-tab class="px-14 tab-menu text-capitalize">Male</v-tab>
          <v-tab class="px-14 tab-menu text-capitalize">Genderless</v-tab>
        </v-tabs>
    </v-app-bar>
    </v-container>
</template>

<script>

export default {
  name: 'Menu',
  components: {
  }
}
</script>
<style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Lato:wght@700&family=Montserrat&display=swap');
  .menu-container{
      max-width: 100%;
      height: 80px;
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
  }
</style>
