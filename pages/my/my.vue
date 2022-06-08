<template>
	<view>
		<view>
			<uni-swipe-action>
				<uni-swipe-action-item :right-options="options1" @click="bindClick">
					<view class="content-box"><text>使用数据填充</text></view>
				</uni-swipe-action-item>
				<uni-swipe-action-item :right-options="options1" @click="bindClick">
					<view class="content-box"><text>使用数据填充</text></view>
				</uni-swipe-action-item>
			</uni-swipe-action>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				options1: [{
					text: '删除',
					style:{backgroundColor:'#C00000',color:'#fff'}
				}],

			};
		},
		methods: {
			bindClick(e) {
				console.log(11)
				// uni.showToast({
				// 	title: `点击了${e.position === 'left' ? '左侧' : '右侧'} ${e.content.text}按钮`,
				// 	icon: 'none'
				// });
			}

		}
	}
</script>

<style lang="scss">
	.content-box {
		flex: 1;
		height: 44px;
		line-height: 44px;
		padding: 0 15px;
		position: relative;
		background-color: #fff;
		border: 1px solid #f5f5f5;
		}
</style>
