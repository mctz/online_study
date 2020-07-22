<template>
	<view class="content" style="margin-bottom: 50px;">
		<view class="input-row" style="color:#2c3a4d;line-height: 25px;font-size: 16px;background-color:#B2B2B2;color: #00557f;">
			<text style="width: 20%;">时间<br>/星期</text>
			<text style="width: 25%;padding-top: 10px;">上午</text>
			<text style="width: 25%;padding-top: 10px;">下午</text>
			<text style="width: 25%;padding-top: 10px;">晚上</text>
		</view>
		<view>
			<view v-for="(item,index) in timetable" :key="index" v-if="index%4==0" class="input-row border" 
				style="line-height: 20px;font-size: 14px;padding-top: 10px;padding-bottom: 10px;">
				<text style="width: 20%;color: #567CA3;">{{index/4+1 | getDictName('CodeWeek')}}</text>
				<text style="width: 25%;color: #153ba3;" @click="showContent(timetable[index].content)">{{timetable[index].title}}</text>
				<text style="width: 25%;color: #153ba3;" @click="showContent(timetable[index+1].content)">{{timetable[index+1].title}}</text>
				<text style="width: 25%;color: #153ba3;" @click="showContent(timetable[index+2].content)">{{timetable[index+2].title}}</text>
			</view>
		</view>
		<uni-popup ref="popup" type="bottom">
		    <uni-popup-message type="error" :message="content" :duration="5000"></uni-popup-message>
		</uni-popup>
	</view>
</template> 

<script>
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import uniPopupMessage from '@/components/uni-popup/uni-popup-message.vue'
	import uniPopupDialog from '@/components/uni-popup/uni-popup-dialog.vue'
	export default {
		 components: {
			uniPopup,
			uniPopupMessage,
			uniPopupDialog
		},
		data() {
			return {
				content:"",
				timeArray:[],
				term:uni.getStorageSync("config_sysCurrentGrade").replace(".","_0"),
				timetable:uni.getStorageSync("timetable"),
			}
		},
		async onPullDownRefresh() {
			await this.loadJs.reloadConfig("sysCurrentGrade");
			this.term = uni.getStorageSync("config_sysCurrentGrade").replace(".","_0");
			await this.loadJs.reloadTeachPlan(this.$store.baseInfoId);
			await this.loadJs.reloadTimetable(this.$store.baseInfoId,this.term);
			this.timetable = uni.getStorageSync("timetable");
			uni.stopPullDownRefresh();
		},
		async onReady() {
			if(this.term===""){
				await this.loadJs.reloadConfig("sysCurrentGrade");
			}
			if(!uni.getStorageSync("teachPlan")){
				await this.loadJs.reloadTeachPlan(this.$store.baseInfoId);
			}
			this.term = uni.getStorageSync("config_sysCurrentGrade").replace(".","_0");
			if(!uni.getStorageSync("timetable")){
				await this.loadJs.reloadTimetable(this.$store.baseInfoId,this.term);
			}
			this.timetable = uni.getStorageSync("timetable");
		},
		methods:{
			showContent(content){
				this.content = content;
				this.$refs.popup.open()
			}
		}
	}
</script>
