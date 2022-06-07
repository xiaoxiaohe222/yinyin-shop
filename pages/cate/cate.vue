<template>
	<view class="cate-container">
		<!-- 搜索部分 -->
		<view class="search">
			我是搜索头部
		</view>
		<!-- 滑动区域部分 -->
		<view class="scroll">
			<!-- 滑动的左侧区域 -->
			<scroll-view class="left-scroll" scroll-y="true">
				<view @click="clickLeftItem(index)" class="left-item" :class="{active:index===currentIndex}"
					v-for="(item,index) in cateList" :key="item.cat_id">{{item.cat_name}}</view>
			</scroll-view>
			<!-- 滑动的右侧区域 -->
			<scroll-view class="right-scroll" scroll-y="true" :scroll-top="scrollTop" @scroll="scroll">
				<view v-for="item in rightList[currentIndex]" :key="item.cat_id">
					<view class="title">
						/{{item.cat_name}}/
					</view>
					<view class="content">
						<view @click="toDetail(item1)" class="content-item" v-for="item1 in item.children" :key="item1.cat_id">
							<image :src="item1.cat_icon"></image>
							<view class="desc">
								{{item1.cat_name}}
							</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				cateList: [],
				currentIndex: 0,
				rightList: [],
				scrollTop: 0,
				oldScrollTop: 0

			};
		},
		created() {
			this.getCateList()
		},
		methods: {
			toDetail(item){
				uni.navigateTo({
					url:"/subpkg/goods_detail/goods_detail?cid="+item.cat_id
				})
			},
			scroll(e) {
				//记录scroll  位置
				this.oldScrollTop = e.detail.scrollTop
			},
			clickLeftItem(index) {
				this.currentIndex = index
				this.scrollTop = this.oldScrollTop
				this.$nextTick(() => {
					this.scrollTop = 0
				});


			},
			async getCateList() {
				const res = await this.$http(`/api/public/v1/categories`)
				this.cateList = res.message
				this.rightList = res.message.map(item => {
					return item.children
				})
			}

		}
	}
</script>

<style lang="scss">
	.cate-container {
		height: 100%;

		.search {
			height: 100rpx;
			line-height: 100rpx;
			text-align: center;
			background-color: darkgreen;
			color: white;
		}

		.scroll {
			height: calc(100vh - 100rpx);
			display: flex;

			.left-scroll {
				width: 30%;
				height: 100%;
				background-color: #f7f7f7;

				.left-item {
					box-sizing: border-box;
					height: 110rpx;
					line-height: 110rpx;
					text-align: center;
					font-size: 26rpx;

					&.active {
						position: relative;
						background-color: #fff;

						&::before {
							content: '';
							position: absolute;
							left: 0;
							top: 10rpx;
							width: 4rpx;
							height: 90rpx;
							background-color: #C00000;
						}
					}
				}

			}

			.right-scroll {
				background-color: #fff;
				width: 70%;
				height: 100%;

				.title {
					font-size: 26rpx;
					height: 100rpx;
					line-height: 100rpx;
					text-align: center;
					background-color: #fff;
				}

				.content {
					display: flex;
					flex-wrap: wrap;

					.content-item {
						box-sizing: border-box;
						padding: 10rpx;
						width: 33%;
						display: flex;
						flex-direction: column;
						align-items: center;
						margin-bottom: 10rpx;

						image {
							width: 126rpx;
							height: 126rpx;
						}

						.desc {
							font-size: 24rpx;
							margin-top: 10rpx;
						}
					}
				}

			}
		}
	}
</style>
