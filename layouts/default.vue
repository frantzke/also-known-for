<template>
  <v-app>
    <v-app-bar color="rgb(18,18,18)" fixed app>
      <div class="nav-bar-content">
        <div class="nav-bar-title">
          <img src="AKF-Logo.ico" width="40" height="40" @click="onHome()" />
          <a
            color="primary"
            class="text-h6 font-weight-regular pl-4"
            @click="onHome()"
          >
            {{ title }}
          </a>
          <div v-if="$vuetify.breakpoint.mdAndUp" class="search-container">
            <v-text-field
              placeholder="Search Movies, TV Shows, and People"
              v-model="searchText"
              required
              solo
              hide-details="auto"
              color="secondary"
              class="pa-2"
              @click="isExpanded = true"
              @keyup.enter="onSearch"
              @input="onKeyType"
            />
            <div
              v-if="isExpanded"
              class="d-flex flex-column secondary expand-container"
            >
              <v-skeleton-loader v-if="isLoading" type="list-item-three-line" />
              <TitleItem
                v-for="title in titles"
                :key="title.id"
                :title="title"
                @item-clicked="onItemClicked"
              />
            </div>
          </div>
        </div>
        <v-icon
          v-if="$vuetify.breakpoint.smAndDown"
          large
          @click="toggleOverlay"
        >
          mdi-magnify
        </v-icon>
      </div>
    </v-app-bar>
    <v-main ref="main">
      <v-container class="main-container">
        <Nuxt />
      </v-container>
      <v-overlay class="search-overlay" :value="overlay" opacity="1">
        <v-toolbar class="sticky-toolbar">
          <v-text-field
            placeholder="Search Movies, TV Shows, and People"
            v-model="searchText"
            required
            solo
            full-width
            dense
            hide-details="auto"
            color="secondary"
            class="pa-2"
            @click="isExpanded = true"
            @keyup.enter="onSearch"
            @input="onKeyType"
          />
          <v-icon large @click="toggleOverlay">mdi-close</v-icon>
        </v-toolbar>
        <div class="secondary searchResults">
          <v-skeleton-loader v-if="isLoading" type="list-item-three-line" />
          <TitleItem
            v-for="title in titles"
            :key="title.id"
            :title="title"
            @item-clicked="onItemClicked"
          />
        </div>
      </v-overlay>
    </v-main>
  </v-app>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

import TitleItem from "../components/Title-Item.vue";

export default {
  name: "DefaultLayout",
  components: {
    TitleItem,
  },
  data() {
    return {
      title: "Also Known For",
      isExpanded: false,
      isLoading: false,
      searchText: "",
      hasError: false,
      errorMsg: "",
      debounceTimeout: null,
      overlay: false,
    };
  },
  computed: {
    ...mapGetters(["titles"]),
  },
  mounted() {
    this.attachClickEventToMain();
  },
  methods: {
    ...mapActions(["searchTitles", "resetSearchPage"]),
    attachClickEventToMain() {
      // Attach onclick to close the search menu when clicking outside of it
      const mainElement = this.$refs.main.$el;
      if (mainElement) {
        mainElement.addEventListener("click", () => {
          this.isExpanded = false;
        });
      }
    },
    onHome() {
      this.$router.push(`/`);
    },
    onKeyType(text) {
      this.isExpanded = true;
      this.isLoading = true;
      this.resetSearchPage();
      clearTimeout(this.debounceTimeout);
      this.debounceTimeout = setTimeout(() => {
        this.onSearch();
      }, 500);
    },
    async onSearch() {
      if (this.searchText === "") {
        this.isLoading = false;
        return;
      }

      try {
        this.hasError = false;
        this.isLoading = true;
        await this.searchTitles({ searchText: this.searchText });
      } catch (err) {
        this.hasError = true;
        this.errorMsg = err.message;
      } finally {
        this.isLoading = false;
      }
    },
    toggleOverlay() {
      this.overlay = !this.overlay;
    },
    onItemClicked() {
      this.isExpanded = false;
      this.overlay = false;
      this.searchText = "";
      this.resetSearchPage();
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

.search-container {
  position: absolute;
  left: 50%;
  top: 50%;
  -webkit-transform: translate(-50%, -50%);
  -moz-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  flex: 1 1 auto;
  max-width: 640px;
  width: 50%;
}

.expand-container {
  position: absolute;
  z-index: 8;
  width: 100%;
  max-width: 624px;
  top: 56px;
  left: 8px;
}

.search-overlay.v-overlay {
  align-items: start;
  height: 100%;
  overflow: auto;
}

.search-overlay .v-overlay__content {
  flex-grow: 1;
}

.search-icon {
  justify-self: flex-end;
}

.v-toolbar.sticky-toolbar {
  position: sticky;
  top: 0;
  z-index: 9;
}
</style>
