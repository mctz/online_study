import Vue from 'vue'
import App from './App'
import http from './common/request.js'
import loadJs from './common/loadData.js'
import store from './store'

App.mpType = 'app'

Vue.config.productionTip = false
const app = new Vue({
	store,
	...App
})

Vue.prototype.$http = http
Vue.prototype.$store = store
Vue.prototype.loadJs = loadJs

Vue.prototype.debugLevel = 3;
Vue.prototype.RESPONSE_OK = 0;
Vue.prototype.RESPONSE_ERROR = 1;
Vue.prototype.RESPONSE_TIPS = 2;
Vue.prototype.ATTACHS = "/edu3/attachs/";
Vue.prototype.ATTACHS_STU = "/edu3/attachs/common/students/";
Vue.prototype.iconUrl = "https://7478-tx-gdxy-aa401e-1302676321.tcb.qcloud.la/gdxy/"

Vue.prototype.CODE_SEX = "CodeSex";
Vue.prototype.CODE_CERTTYPE = "CodeCertType";
Vue.prototype.CODE_NATION = "CodeNation";
Vue.prototype.CODE_MARRIAGE = "CodeMarriage";
Vue.prototype.CODE_POLITICS = "CodePolitics";
Vue.prototype.CODE_COUNTRY = "CodeCountry";
Vue.prototype.CODE_RESIDENCEKIND = "CodeRegisteredResidenceKind";
Vue.prototype.CODE_STUDIES = "CodeAttendAdvancedStudies";
Vue.prototype.CODE_CHARGESTATUS = "CodeChargeStatus";
Vue.prototype.CODE_LEARNINGSTYLE = "CodeLearningStyle";
Vue.prototype.CODE_STUDYINSCHOOL = "CodeStudyInSchool";
Vue.prototype.CODE_STUDENTKIND = "CodeStudentKind";
Vue.prototype.CODE_STUDENTSTATUS = "CodeStudentStatus";
Vue.prototype.CODE_LEARINGSTATUS = "CodeLearingStatus";
Vue.prototype.CODE_AUDITSTATUS = "CodeAuditStatus";
Vue.prototype.CODE_PAYMENTMETHOD = "CodePaymentMethod";
Vue.prototype.CODE_CHARGINGITEMS = "CodeChargingItems";
Vue.prototype.CODE_COURSENATURE = "courseNature" ;
Vue.prototype.CODE_STATUSCHANGE = "CodeStudentStatusChange";
Vue.prototype.CODE_MSGTYPE = "CodeMsgType";
Vue.prototype.CODE_TERMTYPE = "CodeTermType";
Vue.prototype.CODE_OVERVIEWTYPE = "CodeCourseOverviewType";
Vue.prototype.CODE_EXAMTYPE = "CodeExamType";
Vue.prototype.CODE_WEEK = "CodeWeek";

Vue.prototype.now = Date.now || function () {  
    return new Date().getTime();  
}; 
Vue.prototype.date = function(){
	return new Date(); 
};

Vue.prototype.isArray = Array.isArray || function (obj) {  
    return obj instanceof Array;  
};

Vue.prototype.nvls = function(...obj){
	for(var i=0;i<obj.length;i++){
		if(obj[i]!=null && obj[i]!=""){
			return obj[i];
		}
	}
};

Vue.prototype.openFile = function(url) {
	uni.downloadFile({
	  url: url,
	  success: function (res) {
	    var filePath = res.tempFilePath;
	    uni.openDocument({
	      filePath: filePath,
	      success: function (res) {
	        console.log(filePath);
	      }
	    });
	  }
	});
};

//返回年月日：2020-12-12
Vue.filter('formatDate', function (value) {
	let date = new Date(value)
	let y = date.getFullYear()
	let MM = date.getMonth() + 1
	MM = MM < 10 ? ('0' + MM) : MM
	let d = date.getDate()
	d = d < 10 ? ('0' + d) : d
	return y + '-' + MM + '-' + d
})

//返回年月日和时间：20-12-12 00:00
Vue.filter('formatSimpleDate', function (value) {
	let date = new Date(value)
	let y = date.getFullYear()-2000;
	y = y < 10 ? ('0' + y) : y
	let MM = date.getMonth() + 1
	let d = date.getDate()
	let h = date.getHours()
	let m = date.getMinutes()
	m = m < 10 ? ('0' + m) : m
	return y + '-' + MM + '-' + d + ' ' + h + ':' + m
})

