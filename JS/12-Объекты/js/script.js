// Объекты используются для хранения коллекций различных значений и более сложных сущностей

// Объект может быть создан с помощью фигурных скобок {…} с необязательным списком свойств.
// (Свойство – это пара «ключ: значение», где ключ – это строка (также называемая «именем свойства»), а значение может быть чем угодно)

// Пустой объект можно создать, используя один из двух вариантов синтаксиса:
let user = new Object(); // синтаксис "конструктор объекта"

let user2 = {};  // синтаксис "литерал объекта"



// Литералы и свойства

// При использовании литерального синтаксиса {...} мы сразу можем поместить в объект несколько свойств в виде пар «ключ: значение»:
let user3 = {     // объект
	name: "John",  // под ключом "name" хранится значение "John"
	age: 30,        // под ключом "age" хранится значение 30
};
// (У каждого свойства есть ключ (также называемый «имя» или «идентификатор»). После имени свойства следует двоеточие
// ":", и затем указывается значение свойства. Если в объекте несколько свойств, то они перечисляются через запятую)

// Последнее свойство объекта может заканчиваться запятой (Это называется «висячая запятая». Такой подход упрощает
// добавление, удаление и перемещение свойств, так как все строки объекта становятся одинаковыми)



// Для обращения к свойствам используется запись «через точку»:
// (получаем свойства объекта):
console.log(user3); // {name: 'John', age: 30}
console.log(user3.name); // John
console.log(user3.age); // 30

// Значение может быть любого типа.
// Давайте добавим свойство с логическим значением:
user3.isAdmin = true; // теперь у объекта user3 три свойства
console.log(user3.isAdmin);
console.log(user3); // {name: 'John', age: 30, isAdmin: true}

// Для удаления свойства мы можем использовать оператор delete:
delete user3.age;
console.log(user3); // {name: 'John', isAdmin: true}


// Имя свойства может состоять из нескольких слов, но тогда оно должно быть заключено в кавычки:
let user4 = {
	name: "John",
	age: 30,
	"likes birds": true  // имя свойства из нескольких слов должно быть в кавычках
};
// Для свойств, имена которых состоят из нескольких слов, доступ к значению «через точку» не работает
// Для таких случаев существует альтернативный способ доступа к свойствам через квадратные скобки. Такой способ сработает с любым именем свойства:
let user5 = {};

// присваивание значения свойству
user5["likes girls"] = true;

// получение значения свойства
console.log(user5["likes girls"]); // true

// удаление свойства
delete user5["likes girls"];
// (Обратите внимание, что строка в квадратных скобках заключена в кавычки (подойдёт любой тип кавычек))

//--------------------------------------------------------------------------------------------------------------------//

// Квадратные скобки также позволяют обратиться к свойству, имя которого может быть результатом выражения. Например, имя свойства может храниться в переменной:
let key = "likes JS";
// то же самое, что и user["likes JS"] = true;
user[key] = true;


// Вычисляемые свойства

// Мы можем использовать квадратные скобки в литеральной нотации для создания вычисляемого свойства
let fruit = 'apple';
let bag = {
	[fruit + 'Computers']: 5 // bag.appleComputers = 5
};
// (Смысл вычисляемого свойства прост: запись [fruit + 'Computers'] означает, что имя свойства необходимо взять из
// переменной fruit и затем конкатенировать к нему строку: Computers)
console.log(bag.appleComputers);

// ещё пример вычисляемого и передаваемого объекту свойства:
let firstPart = 'likes Js';
let userInfo = {

	name: 'Masha',
	age: 30,
	[firstPart]: 'yes',
}
console.log(userInfo[firstPart]); // вызвали св-во в квадратных скобках

//-------------------------------------------------------------------------------------------------------------------//

// Свойство из переменной

// В реальном коде часто нам необходимо использовать существующие переменные как значения для свойств с тем же именем.

// Например:

function makeUser(name, age) {
	return {
		name: name,
		age: age
		// ...другие свойства
	};
}
let user6 = makeUser("Lida", 30);
console.log(user6.name); // Lida
// В примере выше название свойств name и age совпадают с названиями переменных, которые мы подставляем в качестве
//значений этих свойств. Такой подход настолько распространён, что существуют специальные короткие свойства для упрощения этой записи.

// Вместо name:name мы можем написать просто name:
function makeUser(name, age) {
	return {
		name, // то же самое, что и name: name
		age   // то же самое, что и age: age
		// ...
	};
}

