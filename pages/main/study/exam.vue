<template>
	<view class="content" v-if="!(subjectList!=null && subjectList.length>0)" style="line-height: 100px;color: grey;text-align: center;">
		暂无随堂练习
	</view>
	<view v-else style="width: 100%;">
		<view class="uni-padding-wrap uni-common-mt">
			<view class="progress-box">
				<progress :percent="(subjectIndex+1)*100/subjectList.length" stroke-width="5" />
			</view>
		</view>
		<view id="top-box" class="cu-bar bg-white solid-bottom">
			<view class="action text-black">
				<text>{{subjectList[subjectIndex].courseExamVO.examType | getDictName('CodeExamType')}}</text> 
			</view>
			<view class="action">
				<button class="cu-btn bg-green shadow" @tap="showCardModal" data-target="modalCard">答题卡({{subjectIndex+1}}/{{subjectList.length}})</button>
			</view>
		</view>
		<view class="cu-modal" :class="modalCard=='modalCard'?'show':''" @tap="hideCardModal">
			<view class="cu-dialog" @tap.stop>
				<scroll-view class="page padding" :scroll-y=true style="height:100%">				
				<view class="cu-bar solid-bottom">
					<view class="action">
						<text class="cuIcon-title text-red"></text>答题卡
					</view>					
				</view>
				<view class="grid col-5 ">
					<view class="margin-tb-sm text-center" v-for="(subject,index) in subjectList" :key="index">
						<button class="cu-btn round" :class="[(subject.studentAnswer && subject.studentAnswer.length>0)?'bg-red':'line-grey']" @click="AppointedSubject(index)" >{{index+1}}</button>
					</view>
				</view>
				</scroll-view>
			</view>
		</view>
		<form>
			<swiper :current="subjectIndex" class="swiper-box" @change="SwiperChange" style="height:90%">
				<swiper-item v-for="(subject,index) in subjectList" :key="index">
					<view v-if="index-subjectIndex>=-1 && index-subjectIndex<=1">
					<view class="cu-bar bg-white solid-bottom" style="padding-top: 10px;padding-bottom: 10px;">
						<view class="action text-black" style="line-height: 30px;letter-spacing: 1px;">
							<jyf-parser style="font-size: medium;" :html="subject.courseExamVO.question"></jyf-parser>
						</view> 
					</view>
					<view class="input-row" style="margin-top: 20px;">
						<radio-group v-if="subject.courseExamVO.examType==='1'" class="block"  @change="RadioboxChange">
							<label v-for="(option,j) in optionList" :key="j" v-if="j<subject.courseExamVO.answerOptionNum" style="margin-right: 25px;">
								<radio :value="option" :class="subject.isSubmit==='Y'?'submited':''" :disabled="subject.isSubmit==='Y'"
									:checked="(subject.studentAnswer && subject.studentAnswer.indexOf(option) > -1)?true:false">
									<text style="margin-left: 5px;">{{option}}</text>
								</radio>
							</label>
						</radio-group>
						<checkbox-group v-else-if="subject.courseExamVO.examType==='2'" class="block"  @change="CheckboxChange">
							<label v-for="(option,j) in optionList" :key="j" v-if="j<subject.courseExamVO.answerOptionNum" style="margin-right: 25px;">
								<checkbox :value="option" :class="subject.isSubmit==='Y'?'submited':''" :disabled="subject.isSubmit==='Y'"
									:checked="(subject.studentAnswer && subject.studentAnswer.indexOf(option) > -1)?true:false">
									<text style="margin-left: 5px;">{{option}}</text>
								</checkbox>
							</label>
						</checkbox-group>
						<radio-group v-else-if="subject.courseExamVO.examType==='3'" class="block"  @change="RadioboxChange">
							<label style="margin-right: 50px;">
								<radio value="√" :class="subject.isSubmit==='Y'?'submited':''" :disabled="subject.isSubmit==='Y'"
									:checked="subject.studentAnswer==='√'?true:false">对</radio>
							</label>
							<label style="margin-right: 25px;">
								<radio value="×" :class="subject.isSubmit==='Y'?'submited':''" :disabled="subject.isSubmit==='Y'"
									:checked="subject.studentAnswer==='×'?true:false">错</radio>
							</label>
						</radio-group>
						<view v-else>
							<view class="cu-bar cu-bar-title bg-white margin-top">
								<view class="action  text-black">
									答：
								</view>
							</view>
							<view class="cu-form-group solid margin">
								<textarea :class="subject.isSubmit==='Y'?'submited':''" :disabled="subject.isSubmit==='Y'"
									maxlength="-1" @blur="textInput" v-model="subject.studentAnswer" placeholder="多行文本输入框"></textarea>
							</view>
						</view>
					</view>
					<view v-if="courseExam.residueRedoTimes===0" class="margin-top solid-top">
						<view class="text-content padding" :style="{color:subject.isCorrect==='Y'?'green':'red'}">
							{{subject.isCorrect==="Y"?"回答正确":"回答错误"}}
						</view>
						<view class="cu-bar" v-show="subject.isCorrect!='Y'">
							<view class="action  text-grey">
								<text>正确答案：</text>
								<text class="solid-bottom  padding-left text-green">{{subject.courseExamVO.answer}}</text>
							</view>
						</view>
						<view v-show="subject.courseExamVO.parser" class="cu-bar cu-bar-title">
							<view class="action  text-grey">
								<text>解析：{{subject.courseExamVO.parser}}</text>
							</view>
						</view>
					</view>
					</view>
				</swiper-item>
			</swiper>
		</form>
		<view id="foot-box" class="cu-bar tabbar bg-white shadow foot">
			<view class="action" @click="MoveSubject(-1)">
				<view class="cuIcon-cu-image">
					<text class="lg cuIcon-back text-gray"></text>
				</view>
				<view class="text-gray">上一题</view>
			</view>
			<view class="action" @click="MoveSubject(1)">
				<view class="cuIcon-cu-image">
					<text class="lg text-gray cuIcon-right"></text>
				</view>
				<view class="text-gray">下一题</view>
			</view>
			<template v-if="courseExam.isSubmit!='Y'">
				<view class="action" @click="save('save')">
					<view style="color: green;">保 存</view>
				</view>
				<view class="action" @click="save('submit')">
					<view class="text-blue">提 交</view>
				</view>
			</template>
			<template v-else-if="courseExam.residueRedoTimes>0">
				<view class="action" @click="redo(courseExam.residueRedoTimes-1)">
					<view style="color: green;">本章重做【{{courseExam.residueRedoTimes}}】</view>
				</view>
				<view class="action" @click="redo(0)">
					<view style="color: red;">放弃重做</view>
				</view>
			</template>
		</view>
	</view>
