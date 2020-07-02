<template>
	<view class="content">
		<view style="text-align: center;">
			<image src="../../static/img/ic_logo.png" mode="widthFix" style="text-align: center;margin-top: 30px;"></image>
		</view>
		<view class="input-group">
			<view class="input-row border">
				<text class="title">学校：</text>
				<view class="uni-list-cell" style="width: 100%;">
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
				<text class="title">账号：</text>
				<m-input class="m-input" type="text" clearable v-model="account" placeholder="请输入账号"></m-input>
			</view>
			<view class="input-row">
				<text class="title">密码：</text>
				<m-input type="password" displayable v-model="password" placeholder="请输入密码"></m-input>
			</view>
		</view>
		<view class="btn-row">
			<button type="primary" class="primary" @tap="bindLogin">登录</button>
		</view>
		<view class="action-row" v-if="schoolList[index].schoolCode === '11078' || schoolList[index].schoolCode === '11846'">
			<navigator :url="'./pwd?baseUrl='+schoolList[index].imgUrl+'&account='+account">忘记密码</navigator>
		</view>
		<view class="action-row" v-else>
			<navigator :url="'./pwd?account='+account">忘记密码</navigator>
		</view>
	</view>
</template>

<script>

	import {
		mapState,
		mapMutations
	} from 'vuex'
	import mInput from '../../components/m-input.vue'

	export default {
		components: {
			mInput
		},
		data() {
			return {
				account: uni.getStorageSync("account"),
				password: uni.getStorageSync("password"),
				positionTop: 0,
				isDevtools: false,
				index : uni.getStorageSync("index")?uni.getStorageSync("index"):0,
				schoolList: this.schoolData
			}
		},
		onLoad() {
			if(this.$store.onLaunch=='Y' && this.account.length>0 && this.password.length>0){
				this.bindLogin();
			}
		},
		methods: {
			...mapMutations(['login']),
			bindPickerChange: function(e) {
				this.index = e.target.value
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
			bindLogin() {
				/**
				 * 客户端对账号信息进行一些必要的校验。
				 */
				var baseUrl = this.schoolList[this.index].baseUrl;
				
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
					if(!uni.getStorageSync("loginTimeOut")){
						uni.showToast({
							icon: 'none',
							title: '登录超时',
						});
					}
				},5000);
				uni.setStorageSync("baseUrl",baseUrl);
				uni.setStorageSync("appMac",uni.getStorageSync("uuid")+this.account);
				this.$store.baseUrl = baseUrl;
				this.$http.post('/user/login', {
					userName: this.account,
					password: this.password,
					operate:"login",
					appmac:uni.getStorageSync("appMac"),
					terminalType:uni.getStorageSync("platform")
				}).then(res => {
					uni.setStorageSync("loginTimeOut","N");
					let result = JSON.parse(res);
					if(result.status==this.RESPONSE_OK){
						uni.hideLoading();
						this.toMain(JSON.parse(result.data));
					}else if(result.status==this.RESPONSE_ERROR){
						uni.showToast({
							icon:"none",
							title: result.msg,
						});
					}else {
						uni.showToast({
							icon:"none",
							title: '登录失败，用户名或密码错误',
						});
					}
				});
				
			},
			toMain(userInfo) {
				this.$store.schoolCode = this.schoolList[this.index].schoolCode;
				this.$store.imgUrl = this.schoolList[this.index].imgUrl;
				this.$store.baseInfoId = userInfo.studentBaseId;
				this.$store.account = this.account;
				this.$store.loginTime = this.date();
				uni.setStorageSync("index",this.index);
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
</style>
