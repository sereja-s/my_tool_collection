// Размеры и прокрутка элементов

// Существует множество JavaScript-свойств, которые позволяют считывать информацию об элементе: ширину, высоту и другие
// геометрические характеристики. В этой главе мы будем называть их «метрики». Рис. 17-1

// Они часто требуются, когда нам нужно передвигать или позиционировать элементы с помощью JavaScript

//=====================================================================================================================//

// clientWidth/Height

// Эти свойства – размер области внутри рамок элемента.
// Они включают в себя ширину области содержимого вместе с внутренними отступами padding, но без прокрутки

// Для большинства таких запросов мы можем использовать корневой элемент документа document.documentElement, который соответствует тегу <html>

// Получим доступную ширину и высоту окна:

// получаем объект (обращаемся к тегу: html)
const mainElement = document.documentElement;
console.log(mainElement); // <html>...</html>

// обращаемся к элементу и используем соответствующее свойство:

const mainElementWidth = mainElement.clientWidth;
const mainElementtHeight = mainElement.clientHeight;

console.log(mainElementWidth); // ширина окна доступная для работы
console.log(mainElementtHeight); // высота окна доступная для работы

//--------------------------------------------------------------------------------------------------------------------//

// Браузеры также поддерживают свойства window.innerWidth/innerHeight

// Если есть полоса прокрутки, и она занимает какое-то место, то свойства clientWidth/clientHeight указывают на ширину/высоту документа без неё (за её вычетом). Иными словами, они возвращают высоту/ширину видимой части документа, доступной для содержимого.

// А window.innerWidth/innerHeight включают в себя полосу прокрутки

const windowWidth = window.innerWidth;
const windowHeight = window.innerHeight;

console.log(windowWidth); // ширина окна доступная для работы вместе с полосой прокрутки
console.log(windowHeight); // высота окна доступная для работы

//=====================================================================================================================//

// scrollWidth/Height

// Эти свойства – как clientWidth/clientHeight, но также включают в себя прокрученную (которую не видно) часть элемента

// Получим максимальное значение из присутствующих:

let scrollWidth = Math.max(
	document.body.scrollWidth, document.documentElement.scrollWidth,
	document.body.offsetWidth, document.documentElement.offsetWidth,
	document.body.clientWidth, document.documentElement.clientWidth,
);
console.log(scrollWidth); // полная ширина контента на странице

let scrollHeidth = Math.max(
	document.body.scrollHeight, document.documentElement.scrollHeight,
	document.body.offsetHeight, document.documentElement.offsetHeight,
	document.body.clientHeight, document.documentElement.clientHeight,
);
console.log(scrollHeidth); // полная высота контента на странице

//=====================================================================================================================//

// Количество прокрученных пикселей (только для чтения) текущую прокрутку можно прочитать из свойств window.pageXOffset/pageYOffset:
const windowScrollTop = window.pageYOffset;
const windowScrollLeft = window.pageXOffset;

console.log(windowScrollTop); // получим ноль если находимся в верхней точке скролла
console.log(windowScrollLeft); // получи ноль, т.к. горизонтального скролла нет

//--------------------------------------------------------------------------------------------------------------------//

// Прокрутка: scrollTo, scrollBy, scrollIntoView

// специальные методы window.scrollBy(x,y) и window.scrollTo(pageX,pageY).

// Метод scrollBy(x,y) прокручивает страницу относительно её текущего положения. Например, scrollBy(0,10) прокручивает страницу на 10px вниз.

// Создадим функцию, которая при вызове будет вертикально прокручивать страницу на соответствующее значение пикселей:
function setScrollBy() {

	window.scrollBy(0, 50);
	// в константу получим количество прокрученных пикселей по оси Y:
	const windowScrollTop2 = window.pageYOffset;
	console.log(windowScrollTop2);
}
// setScrollBy(); // здесь функция будет вызываться при клике на соответствующую кнопку и каждый раз прокручивать страницу на указанное значение


// Метод scrollTo(pageX, pageY) прокручивает страницу на абсолютные координаты(pageX, pageY), относительно нулевых
// значений. То есть, чтобы левый - верхний угол видимой части страницы имел данные координаты относительно левого
// верхнего угла документа.Это всё равно, что поставить scrollLeft / scrollTop. (тоже самое что и window.scroll()) Для
// прокрутки в самое начало мы можем использовать scrollTo(0, 0).

