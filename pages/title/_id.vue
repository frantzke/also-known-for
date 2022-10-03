<template>
  <v-container>
    <div v-if="hasError">
      <h4 class="text-h4 text-center font-weight-light">
        {{errorMsg}} 😖
      </h4>
      <!-- <p class="subtitle-1 text-center font-weight-light">
        Maximum requests for today 😢
        Please come back tomorrow
      </p> -->
    </div>

    <v-row v-else>
      <v-col cols="3">
        <v-img
          :src="title.image"
          :alt="`movie poster for ${title.fullTitle}`"
          lazy-src="https://imdb-api.com/images/original/nopicture.jpg"
          contain
          aspect-ratio="2/3"
          height="27rem"
          max-width="18rem"
        />
      </v-col>
      <v-col cols="9" class="text-left">
        <h2 class="text-h2 mb-2">{{ title.fullTitle }}</h2>
        <v-divider dark class="my-2" />
        <!-- TODO: Max length plot -->
        <p>{{ title.plot }}</p>
        <v-divider dark class="my-2" />
        <p>{{ title.genres }}</p>
        <v-divider dark class="my-2" />
        <p v-if="hasDirectors">Directors: {{ title.directors }}</p>
        <v-divider dark class="my-2"  v-if="hasDirectors"/>
        <p v-if="hasWriters">Writers: {{ title.writers }}</p>
        <v-divider dark class="my-2" v-if="hasWriters"/>
        <p>{{ title.awards }}</p>
      </v-col>
    </v-row>

    <v-divider dark class="my-4 primary" />

    <v-row no-gutters>
      <ActorItem v-for="actor in actors" :key="actor.id" :actor="actor" @error="onActorError"/>
    </v-row>

    <div class="d-flex justify-center" v-if="!hasError">
      <v-btn
        large
        text
        append-icon
        class="m-4 primary--text"
        color="primary"
        @click="onMoreActors"
      >
        More Cast
        <v-icon color="primary" right large>
          mdi-menu-down
        </v-icon>
      </v-btn>
    </div>

    <v-snackbar v-model="showSnackBar" color="red" timeout="3500">
      {{ errorMessage }}
    </v-snackbar>
  </v-container>
</template>

<script>
import mockData from "@/helpers/mockData";
import { mapGetters, mapActions } from "vuex";
import ActorItem from "@/components/Actor-Item.vue";
import { title } from "process";

export default {
  name: "TitlePage",
  components: {
    ActorItem,
},
  data() {
    return {
      hasError: false,
      errorMessage: "An error occurred",
      showSnackBar: false
    };
  },
  computed: {
    ...mapGetters(["title", "actors"]),
    hasDirectors() {
      return this.title?.directors?.length > 0;
    },
    hasWriters() {
      return this.title?.writers?.length > 0;
    }
  },
  created() {
    this.init();
    // this.getMockData();
  },
  methods: {
    ...mapActions(["fetchTitle",  "fetchActor", "fetchActors", "resetTitlePage"]),
    async init() {
      //Load title data
      const titleId = this.$route.params.id;

      if (this.title.id === titleId) {
        //Title is already loaded.
        return;
      } else {
        this.resetTitlePage();
      }

      //TODO: Handle error and max requests
      try {
        await this.fetchTitle({ titleId });

        //TODO: Temporarily only fetch one star
        const starList = [this.title.starList[0]];
  
        const starListKeys = starList.map((star) => star.id);
        await this.fetchActors({ actorIds: starListKeys });
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
    onMoreActors() {
      console.log("More Actors")
      const index = this.actors.length;
      const actors = [...this.title.actorList].slice(index, index + 2);
      const actorIds = actors.map((actor) => actor.id);

      this.fetchActors({actorIds});
    },
    onActorError(message) {
      this.showSnackBar = true;
      this.errorMessage = message;
    }
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
