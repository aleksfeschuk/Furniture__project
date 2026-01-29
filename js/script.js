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

	function initSubMenu() {
		const matchMedia = window.matchMedia(`(width <= 41.875em)`)
		const subMenu  = document.querySelector('.sub-menu');
		matchMedia.addEventListener('change', function() {
			setSubMenu(matchMedia.matches);
		})
		setSubMenu(matchMedia.matches)

		function setSubMenu() {
			if(matchMedia.matches) {
				subMenu.style.cssText += `height: 0;`
			} else  {
				subMenu.style.cssText = ``;
			}
		}
	}
	
	function initFooterMenus () {

		const  footerMenus = document.querySelectorAll('.body-footer__list');
		
		if (footerMenus.length) {
			const matchMedia = window.matchMedia(`(width <= 36.0625em)`)

			matchMedia.addEventListener('change', function() {
				setFooterMenus(matchMedia.matches);
			}) 

			function setFooterMenus() {
				footerMenus.forEach(footerMenu => {
					if(matchMedia.matches) {
						footerMenu.style.cssText += `height: 0;`
					} else  {
						footerMenu.style.cssText = ``;
					}
				})
			}
			setFooterMenus();

			
		}
		
	}


	initFooterMenus()
	addTouchAttr()
	initSubMenu()

	document.addEventListener('click', documentActions)

	function documentActions(e) {
		const targetElement = e.target
		if (isMobile.any()) {
			if (targetElement.closest('.menu__sub-link')) {
				const subMenu = document.querySelector('.sub-menu');
				document.documentElement.toggleAttribute('data-sub-menu-open')
				if (window.innerWidth <= 670) {
					if (document.documentElement.hasAttribute('data-sub-menu-open')) {
						//open
						subMenu.style.cssText = ``;
						const subMenuHeight = subMenu.offsetHeight;
						subMenu.style.cssText += `height: 0`;
						subMenu.offsetHeight;
						subMenu.style.cssText = `height: ${subMenuHeight}px`;
					} else {
						 //close

						subMenu.style.cssText += `height: 0`;
					}
				}
			} else {
				document.documentElement.removeAttribute('data-sub-menu-open')
			}
			if (targetElement.closest('.body-footer__title')) { 
				const currentElement = targetElement.closest('.body-footer__title').nextElementSibling
				if (window.innerWidth <= 577) {
					currentElement.style.cssText = ``
					const currentElementHeight = currentElementHeight.offsetHeight
					currentElement.style.cssText = `height: 0; padding-top: 0;`
					currentElement.offsetHeight 
					currentElement.style.cssText = `height: ${currentElementHeight}px`;

					

				}
			}
		} 
		if (targetElement.closest('.icon-menu')) {
			document.documentElement.toggleAttribute('data-menu-open')

		}
	}

}