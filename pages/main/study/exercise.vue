<template>
	<view v-if="exerciseBatch.length===0" class="content" style="line-height: 100px;color: grey;text-align: center;">
		暂无内容
	</view>
	<view v-else style="width: 100%;">
		<view class="uni-padding-wrap uni-common-mt">
			<view class="progress-box">
				<progress :percent="(subjectIndex+1)*100/exerciseBatch.length" stroke-width="5" />
			</view>
		</view>
		<form>
			<swiper :current="subjectIndex" class="swiper-box" @change="SwiperChange" style="height:90%">
				<swiper-item v-for="(subject,index) in exerciseBatch" :key="index">
					<view v-if="index-subjectIndex>=-1 && index-subjectIndex<=1">
						<view class="cu-bar bg-white solid-bottom" style="padding-left: 20px;line-height: 25px;">
							{{subject.courseName}} {{subject.yearName}} {{subject.term | getDictName('CodeTermType')}}
						</view>
						<view v-if="subject.isEnd==='Y' && subject.commitStatus===0" style="color:#E03997;padding-left: 15px;padding-top: 5px;">
							已到答题截止日期：{{subject.endDate | formatDate}}
						</view>
						<view v-else-if="subject.commitStatus===0" style="color:#1AAD19;padding-left: 15px;padding-top: 5px;">
							答题日期：{{subject.startDate | formatDate}} 至 {{subject.endDate | formatDate}}
						</view>
						<view style="padding-top: 5px;padding-left: 15px;color:#2C405A;">
							<text>题型：{{subject.type | getDictName('CodeLearningColType')}}</text>
						</view>
						<view class="cu-bar bg-white solid-bottom" style="padding-bottom: 10px;">
							<view class="action text-black" style="line-height: 30px;letter-spacing: 1px;">
								<jyf-parser style="font-size: medium;" :html="subject.batchName"></jyf-parser>
							</view> 
						</view>
						<view style="margin-top: 20px;">
							<view class="cu-bar cu-bar-title bg-white margin-top">
								<view class="action  text-black" style="width: 100%;">
									<text style="width: 35%;">答：{{subject.result}}</text>
									<view style="width: 65%;text-align: right;">
										<view class="input-row" v-if="subject.isCountdown==='Y' && subject.commitStatus===0">
											<text style="font-size: 15px;">限时答题：</text>
											<uni-countdown  style="padding-top: 3px;" color="green"
												:show-day="false" :show-colon="false" :minute="Math.floor(subject.countdownTime/60)" :second="subject.countdownTime%60" @timeup>限时答题</uni-countdown>
										</view>
									</view>
								</view>
							</view>
							<view class="cu-form-group solid margin">
								<textarea :disabled="subject.commitStatus===1" style="max-height: 400px;min-height: 100px;" auto-height="true" 
									maxlength="-1" @blur="textInput" v-model="subject.answer" placeholder="多行文本输入框"></textarea>
							</view>
						</view>
						<view v-if="subject.isShowcorrect==='Y' && subject.commitStatus===1" class="margin-top solid-top">
							<view class="cu-bar" v-show="subject.isCorrect!='Y'">
								<view class="action  text-grey">
									<text>评语：</text>
									<text class="solid-bottom  padding-left text-green">{{subject.teacherAdvise}}</text>
								</view>
							</view>
						</view>
					</view>
				</swiper-item>
			</swiper>
		</form>
		<view id="foot-box" class="cu-bar tabbar bg-white shadow foot">
			<view class="action" style="width: 20%;" @click="move('pre')">
				<view class="cuIcon-cu-image">
					<text class="lg cuIcon-back"></text>
				</view>
				<text>上一题</text>
			</view>
			<view class="action" style="width: 20%;" @click="move('next')">
				<view class="cuIcon-cu-image">
					<text class="lg cuIcon-right"></text>
				</view>
				<text>下一题</text>
			</view>
			<view class="action" @click="save">
				<view style="color: green;">保 存</view>
			</view>
		</view>
	</view>
</template>

<script>
	import jyfParser from "@/components/jyf-parser/jyf-parser";
	import uniCountdown from '@/components/uni-countdown/uni-countdown.vue'
	
	export default {
		components: {jyfParser,uniCountdown},
		data() {
			return {
				subjectIndex: 0,//跳转索引
				courseId:"",
				exerciseBatch:uni.getStorageSync("exercise_"+this.courseId),
			}
		},
		onLoad(option) {
			this.courseId = option.courseId;
		},
		onPullDownRefresh() {
			this.loadJs.reloadExerciseBatch(this.$store.baseInfoId,this.courseId);
			this.exerciseBatch = uni.getStorageSync("exercise_"+this.courseId);
			uni.stopPullDownRefresh();
		},
		async onReady() {
			if(!uni.getStorageSync("exercise_"+this.courseId)){
				await this.loadJs.reloadExerciseBatch(this.$store.baseInfoId,this.courseId);
			}
			this.exerciseBatch = uni.getStorageSync("exercise_"+this.courseId);
		},
		methods: {
			async move(page){
				var temp = this.subjectIndex;
				if(page==='next'){
					temp++;
				}else {
					temp--;
				}
				if(temp>=0 && temp<this.exerciseBatch.length){
					this.subjectIndex = temp;
					await this.loadJs.reloadExerciseBatch(this.$store.baseInfoId,this.courseId);
					this.exerciseBatch = uni.getStorageSync("exercise_"+this.courseId);
				}
			},
			textInput : function(e) { //填空题
				this.exerciseBatch[this.subjectIndex].answer = e.detail.value;
			},
			save(){
				var answerJson = [];
				for(var index=0;index<this.exerciseBatch.length;index++){
					var obj = {};
					obj.exerciseId = this.subjectList[index].activeCourseExamId;
					obj.answer = this.subjectList[index].answer;
					answerJson[index] = obj;
				}
			},
			SwiperChange: function(e) { //滑动事件
				let index = e.target.current;
				if (index != undefined) {
					this.subjectIndex = index;
				}								
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
	
	.cu-list.menu>.cu-item-error{justify-content: flex-start;}
	
	.submited{
		color: grey;
	}
</style>