function setScrollTo() {

	window.scrollTo(0, 150);
	// в константу получим количество прокрученных пикселей по оси Y:
	const windowScrollTop3 = window.pageYOffset;
	console.log(windowScrollTop3);
}
// setScrollTo(); // здесь функция будет вызываться при клике на соответствующую кнопку и устанавливать страницу в
// указанное значение координат (при повторном вызове ничего меняться не будет,т.к. страница уже стоит в нужном положении)

// У метода: scrollTo есть ряд параметров (применяется другой синтаксис):
function setScrollToOptions() {

	window.scrollTo({

		top: 500, // прокрутить вверх
		left: 0,
		behavior: "smooth", // параметр, отвечающий за тип прокрутки (по умолчанию: auto), "instant"- не плавная	
	});
}
// Опции не работают в Safari

//---------------------------------------------------------------------------------------------------------------------//

// scrollIntoView

// Для полноты картины давайте рассмотрим ещё один метод: elem.scrollIntoView(top). Вызов elem.scrollIntoView(top)
// прокручивает страницу, чтобы elem оказался вверху. У него есть один аргумент:

// - если top=true (по умолчанию), то страница будет прокручена, чтобы elem появился в верхней части окна. Верхний край элемента совмещён с верхней частью окна.
// - если top=false, то страница будет прокручена, чтобы elem появился внизу. Нижний край элемента будет совмещён с нижним краем окна

function setScrollIntoView(top) {

	const lessonSelected = document.querySelector('.lesson__selected');
	lessonSelected.scrollIntoView(top); // при щелчке на кнопку сработает функция и найденый элемент окажется вверху экрана
}

// есть возможность указать дополнительные параметры (опции):
function setScrollIntoViewOptions(top) {

	const lessonSelectedOpt = document.querySelector('.lesson__selected');
	lessonSelectedOpt.scrollIntoView({
		// "start" - по умолчанию, "center", "end" или "nearest"
		block: "center", // вертикальное позиционирование
		// "start", "center", "end" или "nearest" - по умолчанию
		inline: "center", // горизонтальное позиционирование
		// "auto" - по умолчанию, "smooth"
		behavior: "smooth", // плавность прокрутки
	});
}

// Опции не работают в

//====================================================================================================================//

// Запретить прокрутку

// Иногда нам нужно сделать документ «непрокручиваемым». Например, при показе большого диалогового окна над документом –
// чтобы посетитель мог прокручивать это окно, но не документ.

// Чтобы запретить прокрутку страницы, достаточно установить document.body.style.overflow = "hidden".

// Попробуйте сами:

document.body.style.overflow = 'hidden' // останавливает прокрутку
document.body.style.overflow = '' // возобновляет её

// Аналогичным образом мы можем «заморозить» прокрутку для других элементов, а не только для document.body.

// Недостатком этого способа является то, что сама полоса прокрутки исчезает. Если она занимала некоторую ширину, то
// теперь эта ширина освободится, и содержимое страницы расширится, текст «прыгнет», заняв освободившееся место.

// Это выглядит немного странно, но это можно обойти, если сравнить clientWidth до и после остановки, и если clientWidth
// увеличится (значит полоса прокрутки исчезла), то добавить padding в document.body вместо полосы прокрутки, чтобы оставить ширину содержимого прежней

function setEnableDisableScroll() {

	//document.body.style.overflow = 'hidden' // запретить прокрутку
	document.body.classList.toggle('scroll-lock') // запретить прокрутку(описано в CSS) при наличии у элемента указанного класса
}

//=====================================================================================================================//

// В свойстве offsetParent находится предок элемента, который используется внутри браузера для вычисления координат при рендеринге.

// То есть, ближайший предок, который удовлетворяет следующим условиям:
// - Является CSS-позиционированным (CSS-свойство position равно absolute, relative, fixed или sticky),
// - или <td>, <th>, <table>,
// - или <body>

// Получаем объект
const block = document.querySelector('.lesson__block');

// Получаем родительский элемент, относительно которого позиционирован наш объект
const elementOffsetParent = block.offsetParent;

console.log(elementOffsetParent);

// Существует несколько ситуаций, когда offsetParent равно null:
// - Для скрытых элементов (с CSS-свойством display:none или когда его нет в документе).
// - Для элементов <body> и <html>.
// - Для элементов с position:fixed

//--------------------------------------------------------------------------------------------------------------------//

// Свойства offsetLeft/offsetTop содержат координаты x/y относительно верхнего левого угла offsetParent

// получаем позицию объекта, относительно предка: offsetParent :
const elementOffsetLeft = block.offsetLeft; // вернёт положение объекта слева от родительского
const elementOffsetTop = block.offsetTop; // вернёт положение объекта сверху от родительского

