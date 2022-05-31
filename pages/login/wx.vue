<template>
	<view class="content" style="text-align: center;width: 90%;">
		<uni-segmented-control style="width: 100%;" :current="current" :values="items" @clickItem="onClickItem"
			style-type="button" active-color="#567ca3"></uni-segmented-control>
    <view v-if="current === 0" v-for="(item,index) in overview" :key="item"
          style="text-align: left;background-color: #FFFFFF;">
      <uni-collapse :accordion="true" >
        <uni-collapse-item v-if="index==0" title="学校简介" :show-animation="true">
          <view class="input-row">
            <view v-if="schoolCode=='10571'" bgcolor="#FAFAFA" style="font-size: medium;">
              <div align="center" style="padding-top: 15px;font-size: x-large;padding-bottom: 15px;font-weight: bold;">广东医科大学简介</div>
              <p>广东医科大学是广东省属具有博士学位授予权的重点建设大学，前身是中山医学院湛江分院，自1958年创建以来，学校恪守“立志立德、求真求精”的校训，秉承“艰苦奋斗、自强不息”的广东医精神，弘扬“严谨朴实仁爱奉献”的校风，坚持“特色强校、人才立校、科技兴校、文化铸校”的治校方略，致力于建设特色鲜明、同类先进、国内外知名的高水平医科大学。学校2005年被评为教育部本科教学工作水平评估优秀院校， 2007年在广东省教育厅的成人高等教育办学水平评估中获得优秀。2013年获批为博士学位授予单位。2015年5月，临床医学学科排名进入ESI全球排名前1%，2016年1月学校进入ESI全球排名前1%，2016年12月学校进入省市共建本科高校行列（全省11所高校）。</p>
              <p>学校总面积近1900亩，由湛江校区、东莞校区两部分组成，现有全日制在校生近2万人，教职工1900多人，其中专任教师1375人，博士生导师49人，硕士生导师720人，双聘院士3人，广东省青年珠江学者1人，广东省自然科学杰出青年基金获得者1人。学校有国务院政府特殊津贴专家14人，全国模范教师、全国优秀教师、全国高校优秀辅导员等6人，广东省教学名师4人，“千百十人才培养工程”省级培养对象8人，省“特支计划”人才3人，“扬帆计划”33人，南粤杰出教师、南粤教坛新秀、南粤教书育人优秀教师、南粤优秀教师和南粤优秀教育工作者60人，广东省优秀中医临床人才和名中医5人，广东省优秀青年教师培养对象17人。</p>
              <p>经过60年的艰苦奋斗，学校形成了较为合理的学科专业结构，现有博士学位授权一级学科1个，硕士学位授权一级学科6个，硕士专业学位授权点3个。有省级重点学科7个（省级攀峰重点学科1个、省级优势重点学科2个、省级特色重点学科4个），珠江学者岗位计划设岗学科4个。设有普通本科专业26个，覆盖医学、理学、管理学、法学、工学、文学、经济学等7个学科门类，面向全国26省和港澳台地区招生。学校有全国高校特色专业建设点4个，广东省高校特色专业建设点5个，广东省高校名牌专业2个，广东省高校重点专业1个。有国家级住院医师规范化培训专业基地（25个临床专科）和药物临床试验机构（9个临床专科），省级临床重点专科14个。学校还拥有现代化的图书馆，纸质图书总量177万册，电子图书140万册，电子期刊4万余册，音视频9110小时，订有及可使用的中外文数据库33个。《广东医科大学学报》是中国核心期刊（遴选）数据库收录期刊、中国学术期刊综合评价数据库（CAJCED）统计源期刊、中国期刊全文数据库（CJFD）全文收录期刊、广东省优秀科技期刊。</p>
              <p>广东医科大学成人高等教育从1984年开始招生，在三十多年的办学历程中，一直坚持“大校园”的办学理念，与教学点一道竭诚为学生服务；一直按照“五个统一”的原则（统一教学计划、统一教学大纲、统一教材版本、统一考试标准、统一学籍管理）进行教学和管理，保障教学质量，实行规范化管理。为较好地解决学生的工学矛盾，设有教师面授、网上学习和网上答疑等学习形式进行灵活教学和学习。</p>
              <p>成人高等教育教学单位除湛江校区东莞校区和附属第三医院外，还设有经教育厅批准备案的湛江卫生学校、珠海市卫生学校、茂名卫生学校、肇庆医学高等专科学校、江门中医药学校、东源卫生职业技术学校、惠州卫生职业技术学院、新兴中药学校、湛江中医学校、顺德职业技术学院、东莞市岭南培训中心、深圳市医学继续教育培训中心、广东黄埔卫生职业技术学校、深圳市宝康卫生培训中心、增城市蓝十字卫生教育培训中心、廉江市卫生职业技术学校、怀集县卫生学校、清远职业技术学院、乐昌市卫生进修学校、梅州市卫生职业技术学校等20个校外教学点，完全能满足学生就近入学的需要。</p>
              <p>目前，学校成人高等教育有专科和专升本两个层次，设临床医学、护理学、药学、医学检验、医学影像、口腔医学等多个专业，在校生达2万多人；学制灵活，实施学年学分制管理，本、专科学习期限均为3～5年，学生可根据自己的实际情况，在规定的年限内作好学习计划，以保证顺利地完成学业。学校严格执行由广东省物价部门规定的成人高等教育缴费标准，是全省收费较低的医学院校。</p>
              <p>办学60年以来，学校始终坚持立德树人，秉承“面向基层、服务基层”的办学宗旨，形成了“仁爱教育厚德，校院协同精医，面向基层培养高素质医学专门人才”的特色，得到了张德江、胡春华等领导的高度评价，《光明日报》、《人民日报》和《中国教育报》等媒体的充分肯定，称赞学校是“基层医生的‘摇篮’”，为国家和地方累计培养输送了18万余名医学人才，为国家和广东的医疗卫生事业及经济社会发展提供人才保证、智力支持和科技支撑。</p>
              <br>
            </view>
          </view>
        </uni-collapse-item>
      </uni-collapse>
      <navigator :url="'../main/webView?webUrl='+item.url">
        <view class="input-row border" style="padding-top: 5px;padding-bottom: 5px;">
          <image :src="iconUrl+'button/ic-right.png'" style="width: 6%;margin-top: 7px;" mode="widthFix">
          </image>
          <text style="font-size: medium;padding-left: 5px;">{{item.title}}</text>
        </view>
      </navigator>
    </view>
		<view v-if="current === 1" v-for="(item,index) in teaching" :key="item"
			style="text-align: left;background-color: #FFFFFF;">
			<navigator :url="'../main/webView?webUrl='+item.url">
				<view class="input-row border" style="padding-top: 5px;padding-bottom: 5px;">
					<image :src="iconUrl+'button/ic-right.png'" style="width: 6%;margin-top: 7px;" mode="widthFix">
					</image>
					<text style="font-size: medium;padding-left: 5px;">{{item.title}}</text>
				</view>
			</navigator>
		</view>
		<view v-if="current === 2" v-for="(item,index) in titleList" :key="item"
			style="text-align: left;background-color: #FFFFFF;">
			<navigator v-if="!(index===3 && (item.url==='' || item.url===null))"
				:url="'../main/webView?webUrl='+item.url">
				<view class="input-row border" style="padding-top: 5px;padding-bottom: 5px;">
					<image :src="iconUrl+'button/ic-right.png'" style="width: 6%;margin-top: 7px;" mode="widthFix">
					</image>
					<text style="font-size: medium;padding-left: 5px;">{{item.title}}</text>
				</view>
			</navigator>
			<view v-else>
				<uni-collapse :accordion="true">
					<uni-collapse-item title="缴费信息(请使用微信扫码)" :show-animation="true" open="true"
						style="text-align: left;letter-spacing: 2px;">
						<image :src="iconUrl+'barcode/pay_'+schoolCode+'.jpg'" style="width: 60%;margin-left: 20px;"
							mode="widthFix" @tap="previewImg(iconUrl+'barcode/pay_'+schoolCode+'.jpg')"></image>
					</uni-collapse-item>
				</uni-collapse>
			</view>
		</view>
	</view>
