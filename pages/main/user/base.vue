<template>
	
	<view class="content" style="margin-bottom: 50px;">
		<view class="input-row border" style="background-color: #567ca3;height: 380rpx; text-align: center;">
			<view style="width: 20%;font-size: small;">
				<br>1录取照片;<br><br>2学籍照片;
			</view>
			<view style="width: 40%;text-align: center;margin-top: 10rpx;">
				<image :src="recruitPhotoPath" style="width: 80%;height: 80%;border-radius: 20%;" mode="widthFix"></image>
			</view>
			<view style="width: 40%;text-align: center;margin-top: 10rpx;">
				<image :src="photoPath" style="width: 80%;height: 80%;border-radius: 20%;" mode="widthFix"></image>
			</view>
		</view>
		<view style="background-color: #FFFFFF;">
			<navigator url="./enroll" open-type="navigate">
				<icon-button :src1="iconUrl+'user/enroll.png'" name="查看录取通知书"></icon-button>
			</navigator>
		</view>
		<uni-collapse accordion="true">
			<uni-collapse-item title="证件照" style="font-weight: bold;text-align: center;">
				<view class="input-row">
					<view style="text-align: center;margin-top: 10rpx;">
						<image :src="certPhotoPath" style="height: 100%;border-radius: 10%;" mode="widthFix"></image>
						<wm-watermark :text="'pressText' | getDictValue('sys_file_certcard_presstext')" opacity="1"></wm-watermark>
					</view>
				</view>
			</uni-collapse-item>
		</uni-collapse>
		<uni-collapse accordion="true">
			<uni-collapse-item showAnimation="true" open="true" title="基本信息" style="font-weight: bold;text-align: center;">
				<line-text id="name" ltext="姓名" :rtext="baseInfo.name" ></line-text>
				<line-text ltext="性别" :rtext="baseInfo.gender | getDictName(this.CODE_SEX)"></line-text>
				<line-text ltext="证件类型" :rtext="baseInfo.certType | getDictName(this.CODE_CERTTYPE)"></line-text>
				<line-text ltext="证件号码" :rtext="baseInfo.certNum"></line-text>
				<line-text ltext="联系地址" :rtext="baseInfo.contactAddress + baseInfo.contactAddress"></line-text>
				<line-text ltext="联系邮编" :rtext="baseInfo.contactZipcode"></line-text>
				<line-text ltext="联系方式" :rtext="baseInfo.contactPhone+'  /  '+baseInfo.mobile"></line-text>
				<line-text ltext="邮箱地址" :rtext="baseInfo.email"></line-text>
				<line-text ltext="个人主页" :rtext="baseInfo.homePage"></line-text>
				<line-text ltext="身高" :rtext="baseInfo.height"></line-text>
				<line-text ltext="血型" :rtext="baseInfo.bloodType"></line-text>
				<line-text ltext="出生日期" :rtext="baseInfo.bornDay | formatDate"></line-text>
				<line-text ltext="出生地" :rtext="baseInfo.bornAddress"></line-text>
				<line-text ltext="国籍" :rtext="baseInfo.country | getDictName(this.CODE_COUNTRY)"></line-text>
				<line-text ltext="籍贯" :rtext="baseInfo.homePlace"></line-text>
				<line-text ltext="民族" :rtext="baseInfo.nation | getDictName(this.CODE_NATION)"></line-text>
				<line-text ltext="身体健康状态" :rtext="baseInfo.health"></line-text>
				<line-text ltext="婚姻状况" :rtext="baseInfo.marriage | getDictName(this.CODE_MARRIAGE)"></line-text>
				<line-text ltext="政治面貌" :rtext="baseInfo.politics | getDictName(this.CODE_POLITICS)"></line-text>
				<line-text ltext="宗教信仰" :rtext="baseInfo.faith"></line-text>
				<line-text ltext="户口性质" :rtext="baseInfo.residenceKind | getDictName(this.CODE_RESIDENCEKIND)"></line-text>
				<line-text ltext="户口所在地" :rtext="baseInfo.residence"></line-text>
				<line-text ltext="现住址" :rtext="baseInfo.currenAddress"></line-text>
				<line-text ltext="家庭住址" :rtext="baseInfo.homeAddress"></line-text>
				<line-text ltext="家庭住址邮编" :rtext="baseInfo.homezipCode"></line-text>
				<line-text ltext="家庭电话" :rtext="baseInfo.homePhone"></line-text>
				<line-text ltext="公司名称" :rtext="baseInfo.officeName"></line-text>
				<line-text ltext="公司电话" :rtext="baseInfo.officePhone"></line-text>
				<line-text ltext="职务职称" :rtext="baseInfo.title"></line-text>
				<line-text ltext="特长" :rtext="baseInfo.specialization"></line-text>
				<line-text ltext="备注" :rtext="baseInfo.memo"></line-text>
			</uni-collapse-item>
		</uni-collapse>
		<uni-popup ref="dialogInput" type="dialog">
			<uni-popup-dialog mode="input" value="" placeholder="请输入修改后内容" @confirm="confirm"></uni-popup-dialog>
		</uni-popup>
	</view>
</template> 


<script>
	import lineText from '@/components/line-text.vue'
	import iconButton from '@/components/icon-button.vue'
	import wmWatermark from '@/components/wm-watermark/wm-watermark.vue'
	export default {
		components:{
			lineText,iconButton,wmWatermark
		},
		data() {
			return {
				baseUrl:this.$store.baseUrl,
				iconUrl:this.iconUrl,
				photoPath:this.iconUrl+"user/headphoto.png",
				recruitPhotoPath:this.iconUrl+"user/headphoto.png",
				certPhotoPath:this.iconUrl+"user/certPhoto.png",
				certPhotoPathReverse:this.iconUrl+"user/certPhotoReverse.png",
				baseInfo:uni.getStorageSync("baseInfo")
			}
		},
		async onPullDownRefresh() {
			await this.loadJs.reloadBaseInfo(this.$store.baseInfoId);
			this.baseInfo = uni.getStorageSync("baseInfo");
			uni.stopPullDownRefresh();
		},
		async onReady() {
			if(!uni.getStorageSync("baseInfo")){
				await this.loadJs.reloadBaseInfo(this.$store.baseInfoId);
			}
			this.baseInfo = uni.getStorageSync("baseInfo");
			if(this.baseInfo.recruitPhotoPath!=null){
				this.recruitPhotoPath = this.$store.imgUrl+this.ATTACHS_STU+this.baseInfo.recruitPhotoPath;
			}
			if(this.baseInfo.photoPath!=null){
				this.photoPath = this.$store.imgUrl+this.ATTACHS_STU+this.baseInfo.photoPath;
			}
			if(this.baseInfo.certPhotoPath!=null){
				this.certPhotoPath = this.$store.imgUrl+this.ATTACHS_STU+this.baseInfo.certPhotoPath;
				//console.log(this.certPhotoPath);
			}
			if(this.baseInfo.certPhotoPathReverse!=null){
				this.certPhotoPathReverse = this.$store.imgUrl+this.ATTACHS_STU+this.baseInfo.certPhotoPathReverse;
			}
		},
		methods:{
			open(){
				this.$refs.dialogInput.open();
			},
			confirm(done,value){
				console.log(value)
				done()
			},
		}
	}
</script>

<style lang="scss">
</style>
