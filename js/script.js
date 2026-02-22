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
	initSliders() 
	initFilterSpollers()
	initNoUiSlider()
	initFilter()

	document.addEventListener('click', documentActions)

	window.addEventListener('scroll', windowScroll)

	const header = document.querySelector('.header');


	function initFilter() {
		const filter = document.querySelector('.filter')
		if (filter) {
			const matchMedia = window.matchMedia(`(width <= 65.625 em)`)
			matchMedia.addEventListener('change', function() {
				setFilter(matchMedia);
			}) 
			setFilter(matchMedia);
			function setFilter(matchMedia) {
				if(matchMedia.matches) {
					const mobileFilter = document.querySelector('.body-catalog__mobile-filter')
					filter.style.cssText = `height: 0;`
					mobileFilter.insertAdjacentElement("afterbegin", filter);
				} else  {
					const catalogMain = document.querySelector('.catalog-main')
					catalogMain.insertAdjacentElement("afterbegin", filter)
					filter.style.cssText = ``
					filter.classList.remove('filter--open')
				}
			}
		}
		
			
	}

	function initFilterSpollers () {
		const filterSpollers = document.querySelectorAll('.item-filter[open]')

		if(filterSpollers.length) {
			filterSpollers.forEach(filterSpollers => {
				filterSpollers.classList.add('item-filter--open')
			})
		}
	}


	 function initSliders() { 
		const reviewsSlider = document.querySelector('.reviews__slider')

		if (reviewsSlider) {
			const sliderReviews = new Swiper(reviewsSlider , {
				// loop: true, 
				sliderPerView: 1.8,

				// If we need pagination
				pagination: {
					el: '.swiper-pagination',
					clickable: true  
				},
				autoHeight: true,
				spaceBetween: 30,
				centeredSlides: true,


				breakpoints: {
					// when window width is >= 320px
					320: {
					slidesPerView: 1.3,
					spaceBetween: 20
					},
					// when window width is >= 640px
					480 : {
					slidesPerView: 1.8,
					spaceBetween: 30,
					}
				} 
			});
		}
	}

	function initNoUiSlider() {
		const priceSlider = document.querySelector('.price-filter__slider')
		const priceInfoItems  = document.querySelectorAll('price-filter__info span')

		if (priceSlider) {
			noUiSlider.create(priceSlider, {
				start: [1500, 50000],
				connect: true,
				range: {
					'min': 100,
					'max': 10000
				}
			});
			priceSlider.noUiSlider.on('update', function (values) {
				priceInfoItems[0].innerHTML = Math.round(values[0])
				priceInfoItems[1].innerHTML = Math.round(values[1])
				 
			})
		}

		
	}

	function windowScroll(e) {
		if (scrollY > 10) {
			header.classList.add('header--scroll')
		} else {
			header.classList.remove('header--scroll')
		}
	}

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
				const currentTitle = targetElement.closest('.body-footer__title')
				const currentList = currentTitle.nextElementSibling
				if (window.innerWidth <= 577) {
					const activeFooterMenu = document.querySelector('[data-footer-menu-open]');
					currentTitle.toggleAttribute('data-footer-menu-open')

					if (activeFooterMenu && activeFooterMenu !== currentTitle) {
						closeActiveFooterMenu(activeFooterMenu)
						
					}

					if (currentTitle.hasAttribute('data-footer-menu-open')) {
						currentList.style.cssText = ``
						const currentListHeight = currentList.offsetHeight
						currentList.style.cssText = `height: 0;`
						currentList.offsetHeight 
						currentList.style.cssText = `height: ${currentListHeight}px`;
					} else {
						currentList.style.cssText = `height: 0;`
					}

					function closeActiveFooterMenu(item) {
						item.removeAttribute('data-footer-menu-open') 
						const currentList= item.nextElementSibling
						currentList.style.cssText = `height: 0;f`
					}
				}
			}
		} 
		if (targetElement.closest('.icon-menu')) {
			document.documentElement.toggleAttribute('data-menu-open')

		}

		if(targetElement.closest('.filter-products-featured__link')) {
			const currentFilter = targetElement.closest(".filter-products-featured__link")
			const activeFilter = document.querySelector(".filter-products-featured__link--active")
			const featuredItems = document.querySelectorAll('.products-featured__items>.item');
			const activeFilterValue = currentFilter.dataset.filterProducts

			if(activeFilter && activeFilter !== currentFilter) {
				activeFilter.classList.remove("filter-products-featured__link--active")
			}

			currentFilter.classList.add(".filter-products-featured__link--active");

			featuredItems.forEach(featuredItem => {  

				featuredItem.closest(`[class*="--${activeFilterValue}]`) || activeFilterValue !== '*' ? featuredItem.style.display = 'flex' : featuredItem.style.display = 'none' 

				// featuredItem.classList.toggle('item--hidden', !(featuredItem.closest(`[class*="--${activeFilterValue}]`) || activeFilterValue === '* '))  

				// setTimeout(() => {
				// 	featuredItem.closest(`[class*="--${activeFilterValue}]`) || activeFilterValue !== '*' ? featuredItem.style.display = 'flex' : featuredItem.style.display = 'none' 
				// }, 500)
				 
			})

			e.preventDefault()
		}

		if (targetElement.closest('.item-filter__title')) {
			e.preventDefault()
			const currentSpollerTitle = targetElement.closest('.item-filter__title')
			const currentSpoller = currentSpollerTitle.parentElement
			const currentSpollerBody = targetElement.closest('.item-filter__title').nextElementSibling
			

			if(!currentSpoller.open) {
				currentSpoller.open = true
				const currentSpollerBodyHeight = currentSpollerBody.offsetHeight
				currentSpoller.classList.add ('item-filter--open')
				currentSpollerBody.style.cssText = `height: 0; opacity: 0;`
				currentSpollerBody.offsetHeight 
				currentSpollerBody.style.cssText = `height: ${currentSpollerBodyHeight}px; opacity: 1;`;
			} else {
				const currentSpollerBodyHeight = currentSpollerBody.offsetHeight
				currentSpoller.classList.remove('item-filter--open')
				currentSpollerBody.style.cssText = `height: ${currentSpollerBodyHeight}px; opacity: 1;`;
				currentSpollerBody.offsetHeight
				currentSpollerBody.style.cssText = `height: 0; opacity: 0;`
				setTimeout (() => {
					currentSpoller.open = false
					currentSpollerBody.style.cssText = ``
				}, 500)
			}
		}

		if (targetElement.closest('.actions-catalog__button-filter')) {
			const filter = document.querySelector('.filter')

			filter.classList.toggle('filter--open')

			if (filter.classList.contains('filter--open')) {
				filter.style.cssText = ``
				const filterHeight = filter.offsetHeight
				filter.style.cssText = `height: 0;`
				filter.offsetHeight
				filter.style.cssText = `height: ${filterHeight}px;`

				setTimeout(() => {
					filter.style.cssText = ``
				}, 300);
			} else {
				const filterHeight = filter.offsetHeight
				filter.style.cssText = `height: ${filterHeight}px;`
				filter.offsetHeight
				filter.style.cssText = `height: 0;`
			}

		}
	}

	 

}