import http from './request.js';
import Vue from 'vue';
import store from '../store'
import Base64 from './base64.js'

let debugLevel = uni.getStorageSync("debugLevel");
let baseUrl = uni.getStorageSync("baseUrl");
let imgUrl = uni.getStorageSync("imgUrl");

function format(value) {
	let date = new Date(value)
	let y = date.getFullYear()
	let MM = date.getMonth() + 1
	MM = MM < 10 ? ('0' + MM) : MM
	let d = date.getDate()
	d = d < 10 ? ('0' + d) : d
	let h = date.getHours()
	h = h < 10 ? ('0' + h) : h
	let m = date.getMinutes()
	m = m < 10 ? ('0' + m) : m
	let s = date.getSeconds()
	s = s < 10 ? ('0' + s) : s
	return y + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s;
}

function saveLoginTime(startTime,endTime){
	let userid = uni.getStorageSync("userInfo").resourceid;
	store.loginTime = new Date();
	http.post('/user/saveLoginLong/'+userid+'/student', {
		appMac: uni.getStorageSync("appMac"),
		startTime:format(startTime),
		endTime:format(endTime)
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

async function readMessage(cardId,receiveId){
	await http.post('/messageReceiverUser/readMessage/'+cardId+'/'+receiveId, {
	});
};

async function saveBarrage(userid,mateid,sendTime,content){
	await http.post('/online/saveBarrage', {
		userid:userid,
		mateid:mateid,
		sendTime:sendTime,
		content:content
	});
};

/**
 * @param {Object} type:section,topic
 * @param {Object} resourceid:sectionId,topicId
 */
async function clickTopic(type,resourceid){
	var promise = new Promise((resolve, reject) => {
		console.log(imgUrl + '/edu3/learning/bbs/topic/update/ajax.html');
	    uni.request({
	        url: imgUrl + '/edu3/learning/bbs/topic/update/ajax.html',
	        data:  {
				"type":type,
				"topicId":resourceid,
				"sectionId":resourceid
			},
	        method: "POST",
	        dataType: "JSONP",
	        header: {
	            "content-type": "application/x-www-form-urlencoded",
	        },
	        success: function(res) {}
	    });
	});
	return promise;
};

async function saveExercise(studentBaseId,exerciseBatchId,answerJson){
	await http.post('/studentExercise/save', {
		type: "submit",
		studentBaseId:studentBaseId,
		exerciseBatchId:exerciseBatchId,
		answerJson:answerJson
	});
};

async function reloadUser(userid){
	uni.showLoading({});
	await http.get('/user/getUser/'+userid, {}).then(res => {
		let userInfo = JSON.parse(JSON.parse(res).list);
		uni.setStorageSync("userInfo",userInfo);
	});
	uni.hideLoading();
};

async function reloadBaseInfo(studentBaseId){
	uni.showLoading({});
	await http.get('/studentBaseInfo/getStudentBaseInfo/'+studentBaseId, {})
	.then(res => {
		let baseInfo = JSON.parse(JSON.parse(res).data);
		uni.setStorageSync("baseInfo",baseInfo);
	});
	uni.hideLoading();
};

async function reloadStudentInfo(userName,studentBaseId){
	uni.showLoading({});
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

async function reloadClasses(classesId){
	uni.showLoading({});
	await http.get('/classes/getClasses/'+classesId, {})
	.then(res => {
		let classInfo = JSON.parse(JSON.parse(res).list);
		uni.setStorageSync("classInfo",classInfo);
	});
	uni.hideLoading();
};

async function reloadPayment(studentBaseId){
	uni.showLoading({});
	await http.get('/payment/getPayment/'+studentBaseId, {
	}).then(res => {
		let payment = JSON.parse(JSON.parse(res).list);
		uni.setStorageSync("studentPayment",payment);
	});
	await http.get('/payment/getPaymentDetails/'+studentBaseId, {
	}).then(res => {
		let paymentDetail = JSON.parse(JSON.parse(res).list);
		uni.setStorageSync("studentPaymentDetail",paymentDetail);
	});
	uni.hideLoading();
};

async function reloadDict(value,parentCode){
	if(value!=null && value!=undefined && value!=""){
		await http.get('/data/getDictionaryByCode/'+parentCode+'/'+value, {
		}).then(res => {
			var data = JSON.parse(res).data;
			if(data){
				let dict = JSON.parse(data);
				uni.setStorageSync("dict_"+parentCode+'_'+value,dict.dictName);
			}
		});
	}
};

async function reloadDict2(name,parentCode){
	if(name!=null && name!=undefined && name!=""){
		await http.get('/data/getDictionaryByCode/'+parentCode+'/'+name, {
			isByName:"Y"
		}).then(res => {
			var data = JSON.parse(res).data;
			if(data){
				let dict = JSON.parse(data);
				uni.setStorageSync("dict_"+parentCode+'_'+name,dict.dictValue);
			}
		});
	}
};

async function reloadConfig(paramCode){
	uni.showLoading({});
	await http.get('/data/getConfigByCode',{
		paramCode:paramCode,
	}).then(res => {
		let config = JSON.parse(JSON.parse(res).data);
		if(config!=null){
			uni.setStorageSync("config_"+paramCode,config.paramValue);
		}
	});
	uni.hideLoading();
};

async function reloadTeachPlan(studentBaseId){
	uni.showLoading({});
	await http.get('/stu/PlanCourse/'+studentBaseId, {
	}).then(res => {
		let planCourse = JSON.parse(JSON.parse(res).list);
		uni.setStorageSync("planCourse",planCourse);
	});
	await http.get('/stu/Plan/'+studentBaseId, {
	}).then(res => {
		let plan = JSON.parse(JSON.parse(res).data);
		uni.setStorageSync("teachPlan",plan);
	});
	uni.hideLoading();
};

async function reloadCourseTotalTime(studentBaseId){
	uni.showLoading({});
	await http.get('/studyProgress/getCourseTotalTime/'+studentBaseId, {
	}).then(res => {
		let courseTotalTime = JSON.parse(JSON.parse(res).list);
		uni.setStorageSync("courseTotalTime",courseTotalTime);
	});
	uni.hideLoading();
};

async function reloadTimetable(studentBaseId,term){
	uni.showLoading({});
	await http.get('/coursetimetable/getCoursetimetable/'+studentBaseId, {
		"term":term
	}).then(res => {
		let timetable = JSON.parse(JSON.parse(res).list);
		var planCourse = uni.getStorageSync("planCourse");
		
		var onlineCourse = "";
		var timeArray = [];
		for(var index=0;index<planCourse.length;index++){
			if(planCourse[index].isCurTermCourse === 'Y'){
				onlineCourse += planCourse[index].course +",";
			}
		}
		for(var index=0;index<28;index++){
			var obj = new Object;
			obj.title = "";
			obj.content = "";
			timeArray[index] = obj;
		}
		if(timetable!=null && timetable.length>0){
			for(var index=0;index<timetable.length;index++){
				if(onlineCourse.indexOf(timetable[index].course)>=0){
					continue;
				}
				var weeks = timetable[index].week;
				var time = (timetable[index].timePeriod/10)-1;
				if(weeks.indexOf(",")>0){
					var weekArray = weeks.split(",");
					for(var i=0;i<weekArray.length;i++){
						var week = weekArray[i]-1;
						var timeStr = timetable[index].courseTimeName==null?"":timetable[index].courseTimeName;
						var roomStr = timetable[index].classroomName==null?"":timetable[index].classroomName;
						var teacherStr = timetable[index].teacherName==null?"":timetable[index].teacherName;
						timeArray[week*4+time].title += timetable[index].courseName + "; ";
						timeArray[week*4+time].content += "时间：" + timeStr + "\n" 
							+ "课室："+ roomStr +"\n"+ "授课教师："+ teacherStr + "\n\n";
					}
				}else {
					var timeStr = timetable[index].courseTimeName==null?"":timetable[index].courseTimeName;
					var roomStr = timetable[index].classroomName==null?"":timetable[index].classroomName;
					var teacherStr = timetable[index].teacherName==null?"":timetable[index].teacherName;
					if(weeks==null || weeks===""){
						timeArray[time].title += timetable[index].courseName + "; ";
						timeArray[time].content +="时间：" + timeStr + "\n" 
							+ "课室："+ roomStr +"\n"+ "授课教师："+ teacherStr + "\n\n";
					}else {
						var week = weeks-1;
						timeArray[week*4+time].title += timetable[index].courseName + "; ";
						timeArray[week*4+time].content += "时间：" + timeStr + "\n" 
							+ "课室："+ roomStr +"\n"+ "授课教师："+ teacherStr + "\n\n";
					}
				}
			}
		}
		uni.setStorageSync("timetable",timeArray);
	});
	uni.hideLoading();
};

async function reloadStudyProgress(studentBaseId){
	uni.showLoading({});
	await http.get('/studyProgress/getStudyProgress/'+studentBaseId, {
	}).then(res => {
		let studyProgress = JSON.parse(JSON.parse(res).list);
		uni.setStorageSync("studyProgress",studyProgress);
	});
	uni.hideLoading();
};

async function reloadExamResult(studentBaseId){
	uni.showLoading({});
	await http.get('/stu/getExamResults/'+studentBaseId, {
	}).then(res => {
		let examResult = JSON.parse(JSON.parse(res).list);
		uni.setStorageSync("examResult",examResult);
	});
	uni.hideLoading();
};

async function reloadStuChangeInfo(studentBaseId){
	uni.showLoading({});
	await http.get('/stuChangeInfo/getStuChangeInfo/'+studentBaseId, {
	}).then(res => {
		let stuChangeInfo = JSON.parse(JSON.parse(res).list);
		uni.setStorageSync("stuChangeInfo",stuChangeInfo);
	});
	uni.hideLoading();
};

async function reloadMessage(account,studentBaseId){
	uni.showLoading({});
	await http.get('/courseNotice/getNotices/'+studentBaseId, {
	}).then(res => {
		let courseNotice = JSON.parse(JSON.parse(res).list);
		uni.setStorageSync("courseNotice",courseNotice);
	});
	await http.get('/messageReceiver/getReceiveMessages/'+account, {
	}).then(res => {
		let messageReceiver = JSON.parse(JSON.parse(res).list);
		uni.setStorageSync("messageReceiver",messageReceiver);
	});
	uni.hideLoading();
};

async function reloadOnlineCourse(studentBaseId){
	uni.showLoading({});
	await http.get('/data/onlineCourses', {
		studentBaseId:studentBaseId
	}).then(res => {
		let onlineCourse = JSON.parse(JSON.parse(res).list);
		uni.setStorageSync("onlineCourse",onlineCourse);
	});
	uni.hideLoading();
};

async function reloadCourseDetail(courseId){
	uni.showLoading({});
	//课程概况
	await http.get('/courseOverview/getOverviews/'+courseId, {
	}).then(res => {
		let courseDetail = JSON.parse(JSON.parse(res).list);
		uni.setStorageSync("courseD_1"+courseId,courseDetail);
	});
	//教学大纲(章节)
	await http.get('/online/syllabus/'+courseId, {
	}).then(res => {
		let courseDetail = JSON.parse(JSON.parse(res).list);
		uni.setStorageSync("courseD_2"+courseId,courseDetail);
	});
	//课程资源
	await http.get('/online/getCourseMateResource/'+courseId, {
	}).then(res => {
		let courseDetail = JSON.parse(JSON.parse(res).list);
		uni.setStorageSync("courseD_21"+courseId,courseDetail);
	});
	uni.hideLoading();
};

async function reloadCourseExam(syllabusId,studentBaseId){
	uni.showLoading({});
	await http.get('/activeCourseExam/getActiveCourseExam/'+syllabusId+'/'+studentBaseId+'/unit_exam', {
	}).then(res => {
		let courseExam = JSON.parse(JSON.parse(res).data);
		uni.setStorageSync("courseExam_"+syllabusId,courseExam);
	});
	uni.hideLoading();
};

async function reloadBbsSection(){
	uni.showLoading({});
	await http.get('/bbsSection/getBbsSections', {
		parentId:"jx"
	}).then(res => {
		let bbsSection = JSON.parse(JSON.parse(res).list);
		uni.setStorageSync("bbsSection",bbsSection);
	});
	uni.hideLoading();
};

async function reloadExerciseBatch(studentBaseId,courseId){
	uni.showLoading({});
	await http.get('/exerciseBatch/getExerciseBatchs/'+studentBaseId+'/'+courseId, {
	}).then(res => {
		let exerciseBatch = JSON.parse(JSON.parse(res).list);
		uni.setStorageSync("exercise_"+courseId,exerciseBatch);
	});
	uni.hideLoading();
};

async function reloadTopics(sectionId,courseId,studentBaseId,userId,pageSize,pageNum){
	uni.showLoading({});
	await http.get('/bbsTopic/getTopics/'+sectionId+'/'+courseId+'/'+studentBaseId, {
		userId:userId,
		pageSize:pageSize,
		pageNum:pageNum
	}).then(res => {
		let topicsInfo = JSON.parse(JSON.parse(res).data);
		uni.setStorageSync("topics_"+pageNum+'_'+sectionId+"_"+courseId+"_"+userId,topicsInfo);
	});
	uni.hideLoading();
};

async function reloadBbsReply(topicId,pageSize,pageNum){
	uni.showLoading({});
	await http.get('/bbsReply/getBbsReplys/'+topicId, {
		pageSize:pageSize,
		pageNum:pageNum
	}).then(res => {
		let bbsReply = JSON.parse(JSON.parse(res).data);
		uni.setStorageSync("bbsReply_"+pageNum+'_'+topicId,bbsReply);
	});
	uni.hideLoading();
}

async function reloadBarrage(syllabus){
	uni.showLoading({});
	await http.get('/online/barrage', {
		syllabus:syllabus
	}).then(res => {
		let barrageInfo = JSON.parse(JSON.parse(res).list);
		uni.setStorageSync("barrageInfo_"+syllabus,barrageInfo);
	});
	uni.hideLoading();
};

export default {
	saveLoginTime,
	saveStudyProgress,
	readMessage,
	saveBarrage,
	clickTopic,
	reloadUser,
	reloadBaseInfo,
	reloadStudentInfo,
	reloadClasses,
	reloadPayment,
	reloadTeachPlan,
	reloadCourseTotalTime,
	reloadTimetable,
	reloadStudyProgress,
	reloadExamResult,
	reloadStuChangeInfo,
	reloadMessage,
	reloadOnlineCourse,
	reloadCourseDetail,
	reloadCourseExam,
	reloadExerciseBatch,
	reloadBbsSection,
	reloadBbsReply,
	reloadBarrage,
	reloadTopics,
	reloadDict,
	reloadDict2,
	reloadConfig,
}