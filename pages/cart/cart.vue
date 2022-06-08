<template>
	<view v-if="cart.length" class="cart-container">
		<!-- 收货地址 -->
		<view v-if="address.address" class="has-address" @click="getAddres">
			<view class="title">
				<view class="left">
					收货人:{{address.username}}
				</view>
				<view class="right">
					电话: {{address.phone}}
				</view>
			</view>
			<view class="add-detail">
				收货地址:{{address.address}}
			</view>
		</view>
		<view v-else class="address">
			<button @click="getAddres" class="btn" type="primary">请选择收获地址+</button>
		</view>
		<!-- 标题 -->
		<view class="title">
			<uni-icons type="shop" size="30"></uni-icons>
			<text class="title-cart">购物车</text>
		</view>
		<!-- 购物车列表 -->

		<view class="cart-list">
			<uni-swipe-action>

				<block v-for="(item,index) in cart" :key="item.goods_id">
					<uni-swipe-action-item :right-options="options" @click="bindClick(item)">
						<view class="cart-item">
							<radio @click="radioChange(item)" color="#C00000" :checked="item.is_checked"></radio>
							<image class="img" :src="item.goods_logo"></image>
							<view class="cart-info">
								<view class="up">
									{{item.goods_name}}
								</view>
								<view class="down">
									<view class="price">¥ {{item.goods_price}}.00</view>
									<view class="btns">
										<button :disabled="item.goods_count <= 1" @click="changeCount(false,item)"
											class="btn">-</button>
										<input disabled="" class="input" :value="item.goods_count" type="text" />
										<button :disabled="item.goods_count >= item.goods_number"
											@click="changeCount(true,item)" class="btn">+</button>
									</view>
								</view>
							</view>
						</view>
					</uni-swipe-action-item>
				</block>


			</uni-swipe-action>
		</view>


		<!-- 结算bar -->
		<view class="pay-bar">
			<view class="all">
				<radio @click="allCheckClick" color="#C00000" :checked="allCheck"></radio>
				<text>全选</text>
			</view>

			<view class="total">合计: ¥ &nbsp; <text style="color: #C00000;;">{{totalMoney}}.00</text></view>

			<view class="pay">
				结算({{totalCount}})
			</view>

		</view>


	</view>

	<view v-else class="no-cart">
		<image class="null-img" src="/static/cart_empty@2x.png">
		</image>
		<text class="null-text">空空如也~~~</text>
	</view>

</template>

<script>
	import {
		mapState
	} from 'vuex'
	export default {
		data() {
			return {
				options: [{
					text: '删除',
					style: {
						backgroundColor: '#C00000',
						color: '#fff'
					}
				}],

			};
		},
		created() {

		},
		watch: {
			cart: {
				handler(newV) {
					uni.setStorageSync('cart', JSON.stringify(newV))
					uni.setTabBarBadge({
						index: 2,
						text: this.totalCount ?  this.totalCount + '' : this.totalCount
					})
				},
				deep: true
			}
		},
		methods: {
			getAddres() {
				uni.getSetting({
					success: (result) => {
						//2 获取权限状态 当属性名比较怪异时，都要使用[]形式来获取属性值
						const scopeAddress = result.authSetting['scope.address']
						if (scopeAddress == true || scopeAddress == undefined) {
							uni.chooseAddress({
								success: (res) => {
									let addressObj = {
										address: res.provinceName + ' ' + res.cityName + ' ' +
											res.detailInfo,
										phone: res.telNumber,
										username: res.userName
									}
									this.$store.commit('user/SAVE_ADDRESS', addressObj)
								}
							})
						}
					}
				})
			},
			bindClick(item) {
				uni.showModal({
					title: '提示',
					content: '确定删除吗？',
					success: (res) => {
						if (res.confirm) {
							this.cart.splice(this.cart.findIndex(k => k.goods_id === item.goods_id), 1)
						}
					}
				});

			},
			changeCount(isAdd, item) {

				if (isAdd) {
					if (item.goods_count + 1 > item.goods_number) {
						uni.showToast({
							title: '超出库存',
							icon: 'error'
						})
					} else {
						item.goods_count += 1
					}

				} else {
					if (item.goods_count - 1 < 1) {
						item.goods_count = 1
					} else {
						item.goods_count -= 1
					}
				}
			},
			radioChange(item) {
				item.is_checked = !item.is_checked
			},
			allCheckClick() {
				if (this.allCheck) {
					this.cart.forEach(item => {
						item.is_checked = false
					})
				} else {
					this.cart.forEach(item => {
						item.is_checked = true
					})
				}
			}
		},

		computed: {
			...mapState('cart', ['cart']),
			...mapState('user', ['address']),
			allCheck() {
				return this.cart.every(item => item.is_checked)
			},
			totalMoney() {
				return this.cart.reduce((pre, item) => {
					return item.is_checked ? pre + item.goods_count * item.goods_price : 0
				}, 0)
			},
			totalCount() {
				return this.cart.reduce((pre, item) => {
					return item.is_checked ? pre + item.goods_count : 0
				}, 0)
			}

		}
	}
