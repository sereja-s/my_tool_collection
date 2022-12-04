// JavaScript может использоваться в браузере, на веб-сервере или в какой-то другой среде, даже в кофеварке. Каждая
// среда предоставляет свою функциональность, которую спецификация JavaScript называет окружением

// Окружение предоставляет свои объекты и дополнительные функции, в дополнение базовым языковым

// Ниже в общих чертах показано, что доступно для JavaScript в браузерном окружении:

//                                    window
// DOM                                   BOM                                     JavaScript
// -document                          -navigator                                 -Object
//   ...                               -screen                                    -Array
//                                    -location                                  -Function
//                                    -frames                                       ...
//                                    -history
//                                    -XMLHttpRequest

// Как мы видим, имеется корневой объект window, который выступает в 2 ролях:

// -Во-первых, это глобальный объект для JavaScript-кода, об этом более подробно говорится в главе Глобальный объект.
// -Во-вторых, он также представляет собой окно браузера и располагает методами для управления им

// DOM (Document Object Model)

// Document Object Model, сокращённо DOM – объектная модель документа, которая представляет все содержимое страницы в
// виде объектов, которые можно менять.

// Объект document – основная «входная точка». С его помощью мы можем что-то создавать или менять на странице

//-----------------------------------------------------------------------------------------------------------------//

// BOM (Browser Object Model)

// Объектная модель браузера (Browser Object Model, BOM) – это дополнительные объекты, предоставляемые браузером (окружением), чтобы работать со всем, кроме документа.

// Например:
// -Объект navigator даёт информацию о самом браузере и операционной системе. Среди множества его свойств самыми
// известными являются: navigator.userAgent – информация о текущем браузере, и navigator.platform – информация о
// платформе (может помочь в понимании того, в какой ОС открыт браузер – Windows/Linux/Mac и так далее).
// -Объект location позволяет получить текущий URL и перенаправить браузер по новому адресу.
// Вот как мы можем использовать объект location:

/*
alert(location.href); // показывает текущий URL
if (confirm("Перейти на Wikipedia?")) {
	location.href = "https://wikipedia.org"; // перенаправляет браузер на другой URL
}
 */

// Функции alert/confirm/prompt тоже являются частью BOM: они не относятся непосредственно к странице, но представляют
// собой методы объекта окна браузера для коммуникации с пользователем

//--------------------------------------------------------------------------------------------------------------------//

// DOM-дерево

// Основой HTML-документа являются теги.

// В соответствии с объектной моделью документа («Document Object Model», коротко DOM), каждый HTML-тег является
// объектом. Вложенные теги являются «детьми» родительского элемента. Текст, который находится внутри тега, также является объектом.

// Все эти объекты доступны при помощи JavaScript, мы можем использовать их для изменения страницы

// Теги являются узлами-элементами (или просто элементами). Они образуют структуру дерева: <html> – это корневой узел, <head> и <body> его дочерние узлы и т.д.
// Текст внутри элементов образует текстовые узлы, обозначенные как #text. Текстовый узел содержит в себе только строку
// текста. У него не может быть потомков, т.е. он находится всегда на самом нижнем


// Автоисправление

// Если браузер сталкивается с некорректно написанным HTML-кодом, он автоматически корректирует его при построении DOM



// Все, что есть в HTML, даже комментарии, является частью DOM.

// Даже директива <!DOCTYPE...>, которую мы ставим в начале HTML, тоже является DOM-узлом. Она находится в дереве DOM
// прямо перед <html>. Мы не будем рассматривать этот узел, мы даже не рисуем его на наших диаграммах, но он существует.

// Даже объект document, представляющий весь документ, формально является DOM-узлом.

// Существует 12 типов узлов. Но на практике мы в основном работаем с 4 из них:
// -document – «входная точка» в DOM.
// -узлы-элементы – HTML-теги, основные строительные блоки.
// -текстовые узлы – содержат текст.
// -комментарии – иногда в них можно включить информацию, которая не будет показана, но доступна в DOM для чтения JS


