// Чтобы не повторять один и тот же код во многих местах, придуманы функции. Функции являются основными «строительными блоками» программы

// Синтаксис, который мы используем, называется Function Declaration (Объявление Функции)
// При этом вызвать объявленную функцию можно до и после неё (из любого места программы)

// Объявление функции: 
function showMessage() {
	console.log('Всем привет!');
}
/* 
Вначале идёт ключевое слово function, после него имя функции, затем список параметров в круглых скобках через запятую (в вышеприведённом примере он пустой) и, наконец, код функции, также называемый «телом функции», внутри фигурных скобок
*/
// Наша новая функция может быть вызвана по своему имени: showMessage() 
// Вызывать функцию можно как перед её объявлением так и после (и при этом столько раз, сколько необходимо выполнить её код)
showMessage(); // Вызов showMessage() выполняет код функции

//-------------------------------------------------------------------------------------------------------------------//

/*
Выбор имени функции
Функция – это действие. Поэтому имя функции обычно является глаголом. Оно должно быть кратким, точным и описывать действие функции, чтобы программист, который будет читать код, получил верное представление о том, что делает функция.

Как правило, используются глагольные префиксы, обозначающие общий характер действия, после которых следует уточнение. Обычно в командах разработчиков действуют соглашения, касающиеся значений этих префиксов.

Например, функции, начинающиеся с "show" обычно что-то показывают.
Функции, начинающиеся с…
"get…" – возвращают значение,
"calc…" – что-то вычисляют,
"create…" – что-то создают,
"check…" – что-то проверяют и возвращают логическое значение, и т.д.
*/

//---------------------------------------------------------------------------------------------------------------------//

// Локальные переменные- переменные, объявленные внутри функции и видны только внутри этой функции.

// Внешние переменные
// У функции есть доступ к внешним переменным (Функция обладает полным доступом к внешним переменным и может изменять их значение):
let userName = 'Вася';

function showMessageName() {
	userName = "Петя"; // (1) изменяем значение внешней переменной

	let message = 'Привет, ' + userName;
	console.log(message);
}

console.log(userName); // Вася перед вызовом функции

showMessageName();

console.log(userName); // Петя, значение внешней переменной было изменено функцией

// Внешняя переменная используется, только если внутри функции нет такой локальной.

// Если одноимённая переменная объявляется внутри функции, тогда она перекрывает внешнюю, функция использует локальную переменную. Внешняя будет проигнорирована

//-------------------------------------------------------------------------------------------------------------------//

/*
Глобальные переменные

Переменные, объявленные снаружи всех функций, такие как внешняя переменная userName в вышеприведённом коде – называются глобальными.

Глобальные переменные видимы для любой функции (если только их не перекрывают одноимённые локальные переменные).

Желательно сводить использование глобальных переменных к минимуму. В современном коде обычно мало или совсем нет глобальных переменных. Хотя они иногда полезны для хранения важнейших «общепроектовых» данных
*/

//--------------------------------------------------------------------------------------------------------------------//

// Параметры
// Мы можем передать внутрь функции любую информацию, используя параметры.
// Значение, передаваемое в качестве параметра функции, также называется аргументом
// Другими словами:
// Параметр – это переменная, указанная в круглых скобках в объявлении функции.
// Аргумент – это значение, которое передаётся функции при её вызове

// В нижеприведённом примере функции передаются два параметра: from и text
function showMessage2(from, text) { // параметры: from, text
	console.log(from + ': ' + text);
}
showMessage2('Аня', 'Привет!'); // Аня: Привет! (*)
showMessage2('Аня', "Как дела?"); // Аня: Как дела? (**)
// Когда функция вызывается в строках (*) и (**), переданные значения копируются в локальные переменные from и text.
// Затем они используются в теле функции

//--------------------------------------------------------------------------------------------------------------------//

// Значения по умолчанию
// Если при вызове функции (с указанными параметрами) аргумент не был указан, то его значением становится undefined

