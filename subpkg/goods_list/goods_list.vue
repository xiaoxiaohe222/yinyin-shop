<template>
	<view class="goods_list_container">
		<view class="goods_item" v-for="item in list" :key="item.goods_id" @click="gotoDetail(item.goods_id)">
			<image  lazy-load :src="item.goods_small_logo || defaultPic" ></image>
			<view class="desc">
				<view class="title">
					{{item.goods_name}}
				</view>
				<view class="price">
					¥&nbsp;{{item.goods_price | priceFilter}}
				</view>
			</view>
		</view>
		<view class="bottom" v-if="isBottom" style="text-align: center;height: 100rpx;line-height: 100rpx;">
			----没有更多数据了---
		</view>
	</view>
</template>

<script>
	// 能进入这个页面有三个地方 第一是home的楼层区query 第二是分类的图片点击cid 第三是搜索历史的item通过query
	export default {
		data() {
			return {
				queryData: {
					query: '',
					cid: '',
					pagenum: 1,
					pagesize: 10
				},
				total: 0,
				list:[],
				isLoading:false,
				isBottom:false,
				defaultPic: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png'
			}
		},
		filters:{
			priceFilter(value){
				return Number(value).toFixed(2)
			}
		},
		methods: {
			// 点击跳转到商品详情页面
			gotoDetail(id) {
			  uni.navigateTo({
			    url: '/subpkg/goods_detail/goods_detail?goods_id=' + id
			  })
			},
			errorHandler(e){
				console.log(e)
			},
			async getList(cb){
				this.isLoading = true
				const par = {...this.queryData}
				
				for (let key in par) {
				  if(par[key] === undefined){
					  delete par[key]
				  }
				}
				// console.log(par)
				const res = await this.$http(`/api/public/v1/goods/search`,par);
				 this.total = res.message.total;
				this.list = [...this.list,...res.message.goods];
				this.isLoading = false
				if(this.list.length >= this.total){
					this.isBottom = true
				}
				
				cb && cb()
			}
		},
		onLoad(options) {
			const {query,cid} = options;
			this.queryData.cid = cid;
			this.queryData.query = query;
			// 获取搜索结果
			this.getList()
		},
		onReachBottom(){
			if(this.isLoading) return;
			if(this.isBottom){
				return uni.showToast({
					title:'到底.....',
					icon:"none"
				})
			}
			this.queryData.pagenum = this.queryData.pagenum + 1
			this.getList()
		},
		 onPullDownRefresh() {
			this.queryData.pagenum = 1
			this.total = 0
			this.list = []
			this.isLoading= false
			 this.getList(()=>{
				 uni.stopPullDownRefresh()
			 })
			
		}
	}
</script>

<style lang="scss" scoped>
.goods_list_container{
	background-color: #fff;
	.goods_item{
		border-bottom: 1px solid #efefef;
		padding: 0 5rpx 5rpx;
		display: flex;
		align-items: center;
		height: 250rpx;
		image{
			width: 30%;
			height: 80%;
		}
		.desc{
			height: 100%;
			margin-left: 10rpx;
			width: 80%;
			display: flex;
			flex-direction: column;
			justify-content: space-around;
			.title{
				text-overflow: -o-ellipsis-lastline;
					overflow: hidden;				//溢出内容隐藏
					text-overflow: ellipsis;		//文本溢出部分用省略号表示
					display: -webkit-box;			//特别显示模式
					-webkit-line-clamp: 2;			//行数
					line-clamp: 2;					
					-webkit-box-orient: vertical;	//盒子中内容竖直排列
			}
			.price{
				color: #C00000;
				font-size: 36rpx;
			}
		}
		
	}
}
</style>
