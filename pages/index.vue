<template>
  <v-container>
    <div class="d-flex">
      <v-text-field
        placeholder="Search for Movies or TV Shows"
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

    <div v-for="title in titles" :key="title.id" @click="onClick(title.id)">
      <v-hover v-slot="{ hover }">
        <div class="d-flex py-4" :class="{ 'on-hover': hover }">
          <img :src="title.image" alt="" width="100" height="150" />
          <div>
            <h2>{{ title.title }}</h2>
            <p class="subtitle-1">{{ title.description }}</p>
          </div>
        </div>
      </v-hover>

      <v-divider />
    </div>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "IndexPage",
  data: () => ({
    isLoading: false,
    searchText: "",
    hasMaxRequests: false,
  }),
  computed: {
    ...mapGetters(["titles"]),
  },
  methods: {
    ...mapActions(["fetchTitles"]),
    async onSearch() {
      //TODO: Handle error & max requests
      this.isLoading = true;
      await this.fetchTitles({ searchText: this.searchText });
      this.isLoading = false;
    },
    onClick(id) {
      this.$router.push(`/title/${id}`);
    },
  },
};
</script>

<style scoped>
.search-btn {
  margin-top: 2px;
}

.on-hover {
  background-color: #272727;
}
</style>
