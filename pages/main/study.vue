<template>
	<view style="width: 100%;">
		<view v-if="!planCourse[0]" style="text-align: center;line-height: 100px;color: grey;">
			暂无在线课程
		</view>
		<view v-else v-for="(n,i) in planCourse" v-bind:key="i">
			<view class="input-row border" v-if="planCourse[i].hasResource == 'Y'" style="height: 200rpx;font-size: 15px;">
				<view style="width: 25%;text-align: left;margin-top: 25px;">
					<image src="../../static/img/course.png" style="width: 70%;" mode="widthFix"></image>
				</view>
				<view v-if="planCourse[i].isCurTermCourse == 'Y'" style="width:60%;padding-top: 20px;line-height: 30px;">
					<navigator :url="'./study/course?course='+planCourse[i].course+'&courseName='+planCourse[i].courseName+
						'&courseNature='+planCourse[i].courseNature+'&creditHour='+planCourse[i].creditHour+'&stydyHour='+planCourse[i].stydyHour" open-type="navigate">
						<text>{{planCourse[i].courseName}}</text><br>
						<text>{{planCourse[i].term | getDictName('CodeTermType')}}</text>
					</navigator>
				</view>
				<view v-if="planCourse[i].isCurTermCourse == 'Y'" style="width: 15%;">
					<image src="../../static/img/button/ic-right.png" style="width: 30%;margin-top: 40px;" mode="widthFix"></image>
				</view>
				<view v-else style="width:60%;padding-top: 20px;line-height: 30px;color:grey;">
					<text>{{planCourse[i].courseName}}</text><br>
					<text>{{planCourse[i].term | getDictName('CodeTermType')}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex'

	export default {
		computed: mapState(['hasLogin', 'userName']),
		data() {
			return {
				planCourse:uni.getStorageSync("planCourse")
			}
		},
		onPullDownRefresh() {
			this.loadJs.reloadTeachPlan(this.$store.baseInfoId);
			this.planCourse = uni.getStorageSync("planCourse");
			uni.stopPullDownRefresh();
		},
		onLoad() {
			if (!this.hasLogin) {
				uni.reLaunch({
					url: '../login/login'
				});
			}
		},
		async onReady() {
			if(!uni.getStorageSync("planCourse")){
				await this.loadJs.reloadTeachPlan(this.$store.baseInfoId);
			}
			this.planCourse = uni.getStorageSync("planCourse");
		}
	}
</script>

<style>
</style>
