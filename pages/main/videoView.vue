<template>
	<view class="content">
		<video id="myVideo" :src="webUrl" :initial-time="initTime-4<0?0:initTime-4" :danmu-list="danmuList" @ended="ended" @timeupdate="timeupdate"
			 style="width: 100%;" autoplay="true" enable-danmu danmu-btn controls></video>
		<view class="input-row border" style="width: 100%;height: 30px;padding-top: 20px;">
			<input v-model="danmuValue" class="uni-input" type="text" placeholder="在此处输入弹幕内容"  style="width: 80%;font-size: 15px;"/>
			<button @click="sendDanmu" style="font-size: 15px;padding-bottom: 5px;text-align: center;">发 送</button>
		</view>
	</view>
</template>

<script>
	export default {
	    data() {
	        return {
	            webUrl: '',
				mateId:'',
				syllabusId:'',
				courseId:'',
				learnTime:0,
				totalTime:0,
				currentTime:0,
				initTime:0,
	            danmuList: [],
	            danmuValue: '',
				imgUrl:this.$store.imgUrl,
	        }
	    },
	    async onReady() {
	        this.videoContext = uni.createVideoContext('myVideo')
			this.videoContext.requestFullScreen();
	    },
		async onLoad(option) {
			var url = option.webUrl;
			if(!url.startsWith("http")){
				url = this.imgUrl + url;
			}
			this.webUrl = url;
			this.courseId = option.courseId;
			this.mateId = option.mateId;
			this.totalTime = option.totalTime;
			this.syllabusId = option.syllabusId;
			if(!uni.getStorageSync("studyProgress")){
				await this.loadJs.reloadStudyProgress(this.$store.baseInfoId);
			}
			var studyProgressList = uni.getStorageSync("studyProgress");
			for(var i=0;i<studyProgressList.length;i++){
				if(studyProgressList[i].course == this.courseId && studyProgressList[i].mate == this.mateId){
					this.initTime = studyProgressList[i].currentTime;
					break;
				}
			}
			if(!uni.getStorageSync("barrageInfo_"+this.syllabusId)){
				await this.loadJs.reloadBarrage(this.syllabusId);
			}
			this.getDanmu();
			if(this.debugLevel>1){
				console.log("initTime:"+this.initTime);
			}
		},
		async onPullDownRefresh() {
			await this.loadJs.reloadBarrage(this.syllabusId);
			this.getDanmu();
			uni.stopPullDownRefresh();
		},
		onUnload(){
			this.saveStudyProgress();
		},
	    methods: {
	        sendDanmu: function() {
	            this.videoContext.sendDanmu({
	                text: this.danmuValue,
	                color: '#FFFFFF'
	            });
				this.loadJs.saveBarrage(uni.getStorageSync("userInfo").resourceid,this.mateId,this.currentTime,this.danmuValue);
				this.danmuValue = '';
	        },
			async getDanmu(){
				var barrageInfo = uni.getStorageSync("barrageInfo_"+this.syllabusId);
				for(var index=0;index<barrageInfo.length;index++){
					if(barrageInfo[index].mate===this.mateId){
						var obj = new Object;
						obj.color = "#bababa";
						obj.text = barrageInfo[index].content;
						obj.time = Math.floor(barrageInfo[index].sendTime);
						this.danmuList[index] = obj;
					}
				}
			},
	        videoErrorCallback: function(e) {
	            uni.showModal({
	                content: e.target.errMsg,
	                showCancel: false
	            })
	        },
			onHide: function(){
				this.loadJs.saveStudyProgress(this.learnTime,this.totalTime,this.currentTime,this.$store.baseInfoId,this.courseId,this.mateId)
				console.log("onHide");
			},
			ended: function(event){
				this.loadJs.saveStudyProgress(this.learnTime,this.totalTime,this.currentTime,this.$store.baseInfoId,this.courseId,this.mateId)
			},
			/* onBackPress(event) {
				//小程序不支持
				this.saveStudyProgress();
				console.log(event);
			}, */
			async saveStudyProgress(){
				await this.loadJs.saveStudyProgress(this.learnTime,this.totalTime,this.currentTime,this.$store.baseInfoId,this.courseId,this.mateId)
				if(this.debugLevel>1){
					console.log("saveStudyProgress:"+this.learnTime+";"+this.currentTime);
				}
			},
			timeupdate(event){
				let detail = event.detail;
				this.currentTime = detail.currentTime;
				this.learnTime += 0.25;
			}
	    }
	}
</script>