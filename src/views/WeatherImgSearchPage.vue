<template>
  <div class="page-container">
    <div v-if="$route.path ==='/'">
      <div class="searchBar">
        <div id="custom-search-input">
          <div class="input-group col-md-12">
            <input
              type="text"
              class="search-query form-control"
              @keyup="getWeatherData"
              @keypress="getWeatherData"
              placeholder="Search..."
            />
            <span class="input-group-btn searchIcn">
              <i
                class="fa fa-search"
                aria-hidden="true"
              ></i>
            </span>
            <div>
              <img
                src="../assets/img/plus.webp"
                class="img-plus"
                alt=""
              >
            </div>
          </div>
        </div>
      </div>

       <v-touch @swiperight="scrollImageRight" @swipeleft="scrollImageLeft" >
      <div
        class=""
        v-if="weatherData.length"
      >
      <swiper class="swiper" 
      id="mySwiper"
       :options="swiperOption">
        <!-- <div
          class=""
        > -->
         <swiper-slide v-for="(item,index) in weatherData"
          v-bind:key="index"
          >
          <img
            v-if="item.links && item.links.length && item.links[0]"
            :src="item.links[0].href"
            class="imgPreview"
            alt=""
            @click="showImgData(index, item)"
          ><br>
           <p v-if="item.data && item.data.length && item.data[0]" class="wordBreak"> {{item.data[0].title.slice(0, 10)}} </p>
          </swiper-slide>
          
        <!-- </div> -->
        <div class="swiper-pagination" slot="pagination"></div>
         </swiper>
      </div>
      </v-touch>

      <div
        class="empty-data"
        v-if="showEmptyData()"
      >
        <img
          src="../assets/img/no-results-found.png"
          alt=""
        >
      </div>

      <div
        class="loader"
        v-if="loading"
      >
        <clip-loader :loading="loading"></clip-loader>
      </div>
    </div>

    <div
      v-if="$route.path ==='/graph'"
      class="align-chart"
    >
      <line-chart :chart-data="datacollection"></line-chart>
    </div>

    <Modal
      v-if="weatherInfoModal"
      @close="weatherInfoModal = false"
      :showHeader="true"
      :showCloseBtn="true"
      class="game-exit-modal"
    >
      <p slot="header" class="modal-header-text" v-if="imgData.data && imgData.data.length && imgData.data[0]">
        {{imgData.data[0].title}}
      </p>
      <div
        slot="body"
        class="modal-body-container center"
      >
        <div class="row">
          <div class="col s12 title" v-if="imgData.links && imgData.links.length && imgData.links[0]">
            <img
              :src="imgData.links[0].href"
              alt=""
              class="modal-img"
            >
          </div>
          <p class="margleft scroll" v-if="imgData.data && imgData.data.length && imgData.data[0]"> {{imgData.data[0].description}}</p>
          <p class="margleft" v-if="imgData.data && imgData.data.length && imgData.data[0]"> ID: {{imgData.data[0].nasa_id}}</p>
        </div>
      </div>
    </Modal>

  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Api from "../Api";
import ClipLoader from "vue-spinner/src/ClipLoader.vue";
import LineChart from "../js/LineChart.js";
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
import VueTouch from 'vue-touch';

