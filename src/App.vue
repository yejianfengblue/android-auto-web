<template>
  <v-app>

    <Drawer></Drawer>

    <v-main>
      <router-view></router-view>
    </v-main>

  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import Drawer from '@/components/Drawer.vue';

export default Vue.extend({
  name: 'App',

  components: { Drawer },

  data: () => ({
    //
  }),
});
</script>
