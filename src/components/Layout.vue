<template>
  <div class="page-container">

    <header>
      <div v-bind:class="['row', { 'border-btm' : !this.isHomeRoute()}]" >
        <span class="text-center header-text"> {{getHeaderText}} </span>
        <span v-if="$route.path === '/'" class="text-center user-name"> Mohit Sanwal </span>
      </div>
    </header>
    <main>
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </main>

    <footer>
        <div class="footer-container">
          <div v-bind:class="['footer-item footer-Img', { 'active' : this.isHomeRoute()}]" @click="$router.push('/')">
            <p>Image</p>
            <img src="../assets/img/imgicn.webp" alt="" > 
          </div>
          <div class="vericle-line">
          </div>
          <div v-bind:class="['footer-item footer-Img', { 'active' : !this.isHomeRoute()}]" @click="$router.push('/graph')">
            <p>Graph</p>
            <img src="../assets/img/graph.jpg" alt="" >
          </div>
        </div>
    </footer>

  </div>
</template>

<script>
import Api from "../Api";
export default {
  name: "Layout",
  data(){
    return {
    }
  },
  methods: {
    isHomeRoute() {
      if (this.$route.path === "/") {
        return true
      }
      return false
    },
  },
  mounted() {
  },
  computed: {
    getHeaderText() {
      let getHeaderText ="";
      if (this.$route.name == 'ShowWeatherGraph') {
        getHeaderText = "MARS weather";
      }
      return getHeaderText
    }
  },
  components: {
  }
};
</script>


<style lang="scss" scoped>
header {
  // background: #6724ca;
  padding: 9px;
  position: fixed;
  width: 100%;
  z-index: 9;
}

.border-btm {
  border-bottom: 1px solid #cccc;
}

.footer-item {
    background: white;
    padding: 8px 50px 0px 50px;
    width: 100%;
}
.user-name {
    position: absolute;
    color: #b1aaaa;
    right: 18px;
}
.active {
  background: #e2dfdf;
}

.footer-Img {
  display: flex;
}

.footer-Img img {
    width: 28px;
    height: 20px;
    margin: 5px 5px;
}

.footer-Img p {
     font-size: 20px;
}

.footer-container {
  display: flex;
  justify-content: space-between;
  position: fixed;;
  bottom: 0;
  border: 1px solid #b2a0a0;
  width: 100%;
}

.vericle-line {
  border-right: 1px solid #ccc;
}

.headr-color > span {
  margin-right: 5px;
  font-size: 21px;
  margin-left: 17px;
  cursor: pointer;
}

.header-text {
    font-size: 17px;
    margin-left: 23px;
    margin-top: 4px;
    color: #c1bcbc;
}

</style>