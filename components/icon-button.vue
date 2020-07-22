<template>
	<view v-if="src1" class="input-row border" style="width: 100%;height: 45px;padding-top: 3px;font-size: 17px;">
		<view style="width: 11%;text-align: center;">
			<image v-show="src1" :src="src1" mode="widthFix" class="img" style="min-width: 20px;"></image>
		</view>
		<text class="text" style="width: 70%;color:#366092;" @click="onClick">{{name}}</text>
		<image v-if="this.showRight" :src="this.iconUrl+'button/black.png'" style="width:10%;padding-top: 3px;" mode="widthFix"></image>
	</view>
	<view v-else class="input-row border" style="width: 100%;height: 45px;padding-top: 3px;">
		<text class="text" style="width: 80%;color: #366092;" @click="onClick">{{name}}</text>
		<image v-if="this.showRight" :src="this.iconUrl+'button/black.png'" style="width:10%;padding-top: 3px;" mode="widthFix"></image>
	</view>
</template>

<script>
	export default {
		props: {
			src1: {type:String,default:""},
			showRight : {type:Boolean,default:true},
			name: String,
		},
		data() {
			return {
			}
		},
		methods: {
			onClick() {
				this.$emit('click')
			}
		}
	}
</script>

<style lang="scss">
	.img{
		width: 80%;
		height: 80%;
		background-color: #d8e3eb;
		border-radius: 50%;
		margin-top: 15%;
	}
	.text{
		text-align: left;
		padding-left: 10px;
		padding-top: 3px;
	}
</style>
