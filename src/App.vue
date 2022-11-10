<template>
  <router-view/>
</template>

<script>
export default {
  created() {
  window.addEventListener("beforeunload", () => {
    localStorage.setItem("store",JSON.stringify(this.$store.state))
  })
  localStorage.getItem("store") && this.$store.replaceState(Object.assign(this.$store.state,JSON.parse(localStorage.getItem("store"))));
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

</style>
