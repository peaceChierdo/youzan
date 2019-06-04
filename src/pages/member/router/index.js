import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

let routes = [{
	path: '/',
	component: require('../components/member.vue')
},{
	path: '/address',
	component: require('../components/address.vue'),
	children: [{
		path: '',
		redirect: 'all'
	},{
		path: 'all',
		component: require('../components/all.vue')
	},{
		path: 'editAddress',
		name: 'editAddress',
		component: require('../components/editAddress.vue')
	}]
}]

let router = new Router({
	routes
})

export default router