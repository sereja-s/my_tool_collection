// Варианты применения массивов

// Методы pop/push, shift/unshift

// 1) Очередь – один из самых распространённых вариантов применения массива. В области компьютерных наук так называется
// упорядоченная коллекция элементов, поддерживающая два вида операций:
// -push добавляет элемент в конец.
// -shift удаляет элемент в начале, сдвигая очередь, так что второй элемент становится первым.

// Массивы поддерживают обе операции.

// На практике необходимость в этом возникает очень часто. Например, очередь сообщений, которые надо показать на экране.

// 2) Существует и другой вариант применения для массивов – структура данных, называемая стек.

// Она поддерживает два вида операций:
// -push добавляет элемент в конец.
// -pop удаляет последний элемент.
// Таким образом, новые элементы всегда добавляются или удаляются из «конца».

// Примером стека обычно служит колода карт: новые карты кладутся наверх и берутся тоже сверху:


// Массивы в JavaScript могут работать и как очередь, и как стек. Мы можем добавлять/удалять элементы как в начало, так
// и в конец массива. В компьютерных науках структура данных, делающая это возможным, называется двусторонняя очередь.

//--------------------------------------------------------------------------------------------------------------------//

// Методы, работающие с концом массива:

// 1)   pop()- Удаляет последний элемент из массива и возвращает его:
let fruits = ["Яблоко", "Апельсин", "Груша"];

console.log(fruits.pop()); // удаляем "Груша" и выводим его
console.log(fruits); // Яблоко, Апельсин

// И fruits.pop() и fruits.at(-1) возвращают последний элемент массива, но fruits.pop() также изменяет массив, удаляя его.


// 2)   push()- Добавляет элемент(ы) в конец массива:
fruits.push("Груша", "Банан");
console.log(fruits); // Яблоко, Апельсин, Груша, Банан

// Вызов fruits.push(...) равнозначен fruits[fruits.length] = ....

//--------------------------------------------------------------------------------------------------------------------//

// Методы, работающие с началом массива:

// 1)   shift()- Удаляет из массива первый элемент и возвращает его:
let fruits2 = ["Яблоко", "Апельсин", "Груша"];
console.log(fruits2.shift()); // удаляем Яблоко и выводим его
console.log(fruits2); // Апельсин, Груша

// 2)    unshift()- Добавляет элемент в начало массива:
fruits2.unshift('Яблоко');
console.log(fruits2); // Яблоко, Апельсин, Груша

// Методы push и unshift могут добавлять сразу несколько элементов:
fruits2.push("Вишня", "Дыня");
fruits2.unshift("Арбуз", "Лимон");

// ["Арбуз", "Лимон", "Яблоко", "Апельсин", "Груша", "Вишня", "Дыня"]
console.log(fruits2);

//--------------------------------------------------------------------------------------------------------------------//

// Эффективность

// Методы push/pop выполняются быстро, а методы shift/unshift – медленно.

// Почему работать с концом массива быстрее, чем с его началом? Давайте посмотрим, что происходит во время выполнения:
// fruits.shift(); // удаляем первый элемент с начала
// Просто взять и удалить элемент с номером 0 недостаточно. Нужно также заново пронумеровать остальные элементы:

// Операция shift должна выполнить 3 действия:
// -Удалить элемент с индексом 0.
// -Сдвинуть все элементы влево, заново пронумеровать их, заменив 1 на 0, 2 на 1 и т.д.
// -Обновить свойство length .

//====================================================================================================================//

// splice

// Как удалить элемент из массива?

// Так как массивы – это объекты, то можно попробовать delete:

let arr = ["I", "go", "home"];

delete arr[1]; // удалить "go"

console.log(arr[1]); // undefined

// теперь arr = ["I",  , "home"];
console.log(arr.length); // 3

//Вроде бы, элемент и был удалён, но при проверке оказывается, что массив всё ещё имеет 3 элемента arr.length == 3.

