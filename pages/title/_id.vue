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
        <v-col cols="12" sm="6" md="3">
          <v-img
            :src="imageSrc"
            :alt="`movie poster for ${title.title}`"
            lazy-src="https://imdb-api.com/images/original/nopicture.jpg"
            contain
            width="100%"
            aspect-ratio="2/3"
          />
        </v-col>
        <v-col cols="12" sm="6" md="9" class="text-left">
          <h2 v-if="$vuetify.breakpoint.smAndDown" class="text-h4 mb-2">
            {{ title.title }}
          </h2>
          <h2 v-else class="text-h2 mb-2">{{ title.title }}</h2>
          <v-divider dark class="my-2" />
          <p>{{ title.tagline }}</p>
          <v-divider dark class="my-2" />
          <p>{{ title.overview }}</p>
          <v-divider dark class="my-2" />
          <p>{{ title.release_date }}</p>
          <v-divider dark class="my-2" />
          <p>{{ title.genres }}</p>
          <v-divider dark class="my-2" />
          <!-- <p v-if="hasDirectors">Directors: {{ title.directors }}</p>
          <v-divider dark class="my-2" v-if="hasDirectors" />
          <p v-if="hasWriters">Writers: {{ title.writers }}</p>
          <v-divider dark class="my-2" v-if="hasWriters" />
          <p>{{ title.awards }}</p> -->
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

import mockData from "@/helpers/mockData";
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
    };
  },
  computed: {
    ...mapGetters(["title", "actors"]),
    imageSrc() {
      if (this?.title?.poster_path) {
        return `https://image.tmdb.org/t/p/w500${this.title.poster_path}`;
      } else {
        return null;
      }
    },
    cast() {
      return this.title?.credits?.cast || [];
    },
    hasDirectors() {
      return this.title?.directors?.length > 0;
    },
    hasWriters() {
      return this.title?.writers?.length > 0;
    },
  },
  created() {
    this.init();
    // this.getMockData();
  },
  methods: {
    ...mapActions(["fetchTitle", "fetchActors", "resetTitlePage"]),
    async init() {
      const titleId = this.$route.params.id;

      //Check if title is already loaded
      if (this.title.id === titleId) return;

      try {
        this.resetTitlePage();
        await this.fetchTitle({ titleId });

        // debugger;
        // const starListKeys = this.title.starList.map((star) => star.id);
        // await this.fetchActors({ actorIds: starListKeys });
      } catch (err) {
        this.hasError = true;
        this.errorMsg = err.message;
      }
    },
    getMockData() {
      const { title, stars } = mockData();
      this.title = title;
      this.actors = stars;
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
        this.isLoading = false
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
