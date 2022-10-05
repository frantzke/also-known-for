<template>
  <v-col cols="12">
    <div class="d-flex py-4 item-container">
      <Poster :imageSrc="actor.image" :name="actor.name" @on-click="onClickActor(actor.id)"/>
      <v-divider dark vertical class="mx-2 primary" />
      <Poster 
        v-for="role in actor.roles" 
        :key="role.id" 
        :imageSrc="role.image" 
        :name="role.title" 
        :role="role.role"
        @on-click="onClickTitle(role.id)"
      />
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

import Poster from './Poster.vue';

export default {
  name: "ActorItem",
  props: {
    actor: Object,
  },
  components: {
    Poster
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
