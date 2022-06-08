import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import cart from './cart.js'
import user from './user.js'

export default new Vuex.Store({
	modules:{
		cart,
		user
	}
})