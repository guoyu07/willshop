<template>
  <div class="main">
    <wv-swipe :height="180" :auto="4000">
      <wv-swipe-item class="banner-swipe-item" v-for="banner in banners" :key="banner.index">
        <img :src="banner.img" alt="">
      </wv-swipe-item>
    </wv-swipe>

    <div class="ad">
      <img src="https://cdn.pixabay.com/photo/2015/03/18/09/31/prairie-679014__340.jpg" alt=""/>
      <router-link to="">去看看</router-link>
    </div>

    <div class="product-list">
      <div class="product-item" v-for="product in products.data">
        <router-link :to="'/product/' + product.id">
          <img class="thumbnail" :src="product.thumbnail" alt="">
          <span class="name" v-text="product.name"></span>
          <div class="price" v-html="product.price"></div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
  import { Swipe, SwipeItem } from 'we-vue'

  const banners = [{
    url: 'javascript:',
    img: 'https://cdn.pixabay.com/photo/2015/03/18/09/31/prairie-679014__340.jpg'
  },
  {
    url: 'javascript:',
    img: 'https://cdn.pixabay.com/photo/2015/03/18/09/29/the-scenery-679011__340.jpg'
  },
  {
    url: 'javascript',
    img: 'https://cdn.pixabay.com/photo/2015/03/28/16/40/lake-696098__340.jpg'
  }]

  export default {
    components: {
      [Swipe.name]: Swipe,
      [SwipeItem.name]: SwipeItem
    },

    data() {
      return {
        products: [],
        banners
      }
    },

    mounted() {
      this.getProducts()
    },

    methods: {
      getProducts() {
        this.axios.get('product').then((response) => {
          this.products = response.data.products
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  .banner-swipe-item {
    display: block;
    overflow: hidden;
  }

  .ad {
    display: block;
    width: 100%;
    height: 60px;
    overflow: hidden;
    background-color: red;
    position: relative;
    margin-top: 10px;

    img {
      position: absolute;
      display: block;
      overflow: hidden;
      width: 100%;
    }
    
    .link {
      z-index: 10;
      position: absolute;
      right: 10px;
      top: 10px;
      color: #fff;
    }
  }

  .product-list {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    width: 100%;
    margin: 10px auto 65px;

    .product-item {
      width: calc(50vw - 4px);
      display: block;
      overflow: hidden;
      background-color: #fff;
      margin-bottom: 10px;
      border-radius: 5px;
      border: 1px solid #ccc;

      .thumbnail {
        display: block;
        width: 100%;
      }

      .name {
        display: -webkit-box;
        color: #444;
        line-height: 1.2;
        text-overflow: ellipsis;
        box-orient: vertical;
        line-clamp: 2;
        word-break: break-all;
      }

      .price {
        display: block;
        padding: .2em;
        font-size: 15px;
        font-weight: bold;
        color: red;
        text-align: right;
      }
    }
  }
</style>
