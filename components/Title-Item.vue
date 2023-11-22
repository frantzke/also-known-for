<template>
  <div @click="onClickTitle(title.id)">
    <v-hover v-slot="{ hover }">
      <div class="d-flex py-4" :class="{ 'on-hover': hover }">
        <v-img
          :src="posterPath"
          :alt="`Poster for ${title.title}`"
          lazy-src="nopicture.jpg"
          contain
          aspect-ratio="2/3"
          max-width="6rem"
        />
        <div class="px-4 py-2">
          <h2>{{ title.name || title.title }}</h2>
          <p class="subtitle-1 font-weight-light">{{ subTitle }}</p>
        </div>
      </div>
    </v-hover>

    <v-divider />
  </div>
</template>
<script>
export default {
  props: {
    title: Object,
  },
  computed: {
    posterPath() {
      if (this.title.poster_path) {
        return `https://image.tmdb.org/t/p/w185${this.title.poster_path}`;
      } else if (this.title.profile_path){
        return `https://image.tmdb.org/t/p/w185${this.title.profile_path}`;
      } else {
        return "nopicture.jpg";
      }
    },
    subTitle() {
      let mediaType = this.title.media_type;
      if (mediaType === "movie") {
        mediaType = mediaType.charAt(0).toUpperCase() + mediaType.slice(1);
        const year = this.title.release_date.split("-")[0];
        return `${mediaType} (${year})`;
      } else if (mediaType === "tv") {
        mediaType = mediaType.toUpperCase();
        const year = this.title.first_air_date.split("-")[0];
        return `${mediaType} (${year})`;
      } else if (mediaType === "person") {
        return this.title.known_for_department;
      }
    },
  },
  methods: {
    onClickTitle(id) {
      let mediaType = this.title.media_type;
      if (mediaType === "movie") {
        this.$router.push(`/movie/${id}`);
      } else if (mediaType === "tv") {
        this.$router.push(`/tv/${id}`);
      } else if (mediaType === "person") {
        this.$router.push(`/person/${id}`);
      }
      this.$emit('item-clicked');
    },
  },
};
</script>
<style>
.on-hover {
  background-color: #272727;
}
</style>
