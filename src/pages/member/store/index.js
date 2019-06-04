import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import Address from 'js/addressService.js'
import axios from 'axios'
import url from 'js/api.js'

const store = new Vuex.Store({
	state: {
		lists: null,
	},
	mutations: {
		init(state, lists) {
			state.lists = lists
		},
		add(state, instance){
			state.lists.push(instance)
		},
		remove(state, id) {
			let lists = state.lists
			let index = lists.findIndex(item => {
				return id === item.id
			})
			lists.splice(index,1)
		},
		update(state, instance) {
			let lists = JSON.parse(JSON.stringify(state.lists))
			let index = lists.findIndex(item => {
				return instance.id === item.id
			})
			lists[index] = instance
			state.lists = lists 
		},
		// setDefault(state, id){
		// 	let lists = state.lists
		// 	lists.forEach(item => {
		// 		// if(item.id === id){
		// 		// 	if(item.isDefault){

		// 		// 	}
		// 		// }
		// 		item.isDefault = item.id==id ?true :false
		// 	})
		// }
		setDefault(state, paramData){
			console.log(paramData)
			let lists = state.lists
			lists.forEach(item => {
				if(item.id === paramData.id){
					if(item.isDefault){
						console.log(1)
						paramData.$router.go(-1)
					}
				}
				item.isDefault = item.id==paramData.id ?true :false
			})
		}
	},
	actions: {
		getLists({commit}) {
      axios.get(url.addressLists).then(res => {
        commit('init', res.data.lists)
      })
		},
		addAction({commit},instance) {
			Address.add(instance).then(res => {
				commit('add', instance)
			})
		},
		removeAction({commit}, id){
			Address.remove(id).then(res => {
				commit('remove', id)
			})
		},
		updateAction({commit}, instance){
			Address.update(instance).then(res => {
				// commit('update', res.data.data)
				//这里模拟后端返回了一个加了id的data
				// let data = res.data.data
				// console.log(res.data)
				// data.id = instance.id
				// data.isDefault = instance.isDefault
				commit('update', instance)
			})
		},
		// setDefaultAction({commit}, id){
		// 	Address.setDefault(id).then(res => {
		// 		commit('setDefault', id)
		// 	})
		// }
		setDefaultAction({commit}, paramData){
			Address.setDefault(paramData.id).then(res => {
				commit('setDefault', paramData)
			})
		}
	}
})

export default store