<template>
  <div class="pb-8">
    <h3 class="text-h3 font-weight-light header-highlight pl-2">
      {{ header }}
    </h3>
    <h5 class="text-h6 font-weight-light">{{ subheader }}</h5>
    <div class="d-flex py-4 item-container">
      <v-skeleton-loader
        v-if="!isLoaded"
        v-for="i in 6"
        :key="i"
        width="12rem"
        class="mx-auto"
        type="card"
      />
      <Poster
        v-for="title in titles"
        :key="title.id"
        :posterPath="getPosterPath(title)"
        :name="getName(title)"
        @on-click="onClickTitle(title.id, title.media_type)"
      />
    </div>
  </div>
</template>
<script>
import Poster from "./Poster.vue";

export default {
  name: "TitleList",
  props: {
    header: String,
    subheader: String,
    titles: Array,
    mediaType: String,
  },
  components: {
    Poster,
  },
  computed: {
    isLoaded() {
      if (!this.titles) return false;
      return this.titles?.length > 0;
    },
  },
  methods: {
    getName(title) {
      return title.title || title.name;
    },
    getPosterPath(title) {
      return title.poster_path || title.profile_path;
    },
    onClickTitle(id, mediaType) {
      let type = mediaType !== undefined ? mediaType : this.mediaType;
      if (type === "person") {
        this.$router.push(`/person/${id}`);
      } else if (type === "tv") {
        this.$router.push(`/tv/${id}`);
      } else {
        this.$router.push(`/movie/${id}`);
      }
    },
  },
};
</script>
<style>
.item-container {
  overflow-x: auto;
  overflow-y: hidden;
}

.header-highlight {
  border-left: 0.5rem solid #fbc02d;
}

::-webkit-scrollbar {
  height: 0.75rem;
  width: 0.75rem;
  background: #000;
}
::-webkit-scrollbar-thumb:horizontal {
  background: #fbc02d;
  border-radius: 10px;
}
</style>
