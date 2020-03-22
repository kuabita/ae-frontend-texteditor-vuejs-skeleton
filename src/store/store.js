import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    recommendedWords: {
      isLoading: false,
      word: '',
      list: {
        data: []
      }
    },
    availableStyles: {
      italic: {
        active: false,
        key: 'italic',
        class: 'fa-italic',
        activable: true,
        tooltip: 'Italic (Ctrl-I)',
        extraData: {
          enabled: false,
          data: []
        }
      },
      bold: {
        active: false,
        key: 'bold',
        class: 'fa-bold',
        activable: true,
        tooltip: 'Bold (Ctrl-B)',
        extraData: {
          enabled: false,
          data: []
        }
      },
      underline: {
        active: false,
        key: 'underline',
        class: 'fa-underline',
        activable: true,
        tooltip: 'Underline (Ctrl-U)',
        extraData: {
          enabled: false,
          data: []
        }
      },
      indent: {
        active: false,
        key: 'indent',
        class: 'fa-indent',
        activable: false,
        tooltip: 'More indentation',
        extraData: {
          enabled: false,
          data: []
        }
      },
      outdent: {
        active: false,
        key: 'outdent',
        class: 'fa-outdent',
        activable: false,
        tooltip: 'Less indentation',
        extraData: {
          enabled: false,
          data: []
        }
      }
    }
  },
  mutations: {
    SET_RECOMMENDED_WORDS(state, payload) {
      state.recommendedWords.word = payload.word;
      state.recommendedWords.list = payload.list;
    },
    APPLY_STYLE(state, payload) {
      state.availableStyles[payload.style].active = payload.value;
    },
    UPDATE_RECOMMENDED_WORDS_STATUS(state, payload) {
      state.recommendedWords.isLoading = payload;
    }
  },
  actions: {
    setRecommendedWords(context, recommendedWords) {
      context.commit('SET_RECOMMENDED_WORDS', recommendedWords);
    },
    applyStyle(context, style) {
      context.commit('APPLY_STYLE', style);
    },
    updateRecommendedWordsStatus(context, status) {
      context.commit('UPDATE_RECOMMENDED_WORDS_STATUS', status);
    }
  },
  getters: {
    getAvailableStyles(state) {
      return state.availableStyles;
    },
    getRecommendedWords(state) {
      return state.recommendedWords;
    },
    getStyleByKey: (state) => (key) => {
      return state.availableStyles[key];
    }
  }
})
