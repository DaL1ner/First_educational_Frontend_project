// Получаем элементы DOM
const hamburger = document.querySelector('.header__hamburger');
const navMenu = document.querySelector('.header__navigate-menu');
const navLinks = document.querySelectorAll('.header__navigate-menu-link');
const menuClose = document.querySelector('.header__navigate-menu-menu-close');

// Функция для переключения меню
function toggleMenu() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    menuClose.classList.toggle('active');
    
    // Если меню открыто, добавляем прослушиватель для закрытия при клике вне меню
    if (navMenu.classList.contains('active')) {
        document.addEventListener('click', closeMenuOnClickOutside);
    } else {
        document.removeEventListener('click', closeMenuOnClickOutside);
    }

    // Блокируем скролл при открытом меню
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
}

// Функция для закрытия меню при клике вне него
function closeMenuOnClickOutside(event) {
    if (!navMenu.contains(event.target) && !hamburger.contains(event.target)) {
        closeMenu();
    }
}

// Функция для закрытия меню
function closeMenu() {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
    menuClose.classList.remove('active');
    document.body.style.overflow = '';
    document.removeEventListener('click', closeMenuOnClickOutside);
}

// Обработчик клика по гамбургеру
hamburger.addEventListener('click', function(event) {
    event.stopPropagation(); // Предотвращаем всплытие события
    toggleMenu();
});

// Обработчик клика по кнопке закрытия
menuClose.addEventListener('click', function(event) {
    event.stopPropagation();
    closeMenu();
});

// Закрытие меню при клике на любую ссылку
navLinks.forEach(link => {
    link.addEventListener('click', function() {
        closeMenu();
    });
});

// Закрытие меню при нажатии Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        closeMenu();
    }
});

// Закрытие меню при изменении размера окна (если становится достаточно широким)
window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
        closeMenu();
    }
});



// Кнопка "Наверх"
const scrollTopButton = document.getElementById('scrollTop');

// Показываем кнопку и обновляем прогресс после скролла
window.addEventListener('scroll', () => {
    if (window.scrollY > 200) {
        scrollTopButton.classList.add('visible');
    } else {
        scrollTopButton.classList.remove('visible');
    }
});


// Прокрутка к началу страницы
scrollTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});


// Функция для снятия фокуса с элементов на мобильных устройствах
function removeFocusOnScroll() {
    // Проверяем, является ли устройство сенсорным
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    if (isTouchDevice) {
        let touchStartY = 0;
        
        // Начало касания
        document.addEventListener('touchstart', (e) => {
        touchStartY = e.touches[0].clientY;
        });
        
        // Движение пальцем (скролл)
        document.addEventListener('touchmove', (e) => {
        const touchCurrentY = e.touches[0].clientY;
        const scrollDirection = touchCurrentY < touchStartY ? 'down' : 'up';
        
        // Если пользователь начал скроллить, снимаем фокус с активного элемента
        if (Math.abs(touchCurrentY - touchStartY) > 10) { // Минимальное движение для определения скролла
            document.activeElement.blur();
        }
        });
    }
}

// Вызов функции при загрузке
removeFocusOnScroll();