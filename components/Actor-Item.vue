<template>
  <v-col cols="12">
    <v-hover v-slot="{ hover }">
      <div class="d-flex py-4" :class="{ 'on-hover': hover }">
        <div class="actor-container" @click="onClickActor(actor.id)">
          <v-img
            :src="actor.image"
            :alt="actor.name"
            lazy-src="https://imdb-api.com/images/original/nopicture.jpg"
            contain
            aspect-ratio="2/3"
            max-width="16rem"
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
          <v-img
            :src="kfor.image"
            :alt="kfor.title"
            lazy-src="https://imdb-api.com/images/original/nopicture.jpg"
            contain
            aspect-ratio="2/3"
            max-width="16rem"
          />
          <p class="mb-0 text-subtitle-1">{{ kfor.title }}</p>
          <p class="mb-0 text-body-1 font-weight-light">As {{ kfor.role }}</p>
        </div>
        <div
          class="known-for-container mx-2"
          v-for="role in actor.additionalRoles"
          :key="role.id"
          @click="onClickTitle(role.id)"
        >
          <img :src="role.image" :alt="role.title" width="140" height="210" />
          <p class="mb-0 text-subtitle-1">{{ role.title }}</p>
          <p class="mb-0 text-body-1 font-weight-light">As {{ role.role }}</p>
        </div>
        <!-- <v-icon large @click="onAddRoles(actor)"> mdi-chevron-right </v-icon> -->
      </div>
    </v-hover>

    <v-divider />
  </v-col>
</template>
<script>
export default {
  props: {
    actor: Object,
  },
  methods: {
    onClickActor(id) {
      this.$router.push(`/actor/${id}`);
    },
    onClickTitle(id) {
      this.$router.push(`/title/${id}`);
    },
  },
};
</script>
<style>
.actor-container {
  max-width: 140px;
}

.known-for-container {
  max-width: 140px;
}
</style>
