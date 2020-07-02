import http from './request.js';
import Vue from 'vue';
import store from '../../store'

function saveLoginTime(startTime,endTime){
	let userid = uni.getStorageSync("userInfo").resourceid;
	store.loginTime = new Date();
	http.post('/user/saveLoginLong/'+userid+'/student', {
		appMac: uni.getStorageSync("appMac"),
		startTime:startTime,
		endTime:endTime
	});
};

async function saveStudyProgress(learnTime,totalTime,currentTime,studentBaseId,courseId,mateId){
	await http.post('/studyProgress/saveStudyProgress/'+studentBaseId+'/'+courseId+'/'+mateId, {
		resourceType: "video",
		learnTime:Math.floor(learnTime),
		totalTime:totalTime,
		currentTime:Math.floor(currentTime)
	});
	reloadStudyProgress(studentBaseId);
};

async function reloadUser(userid){
	uni.showLoading({
	});
	await http.get('/user/getUser/'+userid, {}).then(res => {
		let userInfo = JSON.parse(JSON.parse(res).list);
		if(res.status==this.RESPONSE_OK){
			uni.setStorageSync("userInfo",userInfo);
		}
	});
	uni.hideLoading();
};

async function reloadBaseInfo(studentBaseId){
	uni.showLoading({
	});
	await http.get('/studentBaseInfo/getStudentBaseInfo/'+studentBaseId, {})
	.then(res => {
		let baseInfo = JSON.parse(JSON.parse(res).data);
		uni.setStorageSync("baseInfo",baseInfo);
	});
	uni.hideLoading();
};

async function reloadStudentInfo(userName,studentBaseId){
	uni.showLoading({
	});
	await http.get('/stu/Resume/'+userName, {})
	.then(res => {
		let stuResume = JSON.parse(JSON.parse(res).list);
		uni.setStorageSync("stuResume",stuResume);
	});
	await http.get('/stu/Relation/'+userName, {})
	.then(res => {
		let stuRelation = JSON.parse(JSON.parse(res).list);
		uni.setStorageSync("stuRelation",stuRelation);
	});
	await http.get('/studentInfo/getStudentInfo/'+studentBaseId, {})
	.then(res => {
		let studentInfo = JSON.parse(JSON.parse(res).data);
		uni.setStorageSync("studentInfo",studentInfo);
	});
	uni.hideLoading();
};

async function reloadPayment(studentBaseId){
	uni.showLoading({
	});
	await http.get('/payment/getPayment/'+studentBaseId, {})
	.then(res => {
		let payment = JSON.parse(JSON.parse(res).list);
		uni.setStorageSync("studentPayment",payment);
	});
	await http.get('/payment/getPaymentDetails/'+studentBaseId, {})
	.then(res => {
		let paymentDetail = JSON.parse(JSON.parse(res).list);
		uni.setStorageSync("studentPaymentDetail",paymentDetail);
	});
	uni.hideLoading();
};

function reloadDict(value,parentCode){
	http.get('/data/getDictionaryByCode/'+parentCode+'/'+value, {})
	.then(res => {
		let dict = JSON.parse(JSON.parse(res).data);
		if(dict){
			uni.setStorageSync("dict_"+parentCode+'_'+value,dict.dictName);
		}
	});
};

async function reloadTeachPlan(studentBaseId){
	uni.showLoading({
	});
	await http.get('/stu/PlanCourse/'+studentBaseId, {})
	.then(res => {
		let planCourse = JSON.parse(JSON.parse(res).list);
		uni.setStorageSync("planCourse",planCourse);
	});
	await http.get('/stu/Plan/'+studentBaseId, {})
	.then(res => {
		let plan = JSON.parse(JSON.parse(res).data);
		uni.setStorageSync("teachPlan",plan);
	});
	uni.hideLoading();
};

async function reloadCourseTotalTime(studentBaseId){
	uni.showLoading({
	});
	await http.get('/studyProgress/getCourseTotalTime/'+studentBaseId, {})
	.then(res => {
		let courseTotalTime = JSON.parse(JSON.parse(res).list);
		uni.setStorageSync("courseTotalTime",courseTotalTime);
	});
	
	uni.hideLoading();
};

async function reloadStudyProgress(studentBaseId){
	uni.showLoading({
	});
	await http.get('/studyProgress/getStudyProgress/'+studentBaseId, {})
	.then(res => {
		let studyProgress = JSON.parse(JSON.parse(res).list);
		uni.setStorageSync("studyProgress",studyProgress);
	});
	uni.hideLoading();
};

