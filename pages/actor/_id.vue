<template>
  <v-container>
    <div v-if="hasError">
      <h4 class="text-h4 text-center font-weight-light">{{ errorMsg }} 😖</h4>
      <!-- <p class="subtitle-1 text-center font-weight-light">
        Maximum requests for today 😢
        Please come back tomorrow
      </p> -->
    </div>

    <v-row v-else>
      <v-col cols="3">
        <v-img
          :src="actor.image"
          :alt="actor.name"
          height="400"
          max-width="100%"
          aspect-ratio="2/3"
          contain
        />
      </v-col>
      <v-col cols="9" class="text-left">
        <h2 class="text-h2 mb-2">{{ actor.name }}</h2>
        <v-divider dark class="my-2" />
        <p>{{ actor.summary }}</p>
        <v-divider dark class="my-2" />
        <p>{{ actor.role }}</p>
        <v-divider dark class="my-2" />
        <p>{{ actor.awards }}</p>
      </v-col>
    </v-row>

    <v-divider dark class="my-4 primary" />

    <h4 class="mb-2 text-h4 font-weight-light">Known For</h4>
    <div class="d-flex py-4">
      <div
        class="mx-2"
        v-for="kfor in actor.knownFor"
        :key="kfor.id"
        @click="onClickTitle(kfor.id)"
      >
        <v-img
          :src="kfor.image"
          :alt="kfor.title"
          lazy-src="https://imdb-api.com/images/original/nopicture.jpg"
          contain
          aspect-ratio="2/3"
          max-width="10vw"
        />
        <p class="mb-0 text-subtitle-1">{{ kfor.title }}</p>
        <p class="mb-0 text-body-1 font-weight-light primary--text">
          As {{ kfor.role }}
        </p>
      </div>
    </div>

    <v-divider dark class="my-4 primary" />

    <h4 class="mb-2 text-h4 font-weight-light">Movies</h4>
    <div
      v-for="title in actor.castMovies"
      :key="title.id"
      @click="onClickTitle(title.id)"
    >
      <v-hover v-slot="{ hover }">
        <div class="d-flex py-4" :class="{ 'on-hover': hover }">
          <div>
            <h3>{{ title.title }} {{ title.year }}</h3>
            <p class="mb-0 subtitle-1">{{ title.role }}</p>
            <p class="subtitle-1">{{ title.description }}</p>
          </div>
        </div>
      </v-hover>

      <v-divider />
    </div>
  </v-container>
</template>

<script>
import mockData from "@/helpers/mockData";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "ActorPage",
  data() {
    return {
      hasMaxRequests: false,
      movies: [],
      hasError: false,
      errorMsg: "",
    };
  },
  computed: {
    ...mapGetters(["actorById"]),
    actor() {
      const actorId = this.$route.params.id;
      return this.actorById(actorId);
    },
  },
  created() {
    this.init();
    // this.getMockData();
  },
  methods: {
    ...mapActions(["fetchActor"]),
    async init() {
      // Check if actor is already loaded
      const actorId = this.$route.params.id;
      if (this.actor.id === actorId) return;

      try {
        await this.fetchActor({ actorId });
      } catch (err) {
        this.hasError = true;
        this.errorMsg = err.message;
      }
    },
    getMockData() {
      const { stars } = mockData();
      this.actor = stars[1];
      this.movies = this.actor.castMovies.slice(0, 10);
    },
    onClickTitle(id) {
      this.$router.push(`/title/${id}`);
    },
  },
};
</script>

<style scoped>
.on-hover {
  background-color: #272727;
}
</style>
