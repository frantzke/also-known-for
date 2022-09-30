import Vue from "vue";
import { BASE_URL, API_KEY } from "../env";

// root state
export const state = () => ({
  titles: {},
  title: {},
  stars: [],
  actor: {},
  actors: {},
});

export const actions = {
  async searchTitles({ commit }, { searchText }) {
    //TODO: Handle undefined baseUrl + apiKey
    const encodedText = encodeURIComponent(searchText);
    const url = `${BASE_URL}/SearchTitle/${API_KEY}/${encodedText}`;
    //TODO: Handle Error
    const data = await fetch(url).then(async (response) => {
      return await response.json();
    });
    const { results } = data;

    if (results === null) {
      // data.errorMessage === 'Server busy' || 'Maximum usage (107 of 100 per day)'
      throw Error(data.errorMessage);
    }

    commit("setTitles", { titles: results });
  },

  async fetchTitle({ commit }, { titleId }) {
    const encodedText = encodeURIComponent(titleId);
    const url = `${BASE_URL}/Title/${API_KEY}/${encodedText}`;
    //TODO: Handle Error
    const title = await fetch(url).then(async (response) => {
      return await response.json();
    });

    if (title.starList === null) {
      throw new Error(title.errorMessage);
      //Max requests reached for today
      //TODO: Handle Error
    }

    commit("setTitle", { title });
    //TODO: Don't return title
    return title;
  },

  async fetchActorTitles({ commit, state }, { actorId, titleIds }) {
    //TODO: Don't re-fetch titles already in state
    const actor = state.actors[actorId];
    
    // Sort titles by date
    const castMovies = [...actor.castMovies].sort((a,b) => {
      const aYear = a.year === "" ? 0 : parseInt(a.year);
      const bYear = b.year === "" ? 0 : parseInt(b.year);
      return bYear - aYear;
    });
    //Filter down to 5 more roles
    const index = actor.roles ? actor.roles.length : 0;
    const roleKeys = castMovies
      .slice(index, index + 5)
      .map((role) => role.id);
    //Filter out roles we have already seen
    const fetchedRoleKeys = actor.roles.map((role) => role.id);
    const additionalTitles = roleKeys.filter(
      (key) => !fetchedRoleKeys.includes(key)
    );

    const promises = additionalTitles.map((id) => {
      const url = `${BASE_URL}/Title/${API_KEY}/${id}/FullActor`;
      return fetch(url).then(async (response) => await response.json());
    });
    const titleResults = await Promise.all(promises);

    const results = titleResults.filter((title) => title.actorList);

    const roles = results.map((title) => {
      const role = title.actorList.find((role) => role.id === actorId);
      return {
        fullTitle: title.fullTitle,
        title: title.title,
        id: title.id,
        image: title.image,
        role: role ? role.asCharacter : "",
      };
    });

    commit("addActorRoles", { actorId, roles: roles });
  },

  async fetchActor({ commit }, { actorId }) {
    const encodedText = encodeURIComponent(actorId);
    const url = `${BASE_URL}/Name/${API_KEY}/${encodedText}`;
    const actor = await fetch(url).then(async (response) => {
      return await response.json();
    });

    //TODO: Temporarily return actor
    return actor;
  },

  async fetchActors({ commit }, { actorIds }) {
    //TODO: Don't re-fetch actors already in state
    const promises = actorIds.map((id) => {
      const url = `${BASE_URL}/Name/${API_KEY}/${id}`;
      return fetch(url).then(async (response) => await response.json());
    });
    const actorResults = await Promise.all(promises);
    actorResults.forEach((actor) => {
      //Add roles property
      actor.roles = actor.knownFor || [];
      commit("setActor", { actor });
    });

    return actorResults;
  },

  resetTitlePage({ commit }) {
    commit("resetTitle");
    commit("resetActors");
  },

  resetSearchPage({commit}) {
    commit("resetTitles")
  }
};

export const mutations = {
  setTitles(state, { titles }) {
    const titlesById = Object.fromEntries(
      titles.map((title) => [title.id, title])
    );
    Vue.set(state, "titles", titlesById);
  },

  setTitle(state, { title }) {
    Vue.set(state, "title", title);
  },

  setActor(state, { actor }) {
    Vue.set(state.actors, actor.id, actor);
  },

  addActorRoles(state, { actorId, roles }) {
    // Append to roles property
    const actor = state.actors[actorId];
    const actorRoles = [...actor.roles, ...roles];
    Vue.set(state.actors[actorId], "roles", actorRoles);
  },

  resetActors(state) {
    Vue.set(state, "actors", {});
  },

  resetTitle(state) {
    Vue.set(state, "title", {});
  },

  resetTitles(state) {
    Vue.set(state, "titles", {});
  }
};

// root getters
export const getters = {
  titles: (state) => Object.values(state.titles),
  title: (state) => state.title,
  titleById: (state) => (id) => state.titles[id],
  actor: (state) => state.actor,
  actors: (state) => Object.values(state.actors),
  actorById: (state) => (id) => state.actors[id],
};
