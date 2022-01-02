/* Инициализируем Swiper */
// в параметры передали объект, который должен стать слайдером (теперь слайды можно листать перетаскиванием) Дополнительные настройки добавим внутри фигурных скобок
let myImageSlider = new Swiper('.image-slider', {  // Присвоили слайдер переменной (небходимо для склейки с текстовым слайдером)
	// стрелки
	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',
	},
	//  разбивка на страницы(объекты)
	pagination: {
		el: '.swiper-pagination',

		// буллеты(точки) 
		//clickable: true, // функция, позволяет листать слайды, щелчком на точках пагинации
		/* динамические буллеты */
		//dynamicBullets: true, // активная точка становится большой, остальные тем меньше, чем дальше от активной точки
		/* кастомный вывод буллетов */
		//renderBullet: function (index, className) {
		//return '<span class="' + className + '">' + (index + 1) + '</span>'; // будет показан номер активного объекта в большой точке
		//},

		// укажем текущий объект(слайд)-ФРАКЦИЯ 
		type: 'fraction',
		/* кастомный вывод фракции */
		renderFraction: function (currentClass, totalClass) {
			return 'Фото <span class="' + currentClass + '"></span>' + ' из '
				+ '<span class="' + totalClass + '"></span>';
		},

		/* // выведем линию progressbar, которая заполняестся по мере приближения к крайнему объекту
		type: 'progressbar'
		 */
	},

	// Scrollbar-полоса прокрутки
	scrollbar: {
		el: '.swiper-scrollbar',
		draggable: true, // возможность перетаскивать ползунок-СКРОЛЛ	
	},

	// Включение/выключение (значения по умолчанию):
	/* перетаскивание на ПК */
	simulateTouch: true,
	/* вид курсора при перетаскивании */
	grabCursor: true,
	/* чувствительость касания при перетаскивании */
	touchRatio: 2, // цифра больше-чувствительность выше
	// Допустимый угол (в градусах) для срабатывания сенсорного перемещения
	touchAngle: 45,

	// прокрутка слайдера при щелчке на слайде (работает если значение slidesPerView больше 1)
	//slideToClickedSlide: true,

	// навигация по Хешу -> у каждого слайда будет своё имя (для включения необходимо дописать каждому слайду атрибут data-hash="имя объекта(слайда)" в html-файл)
	hashNavigation: {
		watchState: true, // возможность управлять перемещением слайдов стрелочками браузера
	},

	// Упрвление клавиатурой
	keyboard: {
		// Когда Swiper отключен, он скроет все элементы навигации и не будет реагировать на любые события и взаимодействия
		enabled: true,
		// стрелочками клавиатуры можно листать, только когда доскролили до полоски внизу
		onlyInViewport: true,
		// листать с помощью клавиш PgUp/PgDn
		pageUpDown: true,
	},
	// управление колесом мыши
	//mousewheel: {
	/* чувствительность */
	//sensitivity: 1,
	/* класс объекта на котором будет срабатывать прокрутка мыши */
	//eventsTarget: ".image-slider"
	//},

	// оболочка слайдера адаптирует свою высоту к высоте текущего активного слайда
	autoHeight: true,

	// кол-во слайдов для показа
	slidesPerView: 3, /* c 'auto' ширина слайда будет формироваться контентом внутри него (количество слайдов для показа-автоматически) Значение 'auto' работать не будет,если slidesPerColumn больше 1 */

	// отключение функционала если слайдов меньше чем нужно
	watchOverflow: true,

	// отступ между слайдами
	spaceBetween: 30,

	// количество пролистываемых слайдов
	slidesPerGroup: 1,

	// активный первый слайд по центру
	//centeredSlides: true,

	// установим номер первого активного слайда ( учитываем, что 1-ый слайд имеет № 0)
	initialSlide: 0, /* отключить centeredSlides*/

	// кол-во рядов
	/* slidesPerColumn: 1, */ // необходимо отключить автовысоту autoHeight и поставить slidesPerView: 2 и изменить стили для Мультирядности

	// бесконечный слайдер
	loop: false, // отсутствует скролл и мультирядность ( slidesPerColumn не больше 1 )

	// кол-во дублирующих слайдов (использовать если slidesPerView: 'auto') 
	//loopedSlides: 0,

	// свободный режим
	//freeMode: true, // Если включено, слайды не будут иметь фиксированных позиций

	// Автопрокрутка
	//autoplay: {
	/* пауза между прокруткой */
	//delay: 2000,
	/* закончить на последнем слайде */
	//stopOnLastSlide: true,
	/* отключить после ручного переключения */
	//disableOnInteraction: false,
	//},

	// скорость
	speed: 5000,

	// вертикальный слайдер
	//direction: 'vertical', // настроить в css

	// эффекты переключения слайдов:

	/* листание  */
	//effect: 'slide', // по умолчанию

	/* смена прозрачности */
	//effect: 'fade',
	/* Дополнение к 'fade' */
	//crossFade: true, // параллельная смена прозрачности

	/* переворот */
	//effect: 'flip',
	/* Дополнение к 'flip' */
	//flipEffect: {
	/* тень */
	//slideShadows: true,
	/* показ толькоа активного слайда */
	//limitRotation: true
	//},

	/* 3-D КУБ */
	//effect: 'cube', // настроить в css
	/* Дополнение к 'cube' */
	//cubeEffect: {
	/* тень */
	//slideShadows: true,
	//shadow: true,
	//shadowOffset: 20,
	//shadowScale: 0.94,
	//},

	/* поток */
	//effect: 'coverflow', // установить slidesPerView: 3
	/* Дополнение к 'coverflow' */
	//coverflowEffect: {
	/* угол */
	//slideShadows: true,
	//rotate: 20,
	/* наложение */
	//stretch: 50,
	/* тень */
	//slideShadows: true,
	//},

	// брейк поинты (адаптив)

	/* ширина экрана*/
	/* расстояние между слайдами */
	breakpoints: {
		320: {
			slidesPerView: 1,
			spaceBetween: 20,
		},
		480: {
			slidesPerView: 2,
			spaceBetween: 25,
		},
		992: {
			slidesPerView: 3,
			spaceBetween: 30,
		},
	},

	// Увеличение картинки (ZOOM)
	/* сначала нужно добавить класс для оболочки самой картинки в html-файле: swiper-zoom-container */
	zoom: {
		/* максимальное увеличение */
		maxRatio: 5, // при 2-ом щелчке-изображдение увеличится
		/* минимальное увеличение */
		minRatio: 1,
	},

	// обновить свайпер при обновлении элементов слайдера
	observer: true,

	// обновить свайпер при изменении родительских элементов слайдера
	observeParents: true,

	// обновить свайпер при изменении дочерних элементов слайдера
	observeSlideChildren: true,


});

