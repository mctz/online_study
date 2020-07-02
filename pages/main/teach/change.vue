<template>
	
	<view class="content" style="margin-bottom: 50px;">
		<view v-if="!stuChangeInfo[0]" style="text-align: center;line-height: 100px;color: grey;">
			暂无学籍异动
		</view>
		<view v-else style="margin-top: 10px;" v-for="(n, i) in stuChangeInfo" v-bind:key="i">
			<view style="color:#F8F8F8;font-weight: normal;margin-left: 10px;background-color:#777777;">
				<view class="input-row">
					<text style="font-size: 16px;width: 50%;background-color: #CCCCCC;color:#2C405A;">{{stuChangeInfo[i].applicationDate | formatDate}} 申请 {{stuChangeInfo[i].changeType | getDictName('CodeStudentStatusChange')}}</text>
					<text style="font-size: 16px;width: 50%;background-color: #CCCCCC;color:#DD524D;">审核状态：{{stuChangeInfo[i].finalAuditStatus | getDictName('CodeAuditStatus')}}</text>
				</view>
				<view class="input-row" v-show="stuChangeInfo[i].finalAuditStatus === 'Y'">
					<text style="font-size: 15px;width: 50%;">审核时间：{{stuChangeInfo[i].auditDate | formatDate}}</text>
					<text style="font-size: 15px;width: 50%;">审核人：{{stuChangeInfo[i].auditMan}}</text>
				</view>
				<view class="input-row">
					<text style="font-size: 15px;">原因：{{stuChangeInfo[i].reason}}</text>
				</view>
				<view class="input-row border" style="line-height: 45rpx;">
					<text style="font-size: 15px;width: 15%;text-align: center;">异<br>动<br>前</text>
					<text style="font-size: 15px;width: 85%;">{{stuChangeInfo[i].changeBeforeInfo}}</text>
				</view>
				<view class="input-row" style="line-height: 45rpx;">
					<text style="font-size: 15px;width: 15%;text-align: center;">异<br>动<br>后</text>
					<text style="font-size: 15px;width: 85%;">{{stuChangeInfo[i].changeInfo}}</text>
				</view>
			</view>
		</view>
	</view>
</template> 


<script>
	import lineText from '../../../components/line-text.vue'
	export default {
		components:{
			lineText
		},
		data() {
			return {
				stuChangeInfo:uni.getStorageSync("stuChangeInfo")
			}
		},
		onPullDownRefresh() {
			this.loadJs.reloadStuChangeInfo(this.$store.baseInfoId);
			this.stuChangeInfo = uni.getStorageSync("stuChangeInfo");
			uni.stopPullDownRefresh();
		},
		async onReady() {
			if(!uni.getStorageSync("studentPayment")){
				await this.loadJs.reloadStuChangeInfo(this.$store.baseInfoId);
			}
			this.stuChangeInfo = uni.getStorageSync("stuChangeInfo");
		}
		
	}
</script>

<style lang="scss">
</style>