// Если мы хотим задать параметру значение по умолчанию, мы должны указать его после знака: =
// (Теперь, если параметр не указан, его значением будет: значение по умолчанию )

//-------------------------------------------------------------------------------------------------------------------//

// Возврат значения
// Функция может вернуть результат, который будет передан в вызвавший её код.

// Простейшим примером может служить функция сложения двух чисел:
function sum(a, b) {
	return a + b;
}
let result = sum(1, 2);
console.log(result); // 3
/* 
Директива return может находиться в любом месте тела функции. Как только выполнение доходит до этого места, функция останавливается, и значение возвращается в вызвавший её код (присваивается переменной result выше).

Вызовов return может быть несколько, например:
*/
function checkAge(age) {
	if (age > 17) {
		return true;
	} else {
		return false;
	}
}

//let age = prompt('Вам есть', 18);
let age = 18;

if (checkAge(age)) {
	console.log('Доступ получен');
} else {
	console.log('Доступ закрыт');
}
// Возможно использовать return и без значения. Это приведёт к немедленному выходу из функции:
function showMovie() {
	if (!checkAge(age)) {
		return; // если условие выполнится, код ниже выполнятся не будет
	}
	console.log("Вам показывается кино"); // (*)
	// ...
}
showMovie();

// Внутри функции могут быть реализованы другие функции для выполнения подзадач, также могут быть вызваны некие функции
// из вне Случай когда функция вызывает саму себя называется рекурсией
// Переменную: result умножим на параметр: numOne, numTwo(параметр) раз:
function calcSumm(numOne, numTwo) {

	let result = 1;
	// умножим result на numOne, numTwo раз в цикле:
	for (let i = 0; i < numTwo; i++) {
		result *= numOne;
	}
	return result;
}
console.log(calcSumm(2, 3));

// реализуем тоже самое с помощью рекурсии:
function calcSummRec(numOne, numTwo) {

	if (numTwo === 1) {

		return numOne;
	} else {

		return numOne * calcSummRec(numOne, numTwo - 1); // кол-во вложенных вызовов функции самой себя называется глубиной рекурсии
	}
}
console.log(calcSummRec(2, 3));

//=====================================================================================================================//

// Существует ещё один синтаксис создания функций, который называется Function Expression (Функциональное Выражение)

// синтаксис Function Expression (функционального выражения) аргументы в качестве параметров необязательны :
let funcEx = function (arg1, arg2, ...argN) {
	return expression;
};

// Данный синтаксис позволяет нам создавать новую функцию в середине любого выражения:
// (вызвать Функциональное Выражение можем только после его создания)
let sayHi = function () {
	console.log("Привет");
};
// Обратите внимание, что после ключевого слова function нет имени. Для Function Expression допускается его отсутствие
// функция – это особое значение, в том смысле, что мы можем вызвать её как sayHi()
sayHi();
// Но всё же это значение. Поэтому мы можем работать с ней так же, как и с другими видами значений.
// Мы можем скопировать функцию в другую переменную:

// Объявление Function Declaration
function sayHi2() {   // (1) создаём
	console.log("Приветик");
}

let func = sayHi2;    // (2) копируем

func(); // Приветик     // (3) вызываем копию (работает)!
sayHi2(); // Приветик   //     эта тоже все ещё работает (почему бы и нет)

// Мы также могли бы использовать Function Expression для объявления sayHi в первой строке:
let sayHi3 = function () { // (1) создаём
	console.log("Приветики");
};

let func3 = sayHi3;
func3();

/*
Function Expression создаётся здесь как function(...) {...} внутри выражения присваивания: let sayHi = …;. Точку с запятой ; рекомендуется ставить в конце выражения, она не является частью синтаксиса функции.
(Точка с запятой нужна там для более простого присваивания, такого как let sayHi = 5;, а также для присваивания функции)
*/

//====================================================================================================================//

