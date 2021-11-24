<template>
	<view>
		<view class="w-100 flex justify-center flex-column align-center">
			<view style="width: 94%;">
				<u-form :model="form" ref="uForm" label-width="140">
					<u-form-item label="姓名" required>
						<u-input v-model="form.name" placeholder="请输入姓名(必填)" />
					</u-form-item>
					<u-form-item label="性别" required>
						<u-input type="select" v-model="form.sex" placeholder="请选择性别(必填)" @click="show = true" />
						<u-action-sheet :list="actionSheetList" v-model="show" @click="actionSheetCallback"></u-action-sheet>
					</u-form-item>
					<u-form-item label="年龄" required>
						<u-input v-model="form.age" placeholder="请输入年龄(必填)" />
					</u-form-item>
					<u-form-item label="联系电话" required>
						<u-input v-model="form.phone" placeholder="请输入联系电话(必填)" />
					</u-form-item>
					<u-form-item label="身份证号" required>
						<u-input v-model="form.card" placeholder="请输入身份证号(必填)" @input="handleGetAge"/>
					</u-form-item>
					<u-form-item label="地址" required>
						<u-input disabled v-model="form.address" placeholder="请选择(必填)" @click="isShow = true" />
						<u-picker mode="region" title="请选择您所在的地区" v-model="isShow" @confirm="handleConfirm"></u-picker>
					</u-form-item>
				</u-form>
			</view>
			<!-- 风险评估 -->
			<view style="width: 94%;padding: 20rpx 0rpx;">
				<text class="text-hover-primary">风险评估</text>
				<text>(请根据自身真实情况进行勾选)</text>
			</view>
			<view style="width: 94%;">
				<u-cell-group>
					<u-cell-item v-for="(item,index) in checkboxList" :key="index" :arrow="false">
						<view class="flex justify-between">
							<view class="flex justify-between">
								<u-checkbox-group wrap style="text-align: left;">
									<u-checkbox @change="checkboxChange" v-model="item.checked" active-color="success" :name="item.name" :disabled="item.disabled">
										<view class="ml-3" style="width: 100%;">
											<text>{{item.name}}</text>
										</view>
									</u-checkbox>
								</u-checkbox-group>
							</view>
						</view>
					</u-cell-item>
				</u-cell-group>
			</view>
			<view style="width: 300rpx;padding: 40rpx 0rpx;">
				<u-button :custom-style="customStyle" type="success" @click="handleSubMit">提交</u-button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				form: {
					name: '',
					sex: '',
					age: 0,
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
						name: '每天吸烟2包及以上,吸烟年数＞10年,但戒烟不足15年',
						checked: false,
						disabled: false
					},
					{
						name: '与长期吸烟者共同生活或同室工作被动吸烟超过20年',
						checked: false,
						disabled: false
					},
					{
						name: '患有慢性阻塞性肺疾病、弥漫性肺纤维化或既往肺结核病史',
						checked: false,
						disabled: false
					},
					{
						name: '有职业暴露史不少于一年，包括暴露于石棉、氢、铍、铬、镉、硅、煤烟和煤烟灰',
						checked: false,
						disabled: false
					},
					{
						name: '有一级亲属（父母、子女及兄弟姐妹）确诊肺癌',
						checked: false,
						disabled: false
					},
					{
						name: '吸烟',
						checked: false,
						disabled: false
					},
					{
						name: '二手烟接触史（每周>3天）',
						checked: false,
						disabled: false
					},
					{
						name: '既往肺部结节或阴影病史',
						checked: false,
						disabled: false
					},
					{
						name: '曾被确诊患有除肺癌以外的其他恶性肿瘤',
						checked: false,
						disabled: false
					},
					{
						name: '工作环境有烟或尘接触',
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
			let obj = uni.getStorageSync('form_data');
			this.form.name = obj.name;
			this.form.sex = obj.sex;
			this.form.phone = obj.phone;
			this.form.card = obj.card;
			this.form.address = obj.address;
			this.handleGetAge();
		},
		methods: {
			handleGetAge() {
				let iden = this.form.card;
				let val = iden.length;
				let myDate = new Date();
				let month = myDate.getMonth() + 1;
				let day = myDate.getDate();
				if (val === 18) {
					this.form.age = myDate.getFullYear() - iden.substring(6, 10) - 1;

					if (iden.substring(10, 12) < month || iden.substring(10, 12) == month && iden.substring(12, 14) <= day) this.form.age++;

				}else{
					this.form.age = '';
				}
			},
			handleConfirm(e) {
				let province = e.province.label;
				let city = e.city.label;
				let area = e.area.label;
				this.form.address = province + '-' + city + '-' + area;
			},
			actionSheetCallback(index) {
				this.form.sex = this.actionSheetList[index].text;
			},
			checkboxChange(e) {
				for (let item of this.checkboxList) {
					if (item.name == e.name) {
						item.checked = e.value;
					}
				}
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
				if (this.$u.test.isEmpty(this.form.age)) {
					uni.showToast({
						title: '年龄不能为空',
						icon: 'none'
					})
					return;
				} else if (!this.$u.test.digits(this.form.age) || !this.$u.test.range(this.form.age, [1, 120])) {
					uni.showToast({
						title: '年龄错误,请输入1-120之间的整数',
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
				uni.setStorageSync('form_lung', this.form);
				uni.navigateTo({
					url: '../lungResult/lungResult?state=1&detail=' + JSON.stringify(typeArr)
				})
			}
		}
	};
</script>
<style lang="scss" scoped>

</style>
