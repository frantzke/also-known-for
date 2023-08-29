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

    <v-alert
      :value="true"
      color="error"
      icon="$error"
    >
      The API Also Known For relies on is down. Work is underway to restore functionality as soon as possible.  
    </v-alert>

    <div v-if="hasError">
      <h4 class="text-h4 text-center font-weight-light">
        {{errorMsg}} 😖
      </h4>
      <!-- <p class="subtitle-1 text-center font-weight-light">
        Please come back tomorrow
      </p> -->
    </div>

    <div v-if="isLoading">
      <v-skeleton-loader
        v-for="i in 6"
        class="mx-auto py-4"
        type="list-item-three-line"
      />
    </div>

    <TitleItem v-for="title in titles" :key="title.id" :title="title" />
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

import TitleItem from "../components/Title-Item.vue";

export default {
  name: "IndexPage",
  components: {
    TitleItem,
  },
  data: () => ({
    isLoading: false,
    searchText: "",
    hasError: false,
    errorMsg: ""
  }),
  computed: {
    ...mapGetters(["titles"]),
  },
  methods: {
    ...mapActions(["searchTitles", "resetSearchPage"]),
    init() {
      this.resetSearchPage();
    },
    async onSearch() {
      if (this.searchText === "") {
        this.hasError = true;
        this.errorMsg = "Please provide a search!"
        return;
      }

      try {
        this.hasError = false;
        this.isLoading = true;
        this.resetSearchPage();
        await this.searchTitles({ searchText: this.searchText });
      } catch (err) {
        this.hasError = true
        this.errorMsg = err.message;
      } finally{
        this.isLoading = false;
      }
    },
  },
};
</script>

<style scoped>
.search-btn {
  margin-top: 2px;
}
</style>
