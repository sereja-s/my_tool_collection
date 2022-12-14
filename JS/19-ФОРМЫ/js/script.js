// Свойства и методы форм

// Коллекция всех форм на странице
// document.forms

// Получить коллекцию всех форм на странице
console.log(document.forms); // HTMLCollection[form.main-form, main: form.main-form]


// Получить конкретную форму на странице

const mainForm = document.forms[0];
console.log(mainForm);


// Атрибут name (получим конкретную форму по имени атрибута):

const mainForm2 = document.forms.main;
console.log(mainForm2);


//--------------------------------------------------------------------------------------------------------------------//

// Разница между document.forms и document.querySelectorAll('form'):

// Коллекция
console.log(document.querySelectorAll('form'));

// Живая коллекции (пользоваться нужно этим методом)
console.log(document.forms);


// Добавление новой формы
document.body.insertAdjacentHTML(
	"beforeend",
	`<form name="some" class="some-form" action="#"></form>`
);


//====================================

// document.forms.elements

// Формы в документе входят в специальную коллекцию document.forms.

// Это так называемая «именованная» коллекция: мы можем использовать для получения формы как её имя, так и порядковый номер в документе:
const mainForm3 = document.forms.main;
// Когда мы уже получили форму, любой элемент доступен в именованной коллекции form.elements
console.log(mainForm3.elements); // HTMLFormControlsCollection - список всех элементов внутри даной формы


// Получаем конкретный элемент с именем nameInput
const mainFormInput = mainForm.elements.nameInput;
// или можно упростить: mainForm.nameInput
console.log(mainFormInput); // получим искомый элемент


// Получаем коллекцию с именем nameRadio (для всех радиокнопок одной группы значение атрибута: name должно быть одинаковое)
const mainFormRadioButtons = mainForm.nameRadio;
// или mainForm.elements.nameRadio
console.log(mainFormRadioButtons); // соответственно получаем коллекцию

//---------------------------------------------------------------------------------------------------------------------//

// Обратная ссылка: element.form

// Для любого элемента, форма доступна через element.form и мы можем получить объект родительской формы для этого
// элемента Так что форма ссылается на все элементы, а эти элементы ссылаются на форму

// мы можем получить объект родительской формы для этого элемента
console.log(mainFormInput.form);

//---------------------------------------------------------------------------------------------------------------------//

// Элементы формы

// Рассмотрим элементы управления, используемые в формах.

// input и textarea

// К их значению можно получить доступ через свойство input.value (строка) или input.checked (булево значение) для чекбоксов и радиокнопок

// получаем форму
const mainForm4 = document.forms.main;

// получаем поле ввода: Input
const mainFormInput2 = mainForm4.nameInput;
// получаем поле ввода: Textarea
const mainFormTextarea = mainForm4.nameTextarea;


// Получить значение (седержимое) поля
console.log(mainFormInput2.value); // значение value не заполнено
// Получить значение (седержимое) текстового поля
console.log(mainFormTextarea.value);

//---------------------------------------------------------------------------------------------------------------------//

// Вносим изменения в форму:

// Присвоить значение (содержимое) поля
//mainFormInput2.value = "Пока";
// Присвоить значение (содержимое) текстового поля
//mainFormTextarea.value = "До встречи!";

//---------------------------------------------------------------------------------------------------------------------//

// Значения элементов формы доступны через input.value, textarea.value, select.value и т.д. либо input.checked для чекбоксов и переключателей

// получаем форму
const mainForm5 = document.forms.main;

const mainFormRadioButtons2 = mainForm5.nameRadio;
const mainFormCheckBox = mainForm5.nameCheck;
const mainFormFile = mainForm5.nameFile;

// Получить значение поля type radio

console.log(mainFormRadioButtons2[0].value); // on (по умолчанию) т.к. атрибут value ничем не заполнен
console.log(mainFormRadioButtons2[1].value); // on
// проверяем выбрана ли кнопка в данный момент
console.log(mainFormRadioButtons2[0].checked); // true
console.log(mainFormRadioButtons2[1].checked); // false

