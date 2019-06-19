import 'css/common.css'
import './category.css'

import Vue from 'vue'
import axios from 'axios'
import url from 'js/api.js'
import mixin from 'js/mixin'

 new Vue({
 	el: "#app",
 	data: {
 		topLists: null,
 		topIndex: 0,
 		subData: null,
 		rankData: null,
 		defaultImg: 'this.src="https://img.yzcdn.cn/upload_files/2016/08/05/Fv5hhMZrtPZQWE7fape0ddEYtSuy.png?imageView2/2/w/300/h/0/q/75/format/png"'
 	},
 	created() {
 		this.getTopList()
 		this.getSubList(0)
 	},
 	methods: {
 		getTopList() {
 			axios.get(url.topList).then((res) => {
 				this.topLists = res.data.lists
 			})
 		},
 		getSubList(index,id) {
 			this.topIndex = index
 			if(index===0){
 				this.getRank()
 			}else{
	 			axios.get(url.subList, {id}).then(res => {
	 				this.subData = res.data.data
	 			}) 				
 			}
 		},
 		getRank() {
 			axios.get(url.rank).then(res => {
 				this.rankData = res.data.data
 			})
 		},
 		toSearch(list) {
 			location.href = `search.html?keyword=${list.name}&id=${list.id}`
 		}
 	},
 	mixins: [mixin]

 })