// Это нормально, потому что всё, что делает delete obj.key – это удаляет значение с данным ключом key. Это нормально
// для объектов, но для массивов мы обычно хотим, чтобы оставшиеся элементы сдвинулись и заняли освободившееся место. Мы ждём, что массив станет короче.

// Поэтому для этого нужно использовать специальные методы.

// Метод arr.splice(str) – это универсальный «швейцарский нож» для работы с массивами. Умеет всё: добавлять, удалять и
// заменять элементы массива, который хранится в переменной: arr.


// Его синтаксис: arr.splice(index[, deleteCount, elem1, ..., elemN])
// Он начинает с позиции index, удаляет deleteCount элементов и вставляет elem1, ..., elemN на их место. Возвращает массив из удалённых элементов.

// Этот метод проще всего понять, рассмотрев примеры.

// Начнём с удаления:
let arr1 = ["Я", "изучаю", "JavaScript"];
arr1.splice(1, 1); // начиная с позиции 1, удалить 1 элемент
console.log(arr1); // осталось ["Я", "JavaScript"]


// В следующем примере мы удалим 3 элемента и заменим их двумя другими:
let arr2 = ["Я", "изучаю", "JavaScript", "прямо", "сейчас"];
// удалить 3 первых элемента, начиная с позиции 0 и заменить их 2-мя другими
arr2.splice(0, 3, "Давай", "танцевать");
console.log(arr2) // теперь выыедем ["Давай", "танцевать", "прямо", "сейчас"]

// Здесь видно, что splice возвращает массив из удалённых элементов:
// удалить 2-а элемента, начиная с позиции 2
let removed = arr2.splice(2, 2);
console.log(removed); // "прямо", "сейчас" -выведем в консоль массив из удалённых элементов


// Метод splice также может вставлять элементы без удаления, для этого достаточно установить deleteCount в 0:
let arr3 = ["Я", "изучаю", "JavaScript"];
// с позиции 2
// удалить 0 элементов
// вставить "сложный", "язык"
arr3.splice(2, 0, "интересный", "и", "полезный", "язык");
console.log(arr3); // "Я", "изучаю", "интересный", "и", "полезный", "язык", "JavaScript"


// Отрицательные индексы разрешены
// В этом и в других методах массива допускается использование отрицательного индекса. Он позволяет начать отсчёт элементов с конца, как тут:
let arr4 = [1, 2, 5];
// начиная с индекса -1 (перед последним элементом)
// удалить 0 элементов,
// затем вставить числа 3 и 4
arr4.splice(-1, 0, 3, 4);
console.log(arr4); // 1,2,3,4,5

//====================================================================================================================//

// slice

// Метод arr.slice намного проще, чем похожий на него arr.splice.
// Его синтаксис: arr.slice([start], [end])
// Он возвращает новый массив, в который копирует элементы, начиная с индекса start и до end (не включая end). (Оба
// индекса start и end могут быть отрицательными. В таком случае отсчёт будет осуществляться с конца массива).

// Это похоже на строковый метод str.slice, но вместо подстрок возвращает подмассивы.

//Например:
let arr5 = ["t", "e", "s", "t"];
console.log(arr5.slice(1, 3)); // e,s (копирует с 1 до 3)
console.log(arr5.slice(-2)); // s,t (копирует с -2 до конца)

// Можно вызвать slice и вообще без аргументов: arr.slice() создаёт копию массива arr. (Это часто используют, чтобы создать копию массива для дальнейших преобразований, которые не должны менять исходный массив.)

//-------------------------------------------------------------------------------------------------------------------//

// concat

// Метод arr.concat создаёт новый массив, в который копирует данные из других массивов и дополнительные значения.
// Его синтаксис: arr.concat(arg1, arg2...)
// Он принимает любое количество аргументов, которые могут быть как массивами, так и простыми значениями. (В результате
// мы получаем новый массив, включающий в себя элементы из arr, а также arg1, arg2 и так далее…)

//Если аргумент argN – массив, то все его элементы копируются. Иначе скопируется сам аргумент.

// Например:
let arr6 = [1, 2];
// создать массив из: arr и [3,4]
console.log(arr6.concat([3, 4])); // 1,2,3,4

