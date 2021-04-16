<template>
  <v-data-table :headers="headers" :items="accounts" item-key="id"
                :server-items-length="page.totalElements"
                :options.sync="options"
                :footer-props="{ showFirstLastPage: true,
                                 showCurrentPage: true,
                                 itemsPerPageOptions: [10, 20, 30] }"
                :multi-sort="true"
                :loading="loading"
  >
    <template #item.index="{ item : account }">
      {{ account.emulatorIndex ? account.emulatorIndex : account.appIndex }}
    </template>

    <template #item.cards="{ item : account }">
      <v-combobox v-model="account.cards" multiple chips>
        <template #selection="{ item : card, selected }">
          <v-chip :input-value="selected" color="green" dark>
            {{ card.name + '(' + card.amount + ')' }}
          </v-chip>
        </template>
      </v-combobox>
      <!-- <v-chip v-for="card in account.cards" :key="card.name" color="green lighten-1" dark>
        {{ card.name + '(' + card.amount + ')' }}
      </v-chip> -->
    </template>

    <template #item.currentChar="{ item : account}">
      {{ account.currentChar ? account.currentChar.name + ' ' + account.currentChar.level : '' }}
    </template>

    <template #item.actions="{ item : account }">
      <v-icon @click="editItem(account)">mdi-pencil</v-icon>
      <v-icon>mdi-delete</v-icon>
    </template>
  </v-data-table>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { DataOptions } from 'vuetify/types'
import axios from "axios";
import DuelLinksAccount from '@/types/duellinks/DuelLinkAccount'
import Page from '@/types/Page'

const baseUri = "http://localhost:22000/duelLinksAccounts";

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

  private options: DataOptions = {
    page: 1,
    itemsPerPage: 10,
    sortBy: ['device', 'index'],
    sortDesc: [],
    groupBy: [],
    groupDesc: [],
    multiSort: true,
    mustSort: false
  };

  private page: Page = new Page(0, 0, 0, 0);

  private loading = true;

  created() {
    this.getAll();
  }

  @Watch('options', { deep: true })
  refresh() {
    this.getAll();
  }

  getAll() {
    this.loading = true;
    const uri = new URL(baseUri);
    uri.searchParams.append('size', String(this.options.itemsPerPage));
    uri.searchParams.append('page', String(this.options.page - 1));
    const sortBy = this.options.sortBy;
    const sortDesc = this.options.sortDesc;
    for (let sortIdx = 0; sortIdx < sortBy.length; sortIdx++) {
      if (sortBy[sortIdx] === 'index') {
        uri.searchParams.append('sort', `appIndex,${sortDesc[sortIdx] ? 'desc' : 'asc'}`)
        uri.searchParams.append('sort', `emulatorIndex,${sortDesc[sortIdx] ? 'desc' : 'asc'}`)
      } else {
        uri.searchParams.append('sort', `${sortBy[sortIdx]},${sortDesc[sortIdx] ? 'desc' : 'asc'}`)
      }
    }
    console.log(uri.href)
    // http://localhost:24000/duelLinksAccounts?sort=device,desc&sort=gem,asc&sort=appIndex,desc
    // const uri = `${baseUri}?size=${size}&page=${pageNumber}`;
    axios.get(uri.href)
      .then((response) => {
        if (response.status === 200) {
          this.loading = false;
          this.accounts = response.data._embedded ? response.data._embedded.duelLinksAccounts : [];
          this.page = response.data.page ? response.data.page : new Page(0, 0, 0, 0);
        }
      })
  }

  editItem(item: DuelLinksAccount) {
    console.log("edit", item);
  }

}

</script>
