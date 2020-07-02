<template>
	<view class="input-row border">
		<view class="text" style="min-width: 180rpx;width: fit-content;">{{ltext}}:</view>
		<view class="text" style="-webkit-flex: 1;flex: 1;text-align: right;">{{rtext}}</view>
	</view>
</template>

<script>
	export default {
		props:{
			ltext:String,
			rtext:String
		},
		data() {
			return {
				
			};
		}
	}
</script>
<style lang="scss">
	.text {
		margin-top: 15rpx;
		margin-bottom: 15rpx;
		padding-right: 10rpx;
		height: 50rpx;
		line-height: 35rpx;
		text-align: center;
		font-size: 28rpx;
		font-weight: normal;
	}
</style>


