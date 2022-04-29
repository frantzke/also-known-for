<template>
  <v-row>
    <v-col class="text-center">
      <h3>{{ actor.name }} : {{ $route.params.id }}</h3>
      <!-- <h4>{{actor.summary}}</h4> -->
      <h4>Known For:</h4>
      <!-- <ul>
        <li v-for="knownFor in knownFors" :key="knownFor.id">
          
        </li>
      </ul> -->
      <div v-for="knownFor in knownFors" :key="knownFor.id">
        <img :src="knownFor.image" alt="" width="100" height="150" />
        <p>{{ knownFor.title }} as {{ knownFor.role }}</p>
      </div>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "ActorPage",
  data() {
    return {
      actor: {},
      knownFors: [],
    };
  },
  computed: {},
  created() {
    this.init();
  },
  methods: {
    async init() {
      //Load title data
      const actorId = this.$route.params.id;
      const actor = await fetch(
        `https://imdb-api.com/en/API/Name/k_di6us43c/${encodeURIComponent(
          actorId
        )}`
      ).then(async (response) => {
        return await response.json();
      });
      // const actor = await response.json();
      // console.log(actor);
      this.actor = actor;
      this.knownFors = actor.knownFor;
    },
  },
};
</script>
