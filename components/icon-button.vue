<template>
	<view class="input-row border" style="width: 100%;height: 42px;padding-top: 3px;">
		<view style="width: 11%;text-align: center;padding-bottom: 5px;">
			<image v-if="src1" :src="src1" mode="widthFix" class="img"></image>
		</view>
		<text style="width: 75%;text-align: left;padding-left: 10px;padding-top: 2px;font-size: medium;" @click="onClick">{{name}}</text>
		<image v-if="this.showRight" src="../static/img/button/black.png" style="width:10%;" mode="widthFix"></image>
	</view>
</template>

<script>
	export default {
		props: {
			src1: String,
			showRight : {type:Boolean,default:true},
			name: String
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
		margin-top: 10%;
		
	}
</style>
