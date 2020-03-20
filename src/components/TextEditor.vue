<template>
  <div class="main-container-editor">
    <div class="text-container-editor">
      <FormatOptionsHeader />
      <Iframe/>
    </div>
    <div class="recommended-container-editor">
      <Loader v-if="awaiting" width="25px" height="25px"/>
      <RecommendedSynonyms v-else/>
    </div>
  </div>
</template>

<script>
import Loader from "./Loader";
import RecommendedSynonyms from "./RecommendedSynonyms";
import FormatOptionsHeader from "./FormatOptionsHeader";
import Iframe from "./Iframe";
import { EventBus } from "../EventBus.js";

export default {
  name: "TextEditor",
  components: {
    Loader,
    Iframe,
    RecommendedSynonyms,
    FormatOptionsHeader
  },
  data: () => ({
    awaiting: false
  })
};
</script>

<style>
.recommended-container-editor {
  display: inline-flex;
  width: 170px;
  border: 1px solid #ddd;
}
.text-container-editor {
  display: flex;
  flex-direction: column;
  border: 1px solid #ddd;
}
.main-container-editor {
  display: inline-flex;
  padding: 30px 10px;
  justify-content: center;
}
@media only screen and (max-width: 768px) {
 .main-container-editor {
    width: 95%;
  }
}
</style>
