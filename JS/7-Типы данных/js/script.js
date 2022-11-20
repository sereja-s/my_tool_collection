// ТИПЫ ДАННЫХ

// (1)
let userName;
console.log(typeof userName); // вернёт тип: undefined (неопределёный тип, т.е. переменная была объявлена, но ей не было
// присвоено значение (не была определена))
console.log(userName);

// (2)
let userName2 = null;
console.log(typeof userName2); // вернёт тип данных: object (это официально признаная ошибка, т.к. правильно должен вернуть: null, т.е. переменная определена, но её значение- пустота)
console.log(userName2);

// (3)
// Boolean- это логический тип данных (может принимать 2-а значения: true или false)

let willYouMarryMe = false;
if (willYouMarryMe) {

	console.log(':)');
} else {

	console.log(':('); // вернёт грусный смайлик
}

willYouMarryMe = true;
if (willYouMarryMe) {

	console.log(':)'); // вернёт весёлый смайлик
} else {

	console.log(':(');
}

// можно использоать с операторами сравнения:

let trueOrFalse = 58 < 18;
console.log(trueOrFalse); // вернёт false, т.к. выражение в переменной ложное
console.log(typeof trueOrFalse); // вернёт тип данных: boolean


// (4)
// тип данных: число (number)

let userAge = 99;
console.log(userAge);
console.log(typeof userAge);

let userHeight = 1.83;
console.log(userHeight);
console.log(typeof userHeight);


// специльные числовые значения: Infinity и -Infinity

let getInfinity = 99 / 0;
console.log(getInfinity); // вернёт значение: Infinity
console.log(typeof getInfinity); // вернёт тип данных: number


// специльные числовое значение: NaN (не число)- результат неправильной или неопределённой математической операции

let a = parseInt('a5'); //ф-ия приводит поданое на вход строковое значение к целочисленному
console.log(a); // вернёт значение: NaN (не число)
console.log(typeof a); // вернёт тип данных: number

a = parseInt('5a'); //ф-ия приводит поданое на вход строковое значение к целочисленному
console.log(a); // вернёт значение: 5
console.log(typeof a); // вернёт тип данных: number


let getNan = 'фрилансер' / 10;
// в условии проверим: является ли значение переменой не числом (NaN)
if (isNaN(getNan)) {

	console.log(true) // вернёт true (да)
}

console.log(typeof getNan); // вернёт тип данных: number

// (5)
// тип данных: bigint для работы с целыми числами произвольной длины
// (возврашщается всегда если передать значение в переменную больше (меньше) чем 2-а в 53 степени (такое же отрицательное))
// т.е. не больше чем 9007199254740991 и не меньше -9007199254740991

let bigInteger = 9007199254740991n; // к числовому литералу (фиксированное значение) добавили букву n
console.log(bigInteger);
console.log(typeof bigInteger); // вернёт тип данных: bigint

// (6)
// тип данных:  значение заключаем в кавычки: двойные или одинарные - это простые и разницы между ними в JS нет,
// а обратные кавычки позволяют использовать дополнительный функционал и встраивать в строку некие выражения

let userAge1 = 36;
let userAgeInfo = `Возраст: ${userAge1}`; // здесь в фигурных скобках (и знак: $ впереди) встроили значение переменной
console.log(userAgeInfo);

// (7)
// Тип данных: object (объект)- может быть создан с помощью фигурных скобок и содержать в себе набор необязательных свойств
// Свойства - это пара ключ: значение (разделяются они двоеточием) Свойства между собой разделяются запятой

let userInfo = {

	name: 'Фрилансер',
	age: '36',
}
console.log(userInfo);
console.log(typeof userInfo);

// (8)
// Тип данных: Symbol- это уникальный идентификатор объекта Создатся новые символы с помощью одноимённой функции

let id = Symbol("id");
console.log(typeof id);

// (9)
// тип данных: function для определения функций

let funcVariable = function name(params) {

	// код функции
}
console.log(typeof funcVariable);

//-------------------------------------------------------------------------------------------------------------------//

// ПРЕОБРАЗОВАНИЕ ТИПОВ

// Строковое преобразование

let userAge2 = 100;
console.log(userAge2);
console.log(typeof userAge2); // вернёт тип данных: number

userAge2 = String(userAge2); // строковое преобразование типа переменной с помощью ф-ии JS: String() Аналогично для логического типа данных: boolean

console.log(userAge2);
console.log(typeof userAge2); // вернёт тип данных: string

// Численное преобразование

let userAge3 = '103';
console.log(userAge3);
console.log(typeof userAge3); // вернёт тип данных: string

userAge3 = Number(userAge3); // численное преобразование типа переменной с помощью ф-ии JS: Number()

console.log(userAge3);
console.log(typeof userAge3); // вернёт тип данных: number

// Автоматическое преобразоание без использования специальных функций

let auto = "300" / "3";
console.log(auto); // вернёт число: 100
console.log(typeof auto); // вернёт тип данных: number


// Аналогично работает логическое преобразование

auto = Boolean(auto);
console.log(auto); // вернёт true 
// (число: 0 вернуло бы false, а строка: "0" вернула бы true, т.к. она не пуста (пустая строка тоже вернула бы false))
console.log(typeof auto); // вернёт тип данных: boolean