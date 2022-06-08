const state = {
	address:JSON.parse(uni.getStorageSync('address') || '{}')
}
const mutations = {
	SAVE_ADDRESS(state,addressObj){
		state.address = addressObj 
		// 持久化存储address
		uni.setStorageSync('address',JSON.stringify(addressObj))
	}
}
const actions = {}
const getters = {}

export default {
	namespaced:true,
	state,
	mutations,
	actions,
	getters
}