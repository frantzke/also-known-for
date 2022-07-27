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
        <v-divider dark class="my-2"/>
        <!-- TODO: Max length plot -->
        <p>{{ title.plot }}</p>
        <v-divider dark class="my-2"/>
        <p>{{title.genres}}</p>
        <v-divider dark class="my-2"/>
        <p>Directors: {{title.directors}}</p>
        <v-divider dark class="my-2"/>
        <p>Writers: {{title.writers}}</p>
        <v-divider dark class="my-2"/>
        <p>{{title.awards}}</p>
      </v-col>
    </v-row>

    <v-divider dark class="my-4 primary" />

    <v-row no-gutters>
      <v-col cols="12" v-for="actor in actors" :key="actor.id">
        <v-hover v-slot="{ hover }">
          <div class="d-flex py-4" :class="{ 'on-hover': hover }">
            <div class="actor-container" @click="onClickActor(actor.id)">
              <img
                :src="actor.image"
                :alt="actor.name"
                width="140"
                height="210"
              />
              <p class="mb-0 text-subtitle-1">{{ actor.name }}</p>
            </div>
            <v-divider dark vertical class="mx-2 primary" />
            <div
              class="known-for-container mx-2"
              v-for="kfor in actor.knownFor"
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
            <v-icon large @click="onAddRoles(actor)"> mdi-chevron-right </v-icon>
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
    ...mapGetters(["title", "actors"]),
  },
  created() {
    this.init();
    // this.getMockData();
  },
  methods: {
    ...mapActions(["fetchTitle", "fetchActor", "fetchActors"]),
    async init() {
      //Load title data
      const titleId = this.$route.params.id;
      //TODO: Handle error and max requests
      await this.fetchTitle({ titleId });

      //TODO: Temporarily only fetch one star
      const starList = [this.title.starList[0]];

      const starListKeys = starList.map((star) => star.id);
      await this.fetchActors({actorIds: starListKeys});
    },
    getMockData() {
      const { title, stars } = mockData();
      this.title = title;
      this.actors = stars;
      // console.log(stars);
    },
    async onAddRoles(actor) {
      console.log(actor);
      //TODO: Change slice based on additionalRoles

      //Filter down to 5 more roles
      const roleKeys = actor.castMovies.slice(0, 5).map((role) => role.id);
      const knowForKeys = actor.knownFor.map((kFor) => kFor.id);
      //Filter out roles we have already seen
      const additionalTitles = roleKeys.filter(
        (key) => !knowForKeys.includes(key)
      );

      //Load 5 more roles
      const promises = additionalTitles.map((titleId) => {
        return this.fetchTitle({ titleId });
      });
      //TODO: This will set the title in the store over and over...
      const titleResults = await Promise.all(promises);
      //Format titleResulst to what we need
      console.log(titleResults);

      const results = titleResults.filter((title) => title.actorList);

      const roles = titleResults.map(title => {
        //Filter title.actorList for this actor
        
        return {
          fullTitle: title.fullTitle,
          id: title.id,
          image: title.image
        }
      });

      //Add roles to additional Roles array

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
