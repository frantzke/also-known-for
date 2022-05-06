<template>
  <v-container>
    <div v-if="hasMaxRequests">
      <h4 class="text-h4 text-center font-weight-light">
        Maximum requests for today 😢
      </h4>
      <p class="subtitle-1 text-center font-weight-light">
        Please come back tomorrow
      </p>
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
        <h5 class="text-h5 mb-2">{{ actor.role }}</h5>
        <p class="text-body-1">{{ actor.summary }}</p>
      </v-col>
    </v-row>

    <v-divider dark class="my-4 primary" />

    <h4 class="mb-2 text-h4 font-weight-light">Known For</h4>
    <div class="d-flex">
      <div
        class="known-for-container mx-2"
        v-for="kfor in actor.knownFor"
        :key="kfor.id"
        @click="onClickTitle(kfor.id)"
      >
        <img :src="kfor.image" :alt="kfor.title" width="140" height="210" />
        <p class="mb-0 text-subtitle-1">{{ kfor.title }}</p>
        <p class="mb-0 text-body-1 font-weight-light">As {{ kfor.role }}</p>
      </div>
    </div>

    <v-divider dark class="my-4 primary" />

    <h4 class="mb-2 text-h4 font-weight-light">Movies</h4>
    <div
      v-for="title in movies"
      :key="title.id"
      @click="onClickTitle(title.id)"
    >
      <v-hover v-slot="{ hover }">
        <div class="d-flex py-4" :class="{ 'on-hover': hover }">
          <div>
            <h2>{{ title.title }} {{ title.year }}</h2>
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
      actor: {},
      hasMaxRequests: false,
      movies: [],
    };
  },
  computed: {
    // ...mapGetters(["actor"]),
  },
  created() {
    this.init();
    // this.getMockData();
  },
  methods: {
    ...mapActions(["fetchActor"]),
    async init() {
      //Load title data
      const actorId = this.$route.params.id;
      //TODO: Handle Error & max requests
      //TODO: Use Vuex store instead of returning actor obj
      const actor = await this.fetchActor({ actorId });
      this.actor = actor;
      this.movies = this.actor.castMovies.slice(0, 10);

      this.knownFors = actor.knownFor;
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
