<template>
  <div class="menu-container-editor">
    <div v-for="style in availableStyles"
      class="format-selector tooltip"
      v-bind:class="{ 'active-selector': style.activable && style.active}"
      v-on:click="applyStyle($event, style)">

      <span class="tooltiptext">{{style.tooltip}}</span>
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
.tooltip .tooltiptext {
  visibility: hidden;
  width: 100px;
  background-color: #555;
  color: #fff;
  text-align: center;
  padding: 5px 0;
  border-radius: 6px;
  font-size: 12px;
  position: absolute;
  z-index: 1;
  bottom: 100%;
  left: 75%;
  margin-left: -60px;
  opacity: 0;
  transition: opacity 0.3s;
}
.tooltip .tooltiptext::after {
  content: "";
  position: absolute;
  top: 100%;
  left: 50%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: #555 transparent transparent transparent;
}
.tooltip:hover .tooltiptext {
  visibility: visible;
  opacity: 1;
}
@media only screen and (max-width: 768px) {
  .tooltip:hover .tooltiptext {
    display: none;
  }
}
</style>
