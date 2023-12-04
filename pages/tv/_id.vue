<template>
  <v-container>
    <v-alert :value="hasError" color="error" icon="$error">
      {{ errorMsg }}
    </v-alert>

    <v-container>
      <v-row>
        <v-col cols="12" sm="6" md="4">
          <v-img
            :src="imageSrc"
            :alt="`tv poster for ${title.title}`"
            lazy-src="nopicture.jpg"
            contain
            width="100%"
            aspect-ratio="2/3"
          />
        </v-col>
        <v-col cols="12" sm="6" md="8" class="text-left">
          <h2 v-if="$vuetify.breakpoint.smAndDown" class="text-h4 mb-2">
            {{ headerTitle }}
          </h2>
          <h2 v-else class="text-h2 mb-2">{{ headerTitle }}</h2>
          <v-divider dark class="my-2" />
          <p>{{ title.overview }}</p>
          <v-divider dark class="my-2" />
          <v-chip
            v-for="genre in genres"
            :key="genre"
            outlined
            dark
            color="primary"
            class="mr-2"
          >
            {{ genre }}
          </v-chip>
          <v-divider dark class="my-2" />
          <!-- TODO: Link to director page -->
          <p>Created By: {{ createdBy }}</p>
          <v-divider dark class="my-2" />

          <p>{{ title.status }}: {{ airingDates }}</p>
          <v-divider dark class="my-2" />

          <p>
            {{ title.number_of_seasons }} Seasons
            {{ title.number_of_episodes }} Episodes
          </p>
          <v-divider dark class="my-2" />

          <p>Episode Length: {{ runTime }} minutes</p>
          <v-divider dark class="my-2" />

          <p>Rating {{ title.vote_average }}/10 ({{ title.vote_count }})</p>
          <v-divider dark class="my-2" />
          <!-- <p>Budget: {{ title.budget }}</p>
            <v-divider dark class="my-2" />
            <v-divider dark class="my-2" />
            <p>Status: {{ title.status }}</p>
          <p>Revenue: {{ title.revenue }}</p> -->
        </v-col>
      </v-row>
    </v-container>

    <v-divider dark class="my-4 primary" />

    <v-row no-gutters>
      <ActorItem
        v-for="actor in cast"
        :key="actor.id"
        :actor="actor"
        @error="onActorError"
      />
      <v-col
        v-if="hasMoreCast"
        id="loadMore"
        cols="12"
        class="d-flex py-4 justify-center"
      >
        <v-progress-circular indeterminate color="primary" />
      </v-col>
    </v-row>

    <v-snackbar v-model="showSnackBar" color="red" timeout="3500">
      {{ errorMsg }}
    </v-snackbar>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

import ActorItem from "@/components/Actor-Item.vue";

export default {
  name: "TitlePage",
  components: {
    ActorItem,
  },
  data() {
    return {
      hasError: false,
      errorMsg: "An error occurred",
      showSnackBar: false,
      isLoading: false,
    };
  },
  computed: {
    ...mapGetters(["title", "cast"]),
    imageSrc() {
      if (this?.title?.poster_path) {
        return `https://image.tmdb.org/t/p/w500${this.title.poster_path}`;
      } else {
        return "nopicture.jpg";
      }
    },
    headerTitle() {
      if (!this?.title?.name) return "";
      return `${this.title.name} (${this.title.first_air_date.split("-")[0]})`;
    },
    createdBy() {
      if (!this.title?.created_by) return "";
      const createdBy = this.title?.created_by;
      return createdBy.map((creator) => creator.name).join(", ");
    },
    runTime() {
      if (!this.title?.episode_run_time) return "";
      return this.title.episode_run_time.join(", ");
    },
    airingDates() {
      if (this.title?.last_air_date) {
        return `${this.title.first_air_date} - ${this.title.last_air_date}`;
      } else {
        return this.title.first_air_date;
      }
    },
    genres() {
      if (this.title?.genres?.length === 0) return [];
      return this.title?.genres?.map((genre) => genre.name);
    },
    hasMoreCast() {
      if (!this.title?.credits?.cast) return false;
      if (!this.cast) return false;
      if (this.cast.length === 0) return false;
      const hasCast = this.cast.length > 0;
      const allCastLoaded = this.cast.length === this.title.credits.cast.length;
      return hasCast && !allCastLoaded;
    },
  },
  created() {
    this.init();
  },
  methods: {
    ...mapActions(["fetchTV", "fetchCast", "resetTitlePage"]),
    async init() {
      const titleId = this.$route.params.id;

      //Check if title is already loaded
      if (this.title.id === titleId) return;

      try {
        this.resetTitlePage();

        await this.fetchTV({ titleId });

        await this.fetchInitialCast();

        this.setupObserver();
      } catch (err) {
        this.hasError = true;
        this.errorMsg = err.message;
      }
    },
    async fetchInitialCast() {
      try {
        const allCast = this?.title?.credits?.cast || [];
        const index = 5;
        const cast = allCast.slice(0, index);

        await this.fetchCast({ cast });
      } catch (err) {
        this.hasError = true;
        this.errorMsg = err.message;
      }
    },
    setupObserver() {
      const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          this.fetchMoreCast();
        }
      });

      const loadMore = document.querySelector("#loadMore");
      if (loadMore) {
        observer.observe(loadMore);
      }
    },
    async fetchMoreCast() {
      const currentCast = [...this.cast];
      const allCast = [...this?.title?.credits?.cast] || [];

      const start = currentCast.length;
      let end = start + 5;
      if (end >= allCast.length) end = undefined;
      const cast = allCast.slice(start, end);

      try {
        this.isLoading = true;
        await this.fetchCast({ cast });
      } catch (err) {
        this.hasError = true;
        this.errorMsg = err.message;
      } finally {
        this.isLoading = false;
      }
    },
    onActorError(message) {
      this.showSnackBar = true;
      this.errorMsg = message;
    },
  },
};
</script>

<style scoped></style>
