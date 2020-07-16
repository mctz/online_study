<template>
	<view v-if="topicsInfo.total===0" style="line-height: 100px;color: grey;">
		暂无内容
	</view>
	<view v-else style="width: 100%;margin-bottom: 100px;">
		<view v-for="(item, i) in topicsInfo.content" :key="i">
			<uni-card :is-shadow="true">
			   <view class="input-row" style="background-color: #f1f1f1;color: grey;line-height: 25px;">
					<text style="font-size: 15px;width: 60%;">{{item.replyDate | formatDateTime}}</text>
					<text style="font-size: 15px;width: 40%;text-align: center;">{{item.replyMan}}</text>
			   </view>
			   <jyf-parser :html="item.replyContent" style="margin-top: 10px;"></jyf-parser>
			</uni-card>
		</view>
		<view id="foot-box" class="cu-bar tabbar bg-white shadow foot">
			<uni-pagination style="width: 150px;" showIcon="true" :total="topicsInfo.totalElements" :current="pageNum+1" :pageSize="pageSize" @change="move"></uni-pagination>
			<!-- <view class="action" @click="aboutMeF" style="letter-spacing: 1px;">
				<view class="cuIcon-cu-image">
					<image src="../../../static/img/button/eyes.png" ></image>
				</view>
				<text v-if="aboutMe" style="color: #0081FF;background-color: #e9f3ef;">与我相关</text>
				<text v-else>与我相关</text>
			</view> -->
			<view class="action" style="font-size: 12px;line-height: 20px;">
				<text>
					第{{pageNum+1}}页 / 共{{topicsInfo.totalPages}}页
					每页{{pageSize}}，共{{topicsInfo.totalElements}}条
				</text>
			</view>
		</view>
	</view>
</template>

<script>
	import jyfParser from "@/components/jyf-parser/jyf-parser";
	import uniPagination from '@/components/uni-pagination/uni-pagination.vue'
	import uniCard from '@/components/uni-card/uni-card.vue'
	
	export default {
		components: {jyfParser,uniPagination,uniCard},
		data() {
			return {
				userId:uni.getStorageSync("userInfo").resourceid,
				pageSize:10,
				pageNum:0,
				title:"",
				topicId:"",
				aboutMe:false,
				pageSizeOption:['10','20','50','100'],
				imgUrl:this.$store.imgUrl,
				topicsInfo:uni.getStorageSync("bbsReply_"+this.pageNum+'_'+this.topicId),
			}
		},
		onLoad(option) {
			this.title = option.title;
			this.topicId = option.topicId;
			uni.setNavigationBarTitle({
				title:this.title
			})
			this.loadJs.clickTopic('topic',this.topicId);
		},
		async onPullDownRefresh() {
			var _userId = "";
			if(this.aboutMe){
				_userId = this.userId;
			}
			await this.loadJs.reloadBbsReply(this.topicId,this.pageSize,this.pageNum);
			this.topicsInfo = uni.getStorageSync("bbsReply_"+this.pageNum+'_'+this.topicId);
			uni.stopPullDownRefresh();
		},
		async onReady() {
			var _userId = "";
			if(this.aboutMe){
				_userId = this.userId;
			}
			if(!uni.getStorageSync("bbsReply_"+this.pageNum+'_'+this.topicId)){
				await this.loadJs.reloadBbsReply(this.topicId,this.pageSize,this.pageNum);
			}
			this.topicsInfo = uni.getStorageSync("bbsReply_"+this.pageNum+'_'+this.topicId);
		},
		methods: {
			async move(e){
				this.pageNum = e.current-1;
				if(!uni.getStorageSync("bbsReply_"+this.pageNum+'_'+this.topicId)){
					await this.loadJs.reloadBbsReply(this.topicId,this.pageSize,this.pageNum);
				}
				this.topicsInfo = uni.getStorageSync("bbsReply_"+this.pageNum+'_'+this.topicId);
			},
			async aboutMeF(){
				uni.showLoading({
					title:""
				})
				this.aboutMe = !this.aboutMe;
				var _userId = "";
				if(this.aboutMe){
					_userId = this.userId;
				}
				if(!uni.getStorageSync("bbsReply_"+this.pageNum+'_'+this.topicId)){
					await this.loadJs.reloadBbsReply(this.topicId,this.pageSize,this.pageNum);
				}
				this.topicsInfo = uni.getStorageSync("bbsReply_"+this.pageNum+'_'+this.topicId);
				uni.hideLoading();
			}
		}
	}
</script>

<style>
	@import "../../../components/answer/main.css";
	
	page {
		background-color: #FFFFFF;
	}

	.cu-form-group {
		justify-content: flex-start
	}

	.cu-form-group .title {
		padding-left: 30upx;
		padding-right: 0upx;
	}

	.cu-form-group+.cu-form-group {
		border-top: none;
	}

	.cu-bar-title {
		min-height: 50upx;
	}
	
	.cu-list.menu.cu-item-error{justify-content: flex-start;}

</style>
