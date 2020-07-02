<template>
    <view class="content">
        <view class="uni-padding-wrap uni-common-mt">
            <view>
                <video id="myVideo" :src="webUrl" :initial-time="initTime-4<0?0:initTime-4" style="width: 100%;" autoplay="true" @ended="ended" @timeupdate="timeupdate"
                     :danmu-list="danmuList" enable-danmu danmu-btn controls></video>
            </view>
            <!-- #ifndef MP-ALIPAY -->
            <!-- <view class="input-row border" style="width: 100%;height: 30px;padding-top: 20px;">
            	<input v-model="danmuValue" class="uni-input" type="text" placeholder="在此处输入弹幕内容"  style="width: 80%;"/>
				<button @click="sendDanmu" style="font-size: small;margin-bottom: 2px;text-align: center;">发 送</button>
            </view> -->
            <!-- #endif -->
        </view>
    </view>
</template>

<script>
	export default {
	    data() {
	        return {
	            src: '',
				mateId:'',
				courseId:'',
				learnTime:0,
				totalTime:0,
				currentTime:0,
				initTime:0,
	            danmuList: [{
	                    text: '',
	                    color: '#FFFFFF',
	                    time: 1
	                }
	            ],
	            danmuValue: ''
	        }
	    },
	     onReady() {
	        // #ifndef MP-ALIPAY
	        this.videoContext = uni.createVideoContext('myVideo')
	        // #endif
			// 进入全屏状态
			this.videoContext.requestFullScreen();
	    },
		async onLoad(option) {
			this.webUrl = option.webUrl;
			this.courseId = option.courseId;
			this.mateId = option.mateId;
			this.totalTime = option.totalTime;
			if(!uni.getStorageSync("studyProgress")){
				await this.loadJs.reloadStudyProgress(this.$store.baseInfoId);
			}
			var studyProgressList = uni.getStorageSync("studyProgress");
			for(var i=0;i<studyProgressList.length;i++){
				if(studyProgressList[i].course == this.courseId && studyProgressList[i].mate == this.mateId){
					//this.studyProgress = studyProgressList[i];
					this.initTime = studyProgressList[i].currentTime;
					break;
				}
			}
			console.log("initTime:"+this.initTime);
		},
	    methods: {
	        sendDanmu: function() {
	            this.videoContext.sendDanmu({
	                text: this.danmuValue,
	                color: '#FFFFFF'
	            });
	            this.danmuValue = '';
	        },
	        videoErrorCallback: function(e) {
	            uni.showModal({
	                content: e.target.errMsg,
	                showCancel: false
	            })
	        },
			onHide: function(){
				this.loadJs.saveStudyProgress(this.learnTime,this.totalTime,this.currentTime,this.$store.baseInfoId,this.courseId,this.mateId)
			},
			ended: function(event){
				this.loadJs.saveStudyProgress(this.learnTime,this.totalTime,this.currentTime,this.$store.baseInfoId,this.courseId,this.mateId)
			},
			onBackPress() {
				this.loadJs.saveStudyProgress(this.learnTime,this.totalTime,this.currentTime,this.$store.baseInfoId,this.courseId,this.mateId)
				console.log("onBackPress:"+this.learnTime+";"+this.currentTime);
			},
			timeupdate(event){
				let detail = event.detail;
				this.currentTime = detail.currentTime;
				this.learnTime += 0.25;
				console.log(this.currentTime);
			}
	    }
	}
</script>