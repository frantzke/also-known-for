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
            :src="actor.image"
            :alt="`photo of ${actor.name}`"
            lazy-src="https://imdb-api.com/images/original/nopicture.jpg"
            contain
            width="100%"
            aspect-ratio="2/3"
          />
        </v-col>
        <v-col cols="12" sm="6" md="9" class="text-left">
          <h2 v-if="$vuetify.breakpoint.smAndDown" class="text-h3 mb-2">
            {{ actor.name }}
          </h2>
          <h2 v-else class="text-h2 mb-2">{{ actor.name }}</h2>
          <v-divider dark class="my-2" />
          <p>{{ actor.summary }}</p>
          <v-divider dark class="my-2" />
          <p>{{ actor.role }}</p>
          <v-divider dark class="my-2" />
          <p>{{ actor.awards }}</p>
        </v-col>
      </v-row>
    </v-container>

    <v-divider dark class="my-4 primary" />

    <h4 class="mb-2 text-h4 font-weight-light">Known For</h4>
    <div class="d-flex py-4 item-container">
      <Poster
        v-for="kfor in actor.knownFor"
        :key="`kfor_${kfor.id}`"
        :imageSrc="kfor.image"
        :name="kfor.title"
        :role="kfor.role"
        @on-click="onClickTitle(kfor.id)"
      />
    </div>

    <v-divider dark class="my-4 primary" />

    <h4 class="mb-2 text-h4 font-weight-light">Movies</h4>
    <div
      v-for="(title, index) in actor.castMovies"
      :key="index"
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

import Poster from "@/components/Poster.vue";

export default {
  name: "ActorPage",
  components: {
    Poster,
  },
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
      const actor = this.actorById(actorId);
      return actor ? actor : {};
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

.item-container {
  overflow-x: auto;
  overflow-y: hidden;
}
</style>