/*
 Функции-«колбэки»
Давайте рассмотрим больше примеров передачи функции в виде значения и использования функциональных выражений.

Давайте напишем функцию ask(question, yes, no) с тремя параметрами:
question- Текст вопроса
yes- Функция, которая будет вызываться, если ответ будет «Yes»
no- Функция, которая будет вызываться, если ответ будет «No»
(Наша функция должна задать вопрос question и, в зависимости от того, как ответит пользователь, вызвать yes() или no()): 
*/
// используем Function Declaration (Объявление Функции)
function ask(question, yes, no) {
	if (confirm(question)) yes()
	else no();
}

function showOk() {
	console.log("Вы согласны.");
}

function showCancel() {
	console.log("Вы отменили выполнение.");
}
// ask("Вы согласны?", showOk, showCancel); // функции showOk, showCancel передаются в качестве аргументов ask
// (Аргументы showOk и showCancel функции ask называются функциями-колбэками или просто колбэками)

/*
Ключевая идея в том, что мы передаём функцию и ожидаем, что она вызовется обратно (от англ. «call back» – обратный вызов) когда-нибудь позже, если это будет необходимо. В нашем случае, showOk становится колбэком для ответа «yes», а showCancel – для ответа «no».
*/

// Мы можем переписать этот пример значительно короче, используя Function Expression (Функциональное Выражение):
function ask2(question, yes, no) {
	if (confirm(question)) yes()
	else no();
}
// вызовем функцию и передадим необходимые аргументы в качестве параметров
/* ask2(
	" Да или отмена",
	function () { console.log("Вы согласились."); },
	function () { console.log("Вы отказались."); }
); */

//-------------------------------------------------------------------------------------------------------------------//

//Чтобы функция, объявленная внутри блока была видима снаружи, нужно воспользоваться функцией, объявленной при помощи
// Function Expression(функционального выражения), и присвоить значение переменной, объявленной снаружи блока, что обеспечит нам нужную видимость:
let getSumm;
if (2 > 1) {

	getSumm = function () {

		let summ = 3 + 2;
		console.log(summ);
	};
}
getSumm();

//=====================================================================================================================//

// Стрелочные функции, основы

// Существует ещё один очень простой и лаконичный синтаксис для создания функций, который часто лучше, чем Function Expression
// Он называется «функции-стрелки» или «стрелочные функции» (arrow functions), т.к. выглядит следующим образом:
let funcArr = (arg1, arg2, ...argN) => expression;
/*
Это создаёт функцию func, которая принимает аргументы arg1..argN, затем вычисляет выражение expression в правой части с их использованием и возвращает результат
*/
// Другими словами, это сокращённая версия Function Expression (функционального выражения):
let funcArr2 = function (arg1, arg2, ...argN) {
	return expression;
};

//--------------------------------------------------------------------------------------------------------------------//

// Давайте рассмотрим конкретный пример однострочной стрелочной функции:

let summArr = (a, b) => a + b;
/* Эта стрелочная функция представляет собой более короткую форму:
let sumArr = function(a, b) {
  return a + b;
};
*/
// Как вы можете видеть, стрелочная функция которая принимает два аргумента с именами a и b. И при выполнении она вычисляет выражение a + b и возвращает результат Выведем его на экран:
console.log(summArr(7, 8)); // 15



// Если у нас только один аргумент, то круглые скобки вокруг параметров можно опустить, сделав запись ещё короче:
let double = n => n * 2;
// это примерно тоже что и:
// let double = function (n) { return n * 2 }
console.log(double(15)); // 30



// Если аргументов нет, круглые скобки будут пустыми, но они должны присутствовать:
let sayHiArr = () => console.log("Hello!");
sayHiArr();

//--------------------------------------------------------------------------------------------------------------------//

// Многострочные стрелочные функции

