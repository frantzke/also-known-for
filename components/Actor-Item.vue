<template>
  <v-col cols="12">
    <div class="d-flex py-4 item-container">
      <Poster
        :posterPath="actor.profile_path"
        :name="actor.name"
        :role="actor.character"
        @on-click="onClickActor(actor.id)"
      />
      <v-divider dark vertical class="mx-2 primary" />
      <Poster
        v-for="(role, index) in roles"
        :key="`${actor.id}-${role.id}-${index}`"
        :posterPath="role.poster_path"
        :name="role.title"
        :role="role.character"
        @on-click="onClickTitle(role.id, role.credit_id)"
      />
      <div class="d-flex align-center">
        <v-progress-circular v-if="hasNoRoles" indeterminate color="primary" />
      </div>
    </div>

    <v-divider />
  </v-col>
</template>
<script>
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
    roles() {
      return this.actor?.combined_credits?.cast || [];
    },
    hasNoRoles() {
      return this.actor?.combined_credits?.cast?.length === 0;
    },
  },
  methods: {
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
