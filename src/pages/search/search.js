import 'css/common.css'
import './search.css'

import Vue from 'vue'
import axios from 'axios'
import url from 'js/api.js'
import qs from 'qs'
import mixin from 'js/mixin' 
import Velocity from 'velocity-animate'

let {keyword,id} = qs.parse(location.search.substr(1))

new Vue({
	el: '.container',
	data: {
		searchLists: null,
		keyword,
		isShow: false
	},
	created() {
		this.getSearchList()
	},
	methods: {
		getSearchList() {
			axios.get(url.searchList, {keyword,id}).then(res => {
				this.searchLists = res.data.lists
			})
		},
		showBtnTop() {
			if(document.documentElement.scrollTop > 100){
				this.isShow = true
			}else{
				this.isShow = false
			}
		},
		toTop() {
			Velocity(document.body, 'scroll', {duration: 400})
		}
	},
	mixins: [mixin]

})