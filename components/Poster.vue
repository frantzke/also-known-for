<template>
  <div class="mx-2 poster-container" @click="$emit('on-click')">
    <v-img
      :src="imageSrc"
      :alt="`Poster for ${name}`"
      lazy-src="nopicture.jpg"
      contain
      aspect-ratio="2/3"
      height="16rem"
      width="12rem"
    />
    <p class="mb-0 text-subtitle-1">{{ name }}</p>
    <p v-if="role" class="mb-0 text-body-1 font-weight-light primary--text">
      As {{ trimmedRole }}
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
  computed: {
    trimmedRole() {
      return this.role.length > 100
        ? this.role.substring(0, 100 - 3) + "..."
        : this.role;
    },
  },
};
</script>
<style>
.poster-container {
  width: 12rem;
}
</style>
