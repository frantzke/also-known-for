<template>
  <v-app>
    <v-app-bar fixed app>
      <v-btn color="primary" icon to="/">
        <v-icon>mdi-home</v-icon>
      </v-btn>

      <v-toolbar-title v-text="title" />
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>

    <v-footer absolute app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
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
};
</script>
