<template>
	<view class="w-100 flex flex-column justify-center align-center mt-5">
		<view v-if="result == '低风险'" class="flex align-center" style="width: 96%;">
			<view>
				<view class="flex align-center justify-center font-md font-weight-bold">
					<text>评估结果:</text>
					<text class="text-danger">{{result}}</text>
				</view>
				<view class="mt-2">
					<text>日常生活中要注意以下几点:</text>
					<view class="flex flex-column ml-1">
						<text>（1）饮食要定时定量、少食多餐。</text>
						<text>（2）以吃易消化富有营养的食物为主，并保证摄入足量的维生素类及蛋白质。</text>
						<text>（3）定期随访，可以每3年检查一下胃肠镜。</text>
					</view>
				</view>
			</view>
		</view>
		<view v-if="result == '中风险'" class="flex align-center" style="width: 96%;">
			<view>
				<view class="flex align-center justify-center font-md font-weight-bold">
					<text>评估结果:</text>
					<text class="text-danger">{{result}}</text>
				</view>
				<view class="mt-2">
					<text>日常生活中要注意以下几点:</text>
					<view class="flex flex-column">
						<text>（1）少摄入有刺激性的、过酸和过甜的食物，如辣椒、咖啡、酒、浓茶等。</text>
						<text>（2）戒烟、限酒。</text>
						<text>（3）不宜食用油煎、油炸、半熟食品及坚硬食物。</text>
						<text>（4）推荐您进行胃肠镜检查，如果检查没有异常 可每2年再检查胃肠镜，如果有病变，一定要根据医生建议进行治疗及随访。</text>
					</view>
				</view>
			</view>
		</view>
		<view v-if="result == '高风险'" class="flex align-center" style="width: 96%;">
			<view>
				<view class="flex align-center justify-center font-md font-weight-bold">
					<text>评估结果:</text>
					<text class="text-danger">{{result}}</text>
				</view>
				<view class="mt-2">
					<text>日常生活中要注意以下几点:</text>
					<view class="flex flex-column">
						<text>（1）首先要避免有害因素的侵袭：即戒烟、不饮烈酒、浓茶、咖啡等。</text>
						<text>（2）少吃辛辣及粗糙的食物，少服对胃肠有刺激性的药物。</text>
						<text>（3）饮食规律，避免不卫生、暴饮暴食、偏食等不良习惯。</text>
						<text>（4）强烈推荐您进行胃肠镜检查，如果检查没有异常 也建议每1年再检查胃肠镜，如果有病变，一定要根据医生建议进行治疗及随访。</text>
					</view>
				</view>
			</view>
		</view>
		<view style="width: 300rpx;padding: 40rpx 0rpx;">
			<u-button :custom-style="customStyle" type="success" @click="handleOperate">返回首页</u-button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				result: '',
				customStyle: {
					width: '300rpx',
					height: '70rpx'
				},
				content:`返回首页请点“退回”,关闭程序请点“关闭”`
			}
		},
		onLoad(e) {
			this.result = e.detail;
			this.handleSubmitResult();
		},
		methods: {
			handleSubmitResult() {
				let _arr = uni.getStorageSync('result');
				console.log(_arr);
				this.$u.post('SaveDigestive', {
					data: _arr
				}).then(res => {
					console.log(res);
					uni.showToast({
						title: res.info,
						icon: 'none'
					})
					console.log(res.info);
				}).catch(err => {
					console.log(err);
					uni.showToast({
						title: err.info,
						icon: 'none'
					})
				})
			},
			handleOperate(){
				uni.showModal({
					title:'温馨提示',
					content:'您是否要返回首页？',
					success: (res) => {
						if(res.confirm){
							this.$u.route('/pages/index/index');
						}
					}
				})
			}
		}
	}
</script>
<style lang="scss" scoped>

</style>