// Получить значение поля type checkbox

console.log(mainFormCheckBox.value); // on (по умолчанию) т.к. атрибут value ничем не заполнен
console.log(mainFormCheckBox.checked); // false


// Получить значение поля type file
console.log(mainFormFile.value); // пусто, т.к. никакой файл не выбран

//---------------------------------------------------------------------------------------------------------------------//

// Присваивание значения элементам:

// получаем форму
const mainForm6 = document.forms.main;

const mainFormRadioButtons3 = mainForm6.nameRadio;
const mainFormCheckBox3 = mainForm6.nameCheck;
const mainFormFile3 = mainForm6.nameFile;

// Назначить значение поля type radio

mainFormRadioButtons3[0].value = "left";
mainFormRadioButtons3[1].value = "right";
mainFormRadioButtons3[1].checked = true; // теперь выбрана 2-ая кнопка


// Назначить значение поля type checkbox

mainFormCheckBox3.value = "save"; // устанавливаем новое значение
mainFormCheckBox3.checked = true; // выбран


// Назначить значение поля type file
mainFormFile.value = ""; // задать значение нельзя, можем только передать пустую строку (очистить)

//=====================================================================================================================//

// Работа с выпадающим списком select и его элементами: option


// Элемент <select> имеет 3 важных свойства:

// - select.options – коллекция из подэлементов <option>,
// - select.value – значение выбранного в данный момент <option>,
// - select.selectedIndex – номер выбранного <option>.

// Они дают три разных способа установить значение в <select>:

// - Найти соответствующий элемент < option > и установить в option.selected значение true.
// - Установить в select.value значение нужного < option >.
// - Установить в select.selectedIndex номер нужного < option >.

// Первый способ наиболее понятный, но(2) и(3) являются более удобными при работе.

// получаем объект (форму)
const mainForm7 = document.forms.main;
// получаем элемент списка
const mainFormSelect = mainForm7.nameSelect;

// Получить список все подэлементов: options
console.log(mainFormSelect.options); // HTMLOptionsCollection

// Получить индекс выбранного option
const mainFormSelectIndex = mainFormSelect.selectedIndex;
console.log(mainFormSelectIndex); // 0

// Получить значение выбранного option
const mainFormSelectValue = mainFormSelect.value;
console.log(mainFormSelectValue); // 1

// Получить текст выбранного option
const mainFormSelectText = mainFormSelect.options[mainFormSelectIndex].text;
console.log(mainFormSelectText); // 20

//--------------------------------------------------------------------------------------------------------------------//

// Элементы <option> имеют свойства:

// - option.selected - Выбрана ли опция.
// - option.index - Номер опции среди других в списке <select>.
// - option.value - Значение опции.
// - option.text - Содержимое опции (то, что видит посетитель)


// получаем объект (форму)
const mainForm8 = document.forms.main;
// получаем элемент списка
const mainFormSelect8 = mainForm8.nameSelect;

// Выбрать некий option (3-и способа)
//mainFormSelect8.options[1].selected = true;
//mainFormSelect8.selectedIndex = 1;
//mainFormSelect8.value = 2;

// Параметры:
// - text – текст внутри <option>,
// - value – значение,
// - defaultSelected – если true, то ставится HTML - атрибут selected,
// - selected – если true, то элемент <option> будет выбранным.

// Тут может быть небольшая путаница с defaultSelected и selected.

// Всё просто: defaultSelected задаёт HTML-атрибут, его можно получить как option.getAttribute('selected'), а selected –
// выбрано значение или нет, именно его важно поставить правильно. Впрочем, обычно ставят оба этих значения в true или не ставят вовсе(т.е.false).

//--------------------------------------------------------------------------------------------------------------------//

// Добавить новую опцию: new Option

// короткий синтаксис для создания элемента <option>:
// option = new Option(text, value, defaultSelected, selected);

