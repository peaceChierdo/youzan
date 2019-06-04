import Address from 'js/addressService.js'
import {mapState} from 'vuex'

export default {
	data() {
		return {
			name: '',
			tel: '',
			provinceValue: -1,
			cityValue: -1,
			districtValue: -1,
			addressValue: -1,
			address: '',
			id: '',
			type: '',
			instance: '',
			addressData: require('js/address.json'),
			cityLists: null,
			districtLists: null,
			type: this.$route.query.type,
			instance: this.$route.query.instance,
			isDefault: false,
			isInitial: false
		}
	},
	computed: {
		// lists() {
		// 	return this.$store.state.lists
		// }
		...mapState({
			lists: state => state.lists
		})
	},
	created() {
		if(this.type === 'edit') {
			let obj = this.instance
			this.provinceValue = parseInt(obj.provinceValue)
			this.name = obj.name
			this.tel = obj.tel
			this.address = obj.address
			this.id = obj.id
			this.isDefault = obj.isDefault
			this.isInitVal = true
		}
	},
	methods: {
		add() {
			let {name, tel, provinceValue, cityValue, districtValue, address} = this
			let data = {name, tel, provinceValue, cityValue, districtValue, address}

			if(this.type === 'add'){
				// Address.add(data).then(res => {
				// 	this.$router.go(-1)
				// })
				this.$store.dispatch('addAction', data)
			}

			if(this.type === 'edit'){
				data.id = this.id
				// Address.update(data).then(res => {
				// 	this.$router.go(-1)
				// })
				// this.districtValue = parseInt(this.instance.districtValue)
				data.isDefault = this.isDefault
				this.$store.dispatch('updateAction', data)
			}

		}, 
		remove() {
			if(window.confirm('确认删除？'+this.id)){
				// Address.remove(this.id).then(res => {
				// 	this.$router.go(-1)
				// })
				this.$store.dispatch('removeAction', this.id)
			}
		},
		setDefault() {
			// Address.setDefault(this.id).then(res => {
			// 	this.$router.go(-1)
			// })
			// this.$store.dispatch('setDefaultAction', this.id)
			let paramD = {
				id: this.id,
				$router: this.$router
			}
			this.$store.dispatch('setDefaultAction', paramD)
		}
	},
	watch: {
		lists: {
			handler() {
				this.$router.go(-1)
			},
			deep: true
		},
		provinceValue(val) {
			console.log(val)
			if(val === '-1') {return}
			let lists = this.addressData.list
			let index = lists.findIndex(item => {
				return item.value === val
			})
			this.cityLists = lists[index].children
			this.cityValue = -1
			this.districtValue = -1

		  if (this.type === 'edit' && this.isInitVal) {
		    this.cityValue = parseInt(this.instance.cityValue)
		  }
		},
		cityValue(val) {
			if(val === '-1') {return}
			let lists = this.cityLists
			let index = lists.findIndex(item => {
				return item.value === val
			})
			this.districtLists = lists[index].children
			this.districtValue = -1

      if (this.type === 'edit' && this.isInitVal) {
        this.districtValue = parseInt(this.instance.districtValue)
        this.isInitVal = false
      }
		}
	},
}