// Введение в браузерные события

// Событие – это сигнал от браузера о том, что что-то произошло. Все DOM-узлы подают такие сигналы (хотя события бывают и не только в DOM).

// Вот список самых часто используемых DOM-событий, пока просто для ознакомления:

//События мыши:

// - click – происходит, когда кликнули на элемент левой кнопкой мыши (на устройствах с сенсорными экранами оно происходит при касании).
// - contextmenu – происходит, когда кликнули на элемент правой кнопкой мыши.
// - mouseover / mouseout – когда мышь наводится на / покидает элемент.
// - mousedown / mouseup – когда нажали / отжали кнопку мыши на элементе.
// - mousemove – при движении мыши.


// События на элементах управления:

// submit – пользователь отправил форму <form>.
// focus – пользователь фокусируется на элементе, например нажимает на <input>.


// Клавиатурные события:

// keydown и keyup – когда пользователь нажимает / отпускает клавишу.


// События документа:

// DOMContentLoaded – когда HTML загружен и обработан, DOM документа полностью построен и доступен.


// CSS events(событие):

// transitionend – когда CSS-анимация завершена

//---------------------------------------------------------------------------------------------------------------------//

// Обработчики событий

// Событию можно назначить обработчик, то есть функцию, которая сработает, как только событие произошло.
// Именно благодаря обработчикам JavaScript-код может реагировать на действия пользователя.

// Есть несколько способов назначить событию обработчик. Сейчас мы их рассмотрим, начиная с самого простого:

// 1) Использование атрибута HTML

// Обработчик может быть назначен прямо в разметке, в атрибуте, который называется on<событие>.
// Например, чтобы назначить обработчик события click на элементе button, можно использовать атрибут onclick
// При клике мышкой на кнопке выполнится код, указанный в атрибуте onclick.

// Обратите внимание, для содержимого атрибута onclick используются одинарные кавычки, так как сам атрибут находится в двойных

// Атрибут HTML-тега – не самое удобное место для написания большого количества кода, поэтому лучше создать отдельную JavaScript-функцию и вызвать её там

// Как мы помним, атрибут HTML-тега не чувствителен к регистру, поэтому ONCLICK будет работать так же, как onClick и
// onCLICK… Но, как правило, атрибуты пишут в нижнем регистре: onclick

//--------------------------------------------------------------------------------------------------------------------//

// Использование свойства DOM-объекта
// Можно назначать обработчик, используя свойство DOM-элемента on<событие>. К примеру, elem.onclick

const button = document.querySelector('.button');

button.onclick = function () {

	console.log('Клик!');
}

// Кстати, обработчиком можно назначить и уже существующую функцию:
function showConsole() {
	console.log('при клике отработала функция: showConsole');
}
button.onclick = showConsole; // Важно! Функция присваивается без круглых скобок (только название)!
// …А вот при вызове ф-ии в разметке, в отличие от свойства, скобки нужны

// Убрать обработчик можно назначением elem.onclick = null

// Фундаментальный недостаток описанных выше способов назначения обработчика – невозможность повесить несколько
// обработчиков на одно событие. Каждое новое назначение обработчика перезапишет предыдущее:

/*
const button = document.querySelector('.button');

button.onclick = function () {
	console.log('Клик!');
}
button.onclick = function () {
	console.log('Клак!');
}
*/

//====================================================================================================================//

// Способ назначения обработчиков при помощи специального метода addEventListener даёт возможность повесить несколько
// обработчиков на одно событие Для удаления обработчика следует использовать removeEventListener

// Синтаксис добавления обработчика:

// element.addEventListener(event, handler, [options]), где

// event - Имя события, например "click".
// handler - Ссылка на функцию-обработчик.
// options - Дополнительный объект со свойствами:
// - once: если true, тогда обработчик будет автоматически удалён после выполнения.
// - capture: фаза, на которой должен сработать обработчик, подробнее об этом будет рассказано в главе Всплытие и
// погружение. Так исторически сложилось, что options может быть false/true, это то же самое, что {capture: false/true}.
// - passive: если true, то указывает, что обработчик никогда не вызовет preventDefault(), подробнее об этом будет рассказано в главе Действия браузера по умолчанию.

