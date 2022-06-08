const state = {
	// 每个对象都有数量count 。库存数量goods_number,商品价格 goods_price.商品name：goods_name
	// 商品图片 goods_small_logo 商品id goods_id 是否选中isChecked
	// {goods_id:43986,goods_name:'海信(Hisense)LED55MU9600X3DUC 55英寸 4K超高清量子点电视 ULED画质 VIDAA系统',
		// goods_price:13999,goods_logo:'http://image5.suning.cn/uimg/b2c/newcatentries/0000000000-000000000160455569_1_400x400.jpg'
		// ,goods_number:100,is_checked:true,goods_count:2
		// }
	cart:JSON.parse(uni.getStorageSync('cart') || '[]')
}
const mutations = {
	ADD_CART(state,goodObj){
		// 如果没有该obj就添加一个如果有的话就数量➕1
		let result = state.cart.find(item=>item.goods_id === goodObj.goods_id)
		if(result){
			result.goods_count ++
		}else{
			state.cart.push(goodObj)
		}
		uni.setStorageSync('cart',JSON.stringify(state.cart))
	}
}
const actions = {}
const getters = {
	total(state){
		return state.cart.reduce((pre,item)=>pre+item.goods_count,0)
	}
}

export default {
	namespaced:true,
	state,
	mutations,
	actions,
	getters
}