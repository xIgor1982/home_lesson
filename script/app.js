'use strict';

// ЗАДАНИЕ 1
// 1. Добавьте пустые классы для корзины товаров и элемента корзины товаров. Продумайте,
// какие методы понадобятся для работы с этими сущностями.
/*
 * Для корзины товаров предполагаю необходимы методы:
 * 1) добавления товара.
 * 2) удаления товара из корзины.
 * 3) подсчет общего количества и стоимости позиции товара.
 * 4) подсчета общей стоимости всех товаров в корзине.
 * */


// ЗАДАНИЕ 3 выполнено отдельными файлами

class ProductItem {
		constructor(product) {
		this.title = product.title;
		this.price = product.price;
		this.id = product.id;
		this.image = product.image;
	}

	getHTMLString() {
		return `<div class='product-item' data-id="${this.id}">
			<img class='product-img' src='${this.image}' alt='${this.title}'>
			<div class='product-bottom'>
				<h3>${this.title}</h3>
				<p>${this.price}</p>
				<div class='product-btn'>
					<button class='btn btn-product'>Добавить</button>
				</div>
			</div>
		</div>`;
	}
}

class ProductList {
	constructor(container = '.products') {
		this.container = document.querySelector(container);
		this.goods = [];
		this.allProducts = [];

		this.fetchGoods();
		this.render();
	}

	fetchGoods() {
		this.goods = [
			{id: 1, title: 'Notebook', price: 1000, image: 'images/notebook.png'},
			{id: 2, title: 'Mouse', price: 100, image: 'images/mouse.png'},
			{id: 3, title: 'Keyboard', price: 250, image: 'images/keyboard.png'},
			{id: 4, title: 'Gamepad', price: 150, image: 'images/gamepad.png'},
			{id: 5, title: 'Pc monitor', price: 450, image: 'images/not-product.png'},
			{id: 6, title: 'Webcam', price: 50, image: 'images/not-product.png'},
		];
	}

	// Суммарная стоимость всех товаров в списке
	sumAllProducts() {
		let sum = 0;
		this.goods.forEach(good => sum += good.price);
		return sum;
	}

	render() {
		for (const product of this.goods) {
			const productObject = new ProductItem(product);
			this.allProducts.push(productObject);
			this.container.insertAdjacentHTML('beforeend', productObject.getHTMLString());
		}
		//this.allProducts.forEach(el => this.container.insertAdjacentHTML('beforeend', el.getHTMLString()));
	}


}

let product1 = new ProductList();
console.log('Сумма всех товаров в корзине = ' + product1.sumAllProducts());