async function reloadExamResult(studentBaseId){
	uni.showLoading({
	});
	await http.get('/stu/getExamResults/'+studentBaseId, {})
	.then(res => {
		let examResult = JSON.parse(JSON.parse(res).list);
		uni.setStorageSync("examResult",examResult);
	});
	uni.hideLoading();
};

async function reloadStuChangeInfo(studentBaseId){
	uni.showLoading({
	});
	await http.get('/stuChangeInfo/getStuChangeInfo/'+studentBaseId, {})
	.then(res => {
		let stuChangeInfo = JSON.parse(JSON.parse(res).list);
		uni.setStorageSync("stuChangeInfo",stuChangeInfo);
	});
	uni.hideLoading();
};

async function reloadMessage(account,studentBaseId){
	uni.showLoading({
	});
	await http.get('/courseNotice/getNotices/'+studentBaseId, {})
	.then(res => {
		let courseNotice = JSON.parse(JSON.parse(res).list);
		uni.setStorageSync("courseNotice",courseNotice);
	});
	await http.get('/messageReceiver/getReceiveMessages/'+account, {})
	.then(res => {
		let messageReceiver = JSON.parse(JSON.parse(res).list);
		uni.setStorageSync("messageReceiver",messageReceiver);
	});
	uni.hideLoading();
};

async function reloadOnlineCourse(studentBaseId){
	uni.showLoading({
	});
	await http.get('/data/onlineCourses', {
		studentBaseId:studentBaseId
	})
	.then(res => {
		let onlineCourse = JSON.parse(JSON.parse(res).list);
		uni.setStorageSync("onlineCourse",onlineCourse);
	});
	uni.hideLoading();
};

async function reloadCourseDetail(courseId){
	uni.showLoading({
	});
	//课程概况
	await http.get('/courseOverview/getOverviews/'+courseId, {})
	.then(res => {
		let courseDetail = JSON.parse(JSON.parse(res).list);
		uni.setStorageSync("courseD_1"+courseId,courseDetail);
	});
	//教学大纲(章节)
	await http.get('/online/syllabus/'+courseId, {})
	.then(res => {
		let courseDetail = JSON.parse(JSON.parse(res).list);
		uni.setStorageSync("courseD_2"+courseId,courseDetail);
	});
	//课程资源
	await http.get('/online/getCourseMateResource/'+courseId, {})
	.then(res => {
		let courseDetail = JSON.parse(JSON.parse(res).list);
		uni.setStorageSync("courseD_21"+courseId,courseDetail);
	});
	uni.hideLoading();
};

async function reloadCourseExam(syllabusId,studentBaseId){
	uni.showLoading({
	});
	await http.get('/activeCourseExam/getActiveCourseExam/'+syllabusId+'/'+studentBaseId+'/unit_exam', {
	})
	.then(res => {
		let result = JSON.parse(res);
		let courseExam = JSON.parse(result.list);
		if(res.status==this.RESPONSE_OK){
			uni.setStorageSync("courseExam_"+syllabusId,courseExam);
		}else{
			uni.showToast({
				title:res.msg
			})
		}
	});
	uni.hideLoading();
};

async function reloadTopics(sectionId,courseId,studentBaseId,userId){
	uni.showLoading({
	});
	await http.get('/bbsTopic/getTopics/'+sectionId+'/'+courseId+'/'+'/'+studentBaseId, {
		userId:userId,
		pageNum:0,
		pageSize:100,
		sortType:desc,
		sortRow:lastReplyDate
	}).then(res => {
		let topicsInfo = JSON.parse(JSON.parse(res).list);
		if(res.status==this.RESPONSE_OK){
			uni.setStorageSync("topicsInfo",topicsInfo);
		}
	});
	uni.hideLoading();
};

export default {
	saveLoginTime,
	saveStudyProgress,
	reloadUser,
	reloadBaseInfo,
	reloadStudentInfo,
	reloadPayment,
	reloadTeachPlan,
	reloadCourseTotalTime,
	reloadStudyProgress,
	reloadExamResult,
	reloadStuChangeInfo,
	reloadMessage,
	reloadOnlineCourse,
	reloadCourseDetail,
	reloadCourseExam,
	reloadDict,
}