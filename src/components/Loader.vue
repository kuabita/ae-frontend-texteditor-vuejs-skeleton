<template>
  <div class="loader">
    <div class="spinner" :style="style"></div>
  </div>
</template>

<script>
import { EventBus } from "../EventBus.js";
import { mapState, mapMutations, mapAction } from 'vuex';

export default {
  name: "Loader",
  props: ['width', 'height'],
  computed: {
    style() {
      return 'width: ' + this.width + '; height: ' + this.height;
    }
  },
};
</script>

<style scoped>
.loader {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
}
.spinner {
  border: 5px solid #f3f3f3;
  border-top: 5px solid #3498db;
  border-radius: 50%;
  animation: spin 2s linear infinite;
}
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
