<template>
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <div class="swp-page swiper-slide" v-for="list in lists">
        <a class="js-no-follow" :href="list.clickUrl">
          <img class="goods-main-photo fadeIn" :src="list.img">
        </a>
      </div>
    </div>
    <div class="swiper-pagination"></div>
  </div>	
</template>

<style>
	.swiper-slide img{
		display: block;
		width: 100%;
		height: 100%;
	}
</style>

<script>
 	// import Swiper from 'swiper'
 	import Swiper from 'swiper/dist/js/swiper.js'
 	import 'swiper/dist/css/swiper.css'

	export default {
		name: 'swipe',
		props: {
			lists: {
				type: Array,
				required: true
			},
			name: {}
		},
		created() {

		},
		mounted() {
			console.log(this.lists)
			new Swiper('.swiper-container', {
				loop: true,
			  // pagination: '.swiper-pagination',
			  pagination: {
			    el: '.swiper-pagination',
			  },
			})
		}
	}
</script>