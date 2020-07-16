<template>
	<view class="content" style="margin-bottom: 50px;">
		<view class="input-row" style="color:#3F536E;line-height: 28px;font-size: 16px;background-color:#B2B2B2;">
			<text style="width: 25%;">星期/时间</text>
			<text style="width: 25%;">上午</text>
			<text style="width: 25%;">下午</text>
			<text style="width: 25%;">晚上</text>
		</view>
		<view class="input-row border" style="color: grey;line-height: 25px;margin-top: 10px;font-size: 15px;" v-for="(n, i) in studyProgress" v-bind:key="i">
			<view v-for="(item,index) in timeArray" :key="index" v-if="i%4==0">
				<text style="width: 25%;">{{index+1}}</text>
				<text style="width: 25%;">{{timeArray[index].title}}</text>
				<text style="width: 25%;">{{timeArray[index+1].title}}</text>
				<text style="width: 25%;">{{timeArray[index+2].title}}</text>
			</view>
		</view>
	</view>
</template> 

<script>
	export default {
		data() {
			return {
				timeArray:[{title:"title",content:"content"}],
				term:uni.getStorageSync("config_sysCurrentGrade").replace(".","_0"),
				studyTime1:uni.getStorageSync("config_networkTeach.studyTime.1"),
				studyTime2:uni.getStorageSync("config_networkTeach.studyTime.2"),
				timetable:uni.getStorageSync("timetable"),
				planCourse:uni.getStorageSync("planCourse")
			}
		},
		async onPullDownRefresh() {
			await this.loadJs.reloadConfig("sysCurrentGrade");
			this.term = uni.getStorageSync("config_sysCurrentGrade").replace(".","_0");
			await this.loadJs.reloadTimetable(this.$store.baseInfoId,this.term);
			this.timetable = uni.getStorageSync("timetable");
			await this.loadJs.reloadTeachPlan(this.$store.baseInfoId);
			this.planCourse = uni.getStorageSync("planCourse");
			uni.stopPullDownRefresh();
		},
		async onReady() {
			if(this.term===""){
				await this.loadJs.reloadConfig("sysCurrentGrade").replace(".","_0");
				await this.loadJs.reloadConfig("networkTeach.studyTime.1");
				await this.loadJs.reloadConfig("networkTeach.studyTime.2");
			}
			this.term = uni.getStorageSync("config_sysCurrentGrade");
			this.studyTime1 = uni.getStorageSync("config_networkTeach.studyTime.1");
			this.studyTime2 = uni.getStorageSync("config_networkTeach.studyTime.2");
			if(!uni.getStorageSync("timetable")){
				await this.loadJs.reloadTimetable(this.$store.baseInfoId,this.term);
			}
			this.timetable = uni.getStorageSync("timetable");
			if(!uni.getStorageSync("teachPlan")){
				await this.loadJs.reloadTeachPlan(this.$store.baseInfoId);
			}
			this.planCourse = uni.getStorageSync("planCourse");
			
			var onlineCourse = "";
			for(var index=0;index<this.planCourse.length;index++){
				if(this.planCourse[index].isCurTermCourse === 'Y'){
					onlineCourse += this.planCourse[index].course +",";
				}
			}
			for(var index=0;index<28;index++){
				this.timeArray[index] = new Object;
			}
			for(var index=0;index<this.timetable.length;index++){
				if(onlineCourse.indexOf(this.timetable[index].course)>=0){
					continue;
				}
				var weeks = this.timetable[index].week;
				var time = (this.timetable[index].timePeriod/10)-1;
				if(weeks.indexOf(",")>0){
					var weekArray = weeks.split(",");
					for(var i=0;i<weekArray.length;i++){
						var week = weekArray[i]-1;
						var obj = new Object;
						obj.title = this.timetable[index].courseName;
						obj.content = this.timetable[index].courseName;
						this.timeArray[week*4+time] = obj;
					}
				}else if(weeks==null || weeks===""){
					var obj = new Object;
					obj.title = this.timetable[index].courseName;
					obj.content = this.timetable[index].courseName;
					this.timeArray[time] = obj;
				}else {
					var week = weeks-1;
					var obj = new Object;
					obj.title = this.timetable[index].courseName;
					obj.content = this.timetable[index].courseName;
					this.timeArray[week*4+time] = obj;
				}
			}
			console.log(this.timeArray.length,this.timeArray);
		}
	}
</script>