// создать массив из: arr и [3,4] и [5,6]
console.log(arr6.concat([3, 4], [5, 6])); // 1,2,3,4,5,6

// создать массив из: arr и [3,4], потом добавить значения 5 и 6
console.log(arr6.concat([3, 4], 5, 6)); // 1,2,3,4,5,6


// Обычно он копирует только элементы из массивов. Другие объекты, даже если они выглядят как массивы, добавляются как есть:
let arr7 = [1, 2];
let arrayLike = {
	0: "что-то",
	length: 1
};
console.log(arr7.concat(arrayLike)); // 1,2,[object Object]


// …Но если массивоподобный объект имеет специальное свойство Symbol.isConcatSpreadable, то он обрабатывается как массив, с помощью concat: вместо него добавляются его элементы:
let arr8 = [1, 2];
let arrayLike2 = {
	0: "что-то",
	1: "ещё",
	[Symbol.isConcatSpreadable]: true,
	length: 2
};
console.log(arr8.concat(arrayLike2)); // 1,2,что-то,ещё */

//====================================================================================================================//

// Поиск в массиве

// Далее рассмотрим методы, которые помогут найти что-нибудь в массиве.

// indexOf/lastIndexOf и includes

// Методы arr.indexOf, arr.lastIndexOf и arr.includes имеют одинаковый синтаксис и делают по сути то же самое, что и их
// строковые аналоги, но работают с элементами вместо символов:

// -arr.indexOf(item, from) ищет item, начиная с индекса from, и возвращает индекс, на котором был найден искомый элемент, в противном случае -1.

// -arr.lastIndexOf(item, from) – то же самое, но ищет справа налево.

// -arr.includes(item, from) – ищет item, начиная с индекса from, и возвращает true, если поиск успешен.

// Например:
let arr9 = [1, 0, false];

console.log(arr9.indexOf(0)); // 1
console.log(arr9.indexOf(false)); // 2
console.log(arr9.indexOf(null)); // -1

console.log(arr9.includes(1)); // true

// Обратите внимание, что методы используют строгое сравнение ===. Таким образом, если мы ищем false, он находит именно false, а не ноль.

// Если мы хотим проверить наличие элемента, и нет необходимости знать его точный индекс, тогда предпочтительным является arr.includes.

// Кроме того, очень незначительным отличием includes является то, что он правильно обрабатывает NaN в отличие от indexOf / lastIndexOf:

const arr10 = [NaN];
console.log(arr10.indexOf(NaN)); // -1 (должен быть 0, но === проверка на равенство не работает для NaN)
console.log(arr10.includes(NaN));// true (верно)

//------------------------------------------------------------------------------------------------------------------//

// find и findIndex

// Представьте, что у нас есть массив объектов. Как нам найти объект с определённым условием? Здесь пригодится метод arr.find.

// Его синтаксис таков:
let result = arr.find(function (item, index, array) {
	// если true - возвращается текущий элемент и перебор прерывается
	// если все итерации оказались ложными, возвращается undefined
});

// Функция вызывается по очереди для каждого элемента массива Если функция возвращает true, поиск прерывается и возвращается item.Если ничего не найдено, возвращается undefined.
// -item – очередной элемент.
// -index – его индекс.
// -array – сам массив.



// Например, у нас есть массив пользователей, каждый из которых имеет поля id и name. Попробуем найти того, кто с id == 1:
let users = [
	{ id: 1, name: "Вася" },
	{ id: 2, name: "Лариса" },
	{ id: 3, name: "Маша" }
];
let user1 = users.find(function (item, index, array) {

	return item.id == 2;
});
console.log(user1); // {id: 2, name: 'Лариса'}
console.log(user1.name); // Лариса

// запишем тоже самое с помощью стрелочной функции:

let user = users.find(item => item.id == 3);
console.log(user); // {id: 3, name: 'Маша'}
console.log(user.name); // Маша

// В реальной жизни массивы объектов – обычное дело, поэтому метод find крайне полезен.