// Мы можем использовать как обычные свойства, так и короткие в одном и том же объекте:
let user7 = {
	name,  // тоже самое, что и name:name
	age: 30
};

//-------------------------------------------------------------------------------------------------------------------//

// Ограничения на имена свойств

// Как мы уже знаем, имя переменной не может совпадать с зарезервированными словами, такими как «for», «let», «return» и т.д.

// Но для свойств объекта такого ограничения нет:

// эти имена свойств допустимы
let obj = {
	for: 1,
	let: 2,
	return: 3
};

console.log(obj.for + obj.let + obj.return);  // 6
// Иными словами, нет никаких ограничений к именам свойств. Они могут быть в виде строк или символов (специальный тип
// для идентификаторов, который будет рассмотрен позже).

// Все другие типы данных будут автоматически преобразованы к строке.
// Например, если использовать число 0 в качестве ключа, то оно превратится в строку "0":
let obj2 = {
	0: "Тест" // то же самое что и "0": "Тест"
};
// обе функции console.log выведут одно и то же свойство (число 0 преобразуется в строку "0")
console.log(obj2["0"]); // Тест
console.log(obj2[0]); // Тест (то же свойство)

//====================================================================================================================//

// Тип данных Symbol

// По спецификации, в качестве ключей для свойств объекта могут использоваться только строки или символы. Ни числа, ни
// логические значения не подходят, разрешены только эти два типа данных.

// До сих пор мы видели только строки. Теперь давайте разберём символы, увидим, что хорошего они нам дают.

// Символы
//«Символ» представляет собой уникальный идентификатор. Создаются новые символы с помощью функции Symbol():

// Создаём новый символ - id
let id = Symbol();

// При создании, символу можно дать описание (также называемое имя), в основном использующееся для отладки кода:
// Создаём символ id с описанием (именем) "id"
let id01 = Symbol("id");

// Символы гарантированно уникальны. Даже если мы создадим множество символов с одинаковым описанием, это всё равно
// будут разные символы. Описание – это просто метка, которая ни на что не влияет.

// Например, вот два символа с одинаковым описанием – но они не равны:
let id1 = Symbol("id");
let id2 = Symbol("id");
console.log(id1 == id2); // false
// alert(id1); // Uncaught TypeError: Cannot convert a Symbol value to a string (т.е. Символы не преобразуются автоматически в строки)

// Если же мы действительно хотим вывести символ с помощью alert, то необходимо явно преобразовать его с помощью метода .toString(), вот так:
// alert(id1.toString()); // Symbol(id), теперь работает

// Или мы можем обратиться к свойству symbol.description, чтобы вывести только описание:
let id3 = Symbol("id3");
console.log(id3.description); // id

//--------------------------------------------------------------------------------------------------------------------//
/* 
«Скрытые» свойства

Символы позволяют создавать «скрытые» свойства объектов, к которым нельзя нечаянно обратиться и перезаписать их из других частей программы.

Например, мы работаем с объектами user, которые принадлежат стороннему коду. Мы хотим добавить к ним идентификаторы.
Используем для этого символьный ключ:
 */

let userS = {
	name: "Вася"
};

let id4 = Symbol("id");

userS[id4] = 1;

console.log(userS[id4]); // мы можем получить доступ к данным по ключу-символу

//-------------------------------------------------------------------------------------------------------------------//

// Символы в литеральном объекте

// Если мы хотим использовать символ при литеральном объявлении объекта {...}, его необходимо заключить в квадратные скобки.
// Вот так:

let id5 = Symbol("id");

let user8 = {
	name: "Вася",
	[id5]: 123 // просто "id5: 123" не сработает
};
// Это вызвано тем, что нам нужно использовать значение переменной id в качестве ключа, а не строку «id».

//====================================================================================================================//

//Символы игнорируются циклом for…in

//Свойства, чьи ключи – символы, не перебираются циклом for..in.
// Например:

let id9 = Symbol("id");
let user9 = {
	name: "Вася",
	age: 30,
	[id9]: 12345
};

for (let key in user9) console.log(key); // name, age (свойства с ключом-символом[id9] нет среди перечисленных)

// хотя прямой доступ по символу работает
// alert("Напрямую: " + user9[id9]);

//=====================================================================================================================//

