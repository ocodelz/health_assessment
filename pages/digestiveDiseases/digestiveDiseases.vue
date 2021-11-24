<template>
	<view>
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
					<u-form-item label="年龄" required>
						<u-input v-model="form.age" placeholder="请输入年龄(必填)" />
					</u-form-item>
					<u-form-item label="身高" required>
						<u-input v-model="form.height" placeholder="请输入身高(必填)" />
						<text class="r-text" slot="right">cm</text>
					</u-form-item>
					<u-form-item label="体重" required>
						<u-input v-model="form.weight" placeholder="请输入体重(必填)" />
						<text class="r-text" slot="right">kg</text>
					</u-form-item>
					<u-form-item label="居住地" required>
						<u-input disabled v-model="form.address" placeholder="请选择(必填)" @click="isShow = true" />
						<u-picker mode="region" title="请选择您所在的地区" v-model="isShow" @confirm="handleConfirm"></u-picker>
					</u-form-item>
					<u-form-item label="联系电话" required>
						<u-input v-model="form.phone" placeholder="请输入联系电话(必填)" />
					</u-form-item>
				</u-form>
			</view>
			<!-- 风险评估 -->
			<view style="width: 94%;padding: 20rpx 0rpx;">
				<text class="text-hover-primary ">主要症状</text>
				<text>(请根据自身真实情况进行勾选)</text>
			</view>
			<view style="width: 94%;">
				<u-checkbox-group>
					<u-checkbox v-for="(item,index) in checkboxList" :key="index" @change="checkboxChange" v-model="item.checked"
					 active-color="success" :name="item.name" :disabled="item.disabled">
						<text>{{item.name}}</text>
					</u-checkbox>
				</u-checkbox-group>
				<view style="width: 94%;padding: 20rpx 0rpx;">
					<text class="text-hover-primary">流行病学调查</text>
					<text>(请根据自身真实情况进行勾选)</text>
				</view>
				<view v-for="(item,index) in list" :key="index">
					<text>{{item.name}}</text>
					<radio-group class="flex flex-wrap" @change="RadioChange($event, item)">
						<view class="flex" v-for="(value, index1) in item.answers" :key="index1">
							<view v-if="value.type=='radio'" class="flex">
								<label class="flex">
									<radio style="transform:scale(0.7)" :class="{ checked: item.checked == value.value }" :checked="item.checked == value.value"
									 :value="value.value"></radio>
									<text>{{ value.value }}</text>
								</label>
							</view>
							<view v-if="value.type=='input'" class="flex">
								<label class="flex">
									<radio style="transform:scale(0.7)" :class="{ checked: item.checked == value.value }" :checked="item.checked == value.value"
									 :value="value.value"></radio>
									<input style="border-bottom: 1rpx solid #07C160;width: 100rpx;" type="text" v-model="item.answer" />
									<text>{{ value.value }}</text>
								</label>
							</view>
						</view>
					</radio-group>
				</view>
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
					age: '',
					height: '',
					weight: '',
					address: '',
					phone: '',
					weightNum: '',
					card:''
				},
				value: '',
				current: 0,
				list: [{
						name: '(1)父母、兄弟姐妹等有食管癌/胃癌/肠癌',
						answers: [{
								type: 'radio',
								value: '是'
							},
							{
								type: 'radio',
								value: '否'
							}
						],
						answer: '',
						checked: '',
						required: true
					},
					{
						name: '(2)每天盐摄入量＞10g',
						answers: [{
								type: 'radio',
								value: '是'
							},
							{
								type: 'radio',
								value: '否'
							}
						],
						answer: '',
						checked: '',
						required: true
					},
					{
						name: '(3)煎炸、熏制、腌制食品摄入',
						answers: [{
								type: 'radio',
								value: '偶尔（每周少于3次）'
							},
							{
								type: 'radio',
								value: '经常（每周多于3次）'
							}
						],
						answer: '',
						checked: '',
						required: true
					},
					{
						name: '(4)浓茶、咖啡、热食、热饮摄入',
						answers: [{
								type: 'radio',
								value: '偶尔（每周少于3次）'
							},
							{
								type: 'radio',
								value: '经常（每周多于3次）'
							}
						],
						answer: '',
						checked: '',
						required: true
					},
					{
						name: '(5)进食速度',
						answers: [{
								type: 'radio',
								value: '每餐'
							},
							{
								type: 'radio',
								value: '＜10分钟'
							},
							{
								type: 'radio',
								value: '20-30分钟'
							},
							{
								type: 'radio',
								value: '＞30分钟'
							}
						],
						answer: '',
						checked: '',
						required: true
					},
					{
						name: '(6)摄入红肉（猪肉、牛肉、羊肉）',
						answers: [{
								type: 'radio',
								value: '偶尔（每周少于3次）'
							},
							{
								type: 'radio',
								value: '经常（每周多于3次）'
							}
						],
						answer: '',
						checked: '',
						required: true
					},
					{
						name: '(7)吸烟',
						answers: [{
								type: 'radio',
								value: '是'
							},
							{
								type: 'radio',
								value: '＜10支/天'
							},
							{
								type: 'radio',
								value: '10-20支/天'
							},
							{
								type: 'radio',
								value: '＞20支/天'
							},
							{
								type: 'input',
								value: '年'
							},
							{
								type: 'radio',
								value: '否'
							},
						],
						answer: '',
						checked: '',
						required: true
					},
					{
						name: '(8)饮酒',
						answers: [{
								type: 'radio',
								value: '是'
							},
							{
								type: 'radio',
								value: '低度＜20°'
							},
							{
								type: 'radio',
								value: '中度 20-40°'
							},
							{
								type: 'radio',
								value: '高度 ＞40°'
							},
							{
								type: 'radio',
								value: '＜80g/天'
							},
							{
								type: 'radio',
								value: '80-250g/天'
							},
							{
								type: 'radio',
								value: '250g/天'
							},
							{
								type: 'input',
								value: '年'
							},
							{
								type: 'radio',
								value: '否'
							},
						],
						answer: '',
						checked: '',
						required: true
					}
				],
				actionSheetList: [{
						text: '男'
					},
					{
						text: '女'
					}
				],
				checkboxList: [{
						name: '吞咽困难',
						checked: false,
						disabled: false
					},
					{
						name: '反酸',
						checked: false,
						disabled: false
					},
					{
						name: '嗳气',
						checked: false,
						disabled: false
					},
					{
						name: '烧心',
						checked: false,
						disabled: false
					},
					{
						name: '早饱感',
						checked: false,
						disabled: false
					},
					{
						name: '恶心',
						checked: false,
						disabled: false
					},
					{
						name: '胃灼热感',
						checked: false,
						disabled: false
					},
					{
						name: '腹痛',
						checked: false,
						disabled: false
					},
					{
						name: '腹胀',
						checked: false,
						disabled: false
					},
					{
						name: '血便、黑便',
						checked: false,
						disabled: false
					},
					{
						name: '消瘦',
						checked: false,
						disabled: false
					},
					{
						name: '纳差',
						checked: false,
						disabled: false
					},
					{
						name: '胸骨后不适',
						checked: false,
						disabled: false
					},
					{
						name: '腹部肿块',
						checked: false,
						disabled: false
					},
					{
						name: '腹泻',
						checked: false,
						disabled: false
					},
					{
						name: '便秘',
						checked: false,
						disabled: false
					},
					{
						name: '排便习惯改变',
						checked: false,
						disabled: false
					},
					{
						name: '无明显症状',
						checked: false,
						disabled: false
					},
					{
						name: '其他',
						checked: false,
						disabled: false
					}
				],
				show: false,
				isShow: false,
				customStyle: {
					width: '300rpx',
					height: '70rpx'
				}
			}
		},
		onLoad() {
			let obj = uni.getStorageSync('form_data');
			let _obj = uni.getStorageSync('form_lung');
			this.form.name = obj.name;
			this.form.sex = obj.sex;
			this.form.phone = obj.phone;
			this.form.height = obj.height;
			this.form.weight = obj.weight;
			this.form.address = _obj.address;
			this.form.age = _obj.age;
			this.form.card = _obj.card;
			console.log(this.form.card);
		},
		methods: {
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
				console.log(e);
				for (let item of this.checkboxList) {
					if (item.name == e.name) {
						item.checked = e.value;
					}
				}
			},
			RadioChange(e, item) {
				this.$set(item, 'checked', e.detail.value);
			},
			handleSubMit() {
				let typeArr = [],
					ageResult = 0,
					swResult = 0,
					symptom = 0,
					radioList = [],
					epidemiology = 0;
				for (let item of this.checkboxList) {
					if (item.checked == true) {
						typeArr.push(item.name)
					}
				}
				let str = '';
				for (let a of this.list) {
					if (a.required && (!a.checked && !a.answer)) {
						uni.showModal({
							title: '提示',
							content: a.name + '必须选择',
							showCancel: false
						})
						return;
					}
					if (a.checked && a.checked != '否') {
						for (let b of a.answers) {
							if (b.type == 'radio' && a.checked == b.value) {
								str += a.name + ':' + a.answer + a.checked + ',';
							}
						}
					}
					if (a.answer) {
						for (let b of a.answers) {
							if (b.type == 'input' && a.checked == b.value) {
								str += a.name + ':' + a.answer + a.checked + ',';
							}
						}
					}
				}
				let reg = /,$/gi;
				str = str.replace(reg, "");
				radioList = str.split(',')
				if (JSON.stringify(radioList) == '[""]') {
					radioList = []
				}
				if (this.form.weight !== '' && this.form.height !== '') {
					let num = this.form.height / 100;
					let result = this.form.weight / (num * num);
					this.form.weightNum = result.toFixed(2);
				} else {
					this.form.weightNum = ''
				}
				if (this.form.age < 40) {
					ageResult = 0
				} else if (this.form.age <= 49) {
					ageResult = 5
				} else if (this.form.age <= 59) {
					ageResult = 6
				} else if (this.form.age <= 69) {
					ageResult = 7
				} else {
					ageResult = 8
				}
				if (this.form.weightNum >= 20 && this.form.weightNum <= 25) {
					swResult = 0
				} else if (this.form.weightNum < 20) {
					swResult = 3
				} else if (this.form.weightNum > 25) {
					swResult = 3
				} else {
					swResult = 5
				}
				if (!typeArr.length) {
					symptom = 0
				} else if (typeArr.length >= 2 && typeArr.length < 3) {
					symptom = 5
				} else if (typeArr.length >= 3 && typeArr.length < 4) {
					symptom = 6
				} else if (typeArr.length >= 4 && typeArr.length < 5) {
					symptom = 7
				} else if (typeArr.length >= 5) {
					symptom = 8
				}
				if (!radioList.length) {
					epidemiology = 0
				} else if (radioList.length >= 2 && radioList.length < 3) {
					epidemiology = 5
				} else if (radioList.length >= 3 && radioList.length < 4) {
					epidemiology = 6
				} else if (radioList.length >= 4 && radioList.length < 5) {
					epidemiology = 7
				} else if (radioList.length >= 5) {
					epidemiology = 8
				}
				console.log(radioList);
				let score = ageResult + swResult + symptom + epidemiology;
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
				}else if (!this.$u.test.digits(this.form.age) || !this.$u.test.range(this.form.age, [1, 120])) {
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
				this.form.height = this.form.height.replace(/[^\d.]/g,"");
				this.form.height = this.form.height.replace(/^\./g,"");
				this.form.height = this.form.height.replace(/\.{2,}/g,".");
				this.form.height = this.form.height.replace(".","$#$").replace(/\./g,"").replace("$#$","."); 
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
				this.form.weight = this.form.weight.replace(/[^\d.]/g,"");
				this.form.weight = this.form.weight.replace(/^\./g,"");
				this.form.weight = this.form.weight.replace(/\.{2,}/g,".");
				this.form.weight = this.form.weight.replace(".","$#$").replace(/\./g,"").replace("$#$","."); 
				if (this.$u.test.isEmpty(this.form.weight)) {
					uni.showToast({
						title: '请输入正确的体重',
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
				let ret = '';
				if (score <= 11) {
					ret = '低风险'
				} else if (score <= 20) {
					ret = '中风险'
				} else {
					ret = '高风险'
				}
				let data = {
					name: this.form.name,
					sex: this.form.sex,
					age: this.form.age,
					height: this.form.height,
					weight: this.form.weight,
					address: this.form.address,
					phone: this.form.phone,
					symptom: typeArr.join(','),
					epidemiology: str,
					assessment_results: ret,
					card:this.form.card
				}
				let _arr = [];
				_arr.push(data)
				uni.setStorageSync('result', _arr);
				this.$u.route('/pages/xhResut/xhResut', {
					state: 1,
					detail: ret
				})
			}
		}
	};
</script>
<style lang="scss" scoped>

</style>