// Обратите внимание, что в данном примере мы передаём find функцию item => item.id == 1, с одним аргументом.Это
// типично, дополнительные аргументы этой функции используются редко.


// Метод arr.findIndex – по сути, то же самое, но возвращает индекс(ключ), на котором был найден элемент, а не сам элемент, и - 1, если ничего не найдено:
let userIn = users.findIndex(item => item.id == 2);
console.log(userIn); // 1

//---------------------------------------------------------------------------------------------------------------------//

// filter

// Метод find(расмотренный ранеее) ищет один (первый попавшийся) элемент, на котором функция-колбэк вернёт true.

// На тот случай, если найденных элементов может быть много, предусмотрен метод arr.filter(fn).

// Синтаксис этого метода схож с find, но filter возвращает массив из всех подходящих элементов:
let results = arr.filter(function (item, index, array) {
	// если true - элемент добавляется к результату, и перебор продолжается
	// возвращается пустой массив в случае, если ничего не найдено
});
// Например:
let users2 = [
	{ id: 4, name: "Юля" },
	{ id: 5, name: "Лариса" },
	{ id: 6, name: "Маша" }
];

// возвращает массив, состоящий из двух первых пользователей
let someUsers = users2.filter(item => item.id > 3);
console.log(someUsers); // 2
console.log(someUsers.length); // 2

//---------------------------------------------------------------------------------------------------------------------//

// Преобразование массива

// Перейдём к методам преобразования и упорядочения массива.

// 1) map
// Метод arr.map является одним из наиболее полезных и часто используемых. Он вызывает функцию для каждого элемента
// массива и возвращает массив результатов выполнения этой функции.

// Синтаксис: 
let result2 = arr.map(function (item, index, array) {
	// возвращается новое значение вместо элемента
});

//Например, здесь мы преобразуем каждый элемент в его длину:
let lengths = ["Bilbo", "Gandalf", "Nazgul"].map(item => item.length);
console.log(lengths); // 5,7,6

// 2) sort(fn)
// Вызов arr.sort() сортирует массив на месте, меняя в нём порядок элементов. Он возвращает отсортированный массив, но
// обычно возвращаемое значение игнорируется, так как изменяется сам arr.

// Например:
let arr11 = [1, 2, 15];
// метод сортирует содержимое arr
arr11.sort();
console.log(arr11);  // 1, 15, 2
// Не заметили ничего странного в этом примере ?
//Порядок стал 1, 15, 2. Это неправильно! Но почему ?


// По умолчанию элементы сортируются как строки.


// Буквально, элементы преобразуются в строки при сравнении. Для строк применяется лексикографический порядок и действительно выходит, что "2" > "15".

// Чтобы использовать наш собственный порядок сортировки, нам нужно предоставить функцию в качестве аргумента arr.sort()
// Функция должна для пары значений возвращать:
function compare(a, b) {
	if (a > b) return 1; // если первое значение больше второго, то функция вернёт положительное число 1
	if (a == b) return 0; // если равны , то функция вернёт ноль
	if (a < b) return -1; // если первое значение меньше второго, то функция вернёт отрицательное число -1
}

// Например, для сортировки чисел:
function compareNumeric(a, b) {
	if (a > b) return 1;
	if (a == b) return 0;
	if (a < b) return -1;
}
let arr12 = [1, 2, 15];
arr12.sort(compareNumeric);
console.log(arr12);  // 1, 2, 15
// Теперь всё работает как надо.

// Давайте возьмём паузу и подумаем, что же происходит.Упомянутый ранее массив arr может быть массивом чего угодно,
// верно ? Он может содержать числа, строки, объекты или что - то ещё.У нас есть набор каких - то элементов.Чтобы
// отсортировать его, нам нужна функция, определяющая порядок, которая знает, как сравнивать его элементы.  умолчанию
// элементы сортируются как строки.

// Метод arr.sort(fn) реализует общий алгоритм сортировки.Нам не нужно заботиться о том, как он работает внутри(в
// большинстве случаев это оптимизированная быстрая сортировка или Timsort).Она проходится по массиву, сравнивает его
// элементы с помощью предоставленной функции и переупорядочивает их.Всё, что остаётся нам, это предоставить fn, которая
// делает это сравнение.

