<template>
	<view class="home-container">
		<!-- 轮播图区域 -->
		<swiper class="swiper" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
			<swiper-item class="swiper-item" v-for="item in swiperList" :key="item.goods_id">
				<navigator :url="`/subpkg/goods_detail/goods_detail?goods_id=${item.goods_id}`">
					<image :src="item.image_src" mode="widthFix"></image>
				</navigator>
			</swiper-item>
		</swiper>
		<!-- 分类 导航区域 -->
		<view class="nav-list">
			<navigator url="/pages/cate/cate" class="nav-item" v-for="(item,index) in navList" :key="index"
				:open-type="item.open_type?item.open_type:'navigate'">
				<image :src="item.image_src"></image>
			</navigator>
		</view>
		<!-- 楼层区域 -->
		<view class="floor-item" v-for="(item,index) in floorList" :key="index">
			<image  class="floor-title" :src="item.floor_title.image_src" mode="widthFix"></image>
			<view class="floor-imgs">
				<navigator class="floor-big" :url="item.product_list[0].url">
					<image :src="item.product_list[0].image_src" mode="widthFix" :style="{width:item.product_list[0].image_width+'rpx'}"></image>
				</navigator>
				<view class="floor-smalls">
					<navigator :url="item1.url" v-for="(item1,index1) in item.product_list.slice(1)" :key="index1">
						<image :src="item1.image_src" mode="widthFix" :style="{width:item1.image_width+'rpx'}"></image>
					</navigator>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				swiperList: [],
				navList: [],
				floorList: []
			};
		},
		created() {
			this.getSwiperList(),
				this.getNavList(),
				this.getFlootList()
		},
		methods: {
			async getSwiperList() {
				const res = await this.$http('/api/public/v1/home/swiperdata')
				this.swiperList = res.message
			},
			async getNavList() {
				const res = await this.$http('/api/public/v1/home/catitems')
				this.navList = res.message
			},
			async getFlootList() {
				const res = await this.$http('/api/public/v1/home/floordata')
				this.floorList = res.message.map(item => {
					// item.url = '/subpkg/goods_list/goods_list'+item.navigator_url.split("?")[1]
					item.product_list = item.product_list.map(item1 => {
						item1.url = '/subpkg/goods_list/goods_list?' + item1.navigator_url.split("?")[1]
						return item1
					})
					return item
				})
			}
		}
	}
</script>

<style lang="scss">
	.swiper {
		width: 100vw;
		height: calc(100vw * 340 / 750);

		image {
			width: 100%;
		}
	}

	.nav-list {
		padding: 15rpx 0;
		display: flex;

		.nav-item {
			width: 25%;
			display: flex;
			flex-direction: column;
			align-items: center;

			image {
				width: 128rpx;
				height: 150rpx;
			}
		}
	}

	.floor-item {
		padding: 10rpx;

		.floor-title {
			width: 100vw;
		}
		.floor-imgs{
			display: flex;
			.floor-smalls{
				display: flex;
				flex-wrap: wrap;
				justify-content: space-around;
			}
			
			
		}

	}
</style>
