<template>
  <v-container>
    <div v-if="hasError">
      <h4 class="text-h4 text-center font-weight-light">{{ errorMsg }} 😖</h4>
    </div>

    <TitleList
      header="Trending"
      subheader="Trending this week"
      :titles="trending"
    />
    <TitleList
      header="Now Playing"
      subheader="Movies currently playing in theaters"
      mediaType="movie"
      :titles="playing"
    />
    <TitleList
      header="Popular"
      subheader="Movies by popularity"
      mediaType="movie"
      :titles="popular"
    />
    <TitleList
      header="Upcoming"
      subheader="Upcoming Movies"
      mediaType="movie"
      :titles="upcoming"
    />
    <TitleList
      header="Top TV"
      subheader="Top Rated TV"
      mediaType="tv"
      :titles="topTV"
    />
    <TitleList
      header="Popular People"
      subheader="People by popularity"
      mediaType="person"
      :titles="popularPeople"
    />
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

import TitleList from "../components/Title-List.vue";
import TitleItem from "../components/Title-Item.vue";

export default {
  name: "IndexPage",
  components: {
    TitleItem,
    TitleList,
  },
  data: () => ({
    isLoading: false,
    searchText: "",
    hasError: false,
    errorMsg: "",
    upcoming: [],
    popular: [],
    trending: [],
    playing: [],
    topTV: [],
    popularPeople: [],
  }),
  computed: {
    ...mapGetters(["listByName"]),
  },
  created() {
    this.init();
  },
  methods: {
    ...mapActions(["fetchList"]),
    async init() {
      try {
        this.isLoading = true;
        await this.fetchList({
          listName: "popular",
          apiPath: "/movie/popular",
        });
        this.popular = this.listByName("popular");
        await this.fetchList({
          listName: "trending",
          apiPath: "/trending/all/week",
        });
        this.trending = this.listByName("trending");
        await this.fetchList({
          listName: "playing",
          apiPath: "/movie/now_playing",
        });
        this.playing = this.listByName("playing");
        await this.fetchList({
          listName: "upcoming",
          apiPath: "/movie/upcoming",
        });
        this.upcoming = this.listByName("upcoming");
        await this.fetchList({
          listName: "topTV",
          apiPath: "/tv/top_rated",
        });
        this.topTV = this.listByName("topTV");
        await this.fetchList({
          listName: "popularPeople",
          apiPath: "/person/popular",
        });
        this.popularPeople = this.listByName("popularPeople");
      } catch (err) {
        this.hasError = true;
        this.errorMsg = err.message;
      } finally {
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
