<template>
  <v-navigation-drawer app permanent dark>
    <v-list nav>
      <v-list-item v-for="link in taskLinks" :key="link.title" router :to="link.route">
        <v-list-item-icon>
          <v-icon large v-text="link.icon" />
        </v-list-item-icon>
        <v-list-item-title v-text="link.title" />
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  components: {}
})
export default class Drawer extends Vue {

  private taskLinks: Array<NavLink> = [
    { icon: "mdi-clock-outline", title: "Schedules", route: "/schedules" },
    { icon: "mdi-clipboard-check-outline", title: "Tasks", route: "/tasks" },
  ];
}

class NavLink {
  constructor(readonly icon: string, readonly title: string, readonly route: string) {}
}
</script>
