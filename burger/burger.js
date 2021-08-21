"use strict"

// ОПРЕДЕЛИМ НА КАКОМ УСТРОЙСТВЕ ОТКРЫТА НАША СТРАНИЦА

const isMobile = {
	Android: function () {
		return navigator.userAgent.match(/Android/i)
	},
	BlackBerry: function () {
		return navigator.userAgent.match(/BlackBerry/i)
	},
	iOS: function () {
		return navigator.userAgent.match(/iPhone|iPad|iPod/i)
	},
	Opera: function () {
		return navigator.userAgent.match(/Opera Mini/i)
	},
	Windows: function () {
		return navigator.userAgent.match(/IEMobile/i)
	},
	any: function () {
		return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
	}
};

/* Сделаем проверку: если страница открыта на мобильном устройстве: */
if (isMobile.any()) {
	/* добавляем к body технический класс _touch */
	document.body.classList.add('_touch');

	/* при щелчке на стрелочку, показываем выпадающее подменю */
	/* 1-соберём в переменную все стрелочки(таких может быть много): */
	let menuArrows = document.querySelectorAll('.menu__arrow');
	/* 2-проверяем есть ли такие объекты(стрелочки) т.е. длину массива этой переменной: */
	if (menuArrows.length > 0) {
		/* 3-запускаем цикл,что бы по всем им пробежаться */
		for (let index = 0; index < menuArrows.length; index++) {
			/* 4-создаём константу и сохраняем каждую из найденных стрелочек ( у нас - одна): */
			const menuArrow = menuArrows[index];
			/* 5-обращаемся к каждой стрелочке и навешиваем событие click (т.е. что нам нужно сделать при клике на стрелочку): */
			menuArrow.addEventListener("click", function (e) {
				/* 6-добавим если нет(уберём если есть) технический класс _activ родителю нажатой стрелочки: */
				menuArrow.parentElement.classList.toggle('_active');

			});

		}
	}

	/* если на ПК: */
} else {
	document.body.classList.add('_pc');
}

/* *************************************************************************************************************************** */

// МЕНЮ-БУРГЕР и его анимация

/* 1-получим объект (иконку меню-бургер) Будем искать этот класс: */
const iconMenu = document.querySelector('.menu__icon');
/* 3-найдём и сохраним в константу menuBody объект .menu__body (будет нужна для анимирования появления меню при нажатии на иконке (меню-бургер) */
const menuBody = document.querySelector('.menu__body');
/* 2-проверка: есть ли такой обхект(класс) в константе iconMenu: */
if (iconMenu) {
	/* 4-создаём событие "click" по иконке(меню-бургер): */
	iconMenu.addEventListener("click", function (e) {
		/* 7-запретим скроллить страницу при открытом меню: */
		//обатимся к body и будем добавлять(убирать) технический класс '_lock' при нажатой иконке(меню-бургер):
		document.body.classList.toggle('_lock');
		/* 5-обращаемся к иконке(меню-бургер) и добавляем(убираем) класс '_active' при нажатии на неё: */
		iconMenu.classList.toggle('_active'); /* чтобы анимнровать иконку(меню-бургер) при нажатии */
		/* 6-обращаемся к объекту .menu__body и добавляем(убираем) класс '_active' при нажатии на неё: */
		menuBody.classList.toggle('_active'); /* чтобы анимировать появление меню при нажати на иконку(меню-бургер) */
	});
}



/* ***************************************************************************************************************************** */

// ПРОКРУТКА ПРИ КЛИКЕ

/* 1-соберём массив всех ссылок с data-атрибутом (указываем в квадратных скобках): */
const menuLinks = document.querySelectorAll('.menu__link[data-goto]');
/* 2-проверим есть ли такие объеты(ссылки), т.е. длина массива объектов больше нуля: */
if (menuLinks.length > 0) {
	/* 3-пробежимся по ним: */
	menuLinks.forEach(menuLink => {
		/* 4-обращаемся к ссылке и навешиваем событие click(т.е. что нам нужно сделать при клике на ссылке с data-атрибутом (data-goto))*/
		menuLink.addEventListener("click", onMenuLinkClick);
	});
	function onMenuLinkClick(e) {
		/* 5-получим объект на который мы кликаем(целевой объект) У нас-ссылка: */
		const menuLink = e.target;
		/* 6-проверим: заполнен ли этот data-атрибут и существует ли объект, на который ссылается данныый data-атрибут: */
		if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
			/* 7-получаем в константу наш объект: */
			const gotoBlock = document.querySelector(menuLink.dataset.goto);
			/* 8-высчитаем положение объкта (обязательно с учётом высоты шапки): */
			// создаём константу gotoBlockValue,
			// получим положение объекта gotoBlock на странице от верха (.top) с помощью функции getBoundingClientRect(),
			// добавляем количество прокрученных пикселей (используем встроенную переменную pageYOffset (у нас по оси-Y)),
			// отнимаем высоту шапки (обращаемся к шапке и получаем её высоту, обратившись к offsetHeight )
			const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset - document.querySelector('header').offsetHeight;

			/* 12-сделаем чтобы при щелчке на пунктах меню (для мобильных устройств) закрывалось меню и только потом прозводилась плавная прокрутка к соответствующему разделу: */
			// если объект иконки(бургер-меню) содержит класс '_active' (меню открыто):
			if (iconMenu.classList.contains('_active')) {
				// уберём классы, которые мы добавляем при открчтии меню:
				//обатимся к body и убираем технический класс '_lock' :
				document.body.classList.remove('_lock');
				// обращаемся к иконке(меню-бургер) и убираем класс '_active' 
				iconMenu.classList.remove('_active');
				// обращаемся к объекту .menu__body и убираем класс '_active'
				menuBody.classList.remove('_active');
			}

			/* 9-обратимся к окну браузера, к функции scrollTo(занимается прокруткой):*/
			window.scrollTo({
				/* 10-указываем высчитанное положение объкта от верха и второй параметр со значением "smooth" (плавная прокрутка): */
				top: gotoBlockValue,
				behavior: "smooth"
			});
			/* 11-отключим работу ссылки (что бы она не переходила в href,а просто выполняла прокрутку): */
			e.preventDefault();
		}
	}
}
