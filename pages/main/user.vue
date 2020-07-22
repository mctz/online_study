<template>
	<view style="width: 100%;">
		<view class="input-row border" style="background-color: #466488;height: 300rpx;">
			<view style="width: 30%;text-align: center;margin-top: 80rpx;" @tap="avatarChoose">
				<image :src="photoPath" style="width: 70%;border-radius: 50%;" mode="widthFix"></image>
			</view>
			<view style="width:80%;font-size: small;margin-top: 20px;line-height: 30px;">
				<view style="color:#ffffff;font-size: medium;">{{user.cnName}}</view>
				<view style="color:#ffffff;">{{user.classesName}}</view>
				<view style="color:#ffffff;">{{user.unitName}}</view>
				<view style="color:#ffffff;">在线时长：{{user.loginLongStr}}</view>
			</view>
		</view>
		
		<view style="margin-left: 15px;margin-top: 10px;">
			<navigator url="./user/base">
				<icon-button :src1="iconUrl+'user/base_info.png'" name="基本信息"></icon-button>
			</navigator>
			<navigator url="./user/student">
				<icon-button :src1="iconUrl+'user/student_info.png'" name="学籍信息"></icon-button>
			</navigator>
			<navigator :url="'./user/classes?classesId='+user.classesId">
				<icon-button :src1="iconUrl+'user/class.png'" name="班级信息"></icon-button>
			</navigator>
			<navigator url="./user/payment">
				<icon-button :src1="iconUrl+'user/charge.png'" name="缴费信息"></icon-button>
			</navigator>
			<navigator url="./user/password">
				<icon-button :src1="iconUrl+'user/password.png'" name="修改密码"></icon-button>
			</navigator>
			<navigator url="./user/settings">
				<icon-button :src1="iconUrl+'user/settings.png'" name="系统设置"></icon-button>
			</navigator>
			<icon-button @click="bindLogout" :src1="iconUrl+'user/logout.png'" name="注销登录"></icon-button>
		</view>
	</view>
</template> 


<script>
	import iconButton from '../../components/icon-button.vue'
	import { pathToBase64, base64ToPath } from '@/common/imageTools.js'
	import {mapState,mapMutations} from 'vuex'

	export default {
		data() {
			return {
				iconUrl:this.iconUrl,
				photoPath:uni.getStorageSync("headphoto"),
				user:uni.getStorageSync("userInfo"),
			}
		},
		components:{
			iconButton
		},
		computed: {
			...mapState(['hasLogin'])
		},
		async onPullDownRefresh() {
			await this.loadJs.reloadUser(uni.getStorageSync("userInfo").resourceid);
			await this.loadJs.saveLoginTime(this.$store.loginTime,this.date());
			this.user = uni.getStorageSync("userInfo");
			uni.stopPullDownRefresh();
		},
		async onLoad() {
			if (!this.hasLogin) {
				uni.reLaunch({
					url: '../login/login'
				});
			}
		},
		async onReady() {
			if(!uni.getStorageSync("userInfo")){
				await this.loadJs.reloadUser(uni.getStorageSync("userInfo").resourceid);
			}
			this.user = uni.getStorageSync("userInfo");
			if(this.user.photoPath!="" && this.user.photoPath!=null){
				this.photoPath = this.user.photoPath;
			}else if(!uni.getStorageSync("headphoto")){
				this.photoPath = this.iconUrl+"user/headphoto.png";
			}
			console.log(this.photoPath);
		},
		methods: {
			...mapMutations(['logout']),
			bindLogout() {
				this.$store.onLaunch ='N';
				this.loadJs.saveLoginTime(this.$store.loginTime,this.date());
				this.logout();
				uni.reLaunch({
					url: '../login/login',
				});
			},
			avatarChoose() {
				let that = this;
				uni.chooseImage({
					count: 1,
					sizeType: ['original', 'compressed'],
					sourceType: ['album', 'camera'],
					success(res) {
						that.photoPath = res.tempFilePaths[0];
						pathToBase64(res.tempFilePaths[0])
						.then(base64 => {
							//获取转码后的图片内容，调用接口上传
							uni.setStorageSync("headphoto",that.photoPath);
							console.log(that.photoPath);
						})
					}
				});
			},
		}
	}
</script>
