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

    if (!results) {
      throw Error("Search failed");
    }

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

  async fetchCast({ commit, state }, { cast }) {
    try {
      const promises = cast.map(({ id }) => {
        const url = `${BASE_URL}/person/${id}?append_to_response=combined_credits&language=en-US`;
        return fetch(url, {
          headers: {
            Authorization: `Bearer ${API_KEY}`,
          },
        }).then((response) => response.json());
      });
      const promiseResults = await Promise.allSettled(promises);

      // Map the results to the cast's character name
      const castResults = promiseResults.map((result, index) => {
        if (result.status === "fulfilled") {
          return {
            character: cast[index]?.character || "",
            ...result.value,
          };
        } else {
          console.error(result.reason);
          return null;
        }
      });

      commit("setCast", { cast: castResults });
    } catch (error) {
      throw error;
    }
  },

  // Fetches a list of titles from the API
  async fetchList({commit}, { listName, apiPath }) {
    try {
      if (!BASE_URL || !API_KEY) throw new Error("API Key Missing");
      const url = `${BASE_URL}${apiPath}?language=en-US`;
      const data = await fetch(url, {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
        },
      }).then((response) => response.json());

      const { results } = data;

      if (!results) {
        throw Error(`Fetching ${listName} failed`);
      }

      commit("setList", { listName, results });
    } catch (error) {
      console.error(error);
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
    if (!titles) {
      throw Error("No Titles to set");
    }
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
    Vue.set(state, "actor", actor);
  },

  setList(state, { listName, results }) {
    Vue.set(state, listName, results);
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
  listByName: (state) => (listName) => state[listName],
};