button.addEventListener("click", function (e) {
	console.log('Клик!'); // Клик!
});
button.addEventListener("click", function (e) {
	console.log('Клак!'); // Клак!
});

// Мы также можем вынести код который хотим чтобы был выполнен в отдельную функцию:

function showConsole() {
	console.log('Щелчок!');
	button.removeEventListener("click", showConsole); // Для удаления обработчика следует использовать removeEventListener:
}
button.addEventListener("click", showConsole);

// Удаление требует именно ту же функцию:

//Для удаления нужно передать именно ту функцию-обработчик которая была назначена.

//  Вот так не сработает:

// elem.addEventListener( "click" , () => alert('Спасибо!'));
// ....
// elem.removeEventListener( "click", () => alert('Спасибо!'));
// Обработчик не будет удалён, т.к. в removeEventListener передана не та же функция, а другая, с одинаковым кодом, но это не важно.

// Вот так правильно:

/*
function handler() {
	alert('Спасибо!');
}
input.addEventListener("click", handler);
// ....
input.removeEventListener("click", handler);
 */

// Обратим внимание – если функцию обработчик не сохранить где-либо, мы не сможем её удалить. Нет метода, который
// позволяет получить из элемента обработчики событий, назначенные через addEventListener


// Передадим методу: addEventListener 3-ий параметр - опции:

const options = {
	"capture": false, // фаза, на которой должен сработать обработчик
	"once": false, // если true, тогда обработчик будет автоматически удалён после выполнения.
	"passive": false // если true, то указывает, что обработчик никогда не вызовет preventDefault()
}
function showConsoleOpt() {
	console.log('опции применены!');
}

button.addEventListener("click", showConsoleOpt, options); // записали опции (параметры) сославшись на объект
//button.addEventListener("click", showConsoleOpt, { "capture": false, "once": true, "passive": false }); // записали опции (параметры) непосредственно (внутри фигурных скобок, через запятую)


/*
Метод addEventListener может показаться сложнее чем, скажем, onclick.
Но, из-за того что он обладает преимуществом
"прослушивания" нескольких событий,
а также учитывая тот факт что существуют события которые можно отловить
только при помощи этого метода.
В результате разработчики чаще используют именно его.
*/

//====================================================================================================================//

// Объект события

// Чтобы хорошо обработать событие, могут понадобиться детали того, что произошло. Не просто «клик» или «нажатие клавиши», а также – какие координаты указателя мыши, какая клавиша нажата и так далее.

// Когда происходит событие, браузер создаёт объект события, записывает в него детали и передаёт его в качестве аргумента (называть его принято: event) функции-обработчику

function showConsoleEv(event) {
	// Тип события
	//console.log(event.type);
	// Объект на котором сработал обработчик
	//console.log(event.target);
	// Объект к которому назначен обработчик
	//console.log(event.currentTarget);
	// Положение курсора по оси X
	//console.log(event.clientX);
	// Положение курсора по оси Y
	//console.log(event.clientY);

	// Все детали события
	//console.log(event);
}

button.addEventListener("click", showConsoleEv);
//button.addEventListener("mouseenter", showConsole);


//===================================================


// Всплытие и погружение
/*
const block = document.querySelector('.block');
const blockInner = document.querySelector('.block__inner');
const blockInnerInner = document.querySelector('.block__inner-inner');
*/
/*
Всплытие
Когда на элементе происходит событие, обработчики
сначала срабатывают на нём, потом на его родителе,
затем выше и так далее, вверх по цепочке предков.
*/
/*
Погружение
Для того чтобы что-то всплыло, оно должно сначало погрузиться :)
*/
/*
block.addEventListener("click", function (event) {
	console.log('Клик на Блок!');
	//console.log(event.target);
});
blockInner.addEventListener("click", function (event) {
	console.log('Клик на Блок второго уровня!');
}, { "capture": false });
blockInnerInner.addEventListener("click", function (event) {
	console.log('Клик на Блок третьего уровня!');
	// Остановка всплытия
	//event.stopPropagation();
});
*/
/*
В современной разработке стадия погружения используется очень редко,
обычно события обрабатываются во время всплытия.
*/

