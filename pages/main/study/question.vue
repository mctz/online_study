<template>
	<view class="content">
		<view class="input-group" style="margin-top: 10px;">
			<view class="input-row border">
				<text style="line-height: 50px;font-size: 15px;width: 100px;">问题来源：</text>
				<view class="uni-list-cell" style="width: 100%;padding-top: 5px;">
					<view class="uni-list-cell-db">
						<picker @change="bindPickerChange" :value="index" :range="selectList" range-key="syllabusName">
							<view class="uni-input" style="font-size: 14px;color: grey;">{{selectList[index].syllabusName}}</view>
						</picker>
					</view>
				</view>
			</view>
		</view>
		<view class="input-group">
			 <view class="input-row border" style="height: 50px;color: #6D6D72;">
			  	<m-input type="text" v-model="question.title" placeholder="请输入标题"></m-input>
			  </view>
			 <view class="input-row" style="margin-top: 10px;margin-bottom: 10px;">
				<textarea style="background-color: #FFFFFF;width: 98%;padding: 5px;" v-model="question.content" placeholder="请输入内容"></textarea>
			 </view>
		</view>
		 <view class="btn-row">
		 	<button type="primary" class="primary" @tap="save" style="margin-top: 5px;">提交</button>
		 </view>
	</view>
</template>

<script>
	import mInput from '../../../components/m-input.vue';
	export default {
		components: {mInput},
		data() {
			return {
				index:0,
				courseId:"",
				sectionId:"",
				selectList:[],
				question:{
					title:"",
					content:"",
					topicType:"2",
					parentId:""
				}
			}
		},
		onLoad(option) {
			this.courseId = option.courseId;
			this.sectionId = option.sectionId;
			var courseD_2 = uni.getStorageSync("courseD_2"+this.courseId);
			for(var i=0;i<courseD_2.length;i++){
				if(i>0){
					this.selectList[i-1] = courseD_2[i];
				}
			}
		},
		methods: {
			bindPickerChange: function(e) {
				this.index = e.target.value
			},
			save() {
				console.log(this.index);
				if (this.question.title.length == 0) {
					uni.showToast({
						icon: 'none',
						title: '标题不能为空',
					});
					return;
				}
				if (this.question.content.length == 0) {
					uni.showToast({
						icon: 'none',
						title: '内容不能为空',
					});
					return;
				}
				var info = this.selectList[this.index];
				this.question.syllabusId = info.resourceid;
				this.question.courseId = this.courseId;
				this.question.sectionId = this.sectionId;
				this.question.userId = this.$store.userId;
				this.question.studentBaseId = this.$store.baseInfoId;
				//{courseId:11,syllabusId:11,title:11,content:11,topicType:1,sectionId:11,userId:11,parentId:11,studentBaseId:11}
				console.log(this.question);
				this.$http.post('/bbsTopic/raiseQuestion', {
					"topicJsonStr":JSON.stringify(this.question)
				}).then(res => {
					let result = JSON.parse(res);
					if(result.status==this.RESPONSE_OK){
						uni.showToast({
							icon: 'none',
							title: '提交成功',
						});
						setTimeout(function(){
							uni.navigateBack({});
						},1000);
					}else {
						uni.showToast({
							icon: 'none',
							title: result.msg,
						});
					}
				})
			}
		}
	}
</script>
