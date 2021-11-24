<template>
	<view class="wrap">
		<view v-if="result == '低风险' || list.length == 0" class="content">
			<view>
				<view class="head-title">
					<text class="head-txt1">评估结果:</text>
					<text class="head-txt2">{{result}}</text>
				</view>
				<view v-if="list.length == 0" class="notice">
					<view>
						因您存在风险, 依此判断您属于
						<text class="txt">{{result}}</text>
						人群
					</view>
				</view>
				<view v-else class="notice">
					<view>
						因您存在
						<text class="txt">{{list.join('、')}}</text>
						风险, 依此判断您属于
						<text class="txt">{{result}}</text>
						人群
					</view>
				</view>
				<view class="attention">
					<text>日常生活中要注意以下几点:</text>
					<view class="attention-content">
						<text> (1)饮食要清淡,多食新鲜水果蔬菜;</text>
						<text> (2)适度增加体力活动;</text>
						<text> (3)克服不良的嗜好,如吸烟、饮酒、久坐等;</text>
						<text> (4)防止过度劳累、用力过猛;</text>
						<text> (5)老年人应防止过快改变体位、预防便秘;</text>
						<text> (6)注意气候变化;</text>
						<text> (7)每天饮水要充足;</text>
						<text> (8)作息时间规律,看手机、电视、上网等时间不要太久;</text>
						<text> (9)保持情绪平稳;</text>
						<text> (10)定期进行健康体检,发现问题早防早治。</text>
						<text>如果您是“中风"高危人群,请立即向医生咨询脑卒中的预防,并进行双侧颈动脉超声检查等。</text>
					</view>
				</view>
			</view>
		</view>
		<view v-if="result == '中风险'" class="content">
			<view>
				<view class="head-title">
					<text class="head-txt1">评估结果:</text>
					<text class="head-txt2">{{result}}</text>
				</view>
				<view class="notice">
					<view>
						因您存在
						<text class="txt">{{list.join('、')}}</text>
						风险, 依此判断您属于
						<text class="txt">{{result}}</text>
						人群
					</view>
				</view>
				<view class="attention">
					<text>日常生活中要注意以下几点:</text>
					<view class="attention-content">
						<text> (1)饮食要清淡,多食新鲜水果蔬菜;</text>
						<text> (2)适度增加体力活动;</text>
						<text> (3)克服不良的嗜好,如吸烟、饮酒、久坐等;</text>
						<text> (4)防止过度劳累、用力过猛;</text>
						<text> (5)老年人应防止过快改变体位、预防便秘;</text>
						<text> (6)注意气候变化;</text>
						<text> (7)每天饮水要充足;</text>
						<text> (8)作息时间规律,看手机、电视、上网等时间不要太久;</text>
						<text> (9)保持情绪平稳;</text>
						<text> (10)定期进行健康体检,发现问题早防早治。</text>
						<text>如果您是“中风"高危人群,请立即向医生咨询脑卒中的预防,并进行双侧颈动脉超声检查等。</text>
					</view>
				</view>
			</view>
		</view>
		<view v-if="result == '高风险'" class="content">
			<view>
				<view class="head-title">
					<text class="head-txt1">评估结果:</text>
					<text class="head-txt2">{{result}}</text>
				</view>
				<view class="notice">
					<view>
						因您存在
						<text class="txt">{{list.join('、')}}</text>
						风险, 依此判断您属于
						<text class="txt">{{result}}</text>
						人群
					</view>
				</view>
				<view class="attention">
					<text>日常生活中要注意以下几点:</text>
					<view class="attention-content">
						<text> (1)饮食要清淡,多食新鲜水果蔬菜;</text>
						<text> (2)适度增加体力活动;</text>
						<text> (3)克服不良的嗜好,如吸烟、饮酒、久坐等;</text>
						<text> (4)防止过度劳累、用力过猛;</text>
						<text> (5)老年人应防止过快改变体位、预防便秘;</text>
						<text> (6)注意气候变化;</text>
						<text> (7)每天饮水要充足;</text>
						<text> (8)作息时间规律,看手机、电视、上网等时间不要太久;</text>
						<text> (9)保持情绪平稳;</text>
						<text> (10)定期进行健康体检,发现问题早防早治。</text>
						<text>如果您是“中风"高危人群,请立即向医生咨询脑卒中的预防,并进行双侧颈动脉超声检查等。</text>
					</view>
				</view>
			</view>
		</view>
		<view class="bottom">
			<text class="txt1">桓台县妇幼保健院</text>
			<text class="txt2">电话:8217999</text>
		</view>
		<view class="button-box">
			<u-button :custom-style="customStyle" type="success" @click="handleTapLung">下一步</u-button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [],
				result: '',
				customStyle: {
					width: '300rpx',
					height: '70rpx'
				},
				form: {
					name: '',
					sex: '',
					age: "",
					card: '',
					phone: '',
					address: "",
					assessment_results: '',
					risk_factors: '',
					height: '',
					weight: '',
					weightNum: '',
					birthDate: ''
				}
			}
		},
		onLoad(e) {
			if (e.detail) {
				let arr = JSON.parse(e.detail)
				this.list = arr;
				this.handleResult();
				this.handleSubMit();
			}
		},
		methods: {
			// 脑卒中
			handleResult() {
				let result1 = ["血脂情况", "吸烟", "体重", "运动", "卒中家族史"];
				let result2 = ["高血压", "糖尿病", "房颤或瓣膜性心脏病"];
				let result3 = ['既往有脑卒中（中风）病史', '既往有短暂脑缺血发作病史'];
				if (this.list.find(item => result1.includes(item)) || this.list.length == 0) {
					this.result = '低风险'
				}
				if (this.list.find(item => result2.includes(item))) {
					this.result = '中风险'
				}
				if (this.list.find(item => result3.includes(item)) || this.list.length >= 3) {
					this.result = '高风险'
				}
			},
			handleSubMit() {
				let obj = uni.getStorageSync('form_data');
				this.form.name = obj.name;
				this.form.sex = obj.sex;
				this.form.age = obj.age;
				this.form.card = obj.card;
				this.form.phone = obj.phone;
				this.form.address = obj.address;
				this.form.assessment_results = this.result;
				this.form.risk_factors = this.list.join(',');
				this.form.height = obj.height;
				this.form.weight = obj.weight;
				this.form.weightNum = obj.weightNum;
				this.form.birthDate = obj.birthDate;
				let _arr = [];
				_arr.push(this.form);
				console.log(_arr);
				this.$u.post('SaveCerebralSurveryInfo', {
					data: _arr
				}).then(res => {
					console.log(res);
					uni.showToast({
						title: res.info,
						icon: 'none'
					})
				}).catch(err => {
					console.log(err);
					uni.showToast({
						title: err.info,
						icon: 'none'
					})
				})
			},
			handleTapLung() {
				this.$u.route("/pages/lung/lung");
			}
		},
	}
</script>

<style lang="scss" scoped>
	.wrap {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		margin-top: 50rpx;

		.content {
			width: 96%;
			display: flex;
			align-items: center;

			.head-title {
				display: flex;
				align-items: center;
				justify-content: center;
				font: 700 32rpx/32rpx '微软雅黑';

				.head-txt2 {
					color: #f00;
				}
			}

			.notice {
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 28rpx;
				font-weight: 550;
				margin-top: 40rpx;
				flex-wrap: wrap;

				.notice-content {
					margin-left: 10rpx;
				}

				.txt {
					color: #f00;
				}
			}

			.attention {
				margin-top: 20rpx;

				.attention-content {
					display: flex;
					flex-direction: column;
					margin-left: 10rpx;
				}
			}
		}

		.bottom {
			display: flex;
			flex-direction: column;
			margin: 60rpx 0rpx 0rpx 10rpx;
			font: 700 28rpx/28rpx '微软雅黑';
			line-height: 40rpx;
			width: 96%;
		}

		.button-box {
			width: 100%;
			padding: 100rpx 0rpx;
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}
</style>
