<template>
  <div class="menu-container-editor">
    <div v-for="style in availableStyles"
      class="format-selector"
      v-bind:class="{ 'active-selector': style.activable && style.active }"
      v-on:click="applyStyle($event, style)">
      <i class="fa" :class="style.class"></i>
    </div>
  </div>
</template>

<script>
import { EventBus } from "../EventBus.js";
import { mapState, mapMutations, mapAction } from 'vuex';

export default {
  name: "FormatOptionsHeader",
  computed:{
  ...mapState({
    availableStyles: state => state.availableStyles
  })
  },
  methods: {
    applyStyle(event, styleSelected) {
      EventBus.$emit("apply-style", styleSelected.key);
      if (styleSelected.activable) {
        this.$store.dispatch("applyStyle", {
          style: styleSelected.key,
          value: !styleSelected.active
        });
      }
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
