// const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';
const API = 'https://raw.githubusercontent.com/xIgor1982/online-store-api/main/responses';
const pathImg = 'images/';

// let getRequest = (url) => {
//     return new Promise((resolve, reject) => {
//         let xhr = new XMLHttpRequest();
//         xhr.open("GET", url, true);
//         xhr.onreadystatechange = () => {
//             if(xhr.readyState === 4){
//                 if(xhr.status !== 200){
//                     reject('Error');
//                 } else {
//                     resolve(xhr.responseText);
//                 }
//             }
//         };
//         xhr.send();
//     })
// };

/**
 * Описываем базовые классы
 */
class List {
	constructor(url, container, list = listContext){
		this.container = container;
		this.list = list; // словарь для классов строка 213
		this.url = url;
		this.goods = [];
		this.allProducts = [];
		this.filtered = []; // отфильтрованные товары
		this._init();
	}

	/**
	 * получение данных с сервера
	 * @param url
	 * @returns {Promise<any | never>}
	 */
	getJson(url){
		return fetch(url ? url : `${API + this.url}`)
		.then(result => result.json())
		.catch(error => {
			console.log(error);
		})
	}

	/**
	 * обработка полученных данных
	 * @param data
	 */
	handleData(data){
		this.goods = data;
		this.render();
	}

	/**
	 * подсчет стоимости всех товаров
	 * @returns {*|number}
	 */
	calcSum(){
		return this.allProducts.reduce((accum, item) => accum += item.price, 0);
	}

	render(){
		const block = document.querySelector(this.container);
		for (let product of this.goods){
			const productObj = new this.list[this.constructor.name](product);
			this.allProducts.push(productObj);
			block.insertAdjacentHTML('beforeend', productObj.render());
		}
	}

	/**
	 * метод поиска товаров
	 * @param value - поисковый запрос
	 */
	filter(value){
		const regexp = new RegExp(value, 'i');
		this.filtered = this.allProducts.filter(product => regexp.test(product.title));
		this.allProducts.forEach(el => {
			const block = document.querySelector(`.product-item[data-id="${el.id}"]`);
			if(!this.filtered.includes(el)){
				block.classList.add('invisible');
			} else {
				block.classList.remove('invisible');
			}
		})
	}
	_init(){
		return false
	}
}

/**
 * Наследуемся от базовых классов
 */
class ProductsList extends List{
	constructor(cart, container = '.products', url = "/catalogData.json"){
		super(url, container);
		this.cart = cart;
		this.getJson()
		.then(data => this.handleData(data));
	}

	_init(){
		document.querySelector(this.container).addEventListener('click', e => {
			if(e.target.classList.contains('buy-btn')){
				this.cart.addProduct(e.target);
			}
		});
		document.querySelector('.search-form').addEventListener('submit', e => {
			e.preventDefault();
			this.filter(document.querySelector('.search-field').value)
		})
	}
}

class Cart extends List{
	constructor(container = ".cart-block", url = "/getBasket.json"){
		super(url, container);
		this.getJson()
		.then(data => {
			this.handleData(data.contents);
		});
	}

	/**
	 * добавление товара
	 * @param element
	 */
	addProduct(element){
		this.getJson(`${API}/addToBasket.json`)
		.then(data => {
			if(data.result === 1){
				let productId = +element.dataset['id'];
				let find = this.allProducts.find(product => product.id === productId);
				if(find){
					find.quantity++;
					this._updateCart(find);
				} else {
					let product = {
						id: productId,
						price: +element.dataset['price'],
						title: element.dataset['name'],
						quantity: 1
					};
					this.goods = [product];
					this.render();
				}
			} else {
				alert('Error');
			}
		})
	}

	/**
	 * удаление товара
	 * @param element
	 */
	removeProduct(element){
		this.getJson(`${API}/deleteFromBasket.json`)
		.then(data => {
			if(data.result === 1){
				let productId = +element.dataset['id'];
				let find = this.allProducts.find(product => product.id === productId);
				if(find.quantity > 1){
					find.quantity--;
					this._updateCart(find);
				} else { // удаляем
					this.allProducts.splice(this.allProducts.indexOf(find), 1);
					document.querySelector(`.cart-item[data-id="${productId}"]`).remove();
				}
			} else {
				alert('Error');
			}
		})
	}

	/**
	 * обновляем данные корзины
	 * @param product
	 * @private
	 */
	_updateCart(product){
		let block = document.querySelector(`.cart-item[data-id="${product.id}"]`);
		block.querySelector('.product-quantity').textContent = `Количество: ${product.quantity}`;
		block.querySelector('.product-price').textContent = `${product.quantity * product.price} ₽`;
	}

	_init(){
		document.querySelector('.btn-cart').addEventListener('click', () => {
			document.querySelector(this.container).classList.toggle('invisible');
		});
		document.querySelector(this.container).addEventListener('click', e => {
			if(e.target.classList.contains('del-btn')){
				this.removeProduct(e.target);
			}
		})
	}
}

class Item{
	constructor(el, image = 'images/not-product.png'){
		this.title = el.title;
		this.price = el.price;
		this.id = el.id;
		this.image = pathImg + el.image;
	}
	render(){
		return ``;
	}
}

class ProductItem extends Item{
	render() {
		return `<div class="product-item" data-id="${this.id}">
                <div class='product-img'>
                  <img src="${this.image}" alt="Some image">
                </div>  
                <div class="desc">
                    <h3>${this.title}</h3>
                    <p>${this.price} ₽</p>
                    <button class="buy-btn"
                    data-id="${this.id}"
                    data-name="${this.title}"
                    data-price="${this.price}">Купить</button>
                </div>
            </div>`;
	}
}

class CartItem extends Item{
	constructor(el, image = 'images/not-product.png'){
		super(el, image);
		this.quantity = el.quantity;
	}
	render(){
		return `<div class="cart-item" data-id="${this.id}" data-img="">
                <div class="product-bio">
                <div class='product-img'>
                  <img src="${this.image}" alt="Some image">
                </div>                
                <div class="product-desc">
                <p class="product-title">${this.title}</p>
                <p class="product-quantity">Количество: ${this.quantity}</p>
            <p class="product-single-price">${this.price} за ед.</p>
            </div>
            </div>
            <div class="right-block">
                <p class="product-price">${this.quantity*this.price} ₽</p>
                <button class="del-btn" data-id="${this.id}">&times;</button>
            </div>
            </div>`
	}
}

const listContext = {
	ProductsList: ProductItem,
	Cart: CartItem
};

let cart = new Cart();
let products = new ProductsList(cart);