/*
Системные символы

Существует множество «системных» символов, использующихся внутри самого JavaScript, и мы можем использовать их, чтобы настраивать различные аспекты поведения объектов.

Эти символы перечислены в спецификации в таблице Well-known symbols:

Symbol.hasInstance
Symbol.isConcatSpreadable
Symbol.iterator
Symbol.toPrimitive
…и так далее.
В частности, Symbol.toPrimitive позволяет описать правила для объекта, согласно которым он будет преобразовываться к примитиву. Мы скоро увидим его применение.

С другими системными символами мы тоже скоро познакомимся, когда будем изучать соответствующие возможности языка
 */

//=====================================================================================================================//

// Вложенность

let userInfo2 = {

	name: 'Lubov',
	age: 35,
	address: {

		city: 'Don',
		street: 'lenina',
	}
}
console.log(userInfo2);
console.log(userInfo2.name);
console.log(userInfo2.age);
console.log(userInfo2.address);

// добавление свойства: hobby: programming, объекту: userInfo2
userInfo2.hobby = 'programming';
console.log(userInfo2);

userInfo2['likes JavaScript'] = 'yes'; // ключ из нескольких слов
console.log(userInfo2);

// добавим объект внутрь объекта:
userInfo2.languages = {

	php: true,
	js: true,
};
console.log(userInfo2);

// изменим свойство:
userInfo2.hobby = 'programming and sport';
console.log(userInfo2);
// (изменять свойства объекта можно даже если он присвоен(сохранён) не переменной, а константе)

//--------------------------------------------------------------------------------------------------------------------//

// Копирование объекта

// Переменная, которой присвоен объект, хранит не сам объект, а его «адрес в памяти» – другими словами, «ссылку» на него
// (При копировании переменной объекта копируется ссылка, но сам объект не дублируется.)
let userCopy = { name: "Olya" };
console.log(userCopy);

let admin = userCopy; // копируется ссылка
console.log(admin);

admin.name = "Zoya";
console.log(userCopy);
console.log(admin);

/*
Это как если бы у нас был шкафчик с двумя ключами, и мы использовали один из них (admin), чтобы войти в него и внести изменения. А затем, если мы позже используем другой ключ (userCopy), мы все равно открываем тот же шкафчик и можем получить доступ к изменённому содержимому
*/

//====================================================================================================================//

// Клонирование(дублирование) и объединение, Object.assign

// можем использовать для этого метод Object.assign

// синтаксис:
// Object.assign(dest, [src1, src2, src3...])
/* 
-Первый аргумент dest — целевой объект (т.е. куда хотим скопировать).
-Остальные аргументы src1, ..., srcN (может быть столько, сколько необходимо) являются исходными объектами (свщйства, которых хотим копировать)
*/
let userClon = { name: "John" };

let permissions1 = { canView: true };
let permissions2 = { canEdit: true };

// копируем все свойства из permissions1 и permissions2 в user
Object.assign(userClon, permissions1, permissions2);  // теперь user = { name: "John", canView: true, canEdit: true }
console.log(userClon);

// Если скопированное имя свойства уже существует, оно будет перезаписано:
Object.assign(userClon, { name: "Polina" });
console.log(userClon); // теперь user = { name: "Polina" }

// Мы также можем использовать Object.assign для замены цикла for..in для простого клонирования (дублирования)
// Он копирует все свойства userD в пустой объект и возвращает его
let userD = {
	name: "Lena",
	age: 30
};
console.log(userD);

let clone = Object.assign({}, userD);
clone.age = 25;
console.log(clone);

// Добавление свойств в объект с помощью Object.assign (сначала указываем куда добавить и далее (после запятой) в
// фигурных скобках, через запятую указываем новые свойства)
Object.assign(userD, { hobby: 'programming', ['likes JavaScript']: true });
console.log(userD);

Object.assign(clone, { city: 'Sochi' });
console.log(clone);

//====================================================================================================================//

// Проверка существования свойства, оператор «in»

/*
В отличие от многих других языков, особенность JavaScript-объектов в том, что можно получить доступ к любому свойству. Даже если свойства не существует – ошибки не будет!
(При обращении к свойству, которого нет, возвращается undefined. Это позволяет просто проверить существование свойства)
*/

// проверка на существование свойства объекта:
let userOb = {
	name: "Lena",
	age: 30
};
if (userOb.name) {

	console.log(userOb.name);
}

// При обращении к свойству, которого нет, возвращается undefined. Это позволяет просто проверить существование свойства:
let userProp = {};
console.log(userProp.noSuchProperty === undefined); // true означает "свойства нет"



// проверка на существование свойства объекта (Опциональная цепочка (применение оператора: ? с точкой))
// (Опциональная цепочка ?. — это безопасный способ доступа к свойствам вложенных объектов, даже если какое-либо из промежуточных свойств не существует)