export default {
  name: "WeatherImgSearchPage",
  data() {
    return {
      imgSearchData: [],
      loading: false,
      startIndex: 0,
      paginationCount: 10,
      weatherInfoModal: false,
      imgData: [],
      weatherData: [],
      datacollection: {},
      spw: 2,
      spc: 3,
      swiperOption: {}
    };
  },
  beforeMount() {
  },
  mounted() {
    this.checkDeviceWidth();
  },
  created() {
    window.addEventListener("resize", this.checkDeviceWidth);
    this.browserCheck();
  },
  destroyed() {
    window.removeEventListener("resize", this.checkDeviceWidth);
  },
  activated() {
    this.$store.dispatch("graphDetailsData").then((response) => {
       let obj = this.graphDetails;
       let data =[];
       for(let k in obj) {
         if (obj[k].HWS && obj[k].HWS.mx) {
             data.push(obj[k].HWS.mx);
         }
       }
        this.fillData(data);
    }); 

  },
  updated() {},
  methods: {
    showEmptyData() {
      if (this.weatherData.length) {
        return false
      }
      return true
    },
    checkDeviceWidth() {
      console.log("document.documentElement.clientWidth", document.documentElement.clientWidth, document.documentElement.clientHeight)
      if (document.documentElement.clientWidth >= 760) {
            this.spw = 4;
            this.spc = 5;
      } else if ((document.documentElement.clientWidth >= 375
       && document.documentElement.clientWidth <= 460) && (document.documentElement.clientHeight >= 812 && document.documentElement.clientHeight <= 830) ) {
            this.spw = 2;
            this.spc = 4;
      } else if (document.documentElement.clientWidth >= 1024) {
            this.spw = 4;
            this.spc = 4;
      } else if (document.documentElement.clientWidth >= 414 && document.documentElement.clientHeight <= 846) {
            this.spw = 2;
            this.spc = 4;
      } else {
            this.spw = 2;
            this.spc = 3;
      }

      console.log(" this.spw, this.spc", this.spw,this.spc);
      let obj = {
        slidesPerView: this.spw,
          slidesPerColumn: this.spc,
          spaceBetween: 20,
          pagination: {
            el: '.swiper-pagination',
            clickable: true
          }
      }
      this.swiperOption = obj;
      console.log(this.swiperOption);
    },
    scroll() {
      window.onscroll = () => {
        let bottomOfWindow = Math.max(window.pageYOffset, document.documentElement.scrollTop, document.body.scrollTop) + window.innerHeight >= document.documentElement.offsetHeight -100;
        if (bottomOfWindow) {
          this.scrolledToBottom = true;
          // this.pagination();
        }
      };
    },
    fillData(weatherData) {
      this.datacollection = {
        labels: [2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020],
        datasets: [
          {
            label: "weather",
            backgroundColor: "#f87979",
            data: weatherData
          }
        ]
      };
    },
    getWeatherData(event) {
      let keyword = event.target.value;
      if (keyword) {
        this.loading = true;
        window.scrollTo(0,0);
        this.weatherData = [];
        this.imgSearchData = [];
        Api.searchWeatherImgApi(
          keyword,
          (response) => {
            if ( response.data
              && response.data.collection
               && response.data.collection.items.length) {
                 if(response.data.collection.items.length > 50) {
                    this.weatherData = response.data.collection.items.slice(0, 30);
                 } else {
                    this.weatherData = response.data.collection.items
                 }
              
              // this.pagination();
              this.startIndex = 0;
            }
            this.loading = false;
          },
          () => {
            this.loading = false;
          }
        );
      }
    },
    showImgData(index, item) {
      let id;
      if (item && item.data.length && item.data[0]) {
        id = item.data[0].nasa_id;
      } 
      this.imgData =
        this.weatherData &&
        this.weatherData.find((data, i) => {
          if (data && data.data[0] && data.data[0].nasa_id === id) {
            this.weatherInfoModal = true;
            return data;
          }
        });
    },
    scrollImageLeft() {
        if (!this.browserCheck()) {
          document.getElementById('mySwiper').swiper.slideNext()
        }
      },
      scrollImageRight() {
        if (!this.browserCheck()) {
          document.getElementById('mySwiper').swiper.slidePrev();
        }
      },
      browserCheck() {
        let isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
        return isChrome;
      },
  },
  computed: {
    ...mapGetters(["graphDetails"])
  },
  components: {
    ClipLoader,
    LineChart,
    Swiper,
    SwiperSlide,
    Modal: () => import("../components/Modal")
  }
};
</script>


<style lang="scss" scoped>
  .swiper {
    height: 554px;
    margin-left: auto;
    margin-right: auto;
    margin-top: 23px;
    .swiper-slide {
      height: 200px;
    }
  }

  .swiper .swiper-slide {
    height: 151px;
    margin-right: 34px;
    display: flex;
    flex-direction: column;
    
}

.swiper-slide.swiper-slide-next {
      margin-top: 0px !important;
}

