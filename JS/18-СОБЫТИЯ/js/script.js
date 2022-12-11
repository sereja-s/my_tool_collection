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

	// console.log(event.type); // Тип события (показывает какое именно событие произошло)

	// console.log(event.target); // Объект на котором сработал обработчик (вернёт «целевой» элемент, на котором произошло событие) Это может быть и сам объект, и его дочерние объекты (если наведение при срабатывании обаботчика было на них)

	// console.log(event.currentTarget); // Получим только тот объект к которому назначен обработчик (без его дочерних объектов)

	// Получим координаты курсора относительно окна браузера в тот момент когда сработал обработчик(произошло событие):	
	// console.log(event.clientX); // Положение курсора по оси X	
	// console.log(event.clientY); // Положение курсора по оси Y

	// получим все детали события
	console.log(event); // PointerEvent {,,,}
}

button.addEventListener("click", showConsoleEv);
//button.addEventListener("mouseenter", showConsoleEv);


//===================================================


// Всплытие и погружение

// получим объекты в константу
const block = document.querySelector('.block');
const blockInner = document.querySelector('.block__inner');
const blockInnerInner = document.querySelector('.block__inner-inner');

// Всплытие

// Когда на элементе происходит событие, обработчики сначала срабатывают на нём, потом на его родителе, затем выше и так далее, вверх по цепочке предков

// Прекращение всплытия

// Всплытие идёт с «целевого» элемента прямо наверх (по цепочке предков). По умолчанию событие будет всплывать до
// элемента <html>, а затем до объекта document, а иногда даже до window, вызывая все обработчики на своём пути.
// Но любой промежуточный обработчик может решить, что событие полностью обработано, и остановить всплытие.
// Для этого нужно вызвать метод event.stopPropagation()

// Пример:

// каждому из уровней объекта задали обработчик:
block.addEventListener("click", function (event) {
	console.log('Клик на Блок!'); // Клик на Блок!
	// console.log(event.target); // вернёт объект на котором сработало событие
});

blockInner.addEventListener("click", function (event) {
	console.log('Клик на Блок второго уровня!'); // Клик на Блок второго уровня! Клик на Блок!
}, { "capture": true }); // в момент погружения отловили обработчик второго уровня и вывели его в консоль (без { "capture": true } или со значением: false ничего не отлавливается при погружении и всплытие происходит в штатном режиме)

blockInnerInner.addEventListener("click", function (event) {
	console.log('Клик на Блок третьего уровня!'); // Клик на Блок третьего уровня! Клик на Блок второго уровня! Клик на Блок!
	// Остановка всплытия произойдёт на блоке третьего уровня
	// event.stopPropagation();
});
// из примера видим, что происходит всплытие (т.е. срабатывание обработчика вверх по цепочке предков, начиная с объекта
// на котором произошло событие) если не указано где то event.stopPropagation()

//-------------------------------------------------------------------------------------------------------------------//

/*
В современной разработке стадия погружения используется очень редко,
обычно события обрабатываются во время всплытия.
*/

// Погружение

// Существует ещё одна фаза из жизненного цикла события – «погружение» (иногда её называют «перехват»). Она очень редко
// используется в реальном коде, однако тоже может быть полезной.

// Стандарт DOM Events описывает 3 фазы прохода события:

// - Фаза погружения (capturing phase) – событие сначала идёт сверху вниз.
// - Фаза цели (target phase) – событие достигло целевого(исходного) элемента.
// - Фаза всплытия (bubbling stage) – событие начинает всплывать

// То есть при клике на объект событие путешествует по цепочке родителей сначала вниз к элементу (погружается), затем оно достигает целевой элемент (фаза цели), а потом идёт наверх (всплытие), вызывая по пути обработчики.

// Ранее мы говорили только о всплытии, потому что другие стадии, как правило, не используются и проходят незаметно для нас.

// Обработчики, добавленные через on <event>-свойство или через HTML-атрибуты, или через addEventListener(event,
// handler) с двумя аргументами, ничего не знают о фазе погружения, а работают только на 2 - ой и 3 - ей фазах.

// Чтобы поймать событие на стадии погружения, нужно использовать третий аргумент capture вот так:

// elem.addEventListener(..., { capture: true })
// или просто "true", как сокращение для {capture: true}
// elem.addEventListener(..., true)

// Существуют два варианта значений опции capture:

// - Если аргумент false(по умолчанию), то событие будет поймано при всплытии.
// - Если аргумент true, то событие будет перехвачено при погружении.
// Обратите внимание, что хоть и формально существует 3 фазы, 2-ую фазу(«фазу цели»: событие достигло элемента) нельзя обработать отдельно, при её достижении вызываются все обработчики: и на всплытие, и на погружение

//====================================================================================================================//

// Делегирование событий

// Всплытие и перехват событий позволяет реализовать один из самых важных приёмов разработки – делегирование.

// Идея в том, что если у нас есть много элементов, события на которых нужно обрабатывать похожим образом, то вместо
// того, чтобы назначать обработчик каждому, мы ставим один обработчик на их общего предка.

// Из него можно получить целевой элемент event.target, понять на каком именно потомке произошло событие и обработать его


// В примере при клике на каждую кнопку должен срабатывать один и тот же код:

// получим коллекцию кнопок (все кнопки с указанным классом)
const buttonAll = document.querySelectorAll('.button__del');

function showConsole2() {
	console.log('Ура!');
}
// пробежимся по ним в цикле и каждой навесим обработчик
buttonAll.forEach(buttonItem => {
	buttonItem.addEventListener("click", showConsole2);
}); // такой способ может напрягать браузер если таких объектов будет много


// Применим делегирование событий (только один обработчик):
// Пересмотрим логику навешивания обработчика и вместо того чтобы назначать обработчик каждому нужному элементу, мы назначим обработчик для их родителя

