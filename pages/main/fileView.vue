
<template>
	<web-view :src="webUrl"></web-view>
</template>

<script>
	export default {
		data() {
			return {
				imgUrl:this.$store.imgUrl,
				webUrl:"",
				downloadUrl:""
			}
		},
		onLoad(option) {
			var fileUrl = option.webUrl;
			this.webUrl = this.imgUrl + "/exclude/edu3/viewPdf.html?mateUrl="+fileUrl;
			this.downloadUrl = this.imgUrl + "/exclude/edu3/framework/downloadFile.html?path="+fileUrl;
			if(fileUrl.startsWith("http")){
				this.downloadUrl = fileUrl;
			}else {
				fileUrl = this.imgUrl + fileUrl;
			}
			 ;
			// #ifndef H5
				var fileType = fileUrl.substring(fileUrl.lastIndexOf(".")+1).toLocaleLowerCase();
				uni.downloadFile({
				    url: this.downloadUrl,
					success: (data) => {
						if (data.statusCode === 200) {
							uni.navigateBack({});
							uni.openDocument({
								fileType:fileType,
								filePath:data.tempFilePath
							})
						}
					}
				});
				return;
			// #endif
			
			// #ifdef H5
				if(fileUrl.endsWith("pdf") || fileUrl.endsWith("PDF")){
					this.webUrl = '/hybrid/html/web/viewer.html?file='+encodeURIComponent(fileUrl);
					return;
				}
			// #endif
			
			if(this.debugLevel>1){
				console.log(this.webUrl);
			}
		},
		onNavigationBarButtonTap:function(){
			// #ifndef H5
			uni.setClipboardData({
				data: this.downloadUrl
			});
			var downloadTask = uni.downloadFile({
			    url: this.downloadUrl, //仅为示例，并非真实的资源
				success: (data) => {
					if (data.statusCode === 200) {
						uni.saveFile({
							tempFilePath: data.tempFilePath,
							success: function(res) {
								uni.showToast({
									icon: 'none',
									mask: true,
									title: '文件已保存',
									duration: 3000,
								});
							}
						});
					}
				}
			});
			// #endif
			// #ifdef H5
			//window.location.herf = this.downloadUrl;
			this.$http.downloadFile(this.downloadUrl);
			// #endif
			console.log(this.downloadUrl);
		},
	}
</script>