<template>
	<view>
		<navigator v-for="(item,inex) in titleList" :key="item" :url="'../pages/main/webView?webUrl='+item.url">
			<view class="input-row border" style="padding-top: 5px;padding-bottom: 5px;">
				<image src="../static/img/button/ic-right.png" style="width: 6%;margin-top: 7px;" mode="widthFix"></image>
				<text style="font-size: medium;padding-left: 5px;">{{item.title}}</text>
			</view>
		</navigator>
	</view>
	
</template>

<script>
	export default {
		props: {
			titleList: Array
		},
		methods:{
			
		}
	}
</script>
