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
          :src="title.image"
          :alt="`movie poster for ${title.fullTitle}`"
          height="400"
          max-width="100%"
          aspect-ratio="2/3"
          contain
        />
      </v-col>
      <v-col cols="9" class="text-left">
        <h2 class="text-h2 mb-2">{{ title.fullTitle }}</h2>
        <p>{{ title.plot }}</p>
      </v-col>
    </v-row>

    <v-divider dark class="my-4 primary" />

    <v-row no-gutters>
      <v-col cols="12" v-for="star in stars" :key="star.id">
        <v-hover v-slot="{ hover }">
          <div class="d-flex py-4" :class="{ 'on-hover': hover }">
            <div class="actor-container" @click="onClickActor(star.id)">
              <img
                :src="star.image"
                :alt="star.name"
                width="140"
                height="210"
              />
              <p class="mb-0 text-subtitle-1">{{ star.name }}</p>
            </div>
            <v-divider dark vertical class="mx-2 primary" />
            <div
              class="known-for-container mx-2"
              v-for="kfor in star.knownFor"
              :key="kfor.id"
              @click="onClickTitle(kfor.id)"
            >
              <img
                :src="kfor.image"
                :alt="kfor.title"
                width="140"
                height="210"
              />
              <p class="mb-0 text-subtitle-1">{{ kfor.title }}</p>
              <p class="mb-0 text-body-1 font-weight-light">
                As {{ kfor.role }}
              </p>
            </div>
          </div>
        </v-hover>

        <v-divider />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import mockData from "@/helpers/mockData";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "TitlePage",
  data() {
    return {
      stars: [],
      hasMaxRequests: false,
    };
  },
  computed: {
    ...mapGetters(["title"]),
  },
  created() {
    this.init();
    // this.getMockData();
  },
  methods: {
    ...mapActions(["fetchTitle", "fetchActor"]),
    async init() {
      //Load title data
      const titleId = this.$route.params.id;
      //TODO: Handle error and max requests
      await this.fetchTitle({ titleId });

      //TODO: Temporarily only fetch one star
      const starList = [this.title.starList[0]];

      //TODO: Move this into a Vuex action
      const promises = starList.map((star) => {
        return this.fetchActor({ actorId: star.id });
      });
      const actorResults = await Promise.all(promises);
      this.stars = actorResults;
    },
    getMockData() {
      const { title, stars } = mockData();
      this.title = title;
      this.stars = stars;
      console.log(stars);
    },
    onClickActor(id) {
      this.$router.push(`/actor/${id}`);
    },
    onClickTitle(id) {
      this.$router.push(`/title/${id}`);
    },
  },
};
</script>

<style scoped>
.h-flex {
  display: flex;
}

.on-hover {
  background-color: #272727;
}

.actor-container {
  max-width: 140px;
}

.known-for-container {
  max-width: 140px;
}
</style>
