<template>
	<view class="content login" :style="{backgroundImage: 'url('+iconUrl+'login_bg.jpg)'}">
		<view style="text-align: center;">
			<image :src="iconUrl+'ic_logo.jpg'" mode="widthFix" style="text-align: center;margin-top: 20%;"></image>
		</view>
		<view class="input-group" style="margin-top: 15%;">
			<view class="input-row border">
				<text class="title" style="line-height: 45px;">学校：</text>
				<view class="uni-list-cell" style="width: 100%;padding-top: 5px;">
					<view class="uni-list-cell-db">
						<picker @change="bindPickerChange" :value="index" :range="schoolList" range-key="schoolName">
							<view class="uni-input">{{schoolList[index].schoolName}}</view>
						</picker>
					</view>
				</view>
			</view>
		</view>
		<view class="input-group">
			<view class="input-row border">
				<text class="title" style="line-height: 50px;">账号：</text>
				<m-input class="m-input" type="text" clearable v-model="account" placeholder="请输入账号"></m-input>
			</view>
			<view class="input-row">
				<text class="title" style="line-height: 50px;">密码：</text>
				<m-input type="password" displayable v-model="password" placeholder="请输入密码"></m-input>
			</view>
		</view>
		<view class="input-row btn-row">
			<button type="primary" class="primary" style="width: 40%;" @tap="bindLogin">登录</button>
			<button @tap="visitorLogin" style="width: 40%;color: #567CA3;">访客登录</button>
		</view>
		<view class="action-row" style="margin-top: 10px;color: grey;font-size: 15px;">
			<view style="width: 35%;">
				<switch :checked="autoLogin" @change="autoLoginF" style="transform:scale(0.7)" color="#39B54A"></switch>
				<text style="padding-top: 8px;margin-left: -8px;">自动登录</text>
			</view>
			<view style="width: 35%;">
				<switch :checked="savePassword" @change="savePasswordF" style="transform:scale(0.7)" color="#39B54A"></switch>
				<text style="padding-top: 8px;margin-left: -8px;">保存密码</text>
			</view>
			<view  style="padding-top: 3px;width: 30%;">
				<navigator v-if="schoolList[index].schoolCode === '11078' || schoolList[index].schoolCode === '11846'"
				:url="'./pwd?baseUrl='+schoolList[index].imgUrl+'&account='+account">找回密码</navigator>
				<navigator v-else :url="'./pwd?account='+account">找回密码</navigator>
			</view>
		</view>
	</view>
</template>