//返回具体时间：2020-12-12 00:00:00
Vue.filter('formatDateTime', function (value) {
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
})

//返回具体时间 00:00:00
Vue.filter('formatTime', function (value) {
	let date = new Date(value)
	let h = date.getHours()
	h = h < 10 ? ('0' + h) : h
	let m = date.getMinutes()
	m = m < 10 ? ('0' + m) : m
	let s = date.getSeconds()
	s = s < 10 ? ('0' + s) : s
	return h + ':' + m + ':' + s;
})

//返回具体时间 00:00:00，单位秒
Vue.filter('formatLong', function (value) {
	let h = Math.floor(value/3600);
	h = h < 10 ? ('0' + h) : h
	let m = Math.floor((value%3600)/60)
	m = m < 10 ? ('0' + m) : m
	let s = value%60
	s = s < 10 ? ('0' + s) : s
	return h + ':' + m + ':' + s;
})

Vue.filter('getDictName', function (value,code) {
	if(value==null){
		return "";
	}
	if(!uni.getStorageSync("dict_"+code+"_"+value)){
		loadJs.reloadDict(value,code);
	}
	return uni.getStorageSync("dict_"+code+"_"+value);
})
Vue.filter('getDictValue', function (name,code) {
	if(name==null){
		return "";
	}
	if(!uni.getStorageSync("dict_"+code+"_"+name)){
		loadJs.reloadDict2(name,code);
	}
	return uni.getStorageSync("dict_"+code+"_"+name);
})

Vue.filter('getConfigValue', function (code) {
	if(code==null){
		return "";
	}
	if(!uni.getStorageSync("config_"+code)){
		loadJs.reloadConfig(code);
	}
	return uni.getStorageSync("config_"+code);
})

Vue.prototype.schoolData = [
	{
		schoolCode: "gdxy",//学校代码
		schoolName: "学苑教育",//学校名称
		baseUrl: "http://msl1214.iok.la/apps",
		imgUrl:"http://msl1214.vicp.io/xy"
	}, {
		schoolCode: '11078',
		schoolName: '广州大学',
		baseUrl: "http://222.201.56.23/apps",
		imgUrl:"https://cjjw.gzhu.edu.cn/gzdx"
	}, {
		schoolCode: "10571",
		schoolName: "广东医科大学",
		baseUrl: "http://jjgl.gdmu.edu.cn:8089/apps",
		imgUrl:"https://jjgl.gdmu.edu.cn/edu3"
	}, {
		schoolCode: "10601",
		schoolName: "桂林医学院",
		baseUrl: "http://jxjyglpt.glmc.edu.cn/apps",
		imgUrl:"https://jxjyglpt.glmc.edu.cn"
	}, {
		schoolCode: "10598",
		schoolName: "广西医科大学",
		baseUrl: "http://210.36.48.152:8089/apps",
		imgUrl:"http://210.36.48.152"
	}, {
		schoolCode: "10560",
		schoolName: "汕头大学",
		baseUrl: "",
		imgUrl:"http://jxjy.stu.edu.cn"
	}, {
		schoolCode: "10559",
		schoolName: "暨南大学",
		baseUrl: "http://jndx.acad.com.cn:8088/apps",
		imgUrl:"http://jndx.acad.com.cn"
	}, {
		schoolCode: "11846",
		schoolName: "广东外语外贸大学",
		baseUrl: "http://gwcj.gdufs.edu.cn:8089/apps",
		imgUrl:"http://gwcj.gdufs.edu.cn"
	}, {
		schoolCode: "12962",
		schoolName: "广东省外语艺术职业学院",
		baseUrl: "http://47.107.31.78:8089/apps",
		imgUrl:"http://47.107.31.78"
	}, {
		schoolCode: "13810",
		schoolName: "肇庆医学高等专科学院",
		baseUrl: "http://cjjwgl.zqmc.edu.cn/yza/apps",
		imgUrl:"http://cjjwgl.zqmc.edu.cn/zqyz"
	}
]
app.$mount()
