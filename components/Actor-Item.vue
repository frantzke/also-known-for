<template>
  <v-col cols="12">
    <div class="d-flex py-4 item-container">
      <div class="actor-container" @click="onClickActor(actor.id)">
        <v-img
          :src="actor.image"
          :alt="actor.name"
          lazy-src="https://imdb-api.com/images/original/nopicture.jpg"
          contain
          aspect-ratio="2/3"
          max-width="20rem"
        />
        <p class="mb-0 text-subtitle-1">{{ actor.name }}</p>
      </div>
      <v-divider dark vertical class="mx-2 primary" />
      <div
        class="known-for-container mx-2"
        v-for="role in actor.roles"
        :key="role.id"
        @click="onClickTitle(kfor.id)"
      >
        <v-img
          :src="role.image"
          :alt="role.title"
          lazy-src="https://imdb-api.com/images/original/nopicture.jpg"
          contain
          aspect-ratio="2/3"
          max-width="16rem"
        />
        <p class="mb-0 text-subtitle-1">{{ role.title }}</p>
        <p class="mb-0 text-body-1 font-weight-light">As {{ role.role }}</p>
      </div>
      <v-icon large color="primary" @click="onAddRoles"> mdi-chevron-right </v-icon>
    </div>

    <v-divider />
  </v-col>
</template>
<script>
import { mapActions } from "vuex";

export default {
  props: {
    actor: Object,
  },
  methods: {
    ...mapActions(["fetchActorTitles"]),
    onClickActor(id) {
      this.$router.push(`/actor/${id}`);
    },
    onClickTitle(id) {
      this.$router.push(`/title/${id}`);
    },
    onAddRoles() {
      this.fetchActorTitles({actorId: this.actor.id});
    }
  },
};
</script>
<style>
.actor-container {
  max-width: 140px;
}

.item-container {
  overflow-x: auto;
  overflow-y: hidden;
}

.known-for-container {
  max-width: 140px;
}
</style>