// Параметры:
// text – текст внутри < option >,
// value – значение,
// defaultSelected – если true, то ставится HTML - атрибут selected,
// selected – если true, то элемент < option > будет выбранным.


// Пример

let newOption = new Option("100", "4", true, true);
// добавляем созданный (новый) объект в выпадающий список
mainFormSelect8.append(newOption);


//Элементы <option> имеют свойства:

//Выбрана ли опция.
// - option.selected

// Номер опции среди других в списке <select>.
// - option.index

// Содержимое опции (то, что видит посетитель).
// - option.text

//---------------------------------------------------------------------------------------------------------------------//

// Мультивыбор (возможность выбора нескольких option) т.е. в html-файле можем указывать атрибут: selected несколько раз 

// получаем все выбранные значения из select с multiple
let selectedOptions = Array.from(mainFormSelect8.options)
	.filter(option => option.selected)
	.map(option => option.value);

console.log(selectedOptions); // получаем массив значений всех выбранных option


//====================================================================================================================//

// События форм и их элементов

// Фокусировка: focus/blur

// Элемент получает фокус, когда пользователь кликает по нему или использует клавишу Tab. Также существует HTML-атрибут
// autofocus, который устанавливает фокус на элемент, когда страница загружается. Есть и другие способы получения фокуса, о них – далее.

// Фокусировка обычно означает: «приготовься к вводу данных на этом элементе», это хороший момент, чтобы инициализовать или загрузить что-нибудь.

// Момент потери фокуса («blur») может быть важнее. Это момент, когда пользователь кликает куда-то ещё или нажимает Tab,
// чтобы переключиться на следующее поле формы. Есть другие причины потери фокуса, о них – далее.

// Потеря фокуса обычно означает «данные введены», и мы можем выполнить проверку введённых данных или даже отправить эти данные на сервер и так далее

//-------------------------------------------------------------------------------------------------------------------//

// События focus/blur

// Событие focus вызывается в момент фокусировки, а blur – когда элемент теряет фокус

// получаем форму
const mainForm9 = document.forms.main;
// получаем поле ввода с атрибутом: nameInput
const mainFormInput9 = mainForm9.nameInput;
// получаем значение атрибута: placeholder этого поля ввода
const mainFormInputPlaceholder = mainFormInput9.placeholder;
console.log(mainFormInputPlaceholder);

// сделаем так чтобы в момент получения фокуса placeholder был равен пустой строке
mainFormInput9.addEventListener("focus", function (e) {
	mainFormInput9.placeholder = "";
});
// в момент потери фокуса (если поле не заполнено) опять появится placeholder
mainFormInput9.addEventListener("blur", function (e) {
	mainFormInput9.placeholder = mainFormInputPlaceholder;
});

/*
Дейсвия могут быть самыми разными:
валидация поля, отправка формы и т.д.
*/

//-------------------------------------------------------------------------------------------------------------------//

// Методы elem.focus() и elem.blur() устанавливают или снимают фокус.

const mainForm10 = document.forms.main;
const mainFormInput10 = mainForm10.nameInput;

// после загрузки страницы на элементе добавится фокус
mainFormInput10.focus();
// через 3-и секунды исчезнет
setTimeout(() => {
	mainFormInput10.blur();
}, 3000);

//---------------------------------------------------------------------------------------------------------------------//

// Включаем фокусировку на любом элементе: tabindex

// Многие элементы по умолчанию не поддерживают фокусировку.

// Какие именно – зависит от браузера, но одно всегда верно: поддержка focus/blur гарантирована для элементов, с
// которыми посетитель может взаимодействовать: <button>, <input>, <select>, <a> и т.д.

// С другой стороны, элементы форматирования <div>, <span>, <table> – по умолчанию не могут получить фокус. Метод elem.
// focus() не работает для них, и события focus/blur никогда не срабатывают.

// Это можно изменить HTML-атрибутом tabindex.

// Любой элемент поддерживает фокусировку, если имеет tabindex. Значение этого атрибута – порядковый номер элемента,
// когда клавиша Tab (или что-то аналогичное) используется для переключения между элементами.

