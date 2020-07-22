<template>
	
	<view class="content" style="margin-bottom: 50px;">
		<line-text ltext="班级编号" :rtext="classInfo.classCode"></line-text>
		<line-text ltext="班级名称" :rtext="classInfo.classname"></line-text>
		<line-text ltext="教学点" :rtext="classInfo.unitName"></line-text>
		<line-text ltext="年级" :rtext="classInfo.gradeName"></line-text>
		<line-text ltext="层次" :rtext="classInfo.classicName"></line-text>
		<line-text ltext="学习方式" :rtext="classInfo.teachingType | getDictName(this.CODE_LEARNINGSTYLE)"></line-text>
		<line-text ltext="专业名称" :rtext="classInfo.majorName"></line-text>
		<line-text ltext="班级人数" :rtext="'在学'+classInfo.countList[3]+'人'"></line-text>
		<view class="input-row" style="width: 100%;text-align: left;">
			<canvas canvas-id="canvasPie1" id="canvasPie1" class="charts" style="width: 50%;"></canvas>
			<canvas canvas-id="canvasPie2" id="canvasPie2" class="charts" style="width: 50%;"></canvas>
		</view>
		<line-text ltext="班长" :rtext="classInfo.classesLeader"></line-text>
		<line-text ltext="班主任" :rtext="classInfo.classesMaster"></line-text>
		<line-text ltext="班主任联系方式" :rtext="classInfo.classesMasterPhone"></line-text>
		<line-text ltext="教学点联系人" :rtext="classInfo.linkman"></line-text>
		<line-text ltext="教学点联系方式" :rtext="classInfo.contectCall"></line-text>
		<line-text ltext="备注" :rtext="classInfo.memo"></line-text>
		<uni-collapse :accordion="true" >
			<uni-collapse-item title="班名册" :show-animation="true" style="text-align: center;">
				<view class="input-row" style="font-size: 16px;background-color: #9ebabf;">
					<view style="width: 40%;">学号</view>
					<view style="width: 20%;">姓名</view>
					<view style="width: 40%;">联系方式</view>
				</view>
				<view v-for="(item,index) in classInfo.studenInfoVos" :key="index"  class="input-row" style="font-size: 15px;background-color: #f4f4f4;">
					<view style="width: 40%;">{{item.studyNo}}</view>
					<view style="width: 20%;">{{item.name}}</view>
					<view style="width: 40%;color: grey;">{{item.mobile.substring(0,item.mobile.length-4)}}****</view>
				</view>
			</uni-collapse-item>
		</uni-collapse>
	</view>
</template> 

<script>
	import lineText from '@/components/line-text.vue'
	import uCharts from '@/components/u-charts/u-charts.js';
	var _self;
	export default {
		components:{lineText},
		data() {
			return {
				classesId:"",
				classInfo:uni.getStorageSync("classInfo"),
			}
		},
		async onLoad(option) {
			_self = this;
			this.classesId = option.classesId
			if(!uni.getStorageSync("classInfo")){
				await this.loadJs.reloadClasses(this.classesId);
			}
			this.classInfo = uni.getStorageSync("classInfo");
			this.getServerData();
		},
		async onPullDownRefresh() {
			if(this.classesId){
				await this.loadJs.reloadClasses(this.classesId);
				this.classInfo = uni.getStorageSync("classInfo");
			}
			uni.stopPullDownRefresh();
		},
		methods:{
			getServerData(){
				let Pie1 = {series:[{"name":"男","data":this.classInfo.countList[1]},
							{"name":"女","data":this.classInfo.countList[2]}]};
				let Pie2 = {series:[{"name":"在学","data":this.classInfo.countList[3]},
							{"name":"非在学","data":this.classInfo.countList[4]}]};
				_self.showPie("canvasPie1",Pie1);
				_self.showPie("canvasPie2",Pie2);
			},
			showPie(canvasId,chartData){
				new uCharts({
					$this:this,
					canvasId: canvasId,
					type: 'pie',
					fontSize:11,
					legend:{show:true},
					background:'#FFFFFF',
					series: chartData.series,
					animation: true,
					width: 160,
					height: 160,
					dataLabel: true,
					extra: {
						pie: {
						  labelWidth:15
						}
					},
				});
			}
		}
	}
</script>

