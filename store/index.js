import Vue from "vue";
import { BASE_URL, API_KEY } from "../env";

// root state
export const state = () => ({
  titles: {}, //Search Results
  title: {},
  actor: {},
  actors: {},
});

export const actions = {
  async searchTitles({ commit }, { searchText }) {
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

    //TODO: Refactor
    // //Preserve order of cast
    title.credits.cast.forEach((actor, index) => {
      actor.order = index;
    });
    commit("setActors", { actors: title.credits.cast });

    commit("setTitle", { title });
  },

  async fetchTV({ commit }, { titleId }) {
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

    //TODO: Refactor
    //Preserve order of cast
    title.credits.cast.forEach((actor, index) => {
      actor.order = index;
    });
    commit("setActors", { actors: title.credits.cast });

    commit("setTitle", { title });
  },

  /*
  async fetchActorTitles({ commit, state }, { actorId, titleIds }) {
    const actor = state.actors[actorId];
    //Filter and sort all movies
    const actorMovies = actor.castMovies
      .filter((movie) => movie.role === "Actor" || movie.role === "Actress")
      .sort((a, b) => {
        const aYear = a.year === "" ? 0 : parseInt(a.year);
        const bYear = b.year === "" ? 0 : parseInt(b.year);
        return bYear - aYear;
      });

    //Filter down to 5 more roles
    const index = actor.roles.length - actor.knownFor.length || 0;

    // const index = actor.roles ? actor.roles.length - 1 : 0;
    const roleKeys = actorMovies.slice(index, index + 5).map((role) => role.id);
    //Filter out roles we have already seen
    const fetchedRoleKeys = actor.roles.map((role) => role.id);
    const additionalTitles = roleKeys.filter(
      (key) => !fetchedRoleKeys.includes(key)
    );
    //Remove duplicates
    const titleSet = new Set(additionalTitles);

    const promises = Array.from(titleSet).map((id) => {
      const url = `${BASE_URL}/Title/${API_KEY}/${id}/FullActor`;
      return fetch(url).then(async (response) => await response.json());
    });
    const titleResults = await Promise.all(promises);

    const results = titleResults.filter((title) => title.actorList);

    if (results.length === 0) {
      const result = titleResults.pop();
      throw new Error(result?.errorMessage || "Something went wrong");
    }

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
  */

  async fetchActor({ commit }, { actorId }) {
    //TODO: Check if actor is already in state
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

  async fetchActors({ commit, state }, { actorIds }) {
    try {
      const promises = actorIds.map((id) => {
        const url = `${BASE_URL}/person/${id}?append_to_response=combined_credits&language=en-US`;
        return fetch(url, {
          headers: {
            Authorization: `Bearer ${API_KEY}`,
          },
        }).then(async (response) => await response.json());
      });
      //TODO: Use AllSettled
      const actorResults = await Promise.all(promises);
      console.log(actorResults);

      // const results = actorResults.filter((actor) => actor?.movie_credits?.cast);
      // if (results.length === 0) {
      //   const result = actorResults.pop();
      //   throw new Error(result.errorMessage);
      // }

      // Find actor's role for current title
      // results.forEach((actor) => {
      //   // Find star's role in the title
      //   const actorRole = state.title.actorList.find((actorItem) => {
      //     return actorItem.id === actor.id;
      //   });
      //   if (actorRole) actor.character = actorRole.character;
      // });

      commit("setActors", { actors: actorResults });
      // actorResults.forEach((actor) => {
      // });
    } catch (error) {
      throw error;
    }
  },

  resetTitlePage({ commit }) {
    commit("resetTitle");
    commit("resetActors");
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

  setActors(state, { actors }) {
    actors.forEach((actor) => {
      //Add roles property
      actor.roles = actor?.combined_credits?.cast || [];
      //Sort roles by popularity
      // actor.roles.sort((a, b) => {
      //   return b.popularity - a.popularity;
      // });

      // Keep Old Properties
      const oldActor = state.actors[actor.id] || {};
      const newActor = {
        ...oldActor,
        ...actor,
      };

      Vue.set(state.actors, newActor.id, newActor);
    });
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
  actors: (state) => {
    const actors = Object.values(state.actors);
    actors.sort((a, b) => {
      return a.order - b.order;
    });
    return actors;
  },
  actorById: (state) => (id) => state.actors[id],
};
