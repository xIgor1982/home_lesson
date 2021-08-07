const API = 'https://raw.githubusercontent.com/xIgor1982/online-store-api/main/responses';
const pathImg = 'images/';

const app =new Vue({
	el: '#app',
	data: {
		searchLine : '',
	},
	methods: {
		getJson(url){
			return fetch(url)
			.then(result => result.json())
			.catch(error => console.log(error));
		},
		filterGoods() {
			alert(this.searchLine);
		}
	},
	mounted() {
		// console.log(this);
	}
});