// Кстати, если мы когда - нибудь захотим узнать, какие элементы сравниваются – ничто не мешает нам вывести их на экран:

[1, -2, 15, 2, 0, 8].sort(function (a, b) {
	console.log(a + " <> " + b);
	return a - b;
});

// В процессе работы алгоритм может сравнивать элемент со множеством других, но он старается сделать как можно меньше сравнений.

// Функция сравнения может вернуть любое число

// На самом деле от функции сравнения требуется любое положительное число, чтобы сказать «больше», и отрицательное число, чтобы сказать «меньше».
//Это позволяет писать более короткие функции:
let arr13 = [1, 2, 15];
arr13.sort(function (a, b) { return a - b; });
console.log(arr13);  // 1, 2, 15

// Лучше использовать стрелочные функции

// Помните стрелочные функции ? Можно использовать их здесь для того, чтобы сортировка выглядела более аккуратной:
arr13.sort((a, b) => a - b);
// Будет работать точно так же, как и более длинная версия выше.



// Используйте localeCompare для строк

// Помните алгоритм сравнения строк ? По умолчанию, он сравнивает буквы по их кодам.

// Для многих алфавитов лучше использовать метод str.localeCompare, для правильной сортировки букв, таких как Ö.

// Например, давайте отсортируем несколько стран на немецком языке:
let countries = ['Österreich', 'Andorra', 'Vietnam'];
console.log(countries.sort((a, b) => a > b ? 1 : -1)); // Andorra, Vietnam, Österreich (неправильно)

console.log(countries.sort((a, b) => a.localeCompare(b))); // Andorra,Österreich,Vietnam (правильно!)



// 3) reverse
// Метод arr.reverse меняет порядок элементов в arr на обратный. Он также возвращает массив arr с изменённым порядком элементов

// Например:
let arr14 = [1, 2, 3, 4, 5];
arr14.reverse();
console.log(arr14); // 5,4,3,2,1


// 4) split и join

// Ситуация из реальной жизни.Мы пишем приложение для обмена сообщениями, и посетитель вводит имена тех, кому его
// отправить, через запятую: Вася, Петя, Маша.Но нам - то гораздо удобнее работать с массивом имён, чем с одной строкой.Как его получить ?

// Метод str.split(delim) именно это и делает. Он разбивает строку на массив по заданному разделителю delim.

// В примере ниже таким разделителем является строка из запятой и пробела.

let names = 'Вася, Петя, Маша';

let arr15 = names.split(', ');

for (let name of arr15) {
	console.log(`Сообщение получат: ${name}.`); // Сообщение получат: Вася (и другие имена)
}

// У метода split есть необязательный второй числовой аргумент – ограничение на количество элементов в массиве. Если их
// больше, чем указано, то остаток массива будет отброшен.На практике это редко используется:

let arr16 = 'Вася, Петя, Маша, Саша'.split(', ', 2);
console.log(arr16); // Вася, Петя


// Разбивка по буквам
//Вызов split(s) с пустым аргументом s разбил бы строку на массив букв:
let str = "тест";
console.log(str.split('')); // т,е,с,т


// Вызов arr.join(glue) делает в точности противоположное split. Он создаёт строку из элементов arr, вставляя glue между ними.

// Например:
let arr17 = ['Вася', 'Петя', 'Маша'];
let str2 = arr17.join(';'); // объединить массив в строку через ;
console.log(str); // Вася;Петя;Маша

//--------------------------------------------------------------------------------------------------------------------//

// Перебор элементов массива

let el = ['Софья', 'Лида', 'Наташа'];
console.log(el.length); // длина массива

// в цикле for можем получить и ключ, и значение элементов массива
for (let i = 0; i < el.length; i++) {

	console.log(el[i]); // вывод едементов массива в консоль по очереди (в цикле)
}

