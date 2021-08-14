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
			/*  для пустого объкта breakpoint создаём значение value и присваиваем туда нулевую ячейку массива: */
			breakpoint.value = paramsArray[0];
		});
	}
}