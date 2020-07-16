<template>
	<view class="content" style="margin-bottom: 50px;text-align: center;">
		<uni-collapse accordion="true">
			<uni-collapse-item title="个人简历" style="font-weight: bold;">
				<view v-if="stuResume" v-for="(n, i) in stuResume" :key="i" style="color:#F8F8F8;font-weight: normal;margin-left: 10px;background-color:#777777;padding-left: 10px;text-align: left;">
					<view class="input-row" style="line-height: 30px;font-size: 15px;">
						<text style="font-size: 15px;width: 70%;">起止年月：{{stuResume[i].startYear+'-'+stuResume[i].startMonth+' 至 '+stuResume[i].endYear+'-'+stuResume[i].endMonth }}</text>
						<text style="font-size: 15px;width: 30%;">职务：{{stuResume[i].title}}</text>
					</view>
					<view class="input-row border">
						<text style="font-size: 15px;100%">单位：{{stuResume[i].company}}</text>
					</view>
				</view>
			</uni-collapse-item>
		</uni-collapse>
		<uni-collapse accordion="true">
			<uni-collapse-item title="家庭成员" style="font-weight: bold;text-align: center;">
				<view v-for="(n, i) in stuRelation" :key="i" style="color:#F8F8F8;font-weight: normal;margin-left: 10px;background-color:#777777;padding-left: 10px;text-align: left;">
					<view v-if="stuRelation[i].ralationType!=undefined && stuRelation[i].ralationType == 'F' && stuRelation[i].memo==null">
						<view class="input-row" style="height: 25px;font-size: 15px;">
							<text style="font-size: 15px;width: 35%;">{{stuRelation[i].name }}</text>
							<text style="font-size: 15px;width: 20%;">{{stuRelation[i].gender | getDictName('CodeSex')}}</text>
							<text style="font-size: 15px;width: 45%;" v-show="stuRelation[i].ralation">{{stuRelation[i].ralation | getDictName('CodeFamilyRalation')}}</text>
						</view>
						<view class="input-row" style="height: 25px;">
							<text style="font-size: 15px;width: 55%">电话：{{stuRelation[i].contact}}</text>
							<text style="font-size: 15px;width: 45%">职务：{{stuRelation[i].title}}</text>
						</view>
						<view class="input-row border">
							<text style="font-size: 15px;">单位：{{stuRelation[i].workPlace}}</text>
							<text>{{stuRelation[i].memo}}</text>
						</view>
					</view>
				</view>
			</uni-collapse-item>
		</uni-collapse>
		<uni-collapse accordion="true">
			<uni-collapse-item title="社会关系" style="font-weight: bold;text-align: center;">
				<view v-for="(n, i) in stuRelation" v-bind:key="i" style="color:#F8F8F8;font-weight: normal;margin-left: 10px;background-color:#777777;padding-left: 10px;text-align: left;">
					<view v-if="stuRelation[i].ralationType!=undefined && stuRelation[i].ralationType == 'S'  && stuRelation[i].memo==null">
						<view class="input-row" style="height: 25px;font-size: 15px;">
							<text style="font-size: 15px;width: 35%;">{{stuRelation[i].name }}</text>
							<text style="font-size: 15px;width: 20%;">{{stuRelation[i].gender | getDictName('CodeSex')}}</text>
							<text style="font-size: 15px;width: 45%;" v-show="stuRelation[i].ralation">{{stuRelation[i].ralation | getDictName('CodeSocialRalation')}}</text>
						</view>
						<view class="input-row" style="height: 25px;">
							<text style="font-size: 15px;width: 55%">电话：{{stuRelation[i].contact}}</text>
							<text style="font-size: 15px;width: 45%">职务：{{stuRelation[i].title}}</text>
						</view>
						<view class="input-row border">
							<text style="font-size: 15px;">单位：{{stuRelation[i].workPlace}}</text>
							<text>{{stuRelation[i].memo}}</text>
						</view>
					</view>
				</view>
			</uni-collapse-item>
		</uni-collapse>
		
		<uni-collapse accordion="true">
			<uni-collapse-item open="true" title="个人信息" style="font-weight: bold;text-align: center;">
				<line-text ltext="姓名" :rtext="studentInfo.studentName"></line-text>
				<line-text ltext="学号" :rtext="studentInfo.studyNo"></line-text>
				<line-text ltext="准考证号" :rtext="studentInfo.examCertificateNo"></line-text>
				<line-text ltext="注册号" :rtext="studentInfo.registorNo"></line-text>
				<line-text ltext="进修性质" :rtext="studentInfo.attendAdvancedStudies | getDictName(this.CODE_STUDIES)"></line-text>
				<line-text ltext="教学点" :rtext="studentInfo.unitName"></line-text>
				<line-text ltext="年级" :rtext="studentInfo.gradeName"></line-text>
				<line-text ltext="层次" :rtext="studentInfo.classicName"></line-text>
				<line-text ltext="学习方式" :rtext="studentInfo.learningStyle | getDictName(this.CODE_LEARNINGSTYLE)"></line-text>
				<line-text ltext="专业" :rtext="studentInfo.majorName"></line-text>
				<line-text ltext="班级" :rtext="studentInfo.className"></line-text>
				<line-text ltext="就读方式" :rtext="studentInfo.studyInSchool | getDictName(this.CODE_STUDYINSCHOOL)"></line-text>
				<line-text ltext="学习类别" :rtext="studentInfo.studentKind | getDictName(this.CODE_STUDENTKIND)"></line-text>
				<line-text ltext="学籍状态" :rtext="studentInfo.studentStatus | getDictName(this.CODE_STUDENTSTATUS)"></line-text>
				<line-text ltext="在学状态" :rtext="studentInfo.learingStatus | getDictName(this.CODE_LEARINGSTATUS)"></line-text>
				<line-text ltext="入学总分" :rtext="studentInfo.totalPoint"></line-text>
				<line-text ltext="入学资格审核状态" :rtext="studentInfo.enterAuditStatus | getDictName(this.CODE_AUDITSTATUS)"></line-text>
				<line-text ltext="备注" :rtext="studentInfo.memo"></line-text>
			</uni-collapse-item>
		</uni-collapse>
	</view>
</template> 


<script>
	import lineText from '@/components/line-text.vue'
	export default {
		components:{
			lineText
		},
		data() {
			return {
				photoPath:"../../static/img/user/headphoto.png",
				user:uni.getStorageSync("userInfo"),
				stuResume:uni.getStorageSync("stuResume"),
				stuRelation:uni.getStorageSync("stuRelation"),
				studentInfo:uni.getStorageSync("studentInfo")
			}
		},
		async onPullDownRefresh() {
			await this.loadJs.reloadStudentInfo(this.$store.account,this.$store.baseInfoId);
			this.stuResume = uni.getStorageSync("stuResume");
			this.stuRelation = uni.getStorageSync("stuRelation");
			this.studentInfo = uni.getStorageSync("studentInfo");
			uni.stopPullDownRefresh();
		},
		async onReady() {
			if(!uni.getStorageSync("studentInfo")){
				await this.loadJs.reloadStudentInfo(this.$store.account,this.$store.baseInfoId);
			}
			this.stuResume = uni.getStorageSync("stuResume");
			this.stuRelation = uni.getStorageSync("stuRelation");
			this.studentInfo = uni.getStorageSync("studentInfo");
		}
		
	}
</script>

