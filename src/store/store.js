import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    recommendedWords: {
      word: '',
      list: {
        data: []
      }
    },
    availableStyles: {
      italic: { active: false, key: 'italic' },
      bold: { active: false, key: 'bold' },
      underline: { active: false, key: 'underline' }
    }
  },
  mutations: {
    SET_RECOMMENDED_WORDS(state, payload) {
      state.recommendedWords.word = payload.word;
      state.recommendedWords.list = payload.list;
    },
    APPLY_STYLE(state, payload) {
      state.availableStyles[payload.style].active = payload.value;
    }
  },
  actions: {
    setRecommendedWords(context, recommendedWords) {
      context.commit('SET_RECOMMENDED_WORDS', recommendedWords);
    },
    applyStyle(context, style) {
      context.commit('APPLY_STYLE', style);
    }
  },
  getters: {
    getAvailableStyles(state) {
      return state.availableStyles;
    },
    getRecommendedWords(state) {
      return state.recommendedWords;
    }
  }
})
