Vue.component('products', {
	data(){
		return {
			catalogUrl: '/catalogData.json',
			products: [],
			filtered: [],
			imgCatalog: 'https://via.placeholder.com/200x150',
		}
	},
	methods: {
		filter(){
			let regexp = new RegExp(this.userSearch, 'i');
			this.filtered = this.products.filter(el => regexp.test(el.title));
		}
	},
	mounted(){
		this.$parent.getJson(`${API + this.catalogUrl}`)
		.then(data => {
			for(let el of data){
				this.products.push(el);
				this.filtered.push(el);
			}
		});
	},
	template: `
        <div class="products">
            <product 
              v-for="item of filtered" 
              :key="item.id" 
              :img="item.image" 
              :product="item">
						</product>
        </div>
    `
});

Vue.component('product', {
	props: ['product', 'img'],
	computed: {
		linkImg() {
			return `images/${this.product.image}`;
		}
	},
	template: `
    <div class="product-item">
        <div class='product-img'>
          <img :src="linkImg" alt="Some img">
				</div>				
				<div class="desc">
						<h3>{{product.title}}</h3>
						<p>{{product.price}}₽</p>
						<button class="buy-btn" @click="$root.$refs.cart.addProduct(product)">Купить</button>
				</div>
		</div>
    `
});