//===================================================================================================================//

// Навигация по DOM-элементам

//DOM позволяет нам делать что угодно с элементами и их содержимым, но для начала нужно получить соответствующий DOM-объект.

// Все операции с DOM начинаются с объекта document. Это главная «точка входа» в DOM. Из него мы можем получить доступ к любому узлу.

// Так выглядят основные ссылки, по которым можно переходить между узлами DOM:

//                             document

//                 document.documentElement < HTML >

//	                         document.body
//                         (if inside body)
//------------------------------------------------------------------//

//                             parentNode

// previousSibling               < DIV >               nextSibling

//                              childNodes

//                   firstChild            lastChild

// Поговорим об этом подробнее.

// Сверху: documentElement и body

// Самые верхние элементы дерева доступны как свойства объекта document: <html> = document.documentElement
// (Самый верхний узел документа: document.documentElement. В DOM он соответствует тегу <html>)

// получим объект html со всем его содержимым:
const htmlElement = document.documentElement;

// <body> = document.body
// Другой часто используемый DOM-узел – узел тега <body>: document.body.

// получим объект body со всем его содержимым:
const bodyElement1 = document.body;

// <head> = document.head
// Тег <head> доступен как document.head

// получим объект body со всем его содержимым:
const headElement = document.head;

console.log(htmlElement);
console.log(bodyElement1);
console.log(headElement);

//-------------------------------------------------------------------------------------------------------------------//

// Дети: childNodes, firstChild, lastChild

// Здесь и далее мы будем использовать два принципиально разных термина:

// 1) Дочерние узлы (или дети) – элементы, которые являются непосредственными детьми узла. Другими словами, элементы,
// которые лежат непосредственно внутри данного. Например, <head> и <body> являются детьми элемента <html>.

// 2) Потомки – все элементы, которые лежат внутри данного, включая детей, их детей и т.д.


// - Свойства firstChild и lastChild обеспечивают быстрый доступ к первому и последнему дочернему элементу


// Получив объект: body в константу, мы можем использовать этот объект как отправную точку для последующей навигации:
// 1) получаем объект: body
const bodyElement = document.body;

// 2) получаем доступ к первому и последнему дочернему элементу(узлу) объекта:
const firstChildNode = bodyElement.firstChild;
const lastChildNode = bodyElement.lastChild;

console.log(firstChildNode);
console.log(lastChildNode);

// - Коллекция childNodes содержит список всех детей, включая текстовые узлы:
const childNodes = bodyElement.childNodes;

console.log(childNodes); // NodeList(14) [text, comment, text, h1, text, comment, text, h2, text, div.lesson, text, h4#text, text, script]


// Для проверки наличия дочерних узлов существует также специальная функция hasChildNodes():
// выведем результат её работы для объекта:
console.log(bodyElement.hasChildNodes()); // true

//------------------------------------------------------------------------------------------------------------------//

// DOM-коллекции

// Как мы уже видели, childNodes похож на массив. На самом деле это не массив, а коллекция – особый перебираемый объект-псевдомассив.

// И есть два важных следствия из этого:

// - Для перебора коллекции мы можем использовать for..of:
for (let node of document.body.childNodes) {

	console.log(node); // покажет все узлы из коллекции
}
// Это работает, потому что коллекция является перебираемым объектом (есть требуемый для этого метод Symbol.iterator).

// - Методы массивов не будут работать, потому что коллекция – это не массив:
console.log(document.body.childNodes.filter); // undefined (у коллекции нет метода filter!)

// Первый пункт – это хорошо для нас. Второй – бывает неудобен Если нам хочется использовать именно методы массива, то
// мы можем создать настоящий массив из коллекции, используя Array.from:
console.log(Array.from(document.body.childNodes).filter); // сделали массив

// Особенности DOM-коллекции:

// 1) DOM-коллекции – только для чтения
// DOM-коллекции, и даже более – все навигационные свойства, перечисленные в этой главе, доступны только для чтения. Мы
// не можем заменить один дочерний узел на другой, просто написав childNodes[i] = ....
// (Для изменения DOM требуются другие методы. Мы увидим их в следующей главе)

