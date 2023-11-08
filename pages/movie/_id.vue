<template>
  <v-container>
    <div v-if="hasError">
      <h4 class="text-h4 text-center font-weight-light">{{ errorMsg }} 😖</h4>
    </div>

    <v-container v-else>
      <v-row>
        <v-col cols="12" sm="6" md="4">
          <v-img
            :src="imageSrc"
            :alt="`movie poster for ${title.title}`"
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
            outlined
            dark
            color="primary"
            class="mr-2"
          >
            {{ genre }}
          </v-chip>
          <v-divider dark class="my-2" />
          <!-- TODO: Link to director page -->
          <p>Directors: {{ directors }}</p>
          <v-divider dark class="my-2" />
          <p>Writers: {{ writers }}</p>
          <v-divider dark class="my-2" />
          <p>Runtime {{ title.runtime }} minutes</p>
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
        class="d-flex py-4 justify-center more"
      >
        <v-progress-circular indeterminate color="primary" />
      </v-col>
    </v-row>

    <v-snackbar v-model="showSnackBar" color="red" timeout="3500">
      {{ errorMessage }}
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
      errorMessage: "An error occurred",
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
      if (!this?.title?.title) return "";
      return `${this.title.title} (${this.title.release_date.split("-")[0]})`;
    },
    directors() {
      if (!this.title?.credits?.crew) return "";
      const directors = this.title.credits.crew.filter(
        (crew) => crew.job === "Director"
      );
      return directors.map((director) => director.name).join(", ");
    },
    writers() {
      if (!this.title?.credits?.crew) return "";
      const writers = this.title.credits.crew.filter((crew) => {
        return crew.job === "Screenplay" || crew.job === "Writer";
      });
      return writers.map((writers) => writers.name).join(", ");
    },
    hasWriters() {
      return this.title?.writers?.length > 0;
    },
    genres() {
      if (this.title?.genres?.length === 0) return [];
      return this.title?.genres?.map((genre) => genre.name);
    },
    hasMoreCast() {
      return (
        this.cast?.length > 0 &&
        this.cast?.length < this.title?.credits?.cast?.length
      );
    },
  },
  created() {
    this.init();
  },
  methods: {
    ...mapActions(["fetchTitle", "fetchCast", "resetTitlePage"]),
    async init() {
      const titleId = this.$route.params.id;

      //Check if title is already loaded
      if (this.title.id === titleId) return;

      try {
        this.resetTitlePage();

        await this.fetchTitle({ titleId });

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

      observer.observe(document.querySelector("#loadMore"));
    },
    async fetchMoreCast() {
      const currentCast = [...this.cast];
      const allCast = [...this?.title?.credits?.cast] || [];

      const start = currentCast.length;
      let end = start + 5;
      if (end >= allCast.length) end = undefined;
      const cast = allCast.slice(start, end);
      // const actorIds = cast.map((actor) => actor.id);

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
      this.errorMessage = message;
    },
  },
};
</script>

<style scoped></style>