// получаем родителя наших объектов (кнопок)
const lessonDel = document.querySelector('.lesson__del');

function showConsoleDel() {
	console.log('Ура! Делегирование!');
}

// вешаем на родителя обработчик (по событию: click будем выполнять function (event) по условию)
lessonDel.addEventListener("click", function (event) {
	// определим на что мы кликнули и если это кнопка, тогда выполняем указанную ф-ию
	// (в условии: обращаемся к event.target(получаем объект с которым взаимодействовали) и с помощью метода: closest() проверяем кнопка ли это или мы кликнули на дочерний объект внутри кнопки) если Да, то выполняем ф-ию
	if (event.target.closest('.button__del')) {
		showConsoleDel();
	}
});

// Пример делегирования событий с меню

// получаем родителя
const menuBody = document.querySelector('.menu');

// на документ вешаем событие: click, при возникновении которого вызывается указанная функция
document.addEventListener("click", menuClick);

function menuClick(event) {
	// отлавливаем момент, когда нажали на кнопку-меню (или вложенный в него объект)
	if (event.target.closest('.menu__button')) {
		// добаляем или убираем класс: _active
		menuBody.classList.toggle('_active');
	}
	// что бы иметь возможность закрыть меню при клике вне кнопки (вне общего объекта: menu)
	if (!event.target.closest('.menu')) {
		// отбираем класс: _active
		menuBody.classList.remove('_active');
	}
}

// Применение делегирования: действия в разметке

// Есть и другие применения делегирования:

// Например, нам нужно сделать меню с разными кнопками: «Сохранить (save)», «Загрузить (load)», «Поиск (search)» и т.д.
// И есть объект с соответствующими методами save, load, search… Как их состыковать?

// Первое, что может прийти в голову – это найти каждую кнопку и назначить ей свой обработчик среди методов объекта. Но
// существует более элегантное решение:

// Мы можем добавить один обработчик для всего меню и атрибуты data-action для каждой кнопки в соответствии с методами, которые они вызывают Обработчик считывает содержимое атрибута и выполняет метод:

class Menu {
	constructor(elem) {
		this._elem = elem;
		elem.onclick = this.onClick.bind(this); // метод this.onClick привязывается к контексту текущего объекта this. Это 
		// важно, т.к. иначе this внутри него будет ссылаться на DOM-элемент (elem), а не на объект Menu, и this[action] будет не тем, что нам нужно
	}

	save() {
		alert('сохраняю');
	}

	load() {
		alert('загружаю');
	}

	search() {
		alert('ищу');
	}

	onClick(event) {
		let action = event.target.dataset.action;
		if (action) {
			this[action]();
		}
	}
}

new Menu(menu);
// Так что же даёт нам здесь делегирование?

// - Не нужно писать код, чтобы присвоить обработчик каждой кнопке. Достаточно просто создать один метод и поместить его в разметку.
// - Структура HTML становится по-настоящему гибкой. Мы можем добавлять/удалять кнопки в любое время

//--------------------------------------------------------------------------------------------------------------------//

// Приём проектирования «поведение»

// Делегирование событий можно использовать для добавления элементам «поведения» (behavior), декларативно задавая хитрые
// обработчики установкой специальных HTML-атрибутов и классов.

// Приём проектирования «поведение» состоит из двух частей:

// - Элементу ставится пользовательский атрибут, описывающий его поведение.
// - При помощи делегирования ставится обработчик на документ, который ловит все клики (или другие события) и, если элемент имеет нужный атрибут, производит соответствующее действие

// 1) Поведение: «Счётчик»

//Например, здесь HTML-атрибут data-counter добавляет кнопкам поведение: «увеличить значение при клике»
document.addEventListener('click', function (event) {

	if (event.target.dataset.counter != undefined) { // если есть атрибут...
		event.target.value++;
	}

});
// Если нажать на кнопку – значение увеличится. Конечно, нам важны не счётчики, а общий подход, который здесь продемонстрирован.

// Элементов с атрибутом data-counter может быть сколько угодно. Новые могут добавляться в HTML-код в любой момент. При
// помощи делегирования мы фактически добавили новый «псевдостандартный» атрибут в HTML, который добавляет элементу новую возможность («поведение»)

//---------------------------------------------------------------------------------------------------------------------//

// Всегда используйте метод addEventListener для обработчиков на уровне документа

// Когда мы устанавливаем обработчик событий на объект document, мы всегда должны использовать метод addEventListener, а
// не document.on<событие>, т.к. в случае последнего могут возникать конфликты: новые обработчики будут перезаписывать уже существующие.

// Для реального проекта совершенно нормально иметь много обработчиков на элементе document, установленных из разных частей кода

//---------------------------------------------------------------------------------------------------------------------//

// 2) Поведение: «Переключатель» (Toggler)

// Ещё один пример поведения.Сделаем так, что при клике на элемент с атрибутом data - toggle - id будет скрываться / показываться элемент с заданным id:
document.addEventListener('click', function (event) {
	let id = event.target.dataset.toggleId;
	if (!id) return;

	let elem = document.getElementById(id);

	elem.hidden = !elem.hidden;
});
// Ещё раз подчеркнём, что мы сделали. Теперь для того, чтобы добавить скрытие-раскрытие любому элементу, даже не надо знать JavaScript, можно просто написать атрибут data-toggle-id.

// Это бывает очень удобно – не нужно писать JavaScript-код для каждого элемента, который должен так себя вести. Просто
// используем поведение. Обработчики на уровне документа сделают это возможным для элемента в любом месте страницы.

// Мы можем комбинировать несколько вариантов поведения на одном элементе.

// Шаблон «поведение» может служить альтернативой для фрагментов JS-кода в вёрстке


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