
<template>
	<web-view :src="webUrl"></web-view>
</template>

<script>
	export default {
		data() {
			return {
				isPdf:true,
				imgUrl:this.$store.imgUrl,
				webUrl:""
			}
		},
		onLoad(option) {
			var fileUrl = option.webUrl;
			if(!fileUrl.startsWith("http")){
				fileUrl = this.imgUrl + fileUrl;
			}
			if(fileUrl.endsWith("pdf") || fileUrl.endsWith("PDF")){
				//浏览本地的pdf文件
				//this.webUrl = '/hybrid/html/web/viewer.html?file='+option.webUrl
				//浏览在线的pdf文件
				this.webUrl = '/hybrid/html/web/viewer.html?file='+encodeURIComponent(fileUrl);
			}else{
				this.isPdf = false;
				//var docUrl = "http://view.xdocin.com/xdoc?_xdoc=";
				var docUrl = "https://view.officeapps.live.com/op/view.aspx?src=";
				this.webUrl = docUrl+fileUrl;
			}
		},
	}
</script>