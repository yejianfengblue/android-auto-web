<template>
  <v-data-table :headers="headers" :items="accounts" item-key="id">
    <template #item.index="{ item }">
      {{ item.emulatorIndex ? item.emulatorIndex : item.appIndex }}
    </template>

    <template #item.currentChar="{ item }">
      {{ item.currentChar.name + ' ' + item.currentChar.level }}
    </template>

    <template #item.actions="{ item }">
      <v-icon @click="editItem(item)">mdi-pencil</v-icon>
      <v-icon>mdi-delete</v-icon>
    </template>
  </v-data-table>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import axios from "axios";
import { DuelLinksAccount } from '@/types/duellinks/DuelLinkAccount'

const baseUri = "http://localhost:24000/duelLinksAccounts";

@Component({
  components: {}
})
export default class DuelLinksAccounts extends Vue {

  private headers: Array<object> = [
    { text: 'Device', value: 'device' },
    { text: 'Index', value: 'index' },
    { text: 'Gem', value: 'gem' },
    { text: 'Expire', value: 'giftExpireDate' },
    { text: 'Deck', value: 'deck' },
    { text: 'Cards', value: 'cards' },
    { text: 'Package', value: 'pkg' },
    { text: 'Character', value: 'currentChar' },
    { text: 'Player ID', value: 'playerId' },
    { text: 'Actions', value: 'actions', sortable: false }
  ];

  private accounts: Array<DuelLinksAccount> = [];


  mounted() {
    this.getAll();
  }

  getAll() {
    axios.get(baseUri)
      .then((response) => {
        if (response.status === 200) {
          this.accounts = response.data._embedded ? response.data._embedded.duelLinksAccounts : [];
        }
        console.log('duelLinksAccounts length = ', this.accounts.length);
      })
  }

  editItem(item: DuelLinksAccount) {
    console.log("edit", item);
  }

}

// class DuelLinksAccount {
//   constructor(
//     readonly id: string,
//     readonly playerId: string,
//     private device: string, private emulatorIndex: number, private appIndex: number,
//     private gem: number, private giftExpireDate: Date,
//     private stage: number, private stageUpTime: Date,
//     private currentChar: Character, private chars: Array<Character>,
//     private deck: string, private cards: Array<Card>, private pkg: string) {}
// }

// class Character {
//   constructor(readonly name: string, private level: number) {}
// }

// class Card {
//   constructor(readonly name: string, private amount: number) {}
// }
</script>