// цикл for...of применяется если достаточно получать только значения
for (let elItem of el) {

	console.log(elItem);
}

// Перебор: forEach 

// Метод arr.forEach позволяет запускать функцию для каждого элемента массива.

// Его синтаксис:
//arr.forEach(function(item, index, array) {
// ... делать что-то с item
//});


// Например, этот код выведет на экран каждый элемент массива:

// Вызов console.log для каждого элемента
["Настя", "Алёна", "Лиза"].forEach(console.log);

// А этот вдобавок расскажет и о своей позиции в массиве:
["Оля", "Аня", "Юля"].forEach((item, index, array) => {
	console.log(`${item} имеет позицию ${index} в ${array}`);
});

// можем просто указывать в параметрах метода: forEach имя отдельной функции и она выполнится для каждого элемента массива: 
el.forEach(show);

function show(item, index, array) {

	console.log(item);
	console.log(index);
	console.log(array);
}

// Результат функции (если она вообще что-то возвращает) отбрасывается и игнорируется.

//-------------------------------------------------------------------------------------------------------------------//

// reduce / reduceRight

// Если нам нужно перебрать массив – мы можем использовать forEach, for или for..of.

// Если нам нужно перебрать массив и вернуть данные для каждого элемента – мы используем map.

// Методы arr.reduce и arr.reduceRight похожи на методы выше, но они немного сложнее.Они используются для вычисления какого-нибудь единого значения на основе всего массива.

// Синтаксис:
/*
 let value = arr.reduce(function (accumulator, item, index, array) {
	 ...
}, [initial]); 
*/
// Функция применяется по очереди ко всем элементам массива и «переносит» свой результат на следующий вызов.
// Аргументы:
// -accumulator – результат предыдущего вызова этой функции (равен initial при первом вызове(если передан initial)),
// -item – очередной элемент массива,
// -index – его индекс,
// -array – сам массив.
// При вызове функции результат её вызова на предыдущем элементе массива передаётся как первый аргумент.

// Звучит сложновато, но всё становится проще, если думать о первом аргументе как «аккумулирующем» результат предыдущих
// вызовов функции.По окончании он становится результатом reduce.

// Этот метод проще всего понять на примере.
//Тут мы получим сумму всех элементов массива всего одной строкой:
let arr18 = [1, 2, 3, 4, 5];
let result3 = arr18.reduce((sum, current) => sum + current, 0); // вторым аргументом передан: 0- initial
console.log(result3); // 15
// Здесь мы использовали наиболее распространённый вариант reduce, который использует только 2 аргумента.
// Давайте детальнее разберём, как он работает:
// 1) При первом запуске sum равен initial(последний аргумент reduce), то есть 0, а current – первый элемент массива, равный 1. Таким образом, результат функции равен 1.
// 2) При втором запуске sum = 1, и к нему мы добавляем второй элемент массива(2).
// 3) При третьем запуске sum = 3, к которому мы добавляем следующий элемент, и так далее…

// Поток вычислений получается такой:
// В виде таблицы, где каждая строка –- вызов функции на очередном элементе массива:

//                  sum	      current	      result
// первый вызов	   0	         1	           1
// второй вызов	   1	         2	           3
// третий вызов	   3	         3	           6
// четвёртый вызов	6	         4	           10
// пятый вызов	      10	         5	           15
// Здесь отчётливо видно, как результат предыдущего вызова передаётся в первый аргумент следующего.

// Мы также можем опустить начальное значение(initial), т.е. пердать только один параметр: функцию (здесь- в виде стрелочной)):
let result4 = arr18.reduce((sum, current) => sum + current); // убрано начальное значение (нет 0 в конце)
console.log(result4); // 15
// (Результат – точно такой же! Это потому, что при отсутствии initial в качестве первого значения берётся первый элемент массива, а перебор стартует со второго) Таблица вычислений будет такая же за вычетом первой строки.

// (Но такое использование требует крайней осторожности. Если массив пуст, то вызов reduce без начального значения выдаст
// ошибку. Поэтому рекомендуется всегда указывать начальное значение)



