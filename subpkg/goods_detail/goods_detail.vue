<template>
	<view class="detail-container" v-if="goodInfo.goods_name">
		<!-- 轮播图区域 -->
		<swiper class="swiper" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" circular>
			<swiper-item @click="preview(index)" v-for="(item,index) in goodInfo.pics" :key='index'>
				<view class="swiper-item">
					<image class="img"  :src="item.pics_mid_url"></image>
				</view>
			</swiper-item>
		</swiper>
		<!-- 商品描述 -->
		<view class="desc">
			<view class="price">¥ {{goodInfo.goods_price}}</view>
			<view class="name">
				<view class="title">
					{{goodInfo.goods_name}}
				</view>
				<view class="save">
					<uni-icons color='gray' type="star" size="24"></uni-icons>
					<view >收藏</view>
				</view>
			</view>
			<view class="express">
				快递： 免运费
			</view>
		</view>
		<!-- 图文介绍 -->
		<view class="rich" style="padding-bottom: 100rpx;">
			<rich-text :nodes="goodInfo.goods_introduce"></rich-text>
		</view>
		<!-- 底部按钮 -->
		<view class="footer">
			<view class="shop">
				<uni-icons type="shop" size="26"></uni-icons>
				<text>店铺</text>
			</view>
			<view class="cart" @click="toCart">
				<view class="count" v-if="cart.length">{{ total}}</view>
				<uni-icons class="icon" type="cart" size="26"></uni-icons>
				<text>购物车</text>
			</view>
			<view class="btns">
				<view class="join" @click="addCart">
					加入购物车
				</view>
				<view class="buy">
					立即购买
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { mapState ,mapGetters } from 'vuex' 
	export default {
		data() {
			return {
				goods_id:"",
				goodInfo:{}
			};
		},
		onLoad(options) {
			this.goods_id = options.goods_id;
			this.getGoodInfo()
		},
		computed:{
			...mapState('cart',['cart']),
			...mapGetters('cart',['total'])
		},
		methods:{
			addCart(){
				// 添加进购物车之前，先判断库存数量是否充足
				if(this.goodInfo.goods_number < 1){
					return uni.showToast({
						title:"该商品库存不足...",
						icon:'error'
					})
				}
				const obj = {}
				obj.goods_id = this.goodInfo.goods_id;
				obj.goods_name = this.goodInfo.goods_name;
				obj.goods_price= this.goodInfo.goods_price;
				obj.goods_logo= this.goodInfo.goods_small_logo;
				obj.goods_number = this.goodInfo.goods_number;
				obj.goods_count =  1;
				obj.is_checked = true;
				
				this.$store.commit('cart/ADD_CART',obj)
				uni.showToast({
					title:'加入购物车成功',
					icon:'success'
				})
				
			},
			toCart(){
				uni.switchTab({
					url:"/pages/cart/cart"
				})
			},
			async getGoodInfo(){
				const res = await this.$http(`/api/public/v1/goods/detail`,{goods_id:this.goods_id})
				this.goodInfo = res.message;
			},
			preview(index){
				const urls = this.goodInfo.pics.map(item=>item.pics_mid_url)
				uni.previewImage({
					urls,
					current:index,
					loop:true
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.detail-container{
	.swiper{
		height: 500rpx;
		.img{
			width: 100vw;
			height: 500rpx;
		}
	}
	.desc{
		padding: 15rpx;
		.price{
			height: 70rpx;
			line-height: 70rpx;
			color: #C00000;
			font-size: 48rpx;
		}
		.name{
			padding: 20rpx 0;
			display: flex;
			align-items: center;
			height: 120rpx;
			.title{
				
				padding-right: 10rpx;
				border-right: 1px solid darkgray;
				width: 80%;
				display:-webkit-box;         //将对象作为弹性伸缩盒子模型显示。
				-webkit-box-orient:vertical; //从上到下垂直排列子元素（设置伸缩盒子的子元素排列方式）
				-webkit-line-clamp:2;        //限制行数
				overflow:hidden;             //超出部分隐藏
				text-overflow:ellipsis;      //用一个省略号代替超出的内容
			
			}
			.save{
				width: 20%;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				color: gray;
			}
		}
		.express{
			font-size: 28rpx;
			color: gray;
		}
	}
	.footer{
		position: fixed;
		left: 0;
		bottom: 0;
		width: 100vw;
		height: 100rpx;
		background-color: #fff;
		display: flex;
		.shop{
			width: 20%;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
		}
		.cart{
			position: relative;
			width: 20%;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			.count{
					position:absolute;
					left: 50%;
					top: 0;
					width: 40rpx;
					height: 40rpx;
					line-height: 40rpx;
					text-align: center;
					background-color: red;
					border-radius: 50%;
					color: #fff;
			}
			
		}
		.btns{
			height: 100%;
			width: 60%;
			display: flex;
			align-items: center;
			.join{
				height: 80%;
				width: 50%;
				background-color: red;
				border-radius: 40rpx 0 0 40rpx;
				text-align: center;
				line-height: 80rpx;
				color: white;
			}
			.buy{
				height: 80%;
				width: 50%;
				background-color: darkorange;
				border-radius: 0 40rpx  40rpx 0;
				text-align: center;
				line-height: 80rpx;
				color: white;
			}
		}
	}
}
</style>
