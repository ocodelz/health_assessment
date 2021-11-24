<template>
	<view>
		<u-navbar title="卒中量表" :is-back="false" :border-bottom="false"></u-navbar>
		<view class="w-100 flex flex-column align-center justify-center">
			<view style="width: 94%;">
				<u-form :model="form" ref="uForm" label-width="140">
					<u-form-item label="姓名" required>
						<u-input v-model="form.name" placeholder="请输入姓名(必填)" />
					</u-form-item>
					<u-form-item label="性别" required>
						<u-input type="select" v-model="form.sex" placeholder="请选择性别(必填)" @click="show = true" />
						<u-action-sheet :list="actionSheetList" v-model="show" @click="actionSheetCallback"></u-action-sheet>
					</u-form-item>
					<u-form-item label="身高" required>
						<u-input v-model="form.height" placeholder="请输入身高(必填)" @input="handleOnKep" />
						<text class="r-text" slot="right">cm</text>
					</u-form-item>
					<u-form-item label="体重" required>
						<u-input v-model="form.weight" placeholder="请输入体重(必填)" @input="handleOnKep" />
						<text class="r-text" slot="right">kg</text>
					</u-form-item>
					<u-form-item label="体重指数" required>
						<text>{{form.weightNum}}</text>
					</u-form-item>
					<u-form-item label="出生日期" required>
						<u-input disabled v-model="form.birthDate" placeholder="请选择(必填)" @click="isShow = true" />
						<u-picker mode="time" title="请选择出生日期" v-model="isShow" @confirm="handleConfirm"></u-picker>
					</u-form-item>
					<u-form-item label="地址" required>
						<u-input disabled v-model="form.address" placeholder="请选择(必填)" @click="isAddress = true" />
						<u-picker mode="region" title="请选择您所在的地区" v-model="isAddress" @confirm="handleAddressConfirm"></u-picker>
					</u-form-item>
					<u-form-item label="联系电话" required>
						<u-input v-model="form.phone" placeholder="请输入电话(必填)" />
					</u-form-item>
					<u-form-item label="身份证号" required>
						<u-input v-model="form.card" placeholder="请输入身份证号(必填)" />
					</u-form-item>
				</u-form>
			</view>
			<!-- 风险评估 -->
			<view style="width: 94%;padding: 20rpx 0rpx;">
				<text class="text-hover-primary ">风险评估</text>
				<text>(红色部分为参考情况)</text>
			</view>
			<view style="width: 94%;">
				<u-cell-group>
					<u-cell-item v-for="(item,index) in checkboxList" :key="index" :arrow="false">
						<view class="flex justify-between">
							<view class="flex justify-between">
								<u-checkbox-group wrap>
									<u-checkbox @change="checkboxChange" v-model="item.checked" active-color="success" :name="item.name" :disabled="item.disabled">
										{{item.name}}
									</u-checkbox>
								</u-checkbox-group>
							</view>
							<view class="text-danger">
								<text v-show="index == 0">≥140/90mmHg</text>
								<text v-show="index == 1">血脂异常或不知道</text>
								<text v-show="index == 2">有</text>
								<text v-show="index == 3">有</text>
								<text v-show="index == 4">心跳不规律</text>
								<text v-show="index == 5">明显超重或肥胖</text>
								<text v-show="index == 6">缺乏运动</text>
								<text v-show="index == 7">有</text>
								<text v-show="index == 8">有</text>
								<text v-show="index == 9">有</text>
							</view>
						</view>
					</u-cell-item>
				</u-cell-group>
			</view>
			<view style="width: 300rpx;padding: 40rpx 0rpx;">
				<u-button :custom-style="customStyle" type="success" @click="handleSubMit">提交</u-button>
			</view>
		</view>
		<u-popup v-model="isPopupShow" mode="center" width="620" height="650" safe-area-inset-bottom border-radius="25"
		 :mask-close-able="false">
			<view class="flex align-center flex-column justify-center p-3">
				<text class="font-weight-normal font-md">温馨提示</text>
				<view class="mt-2 flex flex-column font-weight-normal">
					<text class="font-md">您即将使用本程序的功能,请仔细阅读以下内容。</text>
					<text class="mt-2 font-md">您在本页面的操作将被记录，我们将收集您所填的个人信息用于风险评估，与风险评估无关的信息将不会被收集。您的个人信息将被妥善保护，请知悉.</text>
					<view>
						<u-checkbox class="mt-3" v-model="checked" @change="radioGroupChange" shape="circle">
							<text class="font">我已阅读并同意上述内容和</text>
						</u-checkbox>
						<text class="text-danger font position-relative" style="right: 10rpx;top: 5rpx;" @click="handleInfo">《个人信息保护政策》</text>
					</view>
					<view class="flex align-center" style="justify-content: space-around;">
						<navigator style="width: 200rpx;height: 70rpx;background-color: #fa3534;" open-type="exit" target="miniProgram"
						 v-if="completeBtnSTtus" class="close-btn complete rounded-circle text-white flex align-center justify-center mt-3">拒绝</navigator>
						<view style="width: 200rpx;height: 70rpx; background-color: #fa3534;" class="mt-3 flex align-center justify-center text-white rounded-circle"
						 @click="handleTapSubMit">
							确定
						</view>
					</view>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				completeBtnSTtus: true,
				isPopupShow: false,
				radioVal: false,
				checked: false,
				isAddress: false,
				form: {
					name: '',
					sex: '',
					height: '',
					weight: '',
					weightNum: '',
					birthDate: '',
					phone: '',
					card: '',
					address: ''
				},
				actionSheetList: [{
						text: '男'
					},
					{
						text: '女'
					}
				],
				checkboxList: [{
						name: '高血压',
						checked: false,
						disabled: false
					},
					{
						name: '血脂情况',
						checked: false,
						disabled: false
					},
					{
						name: '糖尿病',
						checked: false,
						disabled: false
					},
					{
						name: '吸烟',
						checked: false,
						disabled: false
					},
					{
						name: '房颤或瓣膜性心脏病',
						checked: false,
						disabled: false
					},
					{
						name: '体重',
						checked: false,
						disabled: true
					},
					{
						name: '运动',
						checked: false,
						disabled: false
					},
					{
						name: '卒中家族史',
						checked: false,
						disabled: false
					},
					{
						name: '既往有脑卒中（中风）病史',
						checked: false,
						disabled: false
					},
					{
						name: '既往有短暂脑缺血发作病史',
						checked: false,
						disabled: false
					}
				],
				show: false,
				isShow: false,
				customStyle: {
					width: '300rpx',
					height: '70rpx'
				},
				typeArr: []
			}
		},
		onLoad() {
			this.isPopupShow = true;
		},
		methods: {
			actionSheetCallback(index) {
				this.form.sex = this.actionSheetList[index].text;
			},
			radioGroupChange(e) {
				this.radioVal = e.value;
			},
			handleOnKep() {
				if (this.form.weight !== '' && this.form.height !== '') {
					let num = this.form.height / 100;
					let result = this.form.weight / (num * num);
					this.form.weightNum = result.toFixed(2);
				} else {
					this.form.weightNum = ''
				}
				if (this.form.weightNum > 28) {
					this.checkboxList[5].checked = true
					this.checkboxList[5].disabled = true
				} else {
					this.checkboxList[5].disabled = true
					this.checkboxList[5].checked = false
				}
			},
			checkboxChange(e) {
				for (let item of this.checkboxList) {
					if (item.name == e.name) {
						item.checked = e.value;
					}
				}
			},
			handleConfirm(e) {
				this.form.birthDate = e.year + '-' + e.month + '-' + e.day
			},
			handleAddressConfirm(e) {
				let province = e.province.label;
				let city = e.city.label;
				let area = e.area.label;
				this.form.address = province + '-' + city + '-' + area;
			},
			handleSubMit() {
				let typeArr = [];
				for (let item of this.checkboxList) {
					if (item.checked == true) {
						typeArr.push(item.name)
					}
				}
				if (this.$u.test.isEmpty(this.form.name)) {
					uni.showToast({
						title: '姓名不能为空',
						icon: 'none'
					})
					return;
				} else if (!this.$u.test.letter(this.form.name) && !this.$u.test.chinese(this.form.name)) {
					uni.showToast({
						title: '只能输入纯中文或纯英文的姓名',
						icon: 'none'
					})
					return;
				}
				if (this.$u.test.isEmpty(this.form.sex)) {
					uni.showToast({
						title: '性别不能为空',
						icon: 'none'
					})
					return;
				}
				this.form.height = this.form.height.replace(/[^\d.]/g, "");
				this.form.height = this.form.height.replace(/^\./g, "");
				this.form.height = this.form.height.replace(/\.{2,}/g, ".");
				this.form.height = this.form.height.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
				if (this.$u.test.isEmpty(this.form.height)) {
					uni.showToast({
						title: '请正确输入身高',
						icon: 'none'
					})
					return;
				}

				if (this.form.height < 1) {
					uni.showToast({
						title: '请输入大于0的身高',
						icon: 'none'
					})
					return;
				}
				if (this.form.weight < 1) {
					uni.showToast({
						title: '请输入大于0的体重',
						icon: 'none'
					})
					return;
				}
				this.form.weight = this.form.weight.replace(/[^\d.]/g, "");
				this.form.weight = this.form.weight.replace(/^\./g, "");
				this.form.weight = this.form.weight.replace(/\.{2,}/g, ".");
				this.form.weight = this.form.weight.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
				if (this.$u.test.isEmpty(this.form.weight)) {
					uni.showToast({
						title: '请输入正确的体重',
						icon: 'none'
					})
					return;
				}
				if (this.$u.test.isEmpty(this.form.weightNum)) {
					uni.showToast({
						title: '体重指数不能为空',
						icon: 'none'
					})
					return;
				}
				if (this.$u.test.isEmpty(this.form.birthDate)) {
					uni.showToast({
						title: '出生日期不能为空',
						icon: 'none'
					})
					return;
				}
				if (this.$u.test.isEmpty(this.form.phone)) {
					uni.showToast({
						title: '手机号不能为空',
						icon: 'none'
					})
					return;
				}
				if (!this.$u.test.mobile(this.form.phone)) {
					uni.showToast({
						title: '非法手机号',
						icon: 'none'
					})
					return
				}
				if (!this.form.card) {
					uni.showToast({
						title: '身份证不能为空',
						icon: 'none'
					})
					return;
				}
				if (!this.$u.test.idCard(this.form.card)) {
					uni.showToast({
						title: '非法身份证',
						icon: 'none'
					})
					return;
				}
				if (!this.form.address) {
					uni.showToast({
						title: '地址不能为空',
						icon: 'none'
					})
					return;
				}
				uni.setStorageSync('form_data', this.form);
				uni.navigateTo({
					url: '../result/result?state=0&detail=' + JSON.stringify(typeArr)
				})
			},
			handleTapSubMit() {
				if (this.radioVal == false) {
					uni.showToast({
						title: '请先勾选“我已阅读并同意上述内容”',
						icon: 'none'
					})
				} else {
					this.isPopupShow = false;
				}
			},
			handleInfo() {
				this.$u.route('/pages/privacyPolicy/privacyPolicy');
			}
		}
	};
</script>
<style lang="scss" scoped>

</style>
