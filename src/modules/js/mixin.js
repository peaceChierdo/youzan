import Foot from 'components/Foot.vue'

let mixin = {
	components: {
 		Foot
 	},
	filters: {
 		money(price) {
 			return parseFloat(price).toFixed(2)
 		}
 	}
}

export default mixin