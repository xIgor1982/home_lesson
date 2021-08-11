const API = 'https://raw.githubusercontent.com/xIgor1982/online-store-api/main/responses';
const pathImg = 'images/';

const app =new Vue({
	el: '#app',
	methods: {
		getJson(url){
			return fetch(url)
			.then(result => result.json())
			.catch(error => this.$refs.error.setError(error));
		}
	},
	mounted() {
		console.log(this);
	}
});