//===================================================

// Делегирование событий

/*
Всплытие и перехват событий позволяет реализовать
один из самых важных приёмов разработки – делегирование.
*/
/*
const button = document.querySelectorAll('.button');

function showConsole() {
	console.log('Ура!');
}
button.forEach(buttonItem => {
	buttonItem.addEventListener("click", showConsole);
});
*/

// -----------------

/*
const lesson = document.querySelector('.lesson');

function showConsole() {
	console.log('Ура!');
}
lesson.addEventListener("click", function (event) {
	if (event.target.closest('.button')) {
		showConsole();
	}
});
*/


// Пример с меню
/*
const menuBody = document.querySelector('.menu');

document.addEventListener("click", menu);

function menu(event) {
	if (event.target.closest('.menu__button')) {
		menuBody.classList.toggle('_active');
	}
	if (!event.target.closest('.menu')) {
		menuBody.classList.remove('_active');
	}
}
*/

//===================================================

// Действия браузера по умолчанию

/*
Многие события автоматически влекут за собой действие браузера.
Например:
- Клик по ссылке инициирует переход на новый URL.
- Нажатие на кнопку «отправить» в форме – отсылку её на сервер.
- Зажатие кнопки мыши над текстом и её движение
	в таком состоянии – инициирует его выделение и т.д.

Если мы обрабатываем событие в JavaScript,
то зачастую такое действие браузера нам не нужно.
К счастью, его можно отменить.
*/
/*
const link = document.querySelector('.link');
*/
/*
link.addEventListener("click", function (event) {
	console.log('Наши действия');
	// отменить действие браузера (переход по ссылке)
	event.preventDefault();
});
*/
/*
link.onclick = function () {
	console.log('Наши действия');
	// отменить действие браузера (переход по ссылке)
	return false;
}
*/

/*
Необязательная опция passive: true для addEventListener
сигнализирует браузеру, что обработчик не собирается выполнять
preventDefault(). Почему это может быть полезно ?
Есть некоторые события, как touchmove на мобильных
устройствах(когда пользователь перемещает палец по экрану),
которое по умолчанию начинает прокрутку, но мы можем отменить
это действие, используя preventDefault() в обработчике.
Поэтому, когда браузер обнаружит такое событие,
он должен для начала запустить все обработчики и после,
если preventDefault не вызывается нигде, он может начать прокрутку.
Это может вызвать ненужные задержки в пользовательском интерфейсе.
Опция passive: true сообщает браузеру, что обработчик
не собирается отменять прокрутку.Тогда браузер начинает её немедленно,
обеспечивая максимально плавный интерфейс, параллельно обрабатывая событие.
Для некоторых браузеров(Firefox, Chrome) опция passive по умолчанию
включена в true для таких событий, как touchstart и touchmove.
*/
/*
const link = document.querySelector('.link');

link.addEventListener("click", function (event) {
	console.log('Наши действия');
	// отменить действие браузера (переход по ссылке)
	event.preventDefault();
}, { "passive": true });
*/
//===================================================

// Основы событий мыши

// Типы событий мыши
/*
Мы можем разделить события мыши на две категории:
«простые» и «комплексные».
*/

// Простые события
//Самые часто используемые простые события:
/*
mousedown / mouseup - Кнопка мыши нажата / отпущена над элементом.
mouseover / mouseout - Курсор мыши появляется над элементом и уходит с него.
mousemove - Каждое движение мыши над элементом генерирует это событие.
contextmenu - Вызывается при попытке открытия контекстного меню,
					как правило, нажатием правой кнопки мыши.
					Но, заметим, это не совсем событие мыши,
					оно может вызываться и специальной клавишей клавиатуры.
*/
//Комплексные события
/*
click - Вызывается при mousedown, а затем mouseup над одним
и тем же элементом, если использовалась основная кнопка мыши.
dblclick - Вызывается двойным кликом на элементе.
Комплексные события состоят из простых, поэтому
в теории мы могли бы без них обойтись.
Но хорошо, что они существуют, потому что работать с ними очень удобно.
*/