console.log(elementOffsetLeft);
console.log(elementOffsetTop);








































//========================================================================================================================================================
//========================================================================================================================================================
//========================================================================================================================================================


/*
// Размеры окна браузера
// clientWidth и clientHeight

// Доступная ширина и высота окна
const mainElement = document.documentElement;
const mainElementWidth = mainElement.clientWidth;
const mainElementHeight = mainElement.clientHeight;

console.log(mainElementWidth);
console.log(mainElementHeight);

//-----------

// Ширина и высота окна вместе с полосами прокрутки
const windowWidth = window.innerWidth;
const windowHeight = window.innerHeight;

console.log(windowWidth);
console.log(windowHeight);
*/
//---------------------------------

/*
// Ширина и высота документа
// включая прокрученную часть

let scrollWidth = Math.max(
document.body.scrollWidth, document.documentElement.scrollWidth,
document.body.offsetWidth, document.documentElement.offsetWidth,
document.body.clientWidth, document.documentElement.clientWidth
);
let scrollHeight = Math.max(
document.body.scrollHeight, document.documentElement.scrollHeight,
document.body.offsetHeight, document.documentElement.offsetHeight,
document.body.clientHeight, document.documentElement.clientHeight
);
console.log(scrollWidth);
console.log(scrollHeight);
*/

//---------------------------------

/*
// Получить кол-во прокрученных пикселей
// Только для чтения
const windowScrollTop = window.pageYOffset;
const windowScrollLeft = window.pageXOffset;

console.log(windowScrollTop);
console.log(windowScrollLeft);
*/

//---------------------------------
// Управление прокруткой страницы

/*
// Метод scrollBy(x,y) прокручивает страницу относительно
// её текущего положения.

function setScrollBy() {
window.scrollBy(0, 50);
const windowScrollTop = window.pageYOffset;
console.log(windowScrollTop);
}
*/

//------

/*
// Метод scrollTo(pageX, pageY) прокручивает страницу
// на абсолютные координаты(pageX, pageY).
// тоже самое что и window.scroll()

function setScrollTo() {
	window.scrollTo(0, 50);
	const windowScrollTop = window.pageYOffset;
	console.log(windowScrollTop);
}

function setScrollToOptions() {
	window.scrollTo({
		top: 500,
		left: 0,
		// smooth, instant,
		// либо auto; по умолчанию auto
		behavior: "smooth"
	});
}
// Опции не работают в Safari
*/

//------

/*
Вызов elem.scrollIntoView(top) прокручивает страницу,
чтобы elem оказался вверху.У него есть один аргумент:

- если top = true(по умолчанию), то страница будет прокручена,
чтобы elem появился в верхней части окна.
Верхний край элемента совмещён с верхней частью окна.
- если top = false, то страница будет прокручена, чтобы elem
появился внизу.Нижний край элемента будет совмещён с нижним краем окна.
*/
/*
function setScrollIntoView(top) {
	const lessonSelected = document.querySelector('.lesson__selected');
	lessonSelected.scrollIntoView(top);
}

function setScrollIntoViewOptions(top) {
	const lessonSelected = document.querySelector('.lesson__selected');
	lessonSelected.scrollIntoView({
		//"start", "center", "end" или "nearest". По умолчанию "center".
		block: "center",
		//"start", "center", "end" или "nearest". По умолчанию "nearest".
		inline: "nearest",
		// "auto" или "smooth". По умолчанию "auto".
		behavior: "smooth"
	});
}
// Опции не работают в Safari
*/


//-------

/*
// Запретить прокрутку
function setEnableDisableScroll() {
	//document.body.style.overflow = "hidden";
	document.body.classList.toggle('scroll-lock');
}
*/
/*
Для прокрутки страницы из JavaScript её DOM должен
быть полностью построен.
Например, если мы попытаемся прокрутить страницу
из скрипта в <head>, это не сработает.
*/

//========================================================================================================================================================

// Метрики элементов на странице

// Получаем объект
//const block = document.querySelector('.lesson__block');

// Позиция объекта
// Свойства offsetParent, offsetLeft и offsetTop

// Получаем родительский элемент
// относительно которого позицианирован наш объект
//const elementOffsetParent = block.offsetParent;


/*
Это будет ближайший предок, который
удовлетворяет следующим условиям:

1. Является CSS-позиционированным
	(CSS-свойство position равно absolute, relative, fixed или sticky)
2. или теги <td>, <th>, <table>,
3. или <body>.
*/

