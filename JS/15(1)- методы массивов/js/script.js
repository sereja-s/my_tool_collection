// Варианты применения массивов

// Методы pop/push, shift/unshift

// 1) Очередь – один из самых распространённых вариантов применения массива. В области компьютерных наук так называется
// упорядоченная коллекция элементов, поддерживающая два вида операций:
// -push добавляет элемент в конец.
// -shift удаляет элемент в начале, сдвигая очередь, так что второй элемент становится первым.

// Массивы поддерживают обе операции.

// На практике необходимость в этом возникает очень часто. Например, очередь сообщений, которые надо показать на экране.

// 2) Существует и другой вариант применения для массивов – структура данных, называемая стек.

// Она поддерживает два вида операций:// -
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