<script>

	import {mapState,mapMutations} from 'vuex'
	import mInput from '@/components/m-input.vue'

	export default {
		components: {mInput},
		data() {
			return {
				savePassword: uni.getStorageSync("savePassword"),
				autoLogin: uni.getStorageSync("autoLogin"),
				account: uni.getStorageSync("account"),
				password: uni.getStorageSync("password"),
				positionTop: 0,
				isDevtools: false,
				schoolName:"",
				iconUrl:this.iconUrl,
				index : uni.getStorageSync("index")?uni.getStorageSync("index"):0,
				schoolList: this.schoolData
			}
		},
		onLoad() {
			if(this.debugLevel>1){
				console.log("onLoad",this.autoLogin);
			}
			this.index = uni.getStorageSync("index")?uni.getStorageSync("index"):0;
			var schoolInfo = this.schoolList[this.index];
			this.$store.schoolCode = schoolInfo.schoolCode;
			this.$store.schoolName = schoolInfo.schoolName;
			this.$store.imgUrl = schoolInfo.imgUrl;
			this.$store.baseUrl = schoolInfo.baseUrl;
			uni.setStorageSync("index",this.index);
			uni.setStorageSync("baseUrl",schoolInfo.baseUrl);
			uni.setStorageSync("imgUrl",schoolInfo.imgUrl);
			if(!uni.getStorageSync("autoLogin")){
				uni.setStorageSync("autoLogin",false);
			}
			if(!uni.getStorageSync("savePassword")){
				uni.setStorageSync("savePassword",true);
			}
			if(!this.savePassword){
				this.password = "";
				uni.setStorageSync("password","");
			}
			if(this.autoLogin && this.$store.onLaunch=='Y' && this.account.length>0 && this.password.length>0){
				this.bindLogin();
			}
			this.$store.onLaunch='N';
		},
		methods: {
			...mapMutations(['login']),
			bindPickerChange: function(e) {
				this.index = e.target.value
				var schoolInfo = this.schoolList[this.index];
				this.$store.schoolCode = schoolInfo.schoolCode;
				this.$store.schoolName = schoolInfo.schoolName;
				this.$store.imgUrl = schoolInfo.imgUrl;
				this.$store.baseUrl = schoolInfo.baseUrl;
				uni.setStorageSync("index",this.index);
				uni.setStorageSync("baseUrl",schoolInfo.baseUrl);
				uni.setStorageSync("imgUrl",schoolInfo.imgUrl);
				console.log(this.index,schoolInfo.baseUrl);
			},
			autoLoginF(e){
				this.autoLogin = e.detail.value;
				uni.setStorageSync("autoLogin",this.autoLogin);
			},
			savePasswordF(e){
				this.savePassword = e.detail.value;
				uni.setStorageSync("savePassword",this.savePassword);
			},
			initPosition() {
				uni.getSystemInfoSync({
					success(res) {
						uni.setStorageSync("platform",res.platform);
						uni.setStorageSync("brand",res.brand);//手机牌子
						uni.setStorageSync("model",res.model);//手机型号
						uni.setStorageSync("uuid",res.brand+res.model);
					}
				});
				/**
				 * 使用 absolute 定位，并且设置 bottom 值进行定位。软键盘弹出时，底部会因为窗口变化而被顶上来。
				 * 反向使用 top 进行定位，可以避免此问题。
				 */
				this.positionTop = uni.getSystemInfoSync().windowHeight - 100;
			},
			visitorLogin(){
				uni.navigateTo({
					url: '../login/wx',
				});
			},
			async bindLogin() {
				//var baseUrl = this.schoolList[this.index].baseUrl;
				if(this.debugLevel>0){
					console.log(this.index,uni.getStorageSync("index"),uni.getStorageSync("baseUrl"));
				}
				if (this.account.length == 0) {
					uni.showToast({
						icon: 'none',
						title: '账号不能为空'
					});
					return;
				}
				if (this.password.length == 0) {
					uni.showToast({
						icon: 'none',
						title: '密码不能为空'
					});
					return;
				}
				uni.showLoading({
					title:"登录中"
				});
				setTimeout(function(){
					uni.hideLoading();
				},10000);
				uni.setStorageSync("appMac",uni.getStorageSync("uuid")+this.account);
				await this.$http.post('/user/login', {
					userName: this.account,
					password: this.password,
					operate:"login",
					appmac:uni.getStorageSync("appMac"),
					terminalType:uni.getStorageSync("platform")
				}).then(res => {
					let result = JSON.parse(res);
					if(result.status===this.RESPONSE_OK){
						uni.hideLoading();
						this.toMain(JSON.parse(result.data));
					}else {
						uni.hideLoading();
						uni.showToast({
							icon:"none",
							title: result.msg,
						});
					}
				});
			},
			toMain(userInfo) {
				this.$store.account = this.account;
				this.$store.loginTime = this.date();
				this.$store.baseInfoId = userInfo.studentBaseId;
				this.$store.userId = userInfo.resourceid;
				uni.setStorageSync("account",this.account);
				uni.setStorageSync("password",this.password);
				uni.setStorageSync("userInfo",userInfo);
				this.login(this.account);
				uni.reLaunch({
					url: '../main/study',
				});
			}
		},
		onReady() {
			this.initPosition();
			// #ifdef MP-WEIXIN
			this.isDevtools = uni.getSystemInfoSync().platform === 'devtools';
			// #endif
		}
	}
</script>

<style>
	.action-row {
		display: flex;
		flex-direction: row;
		justify-content: center;
	}

	.action-row navigator {
		color: #007aff;
		padding: 0 10px;
	}

	.oauth-row {
		display: flex;
		flex-direction: row;
		justify-content: center;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
	}

	.oauth-image {
		position: relative;
		width: 50px;
		height: 50px;
		border: 1px solid #dddddd;
		border-radius: 50px;
		margin: 0 20px;
		background-color: #ffffff;
	}

	.oauth-image image {
		width: 30px;
		height: 30px;
		margin: 10px;
	}

	.oauth-image button {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		opacity: 0;
	}
	.login {
		background-size: 100% 100%;
	}
</style>
