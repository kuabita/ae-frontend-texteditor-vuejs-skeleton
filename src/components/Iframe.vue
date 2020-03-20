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
    restResourceService: null
  }),
  mounted() {
    this.iframeDoc = document.getElementById("iframe-editor-text").contentDocument;
    this.iframeDoc.designMode = "on";

    ['click', 'keyup'].forEach(
      event => this.iframeDoc.addEventListener(event, this.handleIframeEvents.bind(this))
    );

    this.restResourceService = new DatamuseService();
  },
  created() {
    EventBus.$on("apply-style", style => {
      this.iframeDoc.execCommand(style);
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
    async handleIframeEvents() {
      var recommendedWords = {
        word: "",
        list: { data: [] }
      };
      const activatedStyles = this.getSelectedWordStyles();
      const selectedWord = this.iframeDoc.getSelection().toString().replace(/\s+/g, '');

      if (selectedWord !== "") {
        this.awaiting = true;
        const synonyms = await this.restResourceService.getSynonyms(selectedWord);
        this.awaiting = false;

        recommendedWords = {
          word: selectedWord,
          list: synonyms
        };
      }

      this.$store.dispatch("setRecommendedWords", recommendedWords);

      Object.values(this.$store.getters.getAvailableStyles).forEach(style => {
        this.$store.dispatch("applyStyle", {
          style: style.key,
          value: activatedStyles.includes(style.key) ? true : false
        });
      }, this);
    },
    getSelectedWordStyles() {
      var temporalStyles = [];
      Object.values(this.$store.getters.getAvailableStyles).forEach(style => {
        if (this.iframeDoc.queryCommandState(style.key)) {
          temporalStyles.push(style.key);
        }
      });
      return temporalStyles;
    }
  }
};
</script>

<style>
.iframe-container-editor {
  background-color: #F5F5F5;
}
@media only screen and (max-width: 768px) {
  .iframe-container-editor iframe {
    width: 200px;
  }
}
</style>
