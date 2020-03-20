<template>
  <div class="recommended-section">

    <h1 v-if="recommendedWords.word === ''" class="recommended-header"> Synonyms </h1>
    <h1 v-else v-on:click="selectSynonymous($event, recommendedWords.word)" class="recommended-header clickable">
      {{ recommendedWords.word }}
    </h1>

    <div class="recommended-list">
      <div class="description"> {{getDescriptionText()}} </div>
      <div class="synonymous-item"
        v-on:click="selectSynonymous($event, item.word)"
        v-for="item in recommendedWords.list.data">
        {{ item.word }}
      </div>
    </div>
  </div>
</template>

<script>
import { EventBus } from "../EventBus.js";
import { mapState, mapMutations, mapAction } from 'vuex';

export default {
  name: "RecommendedSynonyms",
  computed:{
    ...mapState({
      recommendedWords: state => state.recommendedWords
    })
  },
  methods: {
    getDescriptionText() {
      if (this.recommendedWords.word === '') {
        return "Select any word from the text editor in order to get possible synonyms.";
      } else if (this.recommendedWords.word !== '' && this.recommendedWords.list.data.length === 0) {
        return "No available synonyms.";
      } else if (this.recommendedWords.list.data.length > 0) {
        return "Select any option to replace the word:";
      }
    },
    selectSynonymous(event, synonymous) {
      EventBus.$emit("synonymous-selected", synonymous);
    }
  }
};
</script>

<style scoped>
.recommended-list {
  padding: 5px 10px 0 10px;
}
.recommended-header {
  height: 39px;
  display: flex;
  font-size: 18px;
  font-weight: bold;
  justify-content: center;
  align-items: center;
  margin: 0;
}
.recommended-header.clickable {
 cursor: pointer;
}
.recommended-section {
  width: 100%;
  display: flex;
  flex-direction: column;
  flex-direction: column;
}
.synonymous-item {
  padding: 6px 0;
  cursor: pointer;
  color: grey;
}
.description {
  padding: 6px 0;
  color: grey;
  font-size: 15px;
}
</style>
