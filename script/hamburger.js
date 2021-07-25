class Hamburger {
	constructor()  {
		this.size = '';
		this.filler = '';
		this.optional = [];
		this.price = Number(0);
		this.kkal = Number(0);
		this.isSize = true;
		this.isFiller = true;
	}

	// Добавить размер
	addSize(size) {
		//присваивает размер только если он не присвоен
		if(this.size ==='') {
			this.size = size;
			this.isSize = false;
		}		
	}

	// Добавить добавку
	addFiller(filler) {
		//Условие не позволяет выбрать другую добавку. Присваивается только один раз.
		if(this.filler === '') {
			this.filler = filler;
			this.isFiller = false;
		}		
	}

	// Добавить дополнительную добавку
	addOptional(optional) {
		this.optional.push(optional);
	}

	//Добавление стоимости
	addPrice(price) {
		this.price += +price;
	}

	//Добавление калорий
	addKKal(kkal){
		this.kkal += +kkal;
	}

	// Получить список добавок
	getListProduct() {
		let result = '';
		this.optional.forEach(el =>  result += (', ' + el));
		return result;
	}

	// Узнать размер гамбургера
	getSize() {
		return this.size;
	}

	// Узнать состав гамбургера
	getProductComposition() {
		return `гамбургер состоит: ${this.filler}, ${this.getListProduct()}`;
	}

	// Узнать цену
	calculatePrice() {
		return this.price;
	}

	// Узнать калорийность
	calculateCalories() {
		return this.kkal;
	}

	addPriceKKal(cost, kkal) {
		this.addSize(name);
		this.addPrice(cost);
		this.addKKal(kkal);
	}
}


document.querySelector('.result').addEventListener('click', function (el){
	el.preventDefault();
	let checkedEl = document.querySelectorAll('.burger:checked');
	let hamburger = new Hamburger();

	checkedEl.forEach(el => {		
		if(el.classList.contains('burger_size') && hamburger.isSize) {
			hamburger.addSize(el.getAttribute('data-name'));
			hamburger.addPriceKKal(el.getAttribute('data-cost'), el.getAttribute('data-kkal'));
			hamburger.isSize = false;			
		}
		if(el.classList.contains('burger_filler') && hamburger.isFiller) {
			hamburger.addFiller(el.getAttribute('data-name'));
			hamburger.addPriceKKal(el.getAttribute('data-cost'), el.getAttribute('data-kkal'));
			hamburger.isMainIngredients = false;			
		}	 
		if(el.classList.contains('burger_optional')) {
			hamburger.addOptional(el.getAttribute('data-name'));
			hamburger.addPriceKKal(el.getAttribute('data-cost'), el.getAttribute('data-kkal'));
		}
	});
	document.querySelector('.burger_kkal').innerHTML = `${hamburger.calculatePrice()} рублей.`;
	document.querySelector('.burger_price').innerHTML = `${hamburger.calculateCalories()} калорий.`
});
