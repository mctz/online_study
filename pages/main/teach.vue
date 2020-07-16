<template>
	<view style="width: 100%;">
		<view style="margin-left: 15px;margin-top: 10px;">
			<navigator url="./teach/teach">
				<icon-button src1="../../static/img/teach/teach.png" name="教学计划"></icon-button>
			</navigator>
			<navigator url="./teach/time">
				<icon-button src1="../../static/img/teach/time.png" name="学习时长"></icon-button>
			</navigator>
			<navigator url="./teach/score">
				<icon-button src1="../../static/img/teach/score.png" name="考试成绩"></icon-button>
			</navigator>
			<navigator url="./teach/timetable">
				<icon-button src1="../../static/img/teach/timetable.png" name="查看课表"></icon-button>
			</navigator>
			<navigator url="./teach/change">
				<icon-button src1="../../static/img/teach/change.png" name="学籍异动"></icon-button>
			</navigator>
		</view>
	</view>
</template> 


<script>
	import iconButton from '../../components/icon-button.vue'
	import {mapState,} from 'vuex'
	export default {
		data() {
			return {
			}
		},
		components:{
			iconButton
		},
		computed: {
			...mapState(['hasLogin'])
		},
		onLoad() {
			if (!this.hasLogin) {
				uni.reLaunch({
					url: '../login/login'
				});
			}
		},
	}
</script>

<style>
	
</style>