// Опциональная цепочка ?. останавливает вычисление и возвращает undefined, если значение перед ?. равно undefined или null
let userOp = {}; // пользователь без адреса

console.log(userOp?.address?.street); // undefined (без ошибки)
console.log(userInfo2?.address?.street); // lenina

// вот пример с document.querySelector:
let html = document.querySelector('.elem')?.innerHTML; // будет  , если элемента нет



// Также существует специальный оператор "in" для проверки существования свойства в объекте

// Синтаксис оператора:
// "key" in object
// Обратите внимание, что слева от оператора in должно быть имя свойства. Обычно это строка в кавычках.
// Пример:

let userSonia = { name: "Sonia", age: 30 };
console.log("age" in userSonia); // true, user.age существует
console.log("blabla" in userSonia); // false, user.blabla не существует

// Если мы опускаем кавычки, это значит, что мы указываем переменную, в которой находится имя свойства. Например:
let userOk = { age: 30 };
let okey = "age";
console.log(okey in userOk); // true, имя свойства было взято из переменной key


/* 
Для чего вообще нужен оператор in? Разве недостаточно сравнения с undefined?

В большинстве случаев прекрасно сработает сравнение с undefined. Но есть особый случай, когда оно не подходит, и нужно использовать "in"
 */

//Это когда свойство существует, но содержит значение undefined:
let object = {
	test: undefined
};

console.log(object.test); //  выведет undefined, значит свойство не существует?
console.log("test" in object); // true, свойство существует!
// В примере выше свойство object.test технически существует в объекте. Оператор in сработал правильно.

/*
Подобные ситуации случаются очень редко, так как undefined обычно явно не присваивается. Для «неизвестных» или «пустых» свойств мы используем значение null. Таким образом, оператор in является экзотическим гостем в коде
*/

//====================================================================================================================//

// Цикл "for..in"

// Для перебора всех свойств объекта используется цикл for..in. Этот цикл отличается от изученного ранее цикла for(;;).

// Синтаксис:
for (key in object) {
	// тело цикла выполняется для каждого свойства объекта
}

// пример:
let userForIn = {

	name: "Marina",
	age: 33,
	isAdmin: true,
	address: {

		city: 'Rost',
		street: 'Kirova',
	}
};

for (let key in userForIn) {
	// ключи
	console.log(key);  // name, age, isAdmin, address
	// значения ключей
	console.log(userForIn[key]); // John, 33, true, {city: 'Rost', street: 'Kirova'}
}

// выведем только ключи и значения объекта внутри объекта
for (let key in userForIn.address) {
	// ключи
	console.log(key);  // city, street
	// значения ключей
	console.log(userForIn.address[key]); // Rost, Kirova
}

//=====================================================================================================================//

// Методы объекта

// Примеры методов:

// Для начала давайте научим нашего пользователя user здороваться:
let userFunc = {
	name: "John",
	age: 30
};
// добавим объекту новое свойство: метод (мы получили метод sayHi объекта user.)
userFunc.sayHi = function () {
	console.log("Привет!");
};
// вызовем метод(функцию), находящийся в свойствах объекта 
userFunc.sayHi(); // Привет!



// Функцию, которая является свойством объекта, называют методом этого объекта.



// Конечно, мы могли бы использовать заранее объявленную функцию в качестве метода, вот так:
function sayCool() {

	console.log('Круто!');
}
// добавляем заранее объявленную функцию в качестве метода:
userFunc.sayCool = sayCool;
// вызовем метод(функцию), находящийся теперь в свойствах объекта:
userFunc.sayCool(); // Круто!



// Сокращённая запись метода

// Существует более короткий синтаксис для методов в литерале объекта:

// эти объекты делают одно и то же

user = {
	sayHi: function () {
		alert("Привет");
	}
};

// сокращённая запись выглядит лучше, не так ли?
user = {
	sayHi() { // то же самое, что и "sayHi: function(){...}"
		alert("Привет");
	}
};


//=====================================================================================================================//

// Ключевое слово «this» в методах объекта

