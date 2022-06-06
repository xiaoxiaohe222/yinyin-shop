// const baseUrl = `https://www.uinav.com`
const baseUrl = `http://api-ugo-web.itheima.net`
export default (url,data={},method='GET')=> new Promise((resolve,reject)=>{
	// 配饰loading效果
	uni.showLoading({
		title:"加载中...."
	})
	uni.request({
		url:baseUrl + url,
		method,
		data,
		success: (res)=>{
			if(res.data.meta.status === 200){
				resolve(res.data)
			}else{
				uni.showToast({
					title:res.data.meta.msg,
					icon:'error'
				})
				return new Promise(()=>{})
			}
			
		},
		fail: (error) => {
			uni.showToast({
				title:error.message,
				icon:'error'
			})
			return new Promise(()=>{})
		},
		complete:()=>{
			uni.hideLoading()
		}
	})
})