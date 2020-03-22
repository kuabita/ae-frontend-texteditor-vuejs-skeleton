<template>
  <div class="iframe-container-editor">
    <iframe id="iframe-editor-text" frameborder="0" width="600" height="200" src="about:blank"></iframe>
  </div>
</template>

<script>
import DatamuseService from "../services/DatamuseService";
import { EventBus } from "../EventBus.js";

export default {
  name: "Iframe",
  data: () => ({
    iframeDoc: null,
    restResourceService: null,
    shortCutKeys: { bold: 66, italic: 73, underline: 85 }
  }),
  mounted() {
    this.iframeDoc = document.getElementById("iframe-editor-text").contentDocument;
    this.iframeDoc.designMode = "on";

    this.iframeDoc.addEventListener('keydown', this.handleShortCutEvent.bind(this));
    ['click', 'keyup', 'keydown'].forEach(
      event => this.iframeDoc.addEventListener(event, this.handleIframeEvents.bind(this))
    );

    this.restResourceService = new DatamuseService();
  },
  created() {
    EventBus.$on("apply-style", name => {
      this.iframeDoc.execCommand(name, false, null);
    });
    EventBus.$on("synonymous-selected", synonymous => {
      const textNode = document.createTextNode(synonymous);
      if (this.iframeDoc) {
        this.iframeDoc.getSelection().getRangeAt(0).deleteContents();
        this.iframeDoc.getSelection().getRangeAt(0).insertNode(textNode);
      }
    });
  },
  methods: {
    handleShortCutEvent(e) {
      if (e.ctrlKey) {
        if (Object.values(this.shortCutKeys).includes(e.keyCode)) {
          const key = Object.keys(this.shortCutKeys).find(key => this.shortCutKeys[key] === e.keyCode);
          const style = this.$store.getters.getStyleByKey(key);
          this.$store.dispatch("applyStyle", {
            style: style.key,
            value: !style.active
          });
        }
      }
    },
    async handleIframeEvents(e) {
      if (!e.ctrlKey && !Object.values(this.shortCutKeys).includes(e.keyCode)) {
        var recommendedWords = {
          loading: false,
          word: "",
          list: { data: [] }
        };
        const selectedWord = this.iframeDoc.getSelection().toString().replace(/\s+/g, '');

        if (selectedWord !== "") {
          this.$store.dispatch("updateRecommendedWordsStatus", true);
          const synonyms = await this.restResourceService.getSynonyms(selectedWord);
          this.$store.dispatch("updateRecommendedWordsStatus", false);

          recommendedWords = {
            loading: false,
            word: selectedWord,
            list: synonyms
          };
        }
        this.$store.dispatch("setRecommendedWords", recommendedWords);

        var state;
        Object.values(this.$store.getters.getAvailableStyles).forEach(style => {
          if (style.activable) {
            state = this.iframeDoc.queryCommandState(style.key) ? true : false;
            this.$store.dispatch("applyStyle", {
              style: style.key,
              value: state
            });
          }
        }, this);
      }
    }
  }
};
</script>

<style>
.iframe-container-editor {
  background-color: #F5F5F5;
  height: 100%;
}
@media only screen and (max-width: 768px) {
  .iframe-container-editor iframe {
    width: 200px;
  }
}
</style>
