import './cart.css'
import './cart_base.css'
import './cart_trade.css'

import Vue from 'vue'
import axios from 'axios'
import url from 'js/api.js'
import mixin from 'js/mixin'
import Cart from 'js/cartService.js'
import Velocity from 'velocity-animate'

new Vue({
	el: '.container',
	data: {
		lists: null,
		total: 0,
		editingShop: null,
		editingShopIndex: -1,
		removePopup: false,
		removeData: null,
		removeMsg: ''
	},
	computed: {
		allSelected: {
			get() {
				if(this.lists && this.lists.length){
					return this.lists.every(shop => {
						return shop.checked
					})
				}
				return false
			},
			set(newVal) {
				this.lists.forEach(shop => {
					shop.checked = newVal
					shop.goodsList.forEach(good =>{
						good.checked = newVal
					})
				})
			} 
		},
		selectLists() {
			if(this.lists && this.lists.length){
				let arr = []
				let total = 0
				this.lists.forEach(shop => {
					shop.goodsList.forEach(good =>{
						if(good.checked){
							arr.push(good)
							total += good.price * good.number
						}
					})
				})
				this.total = total
				return arr
			}
			return []
		},
		allRemoveSelected: {
			get() {
				if(this.editingShop){
					return this.editingShop.removeChecked
				}
				return false
			},
			set(newVal) {
				if(this.editingShop){
					this.editingShop.removeChecked = newVal
					this.editingShop.goodsList.forEach(good => {
						good.removeChecked = newVal
					})
				}
			}
		},
		removeLists() {
			if(this.editingShop){
				let arr = []
				this.editingShop.goodsList.forEach(good => {
					if(good.removeChecked){
						arr.push(good)
					}
				})
				return arr
			}
			return []
		}
	},
	created() {
		this.getList()
	},
	methods: {
		getList() {
			axios.get(url.cartLists).then(res => {
				let lists = res.data.cartList
				lists.forEach(shop => {
					shop.checked = false
					shop.removeChecked = false
					shop.editing = false
					shop.editMsg = '编辑'
					shop.goodsList.forEach(good => {
						good.checked = false
						good.removeChecked = false
					})
				})
				this.lists = lists
			})
		},
		switchSelectGood(shop,good) {
			let attr = this.editingShop? 'removeChecked' :'checked'
			good[attr] = !good[attr]
			shop[attr] = shop.goodsList.every(good => {
				return good[attr]
			})
		},
		switchSelectShop(shop) {
			let attr = this.editingShop? 'removeChecked' :'checked'
			shop[attr] = !shop[attr]
			shop.goodsList.forEach(good => {
				good[attr] = shop[attr]
			})
		},
		selectAll() {
			let attr = this.editingShop? 'allRemoveSelected' :'allSelected'
			this[attr] = !this[attr]
		},
		edit(shop, shopIndex) {
			shop.editing = !shop.editing
			shop.editMsg = shop.editing?'完成':'编辑'
			this.lists.forEach((item,idx) => {
				if(idx!=shopIndex){
					item.editing = false
				    item.editMsg = shop.editing?'':'编辑'	
				}
			})
			this.editingShop = shop.editing ?shop :null
			this.editingShopIndex = shop.editing ?shopIndex :-1
		},
		minus(good) {
			if(good.number===1) return
			axios.post(url.cartReduce, {
				id: good.id,
				number: 1
			}).then(res => {
				good.number--
			})
		},
		add(good) {
			// axios.post(url.addCart, {
			// 	id: good.id,
			// 	number: 1
			// }).then(res => {
			// 	good.number++
			// })
			Cart.add(url.addCart, good.id).then(res => {
				good.number++
			})
		},
		remove(shop,shopIndex,good,goodIndex) {
			this.removePopup = true
			this.removeData = {shop,shopIndex,good,goodIndex}
			this.removeMsg = '确认删除所选商品吗？'
		},
		removeMulti(){
			this.removePopup = true
			this.removeMsg = `确认删除这${this.removeLists.length}个商品？`
		},
		removeConfirm() {
			if(this.removeMsg === '确认删除所选商品吗？'){
				let {shop,shopIndex,good,goodIndex} = this.removeData
				axios.post(url.cartRemove, {
					id: good.id
				}).then(res => {
					shop.goodsList.splice(goodIndex, 1)
					if(!shop.goodsList.length){
						this.lists.splice(shopIndex, 1)
						this.removeShop()
					}
				})
				this.removePopup = false
			}else{
				let ids = []
				this.removeLists.forEach(good => {
					ids.push(good.id)
				})
				axios.post(url.cartRemove, {
					ids
				}).then(res => {
					let arr = []
					this.editingShop.goodsList.forEach(good => {
						let index = this.removeLists.forEach(item => {
							return good.id == item.id
						})
						if (index === -1){
							arr.push(good)
						}
					})
					if(arr.length){
						this.editingShop.goodsList = arr
					}else{
						this.lists.splice(this.editingShopIndex,1)
						this.removeShop()
					}
					this.removePopup = false
				})
			}
		},
		removeCancel() {
			this.removePopup = false
		},
		removeShop() {
			this.editingShop = null
			this.editingShopIndex = -1
			this.lists.forEach(shop => {
				shop.editing = false
				shop.editMsg = '编辑'
			})
		},
		goodsStart(e,good){
			good.startX = e.changedTouches[0].clientX
		},
		goodsEnd(e,shopIndex,good,goodIndex){
			let endX = e.changedTouches[0].clientX
			let left = '0px'
			if(good.startX-endX>0){
				left = '-60px'
			}else{
				left = '0px'
			}
			Velocity(this.$refs[`goods-${shopIndex}-${goodIndex}`], {
				left
			})
		}
	},
	mixins: [mixin]
})