</template>

<script>
	import jyfParser from "@/components/jyf-parser/jyf-parser";
	
	export default {
		components: {jyfParser},
		data() {
			return {
				subjectIndex: 0,//跳转索引
				autoRadioNext:true,//判断题、单项题，自动移下一题
				optionList: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'],
				courseExam:uni.getStorageSync("courseExam_"+this.syllabusId),
				subjectList:{},
				modalCard: null ,//显示答题卡
			}
		},
		async onReady() {
			if(!uni.getStorageSync("courseExam_"+this.syllabusId)){
				await this.loadJs.reloadCourseExam(this.syllabusId,this.$store.baseInfoId);
			}
			this.courseExam = uni.getStorageSync("courseExam_"+this.syllabusId);
			if(this.courseExam){
				this.subjectList = this.courseExam.examVOList;
			}
		},
		onPullDownRefresh() {
			this.loadJs.reloadCourseExam(this.syllabusId,this.$store.baseInfoId);
			this.courseExam = uni.getStorageSync("courseExam_"+this.syllabusId);
			if(this.courseExam){
				this.subjectList = this.courseExam.examVOList;
			}
			uni.stopPullDownRefresh();
		},
		onLoad(option) {
			this.courseId = option.courseId;
			this.syllabusId = option.syllabusId;
			this.syllabusName = option.syllabusName;
			uni.setNavigationBarTitle({
				title:this.syllabusName
			});		
		},
		methods: {
			showCardModal: function(e) {
				this.modalCard = e.currentTarget.dataset.target
			},
			hideCardModal: function(e) {
				this.modalCard = null
			},
			SwiperChange: function(e) { //滑动事件
				let index = e.target.current;
				if (index != undefined) {
					this.subjectIndex = index;
				}								
			},			
			RadioboxChange : function(e) { //单选选中
				var values = e.detail.value;
				this.subjectList[this.subjectIndex].studentAnswer = values;
				if(this.autoRadioNext && this.subjectIndex < this.subjectList.length - 1){
					this.subjectIndex += 1;						
				};
			},
			CheckboxChange: function(e) { //复选选中
				var values = e.detail.value;
				this.subjectList[this.subjectIndex].studentAnswer = "";
				for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
					this.subjectList[this.subjectIndex].studentAnswer += values[j];
				}
			},
			textInput : function(e) { //填空题
				this.subjectList[this.subjectIndex].studentAnswer = e.detail.value;
			},			
			
			MoveSubject: function(e) { //上一题、下一题
				if (e === -1 && this.subjectIndex != 0) {
					this.subjectIndex -= 1;
				}
				if (e === 1 && this.subjectIndex < this.subjectList.length - 1) {
					this.subjectIndex += 1;
				}
			},
			AppointedSubject: function(e) { //题卡指定
				this.modalCard = null;
				this.subjectIndex = e;									
			},
			async save(type){
				uni.showLoading({
					title:type==="save"?"保存中":"提交中"
				});
				var answerJson = [];
				for(var index=0;index<this.subjectList.length;index++){
					var obj = {};
					obj.activeCourseExamId = this.subjectList[index].activeCourseExamId;
					obj.answer = this.subjectList[index].studentAnswer;
					answerJson[index] = obj;
				}
				await this.$http.post('/studentAnswer/save', {
					studentBaseId: this.$store.baseInfoId,
					type:type,
					answerJson:JSON.stringify(answerJson)
				}).then(res => {
					let result = JSON.parse(res);
					uni.hideLoading();
					setTimeout(this.loadJs.reloadCourseExam(this.syllabusId,this.$store.baseInfoId),2000);
					uni.showToast({
						icon:"none",
						title: result.msg,
					});
				});
			},
			async redo(count){
				uni.showLoading({
					title:"提交中"
				});
				var url = "/studentAnswer/syllabusRedo/"+this.$store.baseInfoId+"/"+this.syllabusId+"/unit_exam";
				if(count==0){
					url = "/studentAnswer/giveUpRedo/"+this.$store.baseInfoId+"/"+this.syllabusId;
				}
				await this.$http.get(url, {
				}).then(res => {
					let result = JSON.parse(res);
					uni.hideLoading();
					setTimeout(this.loadJs.reloadCourseExam(this.syllabusId,this.$store.baseInfoId),2000);
					uni.showToast({
						icon:"none",
						title: result.msg,
					});
					this.courseExam.residueRedoTimes = count;
				});
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
