<template>
	
	<view class="content" style="margin-bottom: 50px;">
		<view v-if="!payment[0]" style="line-height: 100px;color: grey;text-align: center;">
			未生成缴费信息
		</view>
		<view class="input-row border" v-else>
			<text style="font-size: 16px;width: 30%;">应缴：{{payment[0].recpayFee}}</text>
			<text style="font-size: 16px;width: 30%;color: #1AAD19;">已缴：{{payment[0].facepayFee}}</text>
			<text style="font-size: 16px;width: 40%;color: red;">缴费状态：{{payment[0].chargeStatus | getDictName(this.CODE_CHARGESTATUS)}}</text>
		</view>
		
		<view v-if="paymentDetail[0]" style="margin-top: 10px;" v-for="(n, i) in paymentDetail" v-bind:key="i">
			<uni-collapse accordion="true">
				<uni-collapse-item open="true" :title="paymentDetail[i].batchNo+' 学年'" style="color:#007AFF;font-weight: bold;">
					<view style="color:#F8F8F8;font-weight: normal;margin-left: 10px;background-color:#777777;padding-left: 10px;">
						<view class="input-row">
							<text style="font-size: 15px;width: 50%;">收费项：{{paymentDetail[i].chargingItems | getDictName('CodeChargingItems')}}</text>
							<text style="font-size: 15px;width: 50%;">付款方式：{{paymentDetail[i].paymentMethod | getDictName('CodePaymentMethod')}}</text>
						</view>
						<view class="input-row">
							<text style="font-size: 15px;width: 50%;">应缴金额：{{paymentDetail[i].shouldPayAmount}}</text>
							<text style="font-size: 15px;width: 50%;">实缴金额：{{paymentDetail[i].payAmount}}</text>
						</view>
						<view class="input-row">
							<text style="font-size: 15px;">订单编号：{{paymentDetail[i].payNo}}</text>
						</view>
						<view class="input-row">
							<text style="font-size: 15px;">缴费日期：{{paymentDetail[i].operateDate | formatDateTime}}</text>
						</view>
					</view>
				</uni-collapse-item>
			</uni-collapse>
		</view>
	</view>
</template> 


<script>
	import lineText from '@/components/line-text.vue'
	import uniCollapse from '@/components/uni-collapse/uni-collapse.vue'
	import uniCollapseItem from '@/components/uni-collapse-item/uni-collapse-item.vue'
	export default {
		components:{
			lineText,uniCollapse,uniCollapseItem
		},
		data() {
			return {
				payment:uni.getStorageSync("studentPayment"),
				paymentDetail:uni.getStorageSync("studentPaymentDetail")
			}
		},
		async onPullDownRefresh() {
			await this.loadJs.reloadPayment(this.$store.baseInfoId);
			this.payment = uni.getStorageSync("studentPayment");
			this.paymentDetail = uni.getStorageSync("studentPaymentDetail");
			uni.stopPullDownRefresh();
		},
		async onReady() {
			if(!uni.getStorageSync("studentPayment")){
				await this.loadJs.reloadPayment(this.$store.baseInfoId);
			}
			this.payment = uni.getStorageSync("studentPayment");
			this.paymentDetail = uni.getStorageSync("studentPaymentDetail");
		}
	}
</script>

<style lang="scss">
</style>
