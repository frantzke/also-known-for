<template>
  <div @click="onClickTitle(title.id)">
    <v-hover v-slot="{ hover }">
      <div class="d-flex py-4" :class="{ 'on-hover': hover }">
        <v-img
          :src="title.image"
          lazy-src="https://imdb-api.com/images/original/nopicture.jpg"
          contain
          aspect-ratio="2/3"
          height="270px"
          max-width="180px"
        />
        <div class="px-4 py-2">
          <h2>{{ title.title }}</h2>
          <p class="subtitle-1 font-weight-light">{{ title.description }}</p>
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
  methods: {
    onClickTitle(id) {
      this.$router.push(`/title/${id}`);
    },
  },
};
</script>
<style>
.on-hover {
  background-color: #272727;
}
</style>
