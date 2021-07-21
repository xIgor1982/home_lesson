'use strict';

// Урок 1. Современный JavaScript

// 1. Добавьте стили для верхнего меню, товара, списка товаров и кнопки вызова корзины.
// 2. Добавьте значения по умолчанию для аргументов функции. Как можно упростить или
// сократить запись функций? 3. *Сейчас после каждого товара на странице выводится запятая.
// Из-за чего это происходит? Как это исправить?

const products = [
	{id: 1, title: 'Notebook', price: 1000, image: 'notebook.png'},
	{id: 2, title: 'Mouse', price: 100, image: 'mouse.png'},
	{id: 3, title: 'Keyboard', price: 250, image: 'keyboard.png'},
	{id: 4, title: 'Gamepad', price: 150, image: 'gamepad.png'},
	{id: 5, title: 'Pc monitor', price: 450},
	{id: 6, title: 'Webcam', price: 50},
];

const pathImg = 'images/'

const renderProduct = (title, price, image = 'not-product.png') =>
	`<div class='product-item'>
		<img class='product-img' src='${pathImg}${image}' alt='${title}'>
		<div class='product-bottom'>
			<h3>${title}</h3>
			<p>${price}</p>
			<div class='product-btn'>
				<button class='btn btn-product'>Добавит</button>
			</div>			
		</div>
	</div>`;

const renderProducts = list => list.forEach(el => document.querySelector('.products')
				.insertAdjacentHTML('beforeend', renderProduct(el.title, el.price, el.image))
);

renderProducts(products);