//console.log(elementOffsetParent);

/*
Cитуации, в которых offsetParent равно null:
1. Для скрытых элементов
	(с CSS - свойством display: none или когда его нет в документе).
2. Для элементов <body> и <html>.
3. Для элементов с position: fixed.
*/


/*
// Получаем позицию объекта относительно предка (offsetParent)
const elementOffsetLeft = block.offsetLeft;
const elementOffsetTop = block.offsetTop;

console.log(elementOffsetLeft);
console.log(elementOffsetTop);
*/


//========================================================================================================================================================

// Общие размеры объекта
// offsetWidth и offsetHeight
/*
// Получаем размеры объекта
const elementOffsetWidth = block.offsetWidth;
const elementOffsetHeight = block.offsetHeight;

console.log(elementOffsetWidth);
console.log(elementOffsetHeight);
*/
// Метрики для не показываемых элементов равны нулю.

//========================================================================================================================================================

/*
// Отступы внутренней части элемента от внешней.
// clientTop и clientLeft

const elementClientTop = block.clientTop;
const elementClientLeft = block.clientLeft;

console.log(elementClientTop);
console.log(elementClientLeft);
*/

//========================================================================================================================================================

/*
// Размеры объекта без
// рамок и полосы прокрутки
// clientWidth и clientHeight

const elementClientWidth = block.clientWidth;
const elementClientHeight = block.clientHeight;

console.log(elementClientWidth);
console.log(elementClientHeight);

// общая ширина (offsetWidth) - рамка слева - рамка справа - скролл
// 500 - 20 - 20 - 17 = 443
*/

//========================================================================================================================================================

/*
// Размеры объекта включающие в себя
// прокрученную (которую не видно) часть.
// В остальном работают как clientWidth/clientHeight,
// scrollWidth и scrollHeight

const elementScrollWidth = block.scrollWidth;
const elementScrollHeight = block.scrollHeight;

console.log(elementScrollWidth);
console.log(elementScrollHeight);
*/

//========================================================================================================================================================

/*
// Размеры прокрученной области
// scrollLeft и scrollTop

block.scrollTop = 150;

const elementScrollLeft = block.scrollLeft;
const elementScrollTop = block.scrollTop;

console.log(elementScrollLeft);
console.log(elementScrollTop);
*/

//========================================================================================================================================================

/*
// Методы управления прокруткой
// scrollBy, scrollTo и scrollIntoView
// работают и для объекта

function setElementScrollBy() {
	block.scrollBy({
		top: 20,
		left: 0,
		behavior: "smooth"
	})
}*/

//========================================================================================================================================================


// Координаты
/*
Большинство соответствующих методов JavaScript работают в
одной из двух указанных ниже систем координат:

1. Относительно окна браузера.
	(как position: fixed, отсчёт идёт от верхнего левого угла окна.)
	Принято обозначать clientX/clientY.
2. Относительно документа.
	(как position: absolute относительно <body>, отсчёт идёт от
	верхнего левого угла документа.)
	Принято обозначать pageX/pageY.

Когда страница полностью прокручена в самое начало,
то верхний левый угол окна совпадает с левым верхним
углом документа, при этом обе этих системы координат тоже совпадают.
Но если происходит прокрутка, то координаты элементов в
контексте окна меняются, так как они двигаются,
но в то же время их координаты относительно
документа остаются такими же.

*/

//========================================================================================================================================================


/*
// Координаты относительно окна браузера
// getBoundingClientRect

// Получаем объект
const item = document.querySelector('.lesson__item');

// Получаем координаты относительно окна браузера
const getItemCoords = item.getBoundingClientRect();

console.log(getItemCoords);

// Получаем конкретную координату относительно окна браузера
const getItemLeftCoord = item.getBoundingClientRect().left;

console.log(getItemLeftCoord);
*/

//========================================================================================================================================================


/*
// Координаты относительно документа
// getBoundingClientRect

// Получаем объект
const item = document.querySelector('.lesson__item');

// Получаем конкретную координату относительно окна браузера
const getItemTopCoord = item.getBoundingClientRect().top;

// Получаем конкретную координату относительно документа
const getItemTopDocumentCoord = getItemTopCoord + window.pageYOffset;

console.log(getItemTopCoord);
console.log(getItemTopDocumentCoord);
*/

//========================================================================================================================================================

/*
// Получение объекта по координатам
// document.elementFromPoint(x, y);

const elem = document.elementFromPoint(100, 100);
console.log(elem);
*/

//========================================================================================================================================================
//========================================================================================================================================================