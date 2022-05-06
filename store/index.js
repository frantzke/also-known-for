import Vue from "vue";

// root state
export const state = () => ({
  titles: [],
  title: {},
  stars: [],
  actor: {},
});

export const actions = {
  async fetchTitles({ commit }, { searchText }) {
    console.log(process);
    const { baseUrl, apiKey } = process.env;
    const encodedText = encodeURIComponent(searchText);
    const url = `${baseUrl}/SearchTitle/${apiKey}/${encodedText}`;
    //TODO: Handle Error
    const data = await fetch(url).then(async (response) => {
      return await response.json();
    });
    const { results } = data;

    if (results === null) {
      //Max requests reached for today
      //TODO: Handle Error
    }

    commit("setTitles", { titles: results });
  },

  async fetchTitle({ commit }, { titleId }) {
    const { baseUrl, apiKey } = process.env;
    const encodedText = encodeURIComponent(titleId);
    const url = `${baseUrl}/Title/${apiKey}/${encodedText}`;
    //TODO: Handle Error
    const title = await fetch(url).then(async (response) => {
      return await response.json();
    });

    if (title.starList === null) {
      //Max requests reached for today
      //TODO: Handle Error
    }

    commit("setTitle", { title });
  },

  async fetchActor({ commit }, { actorId }) {
    const { baseUrl, apiKey } = process.env;
    const encodedText = encodeURIComponent(actorId);
    const url = `${baseUrl}/Name/${apiKey}/${encodedText}`;
    const actor = await fetch(url).then(async (response) => {
      return await response.json();
    });

    //TODO: Temporarily return actor
    return actor;
  },
};

export const mutations = {
  setTitles(state, { titles }) {
    Vue.set(state, "titles", titles);
  },

  setTitle(state, { title }) {
    Vue.set(state, "title", title);
  },
};

// root getters
export const getters = {
  titles: (state) => state.titles,
  title: (state) => state.title,
  actor: (state) => state.actor,
};
