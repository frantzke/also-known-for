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

export default {
  name: "TitlePage",
  data() {
    return {
      title: {},
      stars: [],
      hasMaxRequests: false,
    };
  },
  computed: {},
  created() {
    // this.init();
    this.getMockData();
  },
  methods: {
    async init() {
      //Load title data
      const titleId = this.$route.params.id;
      const response = await fetch(
        `https://imdb-api.com/en/API/Title/k_di6us43c/${encodeURIComponent(
          titleId
        )}`
      );
      const title = await response.json();
      console.log("Title:", title);

      this.title = title;

      if (title.starList === null) {
        //Max requests reached for today
        this.hasMaxRequests = true;
      }

      // const starId = title.starList[0].id;
      // const promises = [this.getActor(starId)];
      const promises = title.starList.map((star) => {
        return this.getActor(star.id);
      });
      const actorResults = await Promise.all(promises);
      console.log("actorResults: ", actorResults);
      this.stars = actorResults;
    },
    async getActor(actorId) {
      const actor = await fetch(
        `https://imdb-api.com/en/API/Name/k_di6us43c/${encodeURIComponent(
          actorId
        )}`
      ).then(async (response) => {
        return await response.json();
      });
      return actor;
    },
    getMockData() {
      const { title, stars } = mockData();
      // console.log("title: ", title);
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
