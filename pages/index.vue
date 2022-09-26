<template>
  <v-container>
    <div class="d-flex">
      <v-text-field
        placeholder="Search Movies and TV Shows"
        v-model="searchText"
        required
        solo
        @keyup.enter="onSearch"
      />
      <v-btn
        large
        color="primary"
        class="search-btn black--text ml-4"
        :loading="isLoading"
        @click="onSearch"
      >
        Search
      </v-btn>
    </div>

    <div v-if="hasMaxRequests">
      <h4 class="text-h4 text-center font-weight-light">
        Maximum requests for today 😢
      </h4>
      <p class="subtitle-1 text-center font-weight-light">
        Please come back tomorrow
      </p>
    </div>

    <div v-if="isLoading">
      <v-skeleton-loader v-for="i in Array(5).keys()" class="mx-auto py-4" type="list-item-three-line"/>
    </div>

    <TitleItem v-for="title in titles" :key="title.id" :title="title"/>

  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

import TitleItem from "../components/Title-Item.vue"

export default {
  name: "IndexPage",
  components: {
    TitleItem
},
  data: () => ({
    isLoading: false,
    searchText: "",
    hasMaxRequests: false,
  }),
  computed: {
    ...mapGetters(["titles"]),
  },
  methods: {
    ...mapActions(["searchTitles"]),
    async onSearch() {
      //TODO: Handle error & max requests
      this.isLoading = true;
      await this.searchTitles({ searchText: this.searchText });
      this.isLoading = false;
    }
  },
};
</script>

<style scoped>
.search-btn {
  margin-top: 2px;
}
</style>