/*
const button = document.querySelector('.button');

button.addEventListener("mousedown", function (event) {
	console.log(`Нажата кнопка ${event.which}`);
});

button.addEventListener("click", function (event) {
	console.log('Нажата основная кнопка мыши');
});

button.addEventListener("contextmenu", function (event) {
	console.log('Вызвано контекстное меню (не основная кнопка мыши)');
});
*/
/*
event.which = 1 - Нажата основная кнопка мыши (обычно левая)
event.which = 2 - Нажата средняя кнопка мыши (колесо)
event.which = 3 - Нажата не основная кнопка мыши (обычно правая)
*/

// Координаты: clientX/Y, pageX/Y
/*
const blockForMouse = document.querySelector('.block-for-mouse');

blockForMouse.addEventListener("mousemove", function (event) {
	blockForMouse.innerHTML =
		`clientX - ${event.clientX} <br> clientY - ${event.clientY}`;
});
*/

//------------------

// Наведение мыши: mouseover/out, mouseenter/leave

//События mouseover/mouseout, relatedTarget

/*
Событие mouseover происходит в момент, когда курсор оказывается
над элементом, а событие mouseout – в момент,
когда курсор уходит с элемента.
*/
/*
const blockForMouse = document.querySelector('.block-for-mouse');

blockForMouse.addEventListener("mouseover", function (event) {
	blockForMouse.innerHTML = `Курсор над элементом`;
});
blockForMouse.addEventListener("mouseout", function (event) {
	blockForMouse.innerHTML = `Курсор уходит с элемента`;
});
*/

/*
Эти события являются особенными, потому что у них имеется свойство
relatedTarget. Оно «дополняет» target. Когда мышь переходит
с одного элемента на другой, то один из них будет target,
а другой relatedTarget.

Для события mouseover:
event.target – это элемент, на который курсор перешёл.
event.relatedTarget – это элемент,
с которого курсор ушёл(relatedTarget → target).

Для события mouseout наоборот:
event.target – это элемент, с которого курсор ушёл.
event.relatedTarget – это элемент,
на который курсор перешёл(target → relatedTarget).
*/
/*
const blockForMouse = document.querySelector('.block-for-mouse');

blockForMouse.addEventListener("mouseover", function (event) {
	console.log(event.target);
	console.log(event.relatedTarget);
});
blockForMouse.addEventListener("mouseout", function (event) {
	console.log(event.target);
	console.log(event.relatedTarget);
});
*/

/*
const blockForMouse = document.querySelector('.block-for-mouse');

blockForMouse.addEventListener("mouseover", function (event) {
	console.log(`Курсор над элементом`);
});
blockForMouse.addEventListener("mouseout", function (event) {
	console.log(`Курсор уходит с элемента`);
});
*/


// События mouseenter и mouseleave
/*
Пара важных отличий:
1) Переходы внутри элемента, на его потомки и с них, не считаются.
2) События mouseenter / mouseleave не всплывают.
*/
/*
const blockForMouse = document.querySelector('.block-for-mouse');

blockForMouse.addEventListener("mouseenter", function (event) {
	console.log(`Курсор над элементом`);
});
blockForMouse.addEventListener("mouseleave", function (event) {
	console.log(`Курсор уходит с элемента`);
});
*/

//Делегирование событий наведения мыши
/*
const blockForMouse = document.querySelector('.block-for-mouse');
blockForMouse.addEventListener("mouseover", function (event) {
	let target = event.target.closest('span');
	// переход не на <span> - игнорировать
	if (!target) return;
	target.style.cssText = `background-color: #77608d;`;
});
blockForMouse.addEventListener("mouseout", function (event) {
	let target = event.target.closest('span');
	// переход не на <span> - игнорировать
	if (!target) return;
	target.style.cssText = ``;
});
*/

//-------------------------

