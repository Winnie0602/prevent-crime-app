<template>
  <div class="home">
    <NavBar />
    <div class="container mt-5">
      <ChartTab />
      <!-- <RelateNews /> -->
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import ChartTab from '@/components/ChartTab.vue';
// import RelateNews from '@/components/RelateNews.vue';
// import { projectFirestore } from '@/firebase/config'


export default {
  name: 'HomeView',
  components: {
    ChartTab,
    // RelateNews,
    NavBar
  },
  data() {
    return {
      account: [],
    }
  },
  mounted() {
    // this.test()
  },
  methods: {

  }
}
</script>