// Метод arr.reduceRight работает аналогично, но проходит по массиву справа налево.

//=====================================================================================================================//

// Array.isArray

// Массивы не образуют отдельный тип языка. Они основаны на объектах.

// Поэтому typeof не может отличить простой объект от массива:
console.log(typeof {}); // object
console.log(typeof []); // тоже object

// …Но массивы используются настолько часто, что для этого придумали специальный метод: Array.isArray(value).Он возвращает true, если value массив, и false, если нет.
console.log(Array.isArray({})); // false
console.log(Array.isArray([])); // true


// Большинство методов поддерживают «thisArg»

// Почти все методы массива, которые вызывают функции – такие как find, filter, map, за исключением метода sort, принимают необязательный параметр thisArg.

// Этот параметр не объяснялся выше, так как очень редко используется, но для наиболее полного понимания темы мы обязаны его рассмотреть.
// Вот полный синтаксис этих методов:
//   arr.find(func, thisArg);
//   arr.filter(func, thisArg);
//   arr.map(func, thisArg);
// ...
// thisArg - это необязательный последний аргумент
// Значение параметра thisArg становится this для func.
//Например, вот тут мы используем метод объекта army как фильтр, и thisArg передаёт ему контекст:
let army = {
	minAge: 18,
	maxAge: 27,
	canJoin(user) {
		return user.age >= this.minAge && user.age < this.maxAge;
	}
};
let users3 = [
	{ age: 16 },
	{ age: 20 },
	{ age: 23 },
	{ age: 30 }
];
// найти пользователей, для которых army.canJoin возвращает true
let soldiers = users3.filter(army.canJoin, army);
console.log(soldiers.length); // 2
console.log(soldiers[0].age); // 20
console.log(soldiers[1].age); // 23

// Если бы мы в примере выше использовали просто users.filter(army.canJoin), то вызов army.canJoin был бы в режиме
// отдельной функции, с this = undefined. Это тут же привело бы к ошибке.

// Вызов users.filter(army.canJoin, army) можно заменить на users.filter(user => army.canJoin(user)), который делает то же самое.Последняя запись используется даже чаще, так как функция - стрелка более наглядна.

// Итого

// Шпаргалка по методам массива:

// Для добавления / удаления элементов:

// push(...items) – добавляет элементы в конец,
// pop() – извлекает элемент с конца,
// shift() – извлекает элемент с начала,
// unshift(...items) – добавляет элементы в начало.
// splice(pos, deleteCount, ...items) – начиная с индекса pos, удаляет deleteCount элементов и вставляет items.
// slice(start, end) – создаёт новый массив, копируя в него элементы с позиции start до end(не включая end).
// concat(...items) – возвращает новый массив: копирует все члены текущего массива и добавляет к нему items. Если
// какой-то из items является массивом, тогда берутся его элементы.

// Для поиска среди элементов:

// indexOf / lastIndexOf(item, pos) – ищет item, начиная с позиции pos, и возвращает его индекс или - 1, если ничего не найдено.
// includes(value) – возвращает true, если в массиве имеется элемент value, в противном случае false.
// find / filter(func) – фильтрует элементы через функцию и отдаёт первое / все значения, при прохождении которых через функцию возвращается true.
// findIndex похож на find, но возвращает индекс вместо значения.


// Для перебора элементов:

// forEach(func) – вызывает func для каждого элемента.Ничего не возвращает.

// Для преобразования массива:

// map(func) – создаёт новый массив из результатов вызова func для каждого элемента.
// sort(func) – сортирует массив «на месте», а потом возвращает его.
// reverse() – «на месте» меняет порядок следования элементов на противоположный и возвращает изменённый массив.
// split / join – преобразует строку в массив и обратно.
// reduce / reduceRight(func, initial) – вычисляет одно значение на основе всего массива, вызывая func для каждого
// элемента и передавая промежуточный результат между вызовами.

// Дополнительно:
// Array.isArray(arr) проверяет, является ли arr массивом.

// Обратите внимание, что методы sort, reverse и splice изменяют исходный массив