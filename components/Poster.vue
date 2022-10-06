<template>
  <div class="mx-2 poster-container" @click="$emit('on-click')">
    <v-img
      :src="imageSrc"
      :alt="`Poster for ${name}`"
      lazy-src="https://imdb-api.com/images/original/nopicture.jpg"
      contain
      aspect-ratio="2/3"
    />
    <p class="mb-0 text-subtitle-1">{{ name }}</p>
    <p v-if="role" class="mb-0 text-body-1 font-weight-light primary--text">
      As {{ role }}
    </p>
  </div>
</template>
<script>
export default {
  name: "Poster",
  props: {
    imageSrc: String,
    name: String,
    role: String,
  },
};
</script>
<style>
.poster-container {
  max-width: 12rem;
}
</style>
