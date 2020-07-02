<template>
	
	<view class="content" style="margin-bottom: 50px;">
		<view class="input-row border">
			<text style="background-color: #FFFFFF;width: 20%;text-align: right;">标 题：</text>
			<input style="background-color: #FFFFFF;width: 80%;height: 35px;" type="text" focus v-model="feedBack.title" placeholder="请输入标题"></input>
		</view>
		<textarea style="background-color: #FFFFFF;width: 98%;margin-top: 30px;padding: 5px;" v-model="feedBack.content" placeholder="请输入反馈内容"></textarea>
		<view class="btn-row">
			<button type="primary" class="primary" @tap="commit">提交</button>
		</view>
	</view>
</template> 


<script>
	export default {
		data() {
			return {
				feedBack:{
					type:"app",
					certNum:this.$store.account
				},
			}
		},
		methods:{
			commit() {
				if (this.feedBack.title.length == 0) {
					uni.showToast({
						icon: 'none',
						title: '标题不能为空'
					});
					return;
				}
				if (this.feedBack.content.length == 0) {
					uni.showToast({
						icon: 'none',
						title: '内容不能为空'
					});
					return;
				}
				this.$http.post('/feedBack/save', {
					feedBackJson: JSON.stringify(this.feedBack)
				}).then(res => {
					let result = JSON.parse(res);
					if(result.status==this.RESPONSE_OK){
						uni.showToast({
							icon: 'none',
							title: '提交成功',
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
							title: '提交失败',
						});
					}
				})
			},
		}
	}
</script>

