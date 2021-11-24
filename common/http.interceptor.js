const install = (Vue, vm) => {
	 // http://jnthinksoft.cn:6060
	Vue.prototype.$u.http.setConfig({
		baseUrl: 'https://yanshan2019.picp.vip/api/disease/',
		loadingText: '努力加载中~',
		loadingTime: 500,
		header: {
			'content-type': 'application/json'
		}
	});
}

export default {
	install
}
