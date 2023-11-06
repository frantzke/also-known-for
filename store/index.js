import Vue from "vue";
import { BASE_URL, API_KEY } from "../env";

// root state
export const state = () => ({
  titles: {}, //Search Results
  title: {},
  actor: {},
  cast: [], //Cast for current title
});

export const actions = {
  async searchTitles({ commit }, { searchText }) {
    commit("resetTitles");
    if (!BASE_URL || !API_KEY) throw new Error("API Key Missing");

    const encodedText = encodeURIComponent(searchText);
    const url = `${BASE_URL}/search/multi?query=${encodedText}&include_adult=false&language=en-US&page=1`;
    const data = await fetch(url, {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
    }).then(async (response) => {
      return await response.json();
    });

    const { results } = data;

    commit("setTitles", { titles: results });
  },

  async fetchTitle({ commit }, { titleId }) {
    commit("resetTitle");
    commit("resetCast");
    if (!BASE_URL || !API_KEY) throw new Error("API Key Missing");

    const encodedText = encodeURIComponent(titleId);
    const url = `${BASE_URL}/movie/${encodedText}?append_to_response=credits`;
    const title = await fetch(url, {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
    }).then(async (response) => {
      return await response.json();
    });

    commit("setTitle", { title });
  },

  async fetchTV({ commit }, { titleId }) {
    commit("resetTitle");
    commit("resetCast");
    if (!BASE_URL || !API_KEY) throw new Error("API Key Missing");

    const encodedText = encodeURIComponent(titleId);
    const url = `${BASE_URL}/tv/${encodedText}?append_to_response=credits`;
    const title = await fetch(url, {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
    }).then(async (response) => {
      return await response.json();
    });

    commit("setTitle", { title });
  },

  async fetchActor({ commit }, { actorId }) {
    const encodedText = encodeURIComponent(actorId);
    const url = `${BASE_URL}/person/${encodedText}?append_to_response=combined_credits&language=en-US`;
    const actor = await fetch(url, {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
    }).then(async (response) => {
      return await response.json();
    });

    commit("setActor", { actor });
  },

  async fetchPersons({ commit, state }, { personIds }) {
    try {
      const promises = personIds.map((id) => {
        const url = `${BASE_URL}/person/${id}?append_to_response=combined_credits&language=en-US`;
        return fetch(url, {
          headers: {
            Authorization: `Bearer ${API_KEY}`,
          },
        }).then((response) => response.json());
      });
      //TODO: Use AllSettled
      const personResults = await Promise.all(promises);

      commit("setCast", { cast: personResults });
    } catch (error) {
      throw error;
    }
  },

  resetTitlePage({ commit }) {
    commit("resetTitle");
    commit("resetCast");
  },

  resetSearchPage({ commit }) {
    commit("resetTitles");
  },
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

  setCast(state, { cast }) {
    const newCast = [...state.cast, ...cast];
    Vue.set(state, "cast", newCast);
  },

  setActor(state, { actor }) {
    //Add roles property
    actor.roles = actor?.combined_credits?.cast || [];
    //Sort roles by popularity
    // actor.roles.sort((a, b) => {
    //   return b.order - a.order;
    // });

    Vue.set(state, "actor", actor);
  },

  resetCast(state) {
    Vue.set(state, "cast", []);
  },

  resetTitle(state) {
    Vue.set(state, "title", {});
  },

  resetTitles(state) {
    Vue.set(state, "titles", {});
  },
};

// root getters
export const getters = {
  titles: (state) => {
    const titles = Object.values(state.titles);
    titles.sort((a, b) => {
      return b.popularity - a.popularity;
    });
    return titles;
  },
  title: (state) => state.title,
  titleById: (state) => (id) => state.titles[id],
  actor: (state) => state.actor,
  cast: (state) => state.cast,
};