// 2) DOM-коллекции живые
// Почти все DOM-коллекции, за небольшим исключением, живые. Другими словами, они отражают текущее состояние DOM.
// (Если мы сохраним ссылку на elem.childNodes и добавим/удалим узлы в DOM, то они появятся в сохранённой коллекции автоматически)

// 3) Не используйте цикл for..in для перебора коллекций
// Коллекции перебираются циклом for..of. Некоторые начинающие разработчики пытаются использовать для этого цикл for..in.
// Не делайте так. Цикл for..in перебирает все перечисляемые свойства. А у коллекций есть некоторые «лишние», редко используемые свойства, которые обычно нам не нужны

//-------------------------------------------------------------------------------------------------------------------//

// Соседи и родитель

// Соседи – это узлы, у которых один и тот же родитель.

//Например, здесь <head> и <body> соседи:
/*
<html>
	<head>...</head>
	<body>...</body>
</html>
*/
// говорят, что <body> – «следующий» или «правый» сосед <head>, также можно сказать, что <head> «предыдущий» или «левый» сосед <body>.

// Следующий узел того же родителя(следующий сосед) – в свойстве nextSibling, а предыдущий – в previousSibling.
// Родитель доступен через parentNode

// получим предыдущий узел объекта: body
const previousSiblingNode = bodyElement.previousSibling;
console.log(previousSiblingNode); // #text (текстовый узел, которого не видно в DOM-дереве (например перевод строки, пробел и т.д.))

// получим следующий узел объекта: body 
const nextSiblingNode = bodyElement.nextSibling;
console.log(nextSiblingNode); // null (т.к. после body ничего нет (т.е. мы обращаемся к несуществующему объекту(узлу)))

// получим родителя объекта: body
const parentNode = bodyElement.parentNode;
console.log(parentNode); // получим объект: html со всем содержимым

//===================================================================================================================//

// Навигация только по элементам (тегам, которые формируют структуру страницы)

// Навигационные свойства, описанные выше, относятся ко всем узлам в документе. В частности, в childNodes находятся и
// текстовые узлы и узлы-элементы и узлы-комментарии, если они есть.

console.log(childNodes); // NodeList(14) [text, comment, text, h1, text, comment, text, h2, text, div.lesson, text, h4#text, text, script]

// Но для большинства задач текстовые узлы и узлы-комментарии нам не нужны. Мы хотим манипулировать узлами-элементами,
// которые представляют собой теги и формируют структуру страницы.

const bodyChildren = bodyElement.children;
console.log(bodyChildren); // HTMLCollection(5) [h1, h2, div.lesson, h4#text, script, text: h4#text]

//Поэтому давайте рассмотрим дополнительный набор ссылок, которые учитывают только узлы-элементы:

//                 document.documentElement < HTML >

//	                         document.body
//                         (if inside body)
//------------------------------------------------------------------//

//                             parentElement

// previousElementSibling         < DIV >          nextElementSibling

//                               children

//             firstElementChild           lastElementChild

// Эти ссылки похожи на те, что раньше, только в ряде мест стоит слово Element:
// - children – коллекция детей, которые являются элементами.
// - firstElementChild, lastElementChild – первый и последний дочерний элемент.
// - previousElementSibling, nextElementSibling – соседи-элементы.
// - parentElement – родитель-элемент

// получим первый элемент объекта: body
const firstChild = bodyElement.firstElementChild;
console.log(firstChild); // тег h1

// получим последний элемент объекта: body 
const lastChild = bodyElement.lastElementChild;
console.log(lastChild); // тег script


// получим соседние и родительские элементы объекта: body

// получим предыдущий элемент объекта: body
const previousSibling = bodyElement.previousElementSibling;
console.log(previousSibling); // тег head

// получим следующий элемент объекта: body 
const nextSibling = bodyElement.nextElementSibling;
console.log(nextSibling); // null (т.к. после закрывающего тега: body ничего нет)

