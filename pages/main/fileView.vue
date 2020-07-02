
<template>
	<me-preview-word :docUrl="webUrl"></me-preview-word>
</template>

<script>
	import mePreviewWord from '@/components/me-preview-word/me-preview-word'
	export default {
		components: {
		    mePreviewWord
		},
		data() {
			return {
				webUrl:"https://wwe.lanzous.com/ia3gula"
			}
		},
		onLoad(option) {
			this.webUrl = option.webUrl;
		},
	}
</script>