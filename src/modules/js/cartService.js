import fetch from 'js/fetch.js'

class Cart {
	static add(url,id){
		return fetch(url,{
			id,
			number: 1
		})
	}
}

export default Cart