// получим родителя объекта: body
const parentElement = bodyElement.parentElement;
console.log(parentElement); // получим объект: html со своим содержимым

//====================================================================================================================//

// Поиск произвольного элемента страницы

// Свойства навигации по DOM хороши, когда элементы расположены рядом. А что, если нет? Как получить произвольный
// элемент страницы? Для этого в DOM есть дополнительные методы поиска.


// querySelectorAll

// Самый универсальный метод поиска – это elem.querySelectorAll(css), он возвращает все элементы внутри elem, удовлетворяющие данному CSS-селектору в виде статичной коллекции:

// Поиск по селектору класса (перед указанием имени класса необходимо поставить точку):
const elementsOne = document.querySelectorAll('.lesson__list');
console.log(elementsOne); // коллекция всех найденных объектов (здесь- один объект): NodeList [ul.lesson__list]

// Поиск по селектору тега:
const elementsTwo = document.querySelectorAll('li');
console.log(elementsTwo); // коллекция всех найденных объектов c искомым тегом

// Поиск по смешанному селектору тега и класса:
const elementsThree = document.querySelectorAll('li.lesson__item-sub-list');
console.log(elementsThree);

// Поиск по тегу первого уровня вложенности:
const elementsFour = document.querySelectorAll('.lesson__list>li');
console.log(elementsFour);

// Поиск по нескольким классам (ставим точку перед названием кдасса, между классами - запятую):
const elementsFive = document.querySelectorAll('.lesson__list, .lesson__text');
console.log(elementsFive);

// Поиск по вложенным классам (запятая не ставится):
const elementsSix = document.querySelectorAll('.lesson__text .lesson__list'); // здесь ищем все объекты с классом: lesson__list, котрорые находятся внутри класса lesson__text
console.log(elementsSix);

// Поиск по id(должен быть уникальным):
const elementsSeven = document.querySelectorAll('#listItem');
console.log(elementsSeven); // получим единственный элемент, расположенный в теге, которому присвоен искомый id

// Поиск по атрибуту:
const elementsEight = document.querySelectorAll('[data-item]');
console.log(elementsEight); // получим все элементы, расположенные в тегах, которым присвоен искомый атрибут

// Поиск по атрибуту со значением:
const elementsNine = document.querySelectorAll('[data-item="85"]');
console.log(elementsNine);


// Т.к. querySelectorAll вернёт коллекцию (статичную) из искомых элементов, то мы можем получить из неё конкретный объект, указав его ключ:
console.log(elementsFour[1]); // получим в консоли 2-ой li на странице: <li id="listItem" class="lesson__item-list">Пункт №2</li>

// Ещё коллекцию можно перебрать:
for (const item of elementsFour) {

	console.log(item); // выведем в консоль все записи коллекции из переменной
}

// Хоть статичная колекция не массив, можно использовать метод перебора:forEach
elementsFour.forEach(element => {

	console.log(element); // результат будет аналогичным предыдущему перебору
});

//-------------------------------------------------------------------------------------------------------------------//

// Искать можно не только в объекте: document

// например:
// сначала в константу получим у объекта: document, коллекцию объктов у которых есть искомый класс:
const subList = document.querySelectorAll('.lesson__sub-list');
console.log(subList); // NodeList [ul.lesson__sub-list]

// далее хотим искать теги li, только внутри этого объекта (при обращении к объекту укажем конкретно позицию [0], хотя в нашем случае в константе: subList лежит коллекция всего из одного элемента (объекта)):
const subItem = subList[0].querySelectorAll('li');
console.log(subItem); // NodeList(4) [li.lesson__item-sub-list, li.lesson__item-sub-list, li.lesson__item-sub-list, li.lesson__item-sub-list]

//===================================================================================================================//

// querySelector

// Метод elem.querySelector(css) возвращает первый элемент, соответствующий данному CSS-селектору (т.е. вернёт один объект)