// СЛАЙДЕР В СЛАЙДЕРЕ
new Swiper('.image-in-slider', {
	/* курсор перетаскивания */
	grabCursor: true,

	pagination: {
		el: '.swiper-pagination',
		clickable: true,
	},

	nested: true, // для корректной работы родительского слайда

	// бесконечный слайдер
	loop: true, // отсутствует скролл и мультирядность ( slidesPerColumn не больше 1 )

	// кол-во дублирующих слайдов (использовать если slidesPerView: 'auto') 
	//loopedSlides: 2,
	effect: 'cube',
	cubeEffect: {
		/* тень */
		slideShadows: true,
		shadow: true,
		shadowOffset: 20,
		shadowScale: 0.94,
	}

});

// Ещё слайдер

let myTextSlider = new Swiper('.text-slider', { // присвоили слайдер переменной (необходимо для склейки с картинками)

	grabCursor: true,

	pagination: {
		el: '.swiper-pagination',
		clickable: true,
	},

	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',
	},

	// бесконечный слайдер
	loop: true, // отсутствует скролл и мультирядность ( slidesPerColumn не больше 1 )

	// кол-во дублирующих слайдов (использовать если slidesPerView: 'auto') 
	//loopedSlides: 3,

	slidesPerView: 3, // кол-во слайдов для показа должны быть равное у слайдов которые склеиваются

	spaceBetween: 30,


	// передача управления
	//controller: {
	//	control: myImageSlider
	//},


});

// Передача управления (передаём управление одного слайдера другому)
myImageSlider.controller.control = myTextSlider;
myTextSlider.controller.control = myImageSlider;