/* 
Как правило, методу объекта обычно требуется доступ к информации, хранящейся в объекте, для выполнения своей работы.

Например, коду внутри user.sayHi() может потребоваться имя пользователя, которое хранится в объекте user.

Для доступа к информации внутри объекта метод может использовать ключевое слово this.

Значение this – это объект «перед точкой», который используется для вызова метода (т.е. текущий объект)
*/
// например: 
let userTh = {
	name: "Katia",
	age: 30,
	sayHi() {
		// "this" - это ссылка на "текущий объект".
		console.log(this.name);
	}
};
userTh.sayHi(); // Katia
// Здесь во время выполнения кода userTh.sayHi() значением this будет являться userTh (ссылка на объект userTh)


/* 
Технически также возможно получить доступ к объекту без ключевого слова this, обратившись к нему через внешнюю переменную (в которой хранится ссылка на этот объект):
*/

let userTh1 = {
	name: "Lora",
	age: 30,
	sayHi() {
		// "this" - это ссылка на "текущий объект".
		console.log(userTh1.name);
	}
};
userTh1.sayHi(); // Lora
/*
…Но такой код ненадёжен. Если мы решим скопировать ссылку на объект userTh1 в другую переменную, например, admin = userTh1, и перезапишем переменную userTh чем-то другим, тогда будет осуществлён доступ к неправильному объекту при вызове метода из admin

Если бы мы использовали this.name вместо userTh1.name внутри console.log, тогда этот код бы сработал
*/


// Если внутри функции используется this, тогда она ожидает, что будет вызвана в контексте какого-либо объекта

/* 
Если вы до этого изучали другие языки программирования, то вы, вероятно, привыкли к идее «фиксированногоthis» – когда методы, определённые в объекте, всегда имеют this, ссылающееся на этот объект.

В JavaScript this является «свободным», его значение вычисляется в момент вызова метода и не зависит от того, где этот метод был объявлен, а скорее от того, какой объект вызывает метод (какой объект стоит «перед точкой»)
*/

/* 
У стрелочных функций нет «this»

Стрелочные функции особенные: у них нет своего «собственного» this. Если мы ссылаемся на this внутри такой функции, то оно берётся из внешней «нормальной» функции.
 */

// Например, здесь arrow()- функция внутри функции(метода) объекта, использует значение this из внешнего метода 
// user.sayHi():

let userStr = {
	firstName: "Zaya",
	sayHi() {
		let arrow = () => console.log(this.firstName);
		arrow();
	}
};
userStr.sayHi(); // Zaya

//Это особенность стрелочных функций. Она полезна, когда мы на самом деле не хотим иметь отдельное this, а скорее хотим взять его из внешнего контекста

//====================================================================================================================//

// Конструктор, оператор "new"

// Обычный синтаксис {...} позволяет создать только один объект. Но зачастую нам нужно создать множество похожих,
// однотипных объектов, таких как пользователи, элементы меню и так далее.

// Это можно сделать при помощи функции-конструктора и оператора "new".


// Функция - конструктор

// Функции-конструкторы технически являются обычными функциями. Но есть два соглашения:

// -Имя функции-конструктора должно начинаться с большой буквы.
// -Функция-конструктор должна выполняться только с помощью оператора "new".
// Например:

function User(name) {
	this.name = name;
	this.isAdmin = false;
}
let userConstr = new User("Jack");
console.log(userConstr.name); // Jack
console.log(userConstr.isAdmin); // false

//Когда функция вызывается как new User(...), происходит следующее:

// =Создаётся новый пустой объект, и он присваивается this.
// -Выполняется тело функции. Обычно оно модифицирует this, добавляя туда новые свойства.
// -Возвращается значение this.

// Другими словами, new User(...) делает что-то вроде:

function User(name) {
	// this = {};  (неявно)

	// добавляет свойства к this
	this.name = name;
	this.isAdmin = false;

	// return this;  (неявно)
}

// Таким образом, let userConstr = new User("Jack") возвращает тот же результат, что и:

let userConstr2 = {
	name: "Jack",
	isAdmin: false
};

// Теперь, если нам будет необходимо создать других пользователей, мы можем просто вызвать new User("Ann"), new User
// ("Alice") и так далее. Данная конструкция гораздо удобнее и читабельнее, чем многократное создание литерала объекта.
console.log(new User("Ann"));
console.log(new User("Alice"));

// Это и является основной целью конструкторов – реализовать код для многократного создания однотипных объектов.

/* 
Давайте ещё раз отметим – технически любая функция (кроме стрелочных функций, поскольку у них нет this) может использоваться в качестве конструктора. Его можно запустить с помощью new, и он выполнит выше указанный алгоритм. Подобные функции должны начинаться с заглавной буквы – это общепринятое соглашение, чтобы было ясно, что функция должна вызываться с помощью «new».
 */