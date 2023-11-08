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
            :alt="`photo of ${actor.name}`"
            lazy-src="nopicture.jpg"
            contain
            width="100%"
            aspect-ratio="2/3"
          />
        </v-col>
        <v-col cols="12" sm="6" md="8" class="text-left">
          <h2 v-if="$vuetify.breakpoint.smAndDown" class="text-h3 mb-2">
            {{ actor.name }}
          </h2>
          <h2 v-else class="text-h2 mb-2">{{ actor.name }}</h2>
          <v-divider dark class="my-2" />
          <p>{{ actor.biography }}</p>
          <v-divider dark class="my-2" />
          <v-chip outlined dark color="primary" class="mr-2">
            {{ actor.known_for_department }}
          </v-chip>
          <v-divider dark class="my-2" />
          <!-- TODO: Format Date -->
          <p>Born: {{ actor.birthday }} {{ actor.place_of_birth }}</p>
          <div v-if="actor.deathday">
            <v-divider dark class="my-2" />
            <p>Death: {{ actor.deathday }}</p>
          </div>
        </v-col>
      </v-row>
    </v-container>

    <div v-if="!hasError">

      <v-divider dark class="my-4 primary" />

      <h4 class="mb-2 text-h4 font-weight-light">Cast Credits</h4>

      <v-container>
        <v-row>
          <v-col
            v-for="role in roles"
            class="d-flex child-flex"
            lg="2"
            md="3"
            sm="4"
          >
            <Poster
              :key="role.id"
              :posterPath="role.poster_path"
              :name="role.title"
              :role="role.character"
              @on-click="onClickTitle(role.id, role.credit_id)"
            />
          </v-col>
        </v-row>
      </v-container>

      <v-divider dark class="my-4 primary" />

      <h4 class="mb-2 text-h4 font-weight-light">Crew Credits</h4>

      <v-container>
        <v-row>
          <v-col
            v-for="credit in crew"
            class="d-flex child-flex"
            lg="2"
            md="3"
            sm="4"
          >
            <Poster
              :key="credit.id"
              :posterPath="credit.poster_path"
              :name="credit.title"
              :role="credit.job"
              @on-click="onClickTitle(role.id, role.credit_id)"
            />
          </v-col>
        </v-row>
      </v-container>

    </div>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

import { fetchCredit } from "@/api";
import Poster from "@/components/Poster.vue";
import TitleItem from "@/components/Title-Item.vue";

export default {
  name: "ActorPage",
  components: {
    Poster,
    TitleItem,
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
    ...mapGetters(["actor"]),
    imageSrc() {
      if (this?.actor?.profile_path) {
        return `https://image.tmdb.org/t/p/w500${this.actor.profile_path}`;
      } else {
        return "nopicture.jpg";
      }
    },
    roles() {
      return this?.actor?.combined_credits?.cast || [];
    },
    crew() {
      const crew = this?.actor?.combined_credits?.crew || [];
      const copyOfCrew = [...crew];
      copyOfCrew.sort((a, b) => b.popularity - a.popularity);
      return copyOfCrew;
    },
  },
  created() {
    this.init();
  },
  methods: {
    ...mapActions(["fetchActor"]),
    async init() {
      // Check if actor is already loaded
      const actorId = this.$route.params.id;
      if (this.actor.id === actorId) return;

      try {
        await this.fetchActor({ actorId });

        console.log(this.actor);
      } catch (err) {
        this.hasError = true;
        this.errorMsg = err.message;
      }
    },
    async onClickTitle(id, credit_id) {
      const credit = await fetchCredit(credit_id);

      if (credit.media_type === "movie") {
        this.$router.push(`/movie/${id}`);
      } else if (credit.media_type === "tv") {
        this.$router.push(`/tv/${id}`);
      }
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
