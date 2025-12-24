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

// Закрытие меню при изменении размера окна (если становится достаточно широким)
window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
        closeMenu();
    }
});