/* 
Иногда нам нужна более сложная функция, с несколькими выражениями и инструкциями. Это также возможно, нужно лишь заключить их в фигурные скобки. 
(При этом важное отличие – в том, что в таких скобках для возврата значения нужно использовать return (как в обычных функциях))
*/
let sumManyarr = (a, b) => {  // фигурная скобка, открывающая тело многострочной стрелочной функции
	let result = a + b;
	return result; // если мы используем фигурные скобки, то нам нужно явно указать директиву: return, которая вернёт значение
};
console.log(sumManyarr(3, 2)); // 5

//--------------------------------------------------------------------------------------------------------------------//

// Планирование: setTimeout и setInterval

// Мы можем вызвать функцию не в данный момент, а позже, через заданный интервал времени. Это называется «планирование вызова»

/*
Для этого существуют два метода:

- setTimeout позволяет вызвать функцию один раз через определённый интервал времени.
- setInterval позволяет вызывать функцию регулярно, повторяя вызов через определённый интервал времени.

Эти методы не являются частью спецификации JavaScript. Но большинство сред выполнения JS-кода имеют внутренний планировщик и предоставляют доступ к этим методам. В частности, они поддерживаются во всех браузерах и Node.js
*/

// setTimeout
// синтаксис:
/* 
setTimeout(func | code, delay, arg1, [arg2, ..., argN);
	Параметры:
func|code- Функция(имя) без круглых скобок или строка кода для выполнения. Обычно это имя функции. По историческим причинам можно передать и строку кода, но это не рекомендуется.

delay- Задержка перед запуском в миллисекундах (1000 мс = 1 с). Значение по умолчанию – 0.

arg1, arg2…, argN- Аргументы, передаваемые в функцию 
*/
// Например, данный код вызывает sayHi() спустя три секунды:
function sayHiSt() {
	console.log('класс!');
}
setTimeout(sayHiSt, 3000);


// С аргументами:
function showMessageSt(text, name) {
	console.log(`${text}, ${name} !`)
}
setTimeout(showMessageSt, 5000, 'Привет', 'Серёжа');


// использование строк в качестве первого аргумента не рекомендуется. Вместо этого используйте функции. Например, так:
setTimeout(() => console.log('успех'), 1000);

// Пример:
// с задержкой в 1 сек. будем выводить число, увеличвая его при этом на единицу:
// function showNumber(num) {

// console.log(num);
// укажем условие при котором необходимо остановить вывод числа
// if (num < 5) {
// setTimeout(showNumber, 1000, ++num); // Вложенный setTimeout выше планирует следующий вызов прямо после окончания 
// текущего (расположенного ниже) Это более гибкий аналог setInterval
// }
// }
// setTimeout(showNumber, 1000, 1)

//--------------------------------------------------------------------------------------------------------------------//

// Отмена через clearTimeout
// Вызов setTimeout возвращает «идентификатор таймера» timerId, который можно использовать для отмены дальнейшего выполнения функции setTimeout()

// Синтаксис для отмены:
/* 
let timerId = setTimeout(...);
clearTimeout(timerId);
 */

// получим:
function showNumberClTime(num) {

	console.log(num);
	let timerId = setTimeout(showNumberClTime, 2000, ++num); // присвоили метод переменной
	// укажем условие при котором необходимо остановить вывод числа, вызвав метод clearTimeout()
	if (num === 3) {
		clearTimeout(timerId);
	}
}
setTimeout(showNumberClTime, 2000, 1)

//--------------------------------------------------------------------------------------------------------------------//

// setInterval

// Метод setInterval имеет такой же синтаксис как setTimeout:
// setInterval(func | code, delay, arg1, [arg2, ..., argN);
// Все аргументы имеют такое же значение. Но отличие этого метода от setTimeout в том, что функция запускается не один раз, а периодически через указанный интервал времени

// с иомощъю метода: clearInterval останоим работу setInterval
let resulClInt = 7;
function showNumberClInt(num) {

	resulClInt += num;
	console.log(resulClInt);
	if (resulClInt === 10) {

		clearInterval(timerId);
	}
}
let timerId = setInterval(showNumberClInt, 1000, 1)