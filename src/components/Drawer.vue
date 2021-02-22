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

    <v-list>
      <v-list-group v-for="appLink in appLinks" :key="appLink.title" no-action>
        <template v-slot:activator>
          <v-list-item-avatar>
            <v-img :src="appLink.avatar" />
          </v-list-item-avatar>
          <v-list-item-title v-text="appLink.title" />
        </template>
        <v-list-item v-for="subItem in appLink.subItems" :key="subItem.title" router :to="subItem.route" dense>
          <v-list-item-icon>
            <v-icon v-text="subItem.icon" />
          </v-list-item-icon>
          <v-list-item-title>{{ subItem.title }}</v-list-item-title>
        </v-list-item>
      </v-list-group>
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

  private appLinks: Array<AppLink> = [
    {
      avatar: require("@/assets/duel-links-mdpi.png"),
      title: "Duel Links",
      subItems: [
        { icon: "mdi-account", title: "Accounts", route: "/duel-links-accounts" },
        { icon: "mdi-diamond-stone", title: "Gem", route: "/duel-links-gem" },
        { icon: "mdi-human-handsup", title: "Character", route: "/duel-links-character" },
        { icon: "mdi-bullseye-arrow", title: "Stage", route: "/duel-links-stage" },
      ],
    },
  ];
}

class NavLink {
  constructor(readonly icon: string, readonly title: string, readonly route: string) {}
}

class AppLink {
  constructor(readonly avatar: string, readonly title: string, readonly subItems: Array<NavLink>) {}
}

</script>