</script>

<style lang="scss" scoped>
	.cart-container {
		min-height: 100vh;
		background-color: #fff;

		.has-address {
			font-size: 14px;
			height: 200rpx;
			border-bottom: 1px solid red;

			.title {
				padding: 15rpx 0;
				display: flex;
				justify-content: space-between;
				border-bottom: none;
				font-size: 14px;
			}

		}

		.address {
			height: 200rpx;
			border-bottom: 1px solid red;
			display: flex;
			justify-content: center;
			align-items: center;
		}

		.title {
			display: flex;
			align-items: center;
			height: 100rpx;
			border-bottom: 1px solid #ccc;
			font-size: 16px;
			padding-left: 10rpx;

			.title-cart {
				margin-left: 20rpx;
			}
		}

		.cart-list {
			padding-bottom: 120rpx;

			.cart-item {
				border-bottom: 1px solid #ccc;
				padding: 5px 0;
				height: 300rpx;
				display: flex;
				align-items: center;

				.icon {
					width: 30px;
				}

				.img {
					width: 100px;
					height: 100px;
					margin: 0 5px;

				}

				.cart-info {
					flex: 1;
					height: 100%;
					font-size: 14px;
					display: flex;
					flex-direction: column;
					justify-content: space-between;

					.down {
						padding: 0 5px;
						height: 100rpx;
						display: flex;
						align-items: center;
						justify-content: space-between;

						.price {
							font-size: 18px;
						}

						.btns {
							display: flex;

							::v-deep .btn {
								width: 30px;
								height: 30px;
								text-align: center;
								line-height: 30px;
								border-radius: 0;
								outline: none;
								border: none;
								background-color: #fff;
							}

							.input {
								background-color: #fff;
								width: 30px;
								height: 30px;
								text-align: center;
								border: 1px solid #ccc;
							}
						}

					}
				}
			}
		}

		.pay-bar {

			position: fixed;
			left: 0;
			bottom: 0;
			width: 100vw;
			height: 120rpx;
			background-color: #ccc;
			display: flex;
			font-size: 18px;

			.all {
				width: 20%;
				display: flex;
				align-items: center;
			}

			.total {
				line-height: 120rpx;
				width: 50%;
				text-align: center;
			}

			.pay {
				height: 100%;
				background-color: #C00000;
				width: 30%;
				color: #fff;
				text-align: center;
				line-height: 120rpx;
			}
		}
	}

	.no-cart {
		width: 100vw;
		height: 100vh;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		.null-img {
			width: 150px;
			height: 150px;
			margin-bottom: 15px;

		}

		.null-text {
			color: dimgrey;
			
		}

	}
</style>
