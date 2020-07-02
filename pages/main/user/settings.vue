<template>
	<view class="content" style="margin-bottom: 50px;">
		<view style="margin-left: 15px;margin-top: 10px;">
			<view class="input-row border" style="width: 100%;height: 45px;margin-top: 5px;">
				<text style="width: 75%;text-align: left;margin-left: 10px;">版本号</text>
				<text style="width:10%;">2.0</text>
			</view>
			<navigator url="./feedback">
				<icon-button src1="../../../static/img/user/feedback.png" name="意见反馈"></icon-button>
			</navigator>
			<navigator url="./about">
				<icon-button src1="../../../static/img/user/about.png" name="关于我们"></icon-button>
			</navigator>
		</view>
	</view>
</template> 

<script>
	import iconButton from '../../../components/icon-button.vue'
	export default {
		components:{
			iconButton
		},
		data() {
			return {
				photoPath:"../../../static/img/user/headphoto.png",
				recruitPhotoPath:"../../../static/img/user/headphoto.png",
				baseInfo:uni.getStorageSync("baseInfo")
			}
		},
		onPullDownRefresh() {
			this.loadJs.reloadBaseInfo(this.$store.baseInfoId);
			this.baseInfo = uni.getStorageSync("baseInfo");
			uni.stopPullDownRefresh();
		},
		onReady() {
			if(!uni.getStorageSync("baseInfo")){
				this.loadJs.reloadBaseInfo(this.$store.baseInfoId);
			}
			this.baseInfo = uni.getStorageSync("baseInfo");
			if(this.baseInfo.recruitPhotoPath!=null){
				this.recruitPhotoPath = this.$store.imgUrl+this.ATTACHS_STU+this.baseInfo.recruitPhotoPath;
			}
			if(this.baseInfo.photoPath!=null){
				this.photoPath = this.$store.imgUrl+this.ATTACHS_STU+this.baseInfo.photoPath;
			}
		},
	}
</script>