// То есть: если у нас два элемента, первый имеет tabindex="1", а второй tabindex="2", то находясь в первом элементе и
// нажав Tab – мы переместимся во второй.

// Порядок перебора таков: сначала идут элементы со значениями tabindex от 1 и выше, в порядке tabindex, а затем
// элементы без tabindex (например, обычный <input>).

// При совпадающих tabindex элементы перебираются в том порядке, в котором идут в документе.

// Есть два специальных значения:

// - tabindex="0" ставит элемент в один ряд с элементами без tabindex. То есть, при переключении такие элементы будут
// после элементов с tabindex ≥ 1 (Обычно используется, чтобы включить фокусировку на элементе, но не менять порядок
// переключения. Чтобы элемент мог участвовать в форме наравне с обычными <input>.)

// - tabindex="-1" позволяет фокусироваться на элементе только программно. Клавиша Tab проигнорирует такой элемент, но
// метод elem.focus() будет действовать

// пример с div у которого tabindex="-1"
const lesson = document.querySelector('.lesson');

// Реагируем на событие "в фокусе"
lesson.addEventListener("focus", function (e) {
	lesson.classList.add('_focus');
	console.log('Див lesson в фокусе!');
});
// Реагируем на событие "потеря фокуса"
lesson.addEventListener("blur", function (e) {
	lesson.classList.remove('_focus');
});

//-------------------------------------------------------------------------------------------------------------------//

// Текущий элемент с фокусом можно получить из document.activeElement.

console.log(document.activeElement);

//--------------------------------------------------------------------------------------------------------------------//

// События focusin и focusout

// Работают также как и focus/blur но при этом всплывают

const mainForm11 = document.forms.main;

// Хотим установить фокус на форме при работе с элементами
mainForm11.addEventListener("focusin", function (e) {
	mainForm11.classList.add('_active');
});

// Споймать на этапе погружения (2-ой вариант - используется с событием: "focus")
//, { "capture": true }

//---------------------------------------------------------------------------------------------------------------------//

// Событие change

// Событие change срабатывает по окончании изменения элемента.

// Для текстовых <input> это означает, что событие происходит при потере фокуса
// Для других элементов: select, input type=checkbox/radio событие запускается сразу после изменения значения


const mainForm12 = document.forms.main;
const mainFormInput12 = mainForm12.nameInput;
const mainFormSelect12 = mainForm12.nameSelect;
const mainFormFile12 = mainForm12.nameFile;

mainFormInput12.addEventListener("change", function (e) {
	console.log('Сработало change в input');
});
mainFormSelect12.addEventListener("change", function (e) {
	console.log('Сработало change в select');
});
mainFormFile12.addEventListener("change", function (e) {
	console.log('Сработало change в file');
});


//-------------------------------------------------------------------------------------------------------------------//

// Событие input

// Событие input срабатывает каждый раз при изменении значения.

// В отличие от событий клавиатуры, оно работает при любых изменениях значений, даже если они не связаны с клавиатурными
// действиями: вставка с помощью мыши или распознавание речи при диктовке текста


const mainForm13 = document.forms.main;
const mainFormInput13 = mainForm13.nameInput;

mainFormInput13.addEventListener("input", function (event) {
	console.log(`value: ${mainFormInput13.value}`);
});

// Если мы хотим обрабатывать каждое изменение в <input>, то это событие является лучшим выбором.

// С другой стороны, событие input не происходит при вводе с клавиатуры или иных действиях, если при этом не меняется
// значение в текстовом поле, т.е. нажатия клавиш ⇦, ⇨ и подобных при фокусе на текстовом поле не вызовут это событие

//---------------------------------------------------------------------------------------------------------------------//

// События: cut, copy, paste

// Эти события происходят при вырезании/копировании/вставке данных.

// Они относятся к классу ClipboardEvent и обеспечивают доступ к копируемым/вставляемым данным.

