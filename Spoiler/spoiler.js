"use strict"

// SPOILERS
/* получаем коллекцию всех объектов, у которых есть data-атрибут: spoilers */
const spoilersArray = document.querySelectorAll('[data-spoilers]');
/* проверяем есть ли такие объкты */
if (spoilersArray.length > 0) {
	/* переведём все полученные объкты(коллекцию) в массив и разделим на 2-ва массива: с простыми спойлерами и спойлерами, работающими по определённым условиям: */
	// Получим обычные спройлеры:
	const spoilersRegular = Array.from(spoilersArray).filter(function (item, index, self) {
		//проверим осутствие параметров у атрибута data-spoilers объектов
		/* обращаемся к элементу массива.заходим в его data-атрибут.обращаемся к конкретному атрибуту spoilers.преобразуем содержимое в массив с разделителем (запятая) и запрашиваем 1-ю ячейку с индеком [0] Атрибут НЕ должен содержать первого параметра (данных в этой ячейке), тогда этот объект(элементу массива) попадёт в const spoilersRegular */
		return !item.dataset.spoilers.split(",")[0];
	});
	//Инициализация обычных спойлеров:
	/* Если такие объекты(элементы массива) существуют */
	if (spoilersRegular.length > 0) {
		initSpoilers(spoilersRegular);
	}
	// Получим спройлеров с медиа-запросами:
	const spoilersMedia = Array.from(spoilersArray).filter(function (item, index, self) {
		return item.dataset.spoilers.split(",")[0];
	});
	//Инициализация спройлеров с медиа-запросами:
	if (spoilersMedia.length > 0) {
		/* создаём константу с пустым массивом (его мы будем наполнять параметрами): */
		const breakpointsArray = [];
		/* переберём (с помощью forEach) массив объктов, которые мы собрали: */
		spoilersMedia.forEach(item => {
			/* обращаемся к data-атрибуту spoilers и сохраним в константе строку с параметрами для каждого объкта: */
			const params = item.dataset.spoilers;
			/*создаём пустой объкт и будем его наполнять: */
			const breakpoint = {};
			/* преобразовываем строку внутри params в массив (с помощью split) с разделителем (запятая) и сохраняем в константе: */
			const paramsArray = params.split(",");
			/*  для пустого объкта breakpoint создаём значение value и присваиваем туда нулевую ячейку массива (ширина экрана): */
			breakpoint.value = paramsArray[0];
			/* соэраним значение min для этого объекта ( по умолчанию будет-max) */
			breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : "max";
			/* сохраним сам объект */
			breakpoint.item = item;
			/* заполненный значениями объект breakpoint добавляем в массив breakpointsArray: */
			breakpointsArray.push(breakpoint);
		});

		// Что бы учесть повторения, получаем уникальные брейкпоинты:
		/* сохраним в переменной, переделанный с помощью метода map массив breakpointsArray*/
		let mediaQueries = breakpointsArray.map(function (item) {
			/* соберём строку с медиа-запросом: */
			return '(' + item.type + "-width:" + item.value + "px)," + item.value + ',' + item.type;
		});
		/* через переменную mediaQueries(массив), обращаемся к функции и фильтруем массив и возвращаем уникальные значения и сохраняем внутри массива mediaQueries*/
		mediaQueries = mediaQueries.filter(function (item, index, self) {
			return self.indexOf(item) === index;
		});

		// Работаем с каждым брейкпоинтом
		/* пробежимся по массиву mediaQueries, который мы собрали.убрали все дубли и т.д. ,с помощью forEach ( по всем брейкпоинтам */
		mediaQueries.forEach(breakpoint => {
			/* в константу получаем строку(одну запись данного массива), которую преобразуем в массив с помощью разделителя (запятая) */
			const paramsArray = breakpoint.split(",");
			/*  в константу получаем первый параметр массива параметров (число-ширина экрана) */
			const mediaBreakpoint = paramsArray[1];
			/* в константу получаем второй параметр массива параметров (число-ширина экрана) */
			const mediaType = paramsArray[2];
			/* в константу сохраним результат работы метода matchMedia, который будет слушать ширину жкрана и отрабатывать если сработает тот или иной брейк поинт В параметры(в скобках) указываем нулевой параметр массива (строка, которую мы форировали ранее)*/
			const matchMedia = window.matchMedia(paramsArray[0]);
			// Соберём массив обектов, которые соответствуют данному брейкпоинту, фильтруем и сохраним в константу
			const spoilersArray = breakpointsArray.filter(function (item) {
				/* если совпадает и число и тип, то объект попадает в массив spoilersArray */
				if (item.value === mediaBreakpoint && item.type === mediaType) {
					return true;
				}
			});
			// Создадим событие,которое будет отрабатывать при достижении условия брейкпоинта
			matchMedia.addEventListener(function () {
				initSpoilers(spoilersArray, matchMedia);
			});
			initSpoilers(spoilersArray, matchMedia);
		});
	}
}