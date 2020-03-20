<template>
  <div id="app">
    <Header/>
    <main>
      <TextEditor/>
    </main>
  </div>
</template>

<script>
import Header from "./components/Header";
import TextEditor from "./components/TextEditor";
import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all.js";

export default {
  name: "App",
  components: {
    Header,
    TextEditor
  }
};
</script>

<style>
#app {
  display: flex;
  height: 100%;
  flex-direction: column;
}
main {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
