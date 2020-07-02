<template>
	<web-view :src="this.$store.imgUrl+'/exclude/cx.html?firstOpen=N&certNum='+certNum+'&studentName='+studentName"></web-view>
</template>

<script>
	export default {
		data() {
			return {
				certNum:this.$store.account,
				studentName:''
			}
		},
		onLoad(option) {
			let user = uni.getStorageSync("userInfo");
			this.studentName = user.cnName;
		},
		onPullDownRefresh() {
			uni.stopPullDownRefresh();
		},
	}
</script>
