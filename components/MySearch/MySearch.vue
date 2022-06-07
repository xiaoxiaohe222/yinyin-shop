<template>
	<view class="my-search-container">
		<input class="input" type="text" placeholder="搜索">
	</view>
</template>

<script>
	export default {
		name:"MySearch",
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
@import url('../../static/iconfont/iconfont.css');
.my-search-container{
	z-index: 999;
	position: fixed;
	left: 0;
	top: 0;
	width: 100vw;
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100rpx;
	background-color: #C00000;
	.input{ 
		position: relative;
		height: 70rpx;
		background-color: #fff;
		width: 85%;
		border-radius: 35rpx;
		text-align: center;
		&::before{
			content: "\e741";
			font-family: 'iconfont';
			position:absolute;
			left: 50%;
			top: 50%;
			transform: translateY(-50%);
			margin-left: -80rpx;
			 font-size: 44rpx;
			 color: darkgray;
			
			 
		}
		
	}
}
</style>