// Мы также можем использовать event.preventDefault() для предотвращения действия по умолчанию, и в итоге ничего не скопируется/не вставится

const mainForm14 = document.forms.main;
const mainFormInput14 = mainForm14.nameInput;

mainFormInput14.addEventListener("copy", function (event) {
	console.log(`Копируем`);
});
mainFormInput14.addEventListener("paste", function (event) {
	console.log(`Вставляем`);
});
mainFormInput14.addEventListener("cut", function (event) {
	console.log(`Вырезаем`);
});

// пример отмены собтия
//mainFormInput14.addEventListener("paste", function (event) {
//console.log(`Нельзя вставить`);
//event.preventDefault();
//});

//--------------------------------------------------------------------------------------------------------------------//

// Отправка формы: событие и метод submit

// При отправке формы срабатывает событие submit, оно обычно используется для проверки (валидации) формы перед её
// отправкой на сервер или для предотвращения отправки и обработки её с помощью JavaScript.

// Метод form.submit() позволяет инициировать отправку формы из JavaScript. Мы можем использовать его для динамического
// создания и отправки наших собственных форм на сервер.

// Давайте посмотрим на них подробнее.

// Событие: submit

// Есть два основных способа отправить форму:

// - Первый – нажать кнопку <input type="submit"> или <input type="image">.
// - Второй – нажать Enter, находясь на каком-нибудь поле.

// Оба действия сгенерируют событие submit на форме. Обработчик может проверить данные, и если есть ошибки, показать их
// и вызвать event.preventDefault(), тогда форма не будет отправлена на сервер.


const mainForm15 = document.forms.main;
const mainFormInput15 = mainForm15.nameInput;

mainForm15.addEventListener("submit", function (event) {
	console.log('Форма отправляется...');

	// Проверяем поля и если есть ошибки отменяем отправку
	if (!mainFormInput15.value) {
		console.log('Поле nameInput не заполнено');
		event.preventDefault();
	}
});

//------------------------------------------------------------------------------------------------------------------//

// Метод: submit

// Чтобы отправить форму на сервер вручную, мы можем вызвать метод form.submit().

// При этом событие submit не генерируется. Предполагается, что если программист вызывает метод form.submit(), то он уже выполнил всю соответствующую обработку


//const mainForm16 = document.forms.main;
//const mainFormInput16 = mainForm16.nameInput;

// Отправляем форму при потере фокуса у nameInput
//mainFormInput16.addEventListener("blur", function (e) {
//	mainForm16.submit();
//	console.log('Фокус потерян! Форма отправлена');
//});



//=====================================================================================================================//

// Практические примеры:


// Проверяем ввод email, выводим ошибку
/* const mainForm17 = document.forms.main;
const mainFormInpu17 = mainForm17.nameInput;

// если ввудён не email, то покажет ошибку
mainForm17.addEventListener("submit", function (event) {
	if (emailTest(mainFormInpu17)) {
		mainFormInpu17.parentElement.insertAdjacentHTML(
			"beforeend",
			`<div class="main-form__error">
				Введите email
			</div>`
		);
		event.preventDefault();
	}
});
// при повторном фокусе на поле ввода, сообщение об ошибке пропадает
mainFormInpu17.addEventListener("focus", function (event) {
	if (mainFormInpu17.nextElementSibling) {
		mainFormInpu17.nextElementSibling.remove();
	}
});

//Функция теста email
function emailTest(input) {
	return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
} */

// ----

// Практические примеры:

// Выводим картинку после выбора
const mainForm18 = document.forms.main;
const mainFormFile18 = mainForm18.nameFile;

mainFormFile18.addEventListener("change", function (e) {
	let selectedFile = mainFormFile18.files[0];

	// Получаем URL изображения
	let fileUrl = URL.createObjectURL(selectedFile);

	mainFormFile18.parentElement.insertAdjacentHTML(
		"beforeend",
		`<div class="main-form__image">
			<img alt="" title="${selectedFile.name}" src="${fileUrl}">
		</div>`
	);
});



