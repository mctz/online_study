<template>
	<view class="content">
		<view class="input-group">
			<view class="input-row border">
				<text class="title" style="width: 100px;">原始密码：</text>
				<m-input class="m-input" type="text" clearable focus v-model="org_passwor" placeholder="原始密码"></m-input>
			</view>
			<view class="input-row border">
				<text class="title" style="width: 100px;">新密码：</text>
				<m-input type="password" displayable v-model="password1" placeholder="请输入新密码"></m-input>
			</view>
			<view class="input-row border">
				<text class="title" style="width: 100px;">密码确认：</text>
				<m-input type="password" v-model="password2" placeholder="请再次输入新密码"></m-input>
			</view>
			<view class="btn-row">
				<button type="info"  @tap="bindUpdate">修改</button>
			</view>
		</view>
	</view>
</template>

<script>
	import mInput from '../../../components/m-input.vue'

	export default {
		components: {
			mInput
		},
		data() {
			return {
				org_passwor:"",
			}
		},
		methods: {
			bindUpdate() {
				if (this.org_passwor.length == 0) {
					uni.showToast({
						icon: 'none',
						title: '原始密码不能为空'
					});
					return;
				}
				if (this.password1.length == 0) {
					uni.showToast({
						icon: 'none',
						title: '新密码不能为空'
					});
					return;
				}
				if (this.password1 != this.password2) {
					uni.showToast({
						icon: 'none',
						title: '两次输入的密码不一致'
					});
					return;
				}
				if (this.org_passwor == this.password1) {
					uni.showToast({
						icon: 'none',
						title: '新密码不能与原密码相同'
					});
					return;
				}
				this.$http.post('/user/updatePassword', {
					userName: uni.getStorageSync("account"),
					password: this.org_passwor,
					newPassword:this.password1
				}).then(res => {
					let result = JSON.parse(res);
					if(result.status==this.RESPONSE_OK){
						uni.showToast({
							icon: 'none',
							title: '修改成功',
						});
						setTimeout(function(){
							uni.navigateBack({});
						},1000);
					}else if(result.status==this.RESPONSE_ERROR){
						uni.showToast({
							icon: 'none',
							title: result.msg,
						});
					}else {
						uni.showToast({
							icon: 'none',
							title: '修改失败',
						});
					}
				})
			},
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