// Иначе говоря, результат такой же, как при вызове elem.querySelectorAll(css)[0], но он сначала найдёт все элементы, а
// потом возьмёт первый, в то время как elem.querySelector найдёт только первый и остановится. Это быстрее, кроме того, его короче писать

//====================================================================================================================//

// document.getElementById

// Если у элемента есть атрибут id, то мы можем получить его вызовом document.getElementById(id), где бы он ни находился
// При этом:
// - значение id должно быть уникальным
// - Метод getElementById можно вызвать только для объекта document. Он осуществляет поиск по id по всему документу
const elem = document.getElementById('listItem');
console.log(elem); // <li id="listItem" class="lesson__item-list">Пункт №2</li>

//--------------------------------------------------------------------------------------------------------------------//

// getElementsBy* (Не забываем про букву "s"!, т.к. возвращается не один элемент, а коллекция (список элементов))


// Существуют также другие методы поиска элементов по тегу, классу и так далее. На данный момент, они скорее исторические, так как querySelector более чем эффективен. Здесь мы рассмотрим их для полноты картины, также вы можете встретить их в старом коде:

// elem.getElementsByTagName(tag) - ищет элементы (как в объекте: document, так и в любом другом объекте) с данным тегом
// и возвращает их "живую" коллекцию (Передав "*" вместо тега, можно получить всех потомков)
const el = document.getElementsByTagName('li');
console.log(el); // HTMLCollection(7), т.е. "живая" HTML-коллекция

// elem.getElementsByClassName(className) - возвращает элементы, которые имеют данный CSS - класс.
const el2 = document.getElementsByClassName('lesson__item-sub-list');
console.log(el2); // HTMLCollection(4), т.е. "живая" HTML-коллекция

//  document.getElementsByName(name) - ищет элементы (в объекте: document) с заданным атрибутом name и возвращает их. Очень редко используется
const el3 = document.getElementsByName('list');
console.log(el3); // NodeList [ul.lesson__list] - «Живой» NodeList-коллекция

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++=//

// Примечание:

// HTMLCollection и NodeList — это очень похожие на массив коллекции. Они хранят элементы веб-страницы (узлы DOM).
// NodeList может хранить любые типы узлов, а HTMLCollection — только узлы HTML элементов. К элементам коллекций можно
// обращаться по индексу, но у них нет привычных методов массива:

// 1) HTMLCollection возвращают методы getElementsByTagName() и getElementsByClassName()
// Полученная один раз коллекция всегда остаётся актуальной — JavaScript будет обновлять её в случае, если на странице
// появляется подходящий элемент. Поэтому HTMLCollection называют «живой» коллекцией

// 2) NodeList работает почти так же, как и HTMLCollection.
// Разница:
// - NodeList может хранить любые типы узлов, например текстовые узлы и комментарии, а HTMLCollection — только узлы HTML элементов;
// - HTMLCollection позволяет обращаться к элементам не только по индексу, но и по имени с помощью метода namedItem();
// - NodeList может быть не только «живой» коллекцией, но и статической.Такая коллекция не обновляется при появлении на странице новых элементов.

// «Живой» NodeList возвращают метод getElementsByName() и свойство childNodes.
// Статический NodeList возвращает метод querySelectorAll()

// посмотрим на примере:

// Получаем статическую коллекцию:
const listStatic = document.querySelectorAll('.lesson__item-list');
console.log(listStatic); // NodeList(3)

// Получаем "живую" коллекцию :
const listLive = document.getElementsByClassName('lesson__item-list');
console.log(listLive); // HTMLCollection(3)

// Используем один из методов изменения HTML-документа и создадим новый HTML-объект:
const lessonList = document.querySelector('.lesson__list');
lessonList.insertAdjacentHTML(
	"beforeend",
	'<li class="lesson__item-list">Новый пункт</li>'
);

// теперь выведем теже колекции:
console.log(listStatic); // NodeList(3)
console.log(listLive); // HTMLCollection(4) - здесь динамически добавился ещё один объект

//===================================================================================================================//

// Дополнительные методы поиска: