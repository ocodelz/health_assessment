<template>
	<view class="w-100 flex flex-column align-center justify-center mt-5">
		<view v-if="lungResult == '高风险'" class="flex align-center" style="width: 96%;">
			<view>
				<view class="flex align-center justify-center font-weight-bold font-md">
					<text>评估结果:</text>
					<text class="text-danger">{{lungResult}}</text>
				</view>
				<view class="flex align-center justify-center font font-weight-bold mt-4 flex-wrap">
					<view class="ml-1">
						依据判断您属于
						<text class="text-danger">高风险人群</text>
						，建议您
						<text class="text-danger">立即</text>
						前往放射科肺结节门诊进行咨询，并进行低剂量肺部CT检查，根据检查结果制定下一步的随访或治疗方案。
					</view>
				</view>
				<view class="mt-2 ml-1">
					<text>日常生活中要注意以下几点:</text>
					<view class="flex flex-column">
						<text> (1)饮食要清淡,多食新鲜水果蔬菜</text>
						<text> (2)适度增加体力活动</text>
						<text> (3)克服不良的嗜好,如吸烟、饮酒等</text>
						<text> (4)远离二手烟</text>
						<text> (5)老年人应防止发生呼吸道感染</text>
						<text> (6)注意气候变化</text>
						<text> (7)每天饮水要充足</text>
						<text> (8)作息时间规律</text>
						<text> (9)保持情绪平稳</text>
						<text> (10)定期进行健康体检,发现问题早防早治</text>
					</view>
				</view>
			</view>
		</view>
		<view v-if="lungResult == '中风险'" class="content">
			<view>
				<view class="flex align-center justify-center font-weight-bold font-md">
					<text>评估结果:</text>
					<text class="text-danger">{{lungResult}}</text>
				</view>
				<view class="flex align-center justify-center font mt-4 flex-wrap font-weight-bold">
					<view class="ml-1">
						依据判断您属于
						<text class="text-danger">中风险人群</text>
						，建议您
						<text class="text-danger">每年</text>
						进行低剂量肺部CT筛查，如有不适随时就诊。
					</view>
				</view>
				<view class="mt-2 ml-1">
					<text>日常生活中要注意以下几点:</text>
					<view class="flex flex-column">
						<text> (1)饮食要清淡,多食新鲜水果蔬菜</text>
						<text> (2)适度增加体力活动</text>
						<text> (3)克服不良的嗜好,如吸烟、饮酒等</text>
						<text> (4)远离二手烟</text>
						<text> (5)老年人应防止发生呼吸道感染</text>
						<text> (6)注意气候变化</text>
						<text> (7)每天饮水要充足</text>
						<text> (8)作息时间规律</text>
						<text> (9)保持情绪平稳</text>
						<text> (10)定期进行健康体检,发现问题早防早治</text>
					</view>
				</view>
			</view>
		</view>
		<view v-if="lungResult == '低风险' || list.length == 0" class="content">
			<view>
				<view class="flex align-center justify-center font-weight-bold font-md">
					<text>评估结果:</text>
					<text class="text-danger">{{lungResult}}</text>
				</view>
				<view class="flex align-center justify-center font-weight-bold font mt-4 flex-wrap" style="font-weight: 550;">
					<view class="ml-1">
						依据判断您属于
						<text class="text-danger">低风险人群</text>
						，建议您保持良好的生活习惯，
						<text class="text-danger">2-3年</text>
						进行低剂量肺部CT健康体检。
					</view>
				</view>
				<view class="mt-2 ml-1">
					<text>日常生活中要注意以下几点:</text>
					<view class="flex flex-column">
						<text> (1)饮食要清淡,多食新鲜水果蔬菜</text>
						<text> (2)适度增加体力活动</text>
						<text> (3)克服不良的嗜好,如吸烟、饮酒等</text>
						<text> (4)远离二手烟</text>
						<text> (5)老年人应防止发生呼吸道感染</text>
						<text> (6)注意气候变化</text>
						<text> (7)每天饮水要充足</text>
						<text> (8)作息时间规律</text>
						<text> (9)保持情绪平稳</text>
						<text> (10)定期进行健康体检,发现问题早防早治</text>
					</view>
				</view>
			</view>
		</view>
		<view class="flex flex-column" style="margin: 60rpx 0rpx 0rpx 10rpx;font: 700 28rpx/28rpx '微软雅黑';line-height: 40rpx; width: 96%;">
			<text>就诊地址：桓台县妇幼保健院门诊一楼放射科</text>
			<text>联系人：张 珍13706438648 高明达18764357167</text>
			<text>办公室电话：0533-8526213/8526211</text>
		</view>
		<view class="w-100 flex align-center justify-center" style="padding: 100rpx 0rpx;">
			<u-button :custom-style="customStyle" type="success" @click="handleTapLung">下一步</u-button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [],
				lungResult: '',
				customStyle: {
					width: '300rpx',
					height: '70rpx'
				},
				formLung: {
					name: '',
					sex: '',
					age: '',
					card: '',
					phone: '',
					address: '',
					assessment_results: '',
					risk_factors: ''
				}
			}
		},
		onLoad(e) {
			if (e.detail) {
				let arr = JSON.parse(e.detail)
				this.list = arr;
				this.handleLungResult();
				this.handleSumLungResult();
			}
		},
		methods: {
			// 肺风险评估
			handleLungResult() {
				let obj = uni.getStorageSync('form_lung');
				let result1 = ['每天吸烟2包及以上,吸烟年数＞10年,但戒烟不足15年', '与长期吸烟者共同生活或同室工作被动吸烟超过20年', '患有慢性阻塞性肺疾病、弥漫性肺纤维化或既往肺结核病史',
					'有职业暴露史不少于一年，包括暴露于石棉、氢、铍、铬、镉、硅、煤烟和煤烟灰', '有一级亲属（父母、子女及兄弟姐妹）确诊肺癌'
				];
				let result2 = ['吸烟', '二手烟接触史（每周>3天）', '既往肺部结节或阴影病史', '曾被确诊患有除肺癌以外的其他恶性肿瘤', '工作环境有烟或尘接触'];
				let result3 = result1.concat(result2);
				if ((obj.age >= 40 && this.list.find(item => result1.includes(item))) || (obj.age >= 40 && this.list.find(item =>
						result3.includes(item)))) {
					this.lungResult = '高风险';
				}
				if ((obj.age < 40 && this.list.find(item => result1.includes(item))) || (obj.age < 40 && this.list.find(item =>
						result3.includes(item)))) {
					this.lungResult = '中风险';
				}
				if ((obj.age >= 40 && this.list.find(item => result2.includes(item))) && (obj.age >= 40 && !this.list.find(item =>
						result1.includes(item)))) {
					this.lungResult = '中风险';
				}
				if ((obj.age < 40 && this.list.find(item => result2.includes(item))) && (obj.age < 40 && !this.list.find(item =>
						result1.includes(item)))) {
					this.lungResult = '低风险';
				}
				if (this.list.length == 0) {
					this.lungResult = '低风险';
				}
			},
			handleSumLungResult() {
				let obj = uni.getStorageSync('form_lung');
				this.formLung.name = obj.name;
				this.formLung.sex = obj.sex;
				this.formLung.age = obj.age;
				this.formLung.card = obj.card;
				this.formLung.phone = obj.phone;
				this.formLung.address = obj.address;
				this.formLung.risk_factors = this.list.join(',');
				this.formLung.assessment_results = this.lungResult;
				let _arr = [];
				_arr.push(this.formLung);
				this.$u.post('SaveLungSurveryInfo', {
					data: _arr
				}).then(res => {
					console.log(res);
					uni.showToast({
						title:res.info,
						icon:'none'
					})
				}).catch(err => {
					console.log(err);
					uni.showToast({
						title:err.info,
						icon:'none'
					})
				})
			},
			handleTapLung() {
				this.$u.route("/pages/digestiveDiseases/digestiveDiseases");
			}
		},
	}
</script>

<style lang="scss" scoped>

</style>
