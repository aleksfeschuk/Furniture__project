// Сучасний (Строгий) режим
"use strict"

window.addEventListener('load', load)

function load() {
	/* Перевірка мобільного браузера */
	const isMobile = { Android: function () { return navigator.userAgent.match(/Android/i); }, BlackBerry: function () { return navigator.userAgent.match(/BlackBerry/i); }, iOS: function () { return navigator.userAgent.match(/iPhone|iPad|iPod/i); }, Opera: function () { return navigator.userAgent.match(/Opera Mini/i); }, Windows: function () { return navigator.userAgent.match(/IEMobile/i); }, any: function () { return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows()); } };
	/* Додавання класу touch для HTML, якщо браузер мобільний */
	function addTouchAttr() {
		// Додавання data-fls-touch для HTML, якщо браузер мобільний
		if (isMobile.any()) document.documentElement.setAttribute('data-fls-touch', '')
	}
	addTouchAttr()

	document.addEventListener('click', documentActions)

	function documentActions(e) {
		
		const targetElement = e.target

		if (isMobile.any()) {
			if (targetElement.closest('.menu__sub-link')) {
			const currentElement = targetElement.closest('.menu__sub-link')
			document.documentElement.toggleAttribute('data-sub-menu-open')
			} else {
				document.documentElement.removeAttribute('data-sub-menu-open')
			}
		} 
		
		
	}

}