</template>

<script>
	import titleButton from '../../components/title-button.vue'
	export default {
		components: {
			titleButton
		},
		data() {
			return {
				schoolName: this.$store.schoolName,
				schoolCode: this.$store.schoolCode,
				imgUrl: this.$store.imgUrl,
				iconUrl: this.iconUrl,
				current: 0,
				items: ['校院概况', '教学教务', '更多'],
				overview: [{
						url: this.$store.imgUrl + '/edu3/system/reportInform.html',
						title: '报到流程'
					},
					{
						url: this.$store.imgUrl + '/edu3/system/org/distribution.html',
						title: '教学点分布'
					},
					{
						url: this.$store.imgUrl + '/edu3/system/org/reportingGuidelines.html',
						title: '报到须知'
					}, {
						url: this.$store.imgUrl + '/cx.html',
						title: '分点查询'
					},
				],
				teaching: [{
					url: this.$store.imgUrl + '/edu3/busi/majorSet.html',
					title: '专业设置'
				}, {
					url: this.$store.imgUrl + '/edu3/busi/teachMaterialList.html',
					title: '课程与教材'
				}, ],
				information: [],
				titleList: [{
						url: 'http://www.acad.com.cn',
						title: '关于学苑公司'
					},
					{
						url: '',
						title: '门户网站'
					},
					{
						url: '',
						title: '招生信息'
					},
					{
						url: '',
						title: '缴费信息'
					},
				]
			}
		},
		onPullDownRefresh() {
			this.update();
			uni.stopPullDownRefresh();
		},
		onReady() {
			if (!uni.getStorageSync('config_portal.url')) {
				this.update();
			}
			uni.setNavigationBarTitle({
				title: this.$store.schoolName
			})
		},
		methods: {
			onClickItem(e) {
				if (this.current !== e.currentIndex) {
					this.current = e.currentIndex;
				}
			},
			async update() {
				uni.showLoading({});
				await this.loadJs.reloadConfig("portal.url");
				await this.loadJs.reloadConfig("enrollment.url");
				await this.loadJs.reloadConfig("payment.payonline.url");
				this.titleList[1].url = uni.getStorageSync('config_portal.url');
				this.titleList[2].url = this.nvls(uni.getStorageSync(
					'config_enrollment.url'), uni.getStorageSync(
					'config_portal.url'));
				this.titleList[3].url = this.nvls(uni.getStorageSync(
					'config_payment.payonline.url'));
				uni.hideLoading();
			},
			previewImg(logourl) {
				let _this = this;
				let imgsArray = [];
				imgsArray[0] = logourl
				uni.previewImage({
					current: 0,
					urls: imgsArray
				});
			},
		}
	}
</script>
<style>
</style>
