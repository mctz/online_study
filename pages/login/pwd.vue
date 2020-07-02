<template>
	<web-view v-if="baseUrl"
	 :src="baseUrl+'/exclude/portal/user/findPassWord.html'"></web-view>
	 <view class="content" v-else>
		 <view class="input-group">
			 <view class="input-row border">
			 	<text class="title">账号：</text>
			 	<m-input type="text" focus clearable v-model="account" placeholder="请输入登录账号"></m-input>
			 </view>
			
		 </view>
		 <view class="input-group">
			 <view class="input-row">
			  	<text class="title">问题：{{user.passwordQuestion}}</text>
			  </view>
			 <view class="input-row">
			 	<text class="title">答案：</text>
			 	<m-input type="text" v-model="passwordAnswer" placeholder="请输入问题答案"></m-input>
			 </view>
		</view> 
		 <view class="btn-row">
			<text v-if="!this.user.passwordAnswer" style="color: grey; font-size: small;">您尚未设置问题答案，请联系管理员进行重置</text>
		 	<button type="primary" class="primary" @tap="findPassword" :disabled="!this.user.passwordAnswer" style="margin-top: 5px;">重置密码</button>
		 </view>
	 </view>
</template>

<script>
	import mInput from '../../components/m-input.vue';
	export default {
		components: {
			mInput
		},
		data() {
			return {
				account:'',
				passwordAnswer:'',
				user: {},
				baseUrl:''
			}
		},
		onLoad(option) {
			this.baseUrl = option.baseUrl;
			this.account = option.account;
			if(this.baseUrl==undefined){
				this.$http.get('/user/getUser/'+this.account, {}).then(res => {
					uni.setStorageSync("temp",JSON.parse(result.data));
				});
			}
			this.user = uni.getStorageSync("temp");
		},
		onPullDownRefresh() {
			uni.stopPullDownRefresh();
		},
		methods: {
			findPassword() {
				if (this.passwordAnswer.length < 0) {
					uni.showToast({
						icon: 'none',
						title: '答案不能为空',
					});
					return;
				}else if(this.passwordAnswer === this.user.passwordAnswer){
					this.$http.post('/user/updatePassword', {
						userName: this.account,
						password: this.user.password,
						newPassword:'11'
					}).then(res => {
						let result = JSON.parse(res);
						if(result.status==this.RESPONSE_OK){
							this.toMain(result);
						}else if(result.status==this.RESPONSE_ERROR){
							uni.showToast({
								icon: 'none',
								title: '密码已重置为11',
							});
						}else {
							uni.showToast({
								icon: 'none',
								title: '密码重置失败',
							});
						}
					})
				}else {
					uni.showToast({
						icon: 'none',
						title: '答案不正确',
					});
				}
			}
		}
	}
</script>

<style>

</style>
