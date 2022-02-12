const popupLinks = document.querySelectorAll('.popup-link'); // получаем все кнопки, которые открывают окно
const body = document.querySelector('body'); // получаем body - для блокировки скролла
const lockPadding = document.querySelectorAll('.lock-padding'); // получаем все объкты с классом lock-padding (этот класс добвлется нами для фиксированных объектов, чтобы они при сокрытии скролла (в момент открытия попапа) не смещались)

console.log(popupLinks)
console.log(body)
console.log(lockPadding)

let unlock = true; // чтобы не было двойных нажатий

const timeout = 800; // время анимации 	

// Получаем все ссылки открытия окна
if (popupLinks.length > 0) {
	for (let index = 0; index < popupLinks.length; index++) {
		const popupLink = popupLinks[index];
		popupLink.addEventListener('click', function (e) {
			const popupName = popupLink.getAttribute('href').replace('#', ''); // получаем чистое имя ID
			const curentPopup = document.getElementById(popupName); // получаем сам ID
			popupOpen(curentPopup); // отправляем полученный элемент в функцию popupOpen
			e.preventDefault(); // сброс стандратного поведения (запрет перезагружать страницу (дальнейшей работы ссылки))
		});
	}
}


// Объекты которые будут Окно закрывать
const popupCloseIcon = document.querySelectorAll('.close-popup');
if (popupCloseIcon.length > 0) {
	for (let index = 0; index < popupCloseIcon.length; index++) {
		// получаем конкретный объект:
		const el = popupCloseIcon[index];
		// вешаем на него событие click:
		el.addEventListener('click', function (e) {
			// при этом событии отправляем в функцию popupClose() объект, который является близжайшим родителем (с классом popup) нажатой ссылки Его функция popupClose() и будет закрывать
			popupClose(el.closest('.popup'));
			e.preventDefault(); // запрет дальнейшей работы ссылки
		})
	}
}

// Функция открытия попапа:
// в параметры мы передаём готовый объект по имени (по идентификатору)
function popupOpen(curentPopup) {
	// проеряем есть ли такой объект и открыта ли переменная unlock (в начале мы указали (объявили): let unlock = true;)
	if (curentPopup && unlock) {
		const popupActive = document.querySelector('.popup.open'); // получаем открытый попап (объект с классом popup у которого добавлен класс open)
		if (popupActive) { // если он существует
			popupClose(popupActive, false); // тогда закрыть его
		} else { // если такого нет 
			bodyLock(); // тогда блокируется скролл
		}
		curentPopup.classList.add('open'); // открываем попап 
		// открывшемуся попапу вешаем событие при click
		curentPopup.addEventListener('click', function (e) {
			if (!e.target.closest('.popup__content')) { // если у нажатого объекта нету в родителях popup__content (это-тёмная область вокруг модального окна(попапа))
				popupClose(e.target.closest('.popup')); // тогда мы popup закрываем кликом на тёмную область
			}
		});
	}
}

// Функция, закрывающая попап

// в параметры передаём активный обект (открытый попап) и значение, указывающее нужно ли блокировать скролл (если открывается попап из попапа, то уже не нужно)
function popupClose(popupActive, doUnlock = true) {
	if (unlock) {
		popupActive.classList.remove('open');
		// при закрытии одного попапа (в момент открытия другого) скролл будет оставаться заблокирован (скрыт)
		if (doUnlock) {
			bodyUnlock();
		}
	}
}

// Функция скрывающая скролл

function bodyLock() {
	// вычисляем разницу между шириной вьюпорта (всего окна) и шириной объкта, который находится внутри него (чтобы получить ширину скролла, который мы будем скрывать)
	// Это нужно чтобы не происходило смещения контента во время когда попап закрывается и скролл появляется снова
	const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';

	// проверка: есть ли объекты с классом lock-padding
	if (lockPadding.length > 0) {
		// в цикле бегаем по всем объектам с классом lock-padding (получили в начале)
		for (let index = 0; index < lockPadding.length; index++) {
			// каждому полученному объекту с классом lock-padding
			const el = lockPadding[index];
			// присваиваем расчётное значение, равное ширине скролла (в виде: padding-right) элементам с классом lock-padding
			el.style.paddingRight = lockPaddingValue;
		}
	}

	// присваиваем расчётное значение также самому body
	body.style.paddingRight = lockPaddingValue;
	// добавляем body класс lock
	body.classList.add('lock');

	// здесь блокируем (закрываем) переменную unlock (чтобы не было повторного нажатия на ссылку на попап, в момент открытия попапа)
	unlock = false;
	// снова возвращаем переменной значение unlock = true, после того как пройдёт время (анимации) указанное нами в начале в перемненной const timeout = 800;
	setTimeout(function () {
		unlock = true;
	}, timeout);
}

function bodyUnlock() {
	setTimeout(function () {
		for (let index = 0; index < lockPadding.length; index++) {
			const el = lockPadding[index];
			el.style.paddingRight = '0px';
		}
		body.style.paddingRight = '0px';
		body.classList.remove('lock');
	}, timeout);

	unlock = false;
	setTimeout(function () {
		unlock = true;
	}, timeout);
}


document.addEventListener('keydown', function (e) {
	if (e.which === 27) {
		const popupActive = document.querySelector('.popup.open');
		popupClose(popupActive);
	}
});

console.log("hello")