.img-plus {
  width: 30px;
  vertical-align: text-top;
}

.align-chart {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90%;
}

.item {
  padding: 12px;
}

.empty-data {
  transform: translate(7%, -50%);
  margin-top: 88%;
}

.image-container {
  display: flex;
  flex-wrap: wrap;
  margin-top: 12px;
  margin-top: 75px;
}

.page-container {
  max-width: 100%;
  overflow-x: hidden;
}

.image-container > div {
  flex: 0 50%;
  /*demo*/
  box-sizing: border-box;
}

.margleft {
    margin: 28px 0px 0px 2px;
    max-height: 127px;
    overflow-y: auto;
    word-break: break-all;
    width: 100%;
    display: block;
    padding: 12px;
}

.searchBar {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 9996;
}

.imgPreview {
  width: 150px;
  height: 90px;
  background: transparent;
  border-radius: 7px;
  cursor: pointer;
}

.searchIcn {
  position: relative;
  right: 20px;
  color: #ccc;
  top: 6px;
}

.image-container .item:last-child {
  margin-bottom: 50px;
}

.wordBreak {
  word-break: break-word;
}

.modal-img {
    width: 100%;
    height: 125px;
    border-radius: 8px;
    margin-top: 18px;
}

#custom-search-input {
  margin: 0;
  /* margin-top: 10px; */
  /* padding: 0; */
  width: 100%;
  padding: 34px 0px 0px 12px;
}

#custom-search-input .search-query {
  padding-right: 3px;
  padding-right: 4px \9;
  padding-left: 3px;
  padding-left: 4px \9;

  margin-bottom: 0;
  -webkit-border-radius: 3px;
  -moz-border-radius: 3px;
  border-radius: 3px;
}

#custom-search-input button {
  border: 0;
  background: none;
  padding: 2px 5px;
  margin-top: 2px;
  position: relative;
  left: -28px;
  margin-bottom: 0;
  -webkit-border-radius: 3px;
  -moz-border-radius: 3px;
  border-radius: 3px;
  color: #d9230f;
}

.modal-header-text {
  word-break: break-word;
  width: 90%;
}

.search-query:focus + button {
  z-index: 3;
}

h3 {
  margin: 0;
}


</style>

<style>

@-moz-document url-prefix() {
  @media screen and (min-width: 1024px) and (min-height: 800px) { 
  .align-chart {
         width: 32% !important;
         height: 15% !important;
         top: 21% !important;
  }

  .empty-data {
        transform: translate(35%, -50%) !important;
        margin-top: 18% !important;
    }
  }

  @media only screen and (min-device-width: 320px) and (max-device-height: 568px) { 
    .empty-data img {
        width: 300px;
     }
 
     .footer-item {
         padding: 8px 17px 0px 50px !important;
     }
 
     .imgPreview {
         width: 128px !important;
     }
 
     .swiper {
         height: 500px !important;
         margin-top: 9px !important;
     }
 
     .swiper .swiper-slide {
         height: 134px !important;
     }

     .swiper .swiper-slide {
          height: 141px !important;
     }
}


 @media only screen and (min-device-width: 375px) and (max-device-height: 667px) { 
    .empty-data img {
        width: 300px;
     }
 
     .footer-item {
         padding: 8px 17px 0px 50px !important;
     }
 
     .imgPreview {
         width: 128px !important;
     }
 
     .swiper {
         height: 613px !important;
         margin-top: 9px !important;
     }

     .swiper-wrapper {
        width: 0px !important;
    }
 
     .swiper .swiper-slide {
         height: 134px !important;
     }
}

@media only screen and (min-device-width: 414px) and (max-device-height: 846px) { 
   
     .swiper {
         height: 648px !important;
         margin-top: 9px !important;
     }

     .swiper-wrapper {
        width: 0px !important;
    }
 
     .swiper .swiper-slide {
         height: 134px !important;
     }
}


}
  
.swiper-container-multirow-column >.swiper-wrapper {
    margin-top: 67px !important;
}

.swiper-slide {
  margin-top: 0px !important;
}

.swiper-pagination-bullet {
  width: 12px !important;
  height: 12px !important;
}

</style>
