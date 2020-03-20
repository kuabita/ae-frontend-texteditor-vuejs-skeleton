<template>
  <div class="menu-container-editor">
    <div
      v-on:click="applyStyle($event, 'bold')"
      v-bind:class="{ 'active-selector': isEnabled('bold') }"
      class="format-selector">
      <i class="fas fa-bold"></i>
    </div>
    <div
      v-on:click="applyStyle($event, 'italic')"
      v-bind:class="{ 'active-selector': isEnabled('italic') }"
      class="format-selector">
      <i class="fas fa-italic"></i>
    </div>
    <div
      v-on:click="applyStyle($event, 'underline')"
      v-bind:class="{ 'active-selector': isEnabled('underline') }"
      class="format-selector">
      <i class="fa fa-underline"></i>
    </div>
  </div>
</template>

<script>
import { EventBus } from "../EventBus.js";

export default {
  name: "FormatOptionsHeader",
  methods: {
    isEnabled(style) {
      return this.$store.getters.getAvailableStyles[style].active;
    },
    applyStyle(event, styleSelected) {
      EventBus.$emit("apply-style", styleSelected);
      this.$store.dispatch("applyStyle", {
        style: styleSelected,
        value: !this.$store.getters.getAvailableStyles[styleSelected].active
      });
    }
  }
};
</script>

<style scoped>
.menu-container-editor {
  display: inline-flex;
  flex-direction: row;
  border-bottom: 1px solid #ddd;
}
.format-selector {
  cursor: pointer;
  position: relative;
  display: inline-block;
  padding: 10px 12px;
  color: rgba(0, 0, 0, 0.6);
}
.active-selector {
  background: #eee;
  color: #000;
}
</style>
