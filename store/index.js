import Vue from "vue";
import { BASE_URL, API_KEY } from "../env";


// root state
export const state = () => ({
  //TODO: convert titles into object
  titles: {},
  title: {},
  stars: [],
  actor: {},
  actors: {}
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
      // data.errorMessage === 'Server busy' || 'Max requests'
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
      //Max requests reached for today
      //TODO: Handle Error
    }

    commit("setTitle", { title });
    return title;
  },

  async fetchTitles({ commit }, { titleIds }) {
    //TODO: Don't re-fetch titles already in state
    const promises = titleIds.map((id) => {
      const url = `${BASE_URL}/Title/${API_KEY}/${id}/FullActor`;
      return fetch(url).then(async (response) => await response.json());
    });
    const titleResults = await Promise.all(promises);

    // titleResults.forEach((title) => {
    //   commit("setTitle", { title });
    // });
    commit("setTitles", {titles: titleResults});

    return titleResults;
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
      commit("setActor", { actor });
    });

    return actorResults;
  },
};

export const mutations = {
  setTitles(state, { titles }) {
    const titlesById = Object.fromEntries(
      titles.map((title) => [ title.id, title ])
     )
    Vue.set(state, "titles", titlesById);
  },

  setTitle(state, { title }) {
    Vue.set(state, "title", title);
  },

  setActor(state, { actor }) {
    Vue.set(state.actors, actor.id, actor);
  },

  resetActors(state) {
    Vue.set(state, "actors", {});
  }
};

// root getters
export const getters = {
  titles: (state) => Object.values(state.titles),
  title: (state) => state.title,
  titleById: (state) => id => state.titles[id],
  actor: (state) => state.actor,
  actors: (state) => Object.values(state.actors),
  actorById: (state) => id => state.actors[id]
};
