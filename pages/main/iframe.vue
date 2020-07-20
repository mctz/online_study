
<template>
	<iframe :src="webUrl" width='100%' height='100%' frameborder='1'></iframe>
</template>

<script>
	export default {
		data() {
			return {
				imgUrl:this.$store.imgUrl,
				webUrl:"",
			}
		},
		onLoad(option) {
			var fileUrl = option.webUrl;
			if(!fileUrl.startsWith("http")){
				fileUrl = this.imgUrl + fileUrl;
			}
			this.webUrl = fileUrl;
			//this.webUrl = "https://view.officeapps.live.com/op/view.aspx?src=" + encodeURIComponent(fileUrl);
			//this.webUrl = "https://docs.google.com/viewer?url=" + encodeURIComponent(fileUrl);
			if(this.debugLevel>1){
				console.log(this.webUrl);
			}
		}
	}
</script>