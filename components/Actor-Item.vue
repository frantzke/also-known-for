<template>
  <v-col cols="12">
    <div class="d-flex py-4 item-container">
      <Poster
        :imageSrc="imageSrc"
        :name="actor.name"
        :role="actor.character"
        @on-click="onClickActor(actor.id)"
      />
      <v-divider dark vertical class="mx-2 primary" />
      <Poster
        v-for="(role, index) in actor.roles"
        :key="`${actor.id}-${role.id}-${index}`"
        :imageSrc="getRoleImage(role.poster_path)"
        :name="role.title"
        :role="role.character"
        @on-click="onClickTitle(role.id, role.credit_id)"
      />
      <div class="d-flex align-center">
        <v-progress-circular
          v-if="actor.roles.length === 0"
          indeterminate
          color="primary"
        />
        <!-- <v-icon v-else large color="primary" @click="onAddRoles"> mdi-menu-right </v-icon> -->
      </div>
    </div>

    <v-divider />
  </v-col>
</template>
<script>
import { mapActions } from "vuex";

import { fetchCredit } from "../api";

import Poster from "./Poster.vue";

export default {
  name: "ActorItem",
  props: {
    actor: Object,
  },
  components: {
    Poster,
  },
  data() {
    return {
      isLoading: false,
    };
  },
  computed: {
    imageSrc() {
      if (this?.actor?.profile_path) {
        return `https://image.tmdb.org/t/p/w185${this.actor.profile_path}`;
      } else {
        return "nopicture.jpg";
      }
    },
    hasNoRoles() {
      return this.actor.roles.length === 0;
    },
  },
  methods: {
    ...mapActions(["fetchActorTitles"]),
    onClickActor(id) {
      this.$router.push(`/person/${id}`);
    },
    async onClickTitle(id, credit_id) {
      try {
        const credit = await fetchCredit(credit_id);

        if (credit.media_type === "movie") {
          this.$router.push(`/movie/${id}`);
        } else if (credit.media_type === "tv") {
          this.$router.push(`/tv/${id}`);
        }
      } catch (error) {
        console.log(error);
      }
    },
    getRoleImage(posterPath) {
      if (posterPath) {
        return `https://image.tmdb.org/t/p/w185${posterPath}`;
      } else {
        return "nopicture.jpg";
      }
    },
    async onAddRoles() {
      try {
        this.isLoading = true;
        await this.fetchActorTitles({ actorId: this.actor.id });
      } catch (err) {
        console.log(err.message);
        this.$emit("error", err.message);
      } finally {
        this.isLoading = false;
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
