<template>
  <v-app>
    <v-app-bar color="rgb(18,18,18)" fixed app>
      <div class="nav-bar-content">
        <div class="nav-bar-title">
          <img src="AKF-Logo.ico" width="40" height="40" @click="onHome()"/>
          <a
            color="primary"
            class="text-h6 font-weight-regular pl-4"
            @click="onHome()"
          >
            {{ title }}
          </a>
        </div>
      </div>
    </v-app-bar>
    <v-main>
      <v-container class="main-container">
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "DefaultLayout",
  data() {
    return {
      title: "Also Known For",
    };
  },
  methods: {
    onHome() {
      this.$router.push(`/`);
    },
  },
};
</script>

<style>
.nav-bar-content {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.nav-bar-title {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0 24px;
  max-width: 1280px;
}

.main-container {
  max-width: 1280px !important;
}
</style>
