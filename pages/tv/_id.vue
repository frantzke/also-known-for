<template>
  <v-container>
    <div v-if="hasError">
      <h4 class="text-h4 text-center font-weight-light">{{ errorMsg }} 😖</h4>
      <!-- <p class="subtitle-1 text-center font-weight-light">
        Maximum requests for today 😢
        Please come back tomorrow
      </p> -->
    </div>

    <v-container v-else>
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
          <p>Run Time: {{ runTime }} minutes</p>
          <v-divider dark class="my-2" />
          <p>Episodes {{ title.number_of_episodes }} </p>
          <v-divider dark class="my-2" />
          <p>Seasons {{ title.number_of_seasons }} </p>
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
        v-for="actor in actors"
        :key="actor.id"
        :actor="actor"
        @error="onActorError"
      />
    </v-row>

    <!-- <div class="d-flex justify-center" v-if="!hasError">
      <v-btn
        large
        text
        append-icon
        :loading="isLoading"
        class="m-4 primary--text"
        color="primary"
        @click="onMoreActors"
      >
        More Cast
        <v-icon color="primary" right large> mdi-menu-down </v-icon>
      </v-btn>
    </div> -->

    <v-snackbar v-model="showSnackBar" color="red" timeout="3500">
      {{ errorMessage }}
    </v-snackbar>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

import ActorItem from "@/components/Actor-Item.vue";
import { NODE_ENV } from "@/env";

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
      fetchActorInterval: null,
    };
  },
  computed: {
    ...mapGetters(["title", "actors"]),
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
      // this.title?.created_by
      const createdBy = this.title?.created_by;
      return createdBy.map((creator) => creator.name).join(", ");
    },
    runTime() {
      if (!this.title?.episode_run_time) return "";
      return this.title.episode_run_time.join(", ");
    },
    genres() {
      if (this.title?.genres?.length === 0) return [];
      return this.title?.genres?.map((genre) => genre.name);
    },
  },
  created() {
    this.init();
  },
  beforeRouteLeave(to, from, next) {
    // Clear interval
    this.fetchActorInterval && clearInterval(this.fetchActorInterval);
    next();
  },
  methods: {
    ...mapActions(["fetchTV", "fetchActors", "resetTitlePage"]),
    async init() {
      const titleId = this.$route.params.id;

      //Check if title is already loaded
      if (this.title.id === titleId) return;

      try {
        this.resetTitlePage();
        //Fetch movie or tv based on type...
        await this.fetchTV({ titleId });

        console.log(this.title);
        const allActors = this?.title?.credits?.cast || [];
        const index = 5;
        const actors = allActors.slice(0, index);

        await this.fetchActors({ actorIds: actors.map((actor) => actor.id) });

        // Fetch the rest of the actors on an interval
        this.queueFetchAllActors(index);
      } catch (err) {
        this.hasError = true;
        this.errorMsg = err.message;
      }
    },
    queueFetchAllActors(start) {
      const allActors = this?.title?.credits?.cast || [];
      let currStart = start;
      let currEnd;

      // this.fetchActorInterval = setInterval(async () => {
      //   currEnd = currStart + 5;
      //   if (currEnd >= allActors.length) currEnd = undefined;
      //   const actors = allActors.slice(currStart, currEnd);
      //   await this.fetchActors({ actorIds: actors.map((actor) => actor.id) });
      //   currStart = currEnd;
      //   if (currEnd === undefined) {
      //     clearInterval(this.fetchActorInterval);
      //   }
      // }, 5000);
    },
    async onMoreActors() {
      const index = this.actors.length;
      const nextActors = NODE_ENV === "production" ? 5 : 1;
      const actors = [...this.title.actorList].slice(index, index + nextActors);
      const actorIds = actors.map((actor) => actor.id);

      try {
        this.isLoading = true;
        await this.fetchActors({ actorIds });
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
