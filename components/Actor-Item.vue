<template>
  <v-col cols="12">
    <div class="d-flex py-4 item-container">
      <div @click="onClickActor(actor.id)">
        <v-img
          :src="actor.image"
          :alt="actor.name"
          lazy-src="https://imdb-api.com/images/original/nopicture.jpg"
          contain
          aspect-ratio="2/3"
          max-width="10vw"
        />
        <p class="mb-0 text-subtitle-1">{{ actor.name }}</p>
      </div>
      <v-divider dark vertical class="mx-2 primary" />
      <div
        class="mx-2"
        v-for="role in actor.roles"
        :key="role.id"
        @click="onClickTitle(role.id)"
      >
        <v-img
          :src="role.image"
          :alt="role.title"
          lazy-src="https://imdb-api.com/images/original/nopicture.jpg"
          contain
          aspect-ratio="2/3"
          max-width="10vw"
        />
        <p class="mb-0 text-subtitle-1">{{ role.title }}</p>
        <p class="mb-0 text-body-1 font-weight-light primary--text">As {{ role.role }}</p>
      </div>
      <div class="d-flex align-center">
        <v-progress-circular v-if="isLoading" indeterminate color="primary"/>
        <v-icon v-else large color="primary" @click="onAddRoles"> mdi-menu-right </v-icon>
      </div>
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
  data() {
    return {
      isLoading: false
    }
  },
  methods: {
    ...mapActions(["fetchActorTitles"]),
    onClickActor(id) {
      this.$router.push(`/actor/${id}`);
    },
    onClickTitle(id) {
      this.$router.push(`/title/${id}`);
    },
    async onAddRoles() {
      try {
        this.isLoading = true;
        await this.fetchActorTitles({actorId: this.actor.id});
      } catch (err) {
        console.log(err.message);
        this.$emit("error", err.message);
      } finally {
        this.isLoading = false;
      }
    }
  },
};
</script>
<style>

.item-container {
  overflow-x: auto;
  overflow-y: hidden;
}

</style>