// Перетаскивание Drag`n`Drop
/*
const gragField = document.querySelector('.drag-field');
const gragItem = document.querySelector('.drag-field__item');

gragItem.addEventListener("mousedown", function (event) {

	let coordsItemX = event.clientX - gragItem.getBoundingClientRect().left;
	let coordsItemY = event.clientY - gragItem.getBoundingClientRect().top;

	let gragItemSizes = {
		width: gragItem.offsetWidth,
		height: gragItem.offsetHeight
	}
	let gragFieldSizes = {
		left: gragField.getBoundingClientRect().left + scrollX,
		top: gragField.getBoundingClientRect().top + scrollY,
		right: gragField.getBoundingClientRect().left + scrollX + gragField.offsetWidth,
		bottom: gragField.getBoundingClientRect().top + scrollY + gragField.offsetHeight
	}

	gragItem.style.position = 'absolute';
	gragItem.style.zIndex = 1000;
	document.body.append(gragItem);

	moveItem(event.pageX, event.pageY);

	function moveItem(pageX, pageY) {
		let currentX = pageX - coordsItemX;
		let currentY = pageY - coordsItemY;

		if (
			currentX + gragItemSizes.width <= gragFieldSizes.right &&
			currentX >= gragFieldSizes.left
		) {
			gragItem.style.left = `${currentX}px`;
		} else {
			if (currentX + gragItemSizes.width > gragFieldSizes.right) {
				gragItem.style.left = `${gragFieldSizes.right - gragItemSizes.width}px`;
			}
			if (currentX < gragFieldSizes.left) {
				gragItem.style.left = `${gragFieldSizes.left}px`;
			}
		}
		if (
			currentY + gragItemSizes.height <= gragFieldSizes.bottom &&
			currentY >= gragFieldSizes.top
		) {
			gragItem.style.top = `${currentY}px`;
		} else {
			if (currentY + gragItemSizes.height > gragFieldSizes.bottom) {
				gragItem.style.top = `${gragFieldSizes.bottom - gragItemSizes.height}px`;
			}
			if (currentY < gragFieldSizes.top) {
				gragItem.style.top = `${gragFieldSizes.top}px`;
			}
		}
	}

	let currentDroppable = null;

	function onDragItem(event) {
		moveItem(event.pageX, event.pageY);

		gragItem.hidden = true;
		let elemBelow = document.elementFromPoint(event.clientX, event.clientY);
		gragItem.hidden = false;

		if (!elemBelow) return;
		let droppableBelow = elemBelow.closest('.drag-field__point');

		if (currentDroppable !== droppableBelow) {
			if (currentDroppable) {
				currentDroppable.classList.remove('_active');
				gragItem.classList.remove('_active');
			}
			currentDroppable = droppableBelow;
			if (currentDroppable) {
				currentDroppable.classList.add('_active');
				gragItem.classList.add('_active');
			}
		}
	}
	document.addEventListener('mousemove', onDragItem);

	document.addEventListener("mouseup", function (event) {
		document.removeEventListener('mousemove', onDragItem);
	}, { "once": true });
});
gragItem.addEventListener("dragstart", function (event) {
	event.preventDefault();
});
*/


//===================================================

// Клавиатура

/*
Основные события при работе с клавиатурой это:
	keydown – происходит при нажатии клавиши
	keyup – при отпускании клавиши
*/

// event.code и event.key

/*
document.addEventListener("keydown", function (event) {
	console.log(`Нажата клавиша ${event.code} (${event.key})`);
});
document.addEventListener("keyup", function (event) {
	console.log(`Отжата клавиша ${event.code} (${event.key})`);
});
*/

/*
Если пользователь работает с разными языками, то при переключении
на другой язык символ изменится с "G" на совершенно другой.
Получившееся станет новым значением event.key,
тогда как event.code останется тем же: "KeyG".
*/

/*
document.addEventListener('keydown', function (event) {
	if (event.code == 'KeyZ' && (event.ctrlKey || event.metaKey)) {
		console.log('Отмена действия!');
	}
});
*/


/*
Автоповтор
При долгом нажатии клавиши возникает автоповтор: keydown срабатывает
снова и снова, и когда клавишу отпускают, то отрабатывает keyup.
Так что ситуация, когда много keydown и один keyup, абсолютно нормальна.
Для событий, вызванных автоповтором, у объекта события
свойство event.repeat равно true.
*/
/*
document.addEventListener("keydown", function (event) {
	console.log(`Нажата клавиша ${event.code} (${event.key})`);
	console.log(event.repeat);
});
*/

