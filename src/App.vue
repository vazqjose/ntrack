<template>
  <div id="app"> 
        <navBar />
        <createPost />
        <postList />
<!--          
    <button @click="showList = true; showDetail = false">Display ticket list</button>
    <button @click="showDetail = true; showList = false">Display ticket screen</button>
    <div v-if="showDetail">
        <ticketDetail />
    </div>
    <div v-if="showList">
      <ticketList />
    </div>
-->
  </div>
</template>

<script>
import createPost from './components/createpost.vue';
import postList from './components/postlist.vue';
import navBar from "./components/navbar.vue";
//import ticketList from "./components/ticketlist.vue";
//import ticketDetail from "./components/ticketdetail.vue"

export default {
  name: "App",
  components: {
    navBar,
    //ticketList,
    //ticketDetail,
    postList,
    createPost
  },
  data() {
    return {
      showList: false,
      showDetail: true,
      showNav: true
    };
  },
  methods: {},
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
