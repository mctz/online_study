<template>
	<view style="width: 100%;">
		<view v-if="!planCourse[0]" style="text-align: center;line-height: 100px;color: grey;">
			暂无在线课程
		</view>
		<view v-else v-for="(item,i) in planCourse" :key="i">
			<view class="input-row border" v-if="item.hasResource == 'Y'" style="height: 200rpx;font-size: 15px;">
				<view style="width: 25%;text-align: center;padding-top: 5px;">
					<image :src="item.cover!=null?(imgUrl+item.cover):'../../static/img/course.png'" style="width: 70%;" mode="widthFix"></image>
				</view>
				<template v-if="item.isCurTermCourse == 'Y'">
					<view style="width:40%;padding-top: 20px;line-height: 30px;">
						<navigator :url="'./study/course?course='+item.course+'&courseName='+item.courseName+
							'&courseNature='+item.courseNature+'&creditHour='+item.creditHour+'&stydyHour='+item.stydyHour" open-type="navigate">
							<text>{{item.courseName}}</text><br>
							<text>{{item.term | getDictName('CodeTermType')}}</text>
						</navigator>
					</view>
					<view style="width: 20%;text-align: left;">
						<canvas :canvas-id="'canvasPie'+i" :id="'canvasPie'+i" class="charts"></canvas>
					</view>
					<view style="width: 10%;text-align: right;">
						<image src="../../static/img/button/ic-right.png" style="width: 50%;margin-top: 40px;" mode="widthFix"></image>
					</view>
				</template>
				<template v-else>
					<view style="width:60%;padding-top: 20px;line-height: 30px;color:grey;">
						<text>{{item.courseName}}</text><br>
						<text>{{item.term | getDictName('CodeTermType')}}</text>
					</view>
				</template>
			</view>
		</view>
	</view>
</template>

<script>
	import {mapState} from 'vuex'
	import uCharts from '@/components/u-charts/u-charts.js';
	//import  { isJSON } from '@/common/checker.js';
	var _self;
	export default {
		computed: mapState(['hasLogin', 'userName']),
		data() {
			return {
				imgUrl:this.$store.imgUrl+this.ATTACHS,
				planCourse:uni.getStorageSync("planCourse"),
				studyProgress:uni.getStorageSync("courseTotalTime")
			}
		},
		async onPullDownRefresh() {
			await this.loadJs.reloadTeachPlan(this.$store.baseInfoId);
			await this.loadJs.reloadCourseTotalTime(this.$store.baseInfoId);
			this.studyProgress = uni.getStorageSync("courseTotalTime");
			this.planCourse = uni.getStorageSync("planCourse");
			uni.stopPullDownRefresh();
		},
		async onLoad() {
			if (!this.hasLogin) {
				uni.reLaunch({
					url: '../login/login'
				});
			}
			_self = this;
			if(!uni.getStorageSync("planCourse")){
				await this.loadJs.reloadTeachPlan(this.$store.baseInfoId);
				await this.loadJs.reloadCourseTotalTime(this.$store.baseInfoId);
			}
			this.planCourse = uni.getStorageSync("planCourse");
			this.studyProgress = uni.getStorageSync("courseTotalTime");
			this.getServerData();
		},
		async onReady() {
			if(!uni.getStorageSync("planCourse")){
				await this.loadJs.reloadTeachPlan(this.$store.baseInfoId);
				await this.loadJs.reloadCourseTotalTime(this.$store.baseInfoId);
			}
			this.planCourse = uni.getStorageSync("planCourse");
			this.studyProgress = uni.getStorageSync("courseTotalTime");
		},
		methods:{
			getServerData(){
				for(var i=0;i<this.planCourse.length;i++){
					for(var j=0;j<this.studyProgress.length;j++){
						if(this.planCourse[i].hasResource == 'Y'
							&& this.planCourse[i].isCurTermCourse == 'Y'
							&& this.planCourse[i].course==this.studyProgress[j].courseId){
							let Pie = {series:[{"name":"","data":this.studyProgress[j].learnTotalTime,"color": "#00aa00"},
										{"name":"","data":this.studyProgress[j].totalTime-this.studyProgress[j].learnTotalTime,"color": "#e5e5e5"}]};
							_self.showPie("canvasPie"+i,Pie,Math.round(this.studyProgress[j].learnTotalTime*1000/this.studyProgress[j].totalTime)/10);
							//console.log(this.studyProgress[j].learnTotalTime,this.studyProgress[j].totalTime);
							break;
						}
					}
				}
			},
			showPie(canvasId,chartData,progress){
				new uCharts({
					$this:this,
					canvasId: canvasId,
					type: 'ring',
					fontSize:11,
					legend:{show:false},
					background:'#FFFFFF',
					series: chartData.series,
					animation: true,
					width: 90,
					height: 90,
					dataLabel: false,
					extra: {
						pie: {}
					},
					title: {
						name: progress==''?'0':progress,
						color: '#55557f',
						fontSize: 13,
						offsetY:8
					},
					subtitle: {
						name: '学习进度(%)',
						color: '#666666',
						fontSize: 13,
						offsetY:28,
					},
				});
			}
		}
	}
</script>

<style>
</style>
