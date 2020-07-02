<template>
    <view class="content" style="text-align: center;width: 90%;">
        <uni-segmented-control  style="width: 100%;" :current="current" :values="items" @clickItem="onClickItem" style-type="button" active-color="#007AFF"></uni-segmented-control>
		<view v-if="current === 0">
			<view v-if="!messageReceiver[0]" style="line-height: 100px;color: grey;">
				暂无消息
			</view>
			<view v-else style="margin-top: 2px;" v-for="(n, i) in messageReceiver" v-bind:key="i">
				<uni-collapse accordion="true">
					<uni-collapse-item :title="messageReceiver[i].type | getDictName('CodeMsgType') + ': ' + messageReceiver[i].title" thumb="../../static/img/message.png" style="text-align: left;">
						<view style="margin-left: 10px;margin-right: 5px;font-weight: normal;">
							<view style="color:#000000;background-color:#73b6d2;">
								<view class="input-row">
									<text style="font-size: 15px;width: 50%;">{{messageReceiver[i].sendName}}</text>
									<text style="font-size: 15px;width: 50%;">{{messageReceiver[i].sendTime | formatDateTime}}</text>
								</view>
							</view>
							<view class="input-row" style="color: #000000;background-color: #b8deef;font-size: 15px;padding-right: 20px;">
								<!-- <rich-text :nodes="messageReceiver[i].content"></rich-text> -->
								<jyf-parser :html="courseNotice[i].noticeContent"></jyf-parser>
							</view>
							<view v-for="(k, j) in messageReceiver[i].attachList" v-bind:key="j" style="background-color: #d8e9eb;line-height: 30px;font-size: 14px;">
								<navigator open-type="navigate" :url="'./fileView?webUrl='+messageReceiver[i].attachList[j].serPath+messageReceiver[i].attachList[j].serName">
									附件{{j+1}}: {{messageReceiver[i].attachList[j].attName}}
								</navigator>
							</view>
						</view>
					</uni-collapse-item>
				</uni-collapse>
			</view>
		</view>
		<view v-if="current === 1">
			<view v-if="!courseNotice[0]" style="line-height: 100px;color: grey;">
				暂无公告
			</view>
			<view v-else style="margin-top: 2px;" v-for="(n, i) in courseNotice" v-bind:key="i">
				<uni-collapse accordion="true">
					<uni-collapse-item :title="courseNotice[i].yearName + '  ' + courseNotice[i].noticeTitle" style="text-align: left;">
						<view style="margin-left: 10px;margin-right: 5px;font-weight: normal;">
							<view style="color:#000000;background-color:#73b6d2;">
								<view class="input-row">
									<text style="font-size: 15px;width: 30%;">学期：{{courseNotice[i].term}}</text>
									<text style="font-size: 15px;width: 70%;">课程名称：{{courseNotice[i].courseName}}</text>
								</view>
								<view class="input-row">
									<text style="font-size: 15px;width: 50%;">{{courseNotice[i].fillinMan}}</text>
									<text style="font-size: 15px;width: 50%;">{{courseNotice[i].fillinDate | formatDateTime}}</text>
								</view>
							</view>
							<view style="color: #000000;background-color: #b8deef;font-size: 15px;">
								<!-- <rich-text :nodes="courseNotice[i].noticeContent"></rich-text> -->
								<jyf-parser :html="courseNotice[i].noticeContent"></jyf-parser>
							</view>
							<view v-for="(k, j) in courseNotice[i].attachs" v-bind:key="j" style="background-color: #d8e9eb;line-height: 30px;font-size: 14px;">
								<navigator open-type="navigate"  :url="'./fileView?webUrl='+courseNotice[i].attachs[j].serPath+courseNotice[i].attachs[j].serName">
									附件{{j+1}}: {{courseNotice[i].attachs[j].attName}}
								</navigator>
							</view>
						</view>
						
					</uni-collapse-item>
				</uni-collapse>
			</view>
		</view>
    </view>
</template>

<script>
	import jyfParser from "@/components/jyf-parser/jyf-parser";
	import uniSegmentedControl from "@/components/uni-segmented-control/uni-segmented-control.vue"
	import {mapState} from 'vuex'
	
	export default {
		components: {uniSegmentedControl,jyfParser},
		computed: mapState(['hasLogin', 'userName']),
		data() {
			return {
				items: ['消息','公告'],
				current: 0,
				imgUrl:this.$store.imgUrl,
				messageReceiver:uni.getStorageSync("messageReceiver"),
				courseNotice:uni.getStorageSync("courseNotice")
			}
		},
		onPullDownRefresh() {
			this.loadJs.reloadMessage(this.$store.account,this.$store.baseInfoId);
			this.messageReceiver = uni.getStorageSync("messageReceiver");
			this.courseNotice = uni.getStorageSync("courseNotice");
			uni.stopPullDownRefresh();
		},
		onLoad() {
			if (!this.hasLogin) {
				uni.reLaunch({
					url: '../login/login'
				});
			}
		},
		async onReady() {
			if(!uni.getStorageSync("messageReceiver")){
				await this.loadJs.reloadMessage(this.$store.baseInfoId);
			}
			this.courseNotice = uni.getStorageSync("courseNotice");
			this.messageReceiver = uni.getStorageSync("messageReceiver");
		},
		methods: {
			onClickItem(e) {
				if (this.current !== e.currentIndex) {
					this.current = e.currentIndex;
				}
			}
		}
	}
</script>

<style>
	
</style>