/*
// Пример
const txtItem = document.querySelector('.textarea__item');
const txtItemLimit = txtItem.getAttribute('maxlength');
const txtCounter = document.querySelector('.textarea__counter span');
txtCounter.innerHTML = txtItemLimit;

txtItem.addEventListener("keyup", txtSetCounter);
txtItem.addEventListener("keydown", function (event) {
	if (event.repeat) txtSetCounter();
});

function txtSetCounter() {
	const txtCounterResult = txtItemLimit - txtItem.value.length;
	txtCounter.innerHTML = txtCounterResult;
}
*/

/*
document.addEventListener('keyup', function (event) {
	if (event.code === 'Escape') {
		menuBody.classList.remove('_active');
	}
});
*/

//===================================================

// Прокрутка (скролл)
/*
window.addEventListener('scroll', function (event) {
	//кол-во прокрученных пикселей по вертикали
	// scrollY или pageYOffset (устарел)
	// кол-во прокрученных пикселей по горизонтали
	// scrollX или pageXOffset (устарел)

	console.log(`${scrollY}px`);
});
*/
// Предотвращение прокрутки
/*
Нельзя предотвратить прокрутку, используя event.preventDefault()
в обработчике scroll,  потому что он срабатывает после того,
как прокрутка уже произошла.

Но можно предотвратить прокрутку, используя event.preventDefault()
на событии, которое вызывает прокрутку, например,
на событии keydown для клавиш pageUp и pageDown.

Способов инициировать прокрутку много, более надёжный
способ – использовать CSS, свойство overflow: hidden;.
*/


/*
Использование

Событие прокрутки scroll позволяет реагировать на прокрутку страницы
или элемента. Есть много хороших вещей, которые при этом можно сделать.

- Показать / скрыть дополнительные элементы управления или информацию,
основываясь на том, в какой части документа находится пользователь.
Например анимация при скроле или ленивая подгрузка
- Подгрузить данные, когда пользователь прокручивает страницу вниз
до конца. Бесконечный скрол.

По ссылкам в описании есть видео с примерами реализации этого
функционала с помощью события scroll. Но, более интересным решением
данных задач будет использование IntersectionObserver, который позволяет
веб-приложениям асинхронно следить за изменением пересечения
элемента с его родителем или областью видимости документа.

Подробно об IntersectionObserver я расскажу в отдельном видео

*/

//===================================================

// События загрузки страницы
/*
1) DOMContentLoaded – браузер полностью загрузил HTML,
	было построено DOM - дерево, но внешние ресурсы,
	такие как картинки <img> и стили, могут быть ещё не загружены.
2) load – браузер загрузил HTML и внешние ресурсы (картинки, стили и т.д.)
3) beforeunload / unload – пользователь покидает страницу.
*/

/*
document.readyState - состояние загрузки

Есть три возможных значения:
"loading" – документ загружается.
"interactive" – документ был полностью прочитан.
"complete" – документ был полностью прочитан
и все ресурсы(такие как изображения) были тоже загружены.
*/


/*
// Событие DOMContentLoaded срабатывает на объекте document
document.addEventListener("DOMContentLoaded", readyDom);

// Событие load срабатывает на объекте window
window.addEventListener("load", readyLoad);

function readyDom() {
	const image = document.querySelector('.image');
	console.log(document.readyState);
	console.log('DOM загружен!');
	console.log(image.offsetWidth);
}
function readyLoad() {
	console.log(document.readyState);
	const image = document.querySelector('.image');
	console.log('Страница загружена!');
	console.log(image.offsetWidth);
}
*/


/*
// Событие beforeunload срабатывает на объекте window
window.addEventListener("beforeunload", beforeUnLoad);

function beforeUnLoad(event) {
	// Отмените событие, как указано в стандарте.
	event.preventDefault();
	// Chrome требует установки возвратного значения.
	event.returnValue = '';
}


// Событие unload срабатывает на объекте window
window.addEventListener("unload", function (e) {
	// Отправка статистики в фоновом режиме и т.д.
	// navigator.sendBeacon(url, data)
	// https://w3c.github.io/beacon/.
});
*/

//========================================================================================================================================================
//========================================================================================================================================================
//========================================================================================================================================================