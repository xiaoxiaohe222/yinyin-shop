<template>
	<view class="search-container">
		<!-- 搜索头部 -->
		<view class="search-header">
			<input @input="inputHandler" placeholder-class="demo" class="input" type="search" placeholder="请输入搜索内容">
		</view>
		<view  v-if="searchResults.length" class="result">
			<scroll-view class="scroll" scroll-y="true">
				<view @click="toDetail(item.goods_id)" v-for="item in searchResults" :key="item.goods_id" class="scroll-item">
					<text class="scroll-item-title">{{item.goods_name}}</text>
					<uni-icons class="scroll-item-icon" type="forward" size="22"></uni-icons>
				</view>
			</scroll-view>
		</view>
		<!-- 和搜索结果互斥 -->
		<view v-else>
			<!-- 搜索历史标题 -->
			<view class="search-title">
				<view class="title">
					搜索历史
				</view>
				<uni-icons type="trash" size="24" @click="clearHistory"></uni-icons>
			</view>
			<!-- 显示搜索历史的内容区域 -->
			<view class="history-list">
				<view @click="toGoodsList(item)" class="history-item" v-for="item in kwList" :key="item">
					{{item}}
				</view>
			</view>
		</view>


	</view>
</template>

<script>
	export default {
		data() {
			return {
				kw: '',
				timer: null,
				searchResults: [],
				kwList: JSON.parse(uni.getStorageSync('kwList') || '[]')
			}
		},
		methods: {
			toGoodsList(item){
				uni.navigateTo({
					url:`/subpkg/goods_list/goods_list?query=${item}`
				})
			},
			clearHistory(){
				uni.showModal({
					title: '提示',
					content: '确定删除吗？',
					success:  (res) => {
						if (res.confirm) {
							this.kwList = []
							uni.removeStorageSync('kwList')
						} 
					}
				});
			},
			toDetail(id){
				uni.navigateTo({
					url:`/subpkg/goods_detail/goods_detail?goods_id=${id}`
				})
				 
			},
			inputHandler(e) {
				this.timer && clearTimeout(this.timer)
				this.timer = setTimeout(() => {
					this.kw = e.detail.value
					this.getSearchResult(this.kw)
				}, 500)
			},
			async getSearchResult(kw) {
				if (!kw.trim()) return this.searchResults = []
				
				const res = await this.$http('/api/public/v1/goods/qsearch', {
					query: this.kw
				})
				this.searchResults = res.message
				
				// 只要发送请求那么该关键字就该放入kwList
				if(this.searchResults.length){
					if (this.kwList.findIndex((item) => item === this.kw) === -1) {
						this.kwList.unshift(this.kw)
						uni.setStorageSync('kwList',JSON.stringify(this.kwList))
						if(this.kwList.length > 5){
							this.kwList = [...this.kwList.slice(0,5),'...']
							uni.setStorageSync('kwList',JSON.stringify(this.kwList))
						}
					}
				}
			}
		}
	}
</script>

<style lang="scss">
	@import url('../../static/iconfont/iconfont.css');

	.demo {
		color: darkgray;
		font-size: 28rpx;
	}

	.search-container {
		.result {
			height: calc(100vh - 100rpx);

			.scroll {
				height: 100%;

				.scroll-item {
					height: 100rpx;
					line-height: 100rpx;
					display: flex;
					align-items: center;
					border-bottom: 1px solid darkgray;

					.scroll-item-title {
						width: 90%;
						padding: 0 5rpx;

						white-space: nowrap;
						text-overflow: ellipsis;
						overflow: hidden;
						font-size: 28rpx;
					}

					.scroll-item-icon {
						width: 10%;

					}

				}
			}
		}

		.search-header {
			display: flex;
			justify-content: center;
			align-items: center;
			height: 100rpx;
			background-color: #C00000;

			.input {
				position: relative;
				width: 88%;
				height: 70rpx;
				background-color: #fff;
				border-radius: 35rpx;
				padding-left: 60rpx;

				&::before {
					content: "\e741";
					font-family: 'iconfont';
					position: absolute;
					left: 19rpx;
					top: 50%;
					transform: translateY(-50%);
					color: lightgray;
					font-size: 40rpx;
				}
			}
		}

		.search-title {
			border-bottom: 1px solid darkgray;
			height: 100rpx;
			padding: 0 20rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			background-color: #fff;

			.title {
				font-size: 30rpx;
			}
		}

		.history-list {
			padding: 20rpx 20rpx 0;
			display: flex;
			flex-wrap: wrap;

			.history-item {
				padding: 0 70rpx;
				height: 100rpx;
				line-height: 100rpx;
				text-align: center;
				background-color: #fff;
				margin: 0 20rpx 20rpx 0;
				color: darkgray;
			}
		}
	}
</style>
