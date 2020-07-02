<template>
	<view style="margin-bottom: 50px;">
		<text class="content" style="text-align: center;">{{syllabusName}}</text>
		 <view class="uni-padding-wrap uni-common-mt">
			<view class="progress-box">
				<progress :percent="courseExam.length"  show-info stroke-width="4" />
			</view>
		</view>
		<view v-for="(n,i) in courseExam" :key='i' style="line-height: 30px;margin-bottom: 50px;">
			<text style="color: red;">{{courseExam[i].courseExamVO.examType | getDictName('CodeExamType')}}</text>
			<jyf-parser :html="courseExam[i].courseExamVO.question"></jyf-parser>
			<view v-if="courseExam[i].courseExamVO.examType =='1'">
				<radio-group @change="radioChange">
					<label v-for="(item,index) in option" :key='item' v-if="index<courseExam[i].courseExamVO.answerOptionNum" style="margin-left: 25px;">
						<radio :value="item" :checked="index === current" >{{item}}</radio>
					</label>
				</radio-group>
			</view>
			<view class="input-row" v-else-if="courseExam[i].courseExamVO.examType=='2'">
				<view v-for="(item,j) in option" :key='item' v-if="j<courseExam[i].courseExamVO.answerOptionNum">
					<label style="margin-right: px;">
						<radio :value="item">{{item}}</radio>
					</label>
				</view>
			</view>
			<view v-else></view>
		</view>
	</view>
</template> 

<script>
	import jyfParser from "@/components/jyf-parser/jyf-parser";
	
	export default {
		components: {jyfParser},
		data() {
			return {
				option:['A','B','C','D','E','F','G','H','I','J'],
				courseId:'',
				syllabusId:'',
				syllabusName:'',
				courseExam:uni.getStorageSync("courseExam_"+this.syllabusId),
			}
		},
		onPullDownRefresh() {
			this.loadJs.reloadCourseExam(this.syllabusId,this.$store.baseInfoId);
			this.courseExam = uni.getStorageSync("courseExam_"+this.courseId);
			uni.stopPullDownRefresh();
		},
		onLoad(option) {
			this.courseId = option.courseId;
			this.syllabusId = option.syllabusId;
			this.syllabusName = option.syllabusName;
		},
		async onReady() {
			if(!uni.getStorageSync("courseExam_"+this.syllabusId)){
				await this.loadJs.reloadCourseExam(this.syllabusId,this.$store.baseInfoId);
			}
			this.courseExam = uni.getStorageSync("courseExam_"+this.syllabusId);
		},
		methods: {
			radioChange: function(evt) {
				/* for (let i = 0; i < this.option.length; i++) {
					if (this.option[i] === evt.target.value) {
						this.current = i;
						break;
					}
				} */
			}
		}
	}
</script>

