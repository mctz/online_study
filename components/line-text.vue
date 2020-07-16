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
		padding-top: 15rpx;
		padding-bottom: 15rpx;
		padding-right: 10rpx;
		line-height: 35rpx;
		text-align: center;
		font-size: 14px;
		font-weight: normal;
	}
</style>


