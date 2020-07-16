
<template>
	<web-view :src="webUrl"></web-view>
</template>

<script>
	export default {
		data() {
			return {
				imgUrl:this.$store.imgUrl,
				webUrl:"https://www.baidu.com/"
			}
		},
		onLoad(option) {
			if(option.webUrl){
				var url = option.webUrl;
				if(!url.startsWith("http")){
					url = this.imgUrl + url;
				}
				this.webUrl = url;
				if(url.indexOf("edu.cn")>0){
					//部分教育网可能做了限制，只能使用本地浏览器访问
					uni.navigateBack();
					// #ifdef APP-PLUS
					plus.runtime.openURL(url);
					// #endif
					// #ifndef APP-PLUS
					window.open(url);
					// #endif
				}
			}
		},
	}
</script>