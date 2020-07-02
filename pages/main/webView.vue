
<template>
	<web-view :src="webUrl"></web-view>
</template>

<script>
	export default {
		data() {
			return {
				webUrl:"https://www.baidu.com/"
			}
		},
		onLoad(option) {
			this.webUrl = option.webUrl;
		},
	}
</script>