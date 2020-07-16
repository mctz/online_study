<template>
	<view v-if="topicsInfo.total===0" style="line-height: 100px;color: grey;">
		暂无内容
	</view>
	<view v-else style="width: 100%;margin-bottom: 100px;">
		<view v-for="(item, i) in topicsInfo.content" :key="i">
			<uni-card :title="item.title" 
				v-show="!(aboutMe && item.fillinManId!=userId)" :is-shadow="true" note="note">
			   <view class="input-row" style="background-color: #f1f1f1;color: grey;line-height: 25px;">
					<text style="font-size: 15px;width: 30%;">{{item.fillinDate | formatDate}}</text>
					<text style="font-size: 15px;width: 20%;text-align: center;">{{item.fillinMan}}</text>
					<view style="font-size: 15px;width: 30%;color:#6f6f6f;text-align: center;">
						<text v-if="item.topicType==='6'">{{item.facebookType | getDictName('CodeFacebookType')}}</text>
						<text v-else>{{item.topicType | getDictName('CodeBbsTopicType')}}</text>
					</view>
					<text style="font-size: 15px;width: 20%;text-align: right;padding-right: 5px;">浏览({{item.clickCount}}) </text>
			   </view>
			   <jyf-parser :html="item.content" style="margin-top: 10px;"></jyf-parser>
			   <template v-slot:footer>
				   <view class="input-row footer-box" style="color:#64808c;font-size: 14px;line-height: 15px;">
					   <text style="width: 50%;">评论</text>
					   <navigator :url="'./reply?title='+item.title+'&topicId='+item.resourceid" style="width: 50%;text-align: right;">
						   <text>查看回复（{{item.replyCount}}）</text>
					   </navigator>
				   </view>
			   </template>
			</uni-card>
		</view>
		<view id="foot-box" class="cu-bar tabbar bg-white shadow foot">
			<!-- <view style="width: 25%;">
				<uni-combox label="每页" :candidates="pageSizeOption" v-model="pageSize"></uni-combox>
			</view> -->
			<uni-pagination style="width: 130px;" showIcon="true" :total="topicsInfo.totalElements" :current="pageNum+1" :pageSize="pageSize" @change="move"></uni-pagination>
			<view class="action" @click="aboutMeF" style="letter-spacing: 1px;">
				<view class="cuIcon-cu-image">
					<image src="../../../static/img/button/eyes.png" ></image>
				</view>
				<text v-if="aboutMe" style="color: #0081FF;background-color: #e9f3ef;">与我相关</text>
				<text v-else>与我相关</text>
			</view>
			<view class="action" style="font-size: 12px;line-height: 20px;">
				<text>第{{pageNum+1}}页 / 共{{topicsInfo.totalPages}}页</text>
				<br>每页{{pageSize}}，共{{topicsInfo.totalElements}}条
			</view>
		</view>
		<uni-popup ref="dialogInput" type="dialog">
			<uni-popup-dialog mode="input" title="评论" value="" placeholder="请输入评论内容" @confirm="confirm"></uni-popup-dialog>
		</uni-popup>
	</view>
</template>

<script>
	import jyfParser from "@/components/jyf-parser/jyf-parser";
	import uniPagination from '@/components/uni-pagination/uni-pagination.vue'
	import uniCombox from "@/components/uni-combox/uni-combox"
	import uniCard from '@/components/uni-card/uni-card.vue'
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import uniPopupMessage from '@/components/uni-popup/uni-popup-message.vue'
	import uniPopupDialog from '@/components/uni-popup/uni-popup-dialog.vue'
	
	export default {
		components: {jyfParser,uniPagination,uniCombox,uniCard,
				uniPopup,uniPopupMessage,uniPopupDialog},
		data() {
			return {
				userId:uni.getStorageSync("userInfo").resourceid,
				pageSize:10,
				pageNum:0,
				sectionName:"",
				sectionId:"",
				courseId:"",
				aboutMe:false,
				pageSizeOption:['10','20','50','100'],
				imgUrl:this.$store.imgUrl,
				topicsInfo:uni.getStorageSync("topics_"+this.pageNum+'_'+this.sectionId+"_"+this.courseId),
			}
		},
		onLoad(option) {
			this.sectionName = option.sectionName;
			this.sectionId = option.sectionId;
			this.sectionCode = option.sectionCode;
			this.courseId = option.courseId;
			uni.setNavigationBarTitle({
				title:this.sectionName,
			});
			console.log("onLoad -> clickTopic")
			this.loadJs.clickTopic('section',this.sectionId);
		},
		async onPullDownRefresh() {
			var _userId = "";
			if(this.aboutMe){
				_userId = this.userId;
			}
			await this.loadJs.reloadTopics(this.sectionId,this.courseId,this.$store.baseInfoId,_userId,this.pageSize,this.pageNum);
			this.topicsInfo = uni.getStorageSync("topics_"+this.pageNum+'_'+this.sectionId+"_"+this.courseId+"_"+_userId);
			uni.stopPullDownRefresh();
		},
		async onReady() {
			var _userId = "";
			if(this.aboutMe){
				_userId = this.userId;
			}
			if(!uni.getStorageSync("topics_"+this.pageNum+'_'+this.sectionId+"_"+this.courseId+"_"+_userId)){
				await this.loadJs.reloadTopics(this.sectionId,this.courseId,this.$store.baseInfoId,_userId,this.pageSize,this.pageNum);
			}
			this.topicsInfo = uni.getStorageSync("topics_"+this.pageNum+'_'+this.sectionId+"_"+this.courseId+"_"+_userId);
		},
		methods: {
			async move(e){
				this.pageNum = e.current-1;
				if(!uni.getStorageSync("topics_"+this.pageNum+'_'+this.sectionId+"_"+this.courseId)){
					await this.loadJs.reloadTopics(this.sectionId,this.courseId,this.$store.baseInfoId,'',this.pageSize,this.pageNum);
				}
				this.topicsInfo = uni.getStorageSync("topics_"+this.pageNum+'_'+this.sectionId+"_"+this.courseId);
			},
			open(){
				this.$refs.dialogInput.open();
			},
			confirm(done,value){
				console.log(value)
				done()
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
				if(!uni.getStorageSync("topics_"+this.pageNum+'_'+this.sectionId+"_"+this.courseId+"_"+_userId)){
					await this.loadJs.reloadTopics(this.sectionId,this.courseId,this.$store.baseInfoId,_userId,this.pageSize,this.pageNum);
				}
				this.topicsInfo = uni.getStorageSync("topics_"+this.pageNum+'_'+this.sectionId+"_"+this.courseId+"_"+_userId);
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
	
	.submited{
		color: grey;
	}

</style>
