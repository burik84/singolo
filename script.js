// элементы для навигационного меню
const MENU = document.getElementById('menu');

// элементы для портфолио
const TAG = document.getElementById('tag');
const GALLERY = document.getElementById('gallery');
const galleryItem = document.getElementsByClassName("gallery__item");

// элементы для phone
const phone1 = document.getElementsByClassName("phone__vertical")[0];
const phone2 = document.getElementsByClassName("phone__vertical")[1];

// элементы для карусели
let items = document.querySelectorAll('.slider__item');
let currentItem = 0;
let isEnabled = true;

// Элементы для модального окна
const BUTTON = document.getElementById('btn');
const CLOSE_BUTTON = document.getElementById('close-btn');
const modal = document.getElementById('modal');
const span = document.getElementsByClassName("close")[0];

// добавляем класс к навигации при нажатии
MENU.addEventListener('click', (event) => {
    MENU.querySelectorAll('a').forEach(elem => elem.classList.remove('active'));
    // console.log(event.target);
    event.target.classList.add('active');
});
// добавляем класс к навигации при скролле
document.addEventListener('scroll', onScroll);

function onScroll(event) {
    // console.log(event);
    const currentPosition = window.scrollY;
    // console.log(currentPosition);
    const sections = document.querySelectorAll('section');
    const links = document.querySelectorAll('#menu a');

    sections.forEach((el) => {
        // console.log(el.getAttribute('id'));
        if ((el.offsetTop - 100) <= currentPosition && (el.offsetTop + el.offsetHeight - 100) > currentPosition) {
            links.forEach((a) => {
                a.classList.remove('active');
                if (el.getAttribute('id') === a.getAttribute('href').substring(1)) {
                    a.classList.add('active');
                }
            })
        }
        // console.log(currentPosition, el.offsetTop, el.offsetTop <= currentPosition, el.offsetTop + el.offsetHeight, (el.offsetTop + el.offsetHeight) > currentPosition);
    });
}


// добавляем класс к tag при нажатии
// И перемешиваем картинки
TAG.addEventListener('click', (event) => {
    // console.log(event.target);
    TAG.querySelectorAll('span').forEach(elem => elem.classList.remove('active'));
    event.target.classList.add('active');
    // console.log(galleryItem.length);
    // Меняем порядок для картинок
    for (var i = 0; i < galleryItem.length; i++) {
        // console.log(Math.round(Math.random() * 50));
        galleryItem[i].style.order = Math.round(Math.random() * 50);
    }
});

// Скрываем изображение картинки на телефонах
phone1.addEventListener('click', (event) => {
    document.getElementsByClassName("phone__display")[0].classList.toggle('hidden');
});
phone2.addEventListener('click', (event) => {
    document.getElementsByClassName("phone__display")[1].classList.toggle('hidden');
});

// Слайдер
// Номер текущего слайда
function changeCurrentItem(n) {
    currentItem = (n + items.length) % items.length;
    // console.log(currentItem);
    document.getElementsByClassName("slider")[0].classList.toggle('active');
}

// скрытие/показ слайдов - работа анимации
function hideItem(direction) {
    isEnabled = false;
    items[currentItem].classList.add(direction);
    items[currentItem].addEventListener('animationend', function() {
        this.classList.remove('active', direction);
    });
}

function showItem(direction) {
    items[currentItem].classList.add('next', direction);
    items[currentItem].addEventListener('animationend', function() {
        this.classList.remove('next', direction);
        this.classList.add('active');
        isEnabled = true;
    })
}

// добавляем/удаляем индекс слайда
function previousItem(n) {
    hideItem('to-right');
    changeCurrentItem(n - 1);
    showItem('from-left');
}

function nextItem(n) {
    hideItem('to-left');
    changeCurrentItem(n + 1);
    showItem('from-right');
}

// Клик по нашим стрелкам и вызов функций для переключения
document.querySelector('.slider-control.prev').addEventListener('click', function() {
    // changeCurrentItem(currentItem-1);
    if (isEnabled) {
        previousItem(currentItem);
    }
});

document.querySelector('.slider-control.next').addEventListener('click', function() {
    // changeCurrentItem(currentItem-1);
    if (isEnabled) {
        nextItem(currentItem);
    }
});

// Рамка для портфолио
GALLERY.addEventListener('click', (event) => {
    GALLERY.querySelectorAll('img').forEach(elem => elem.classList.remove('js-frame'));
    // console.log(event.target);
    event.target.classList.add('js-frame');
});

// Модальное окно для формы
// появление и заполнение
BUTTON.addEventListener('click', (e) => {
    e.preventDefault();
    let name = document.getElementById('form-name').validity.valid;
    let mail = document.getElementById('form-mail').validity.valid;
    // console.log(name, mail);
    let subject = document.getElementById('form-subject').value.toString();
    let description = document.getElementById('form-descr').value.toString();
    // Проверяем на заполнение обязательных полей
    if (!name || !mail) {
        alert("Заполните поле name или mail");
        return;
    } else {
        document.getElementById('modal-subject').innerText = subject ? `Тема: ${subject}` : 'Без темы'
        document.getElementById('modal-describe').innerText = description ? `Описание: ${description}` : 'Без описания';
        modal.classList.remove('hidden');
    }


});
// закрытие модального окна
// Закрытие по кнопке закрыть
CLOSE_BUTTON.addEventListener('click', () => {
    modal.classList.add('hidden');
    document.getElementById('form').reset();
});
// Закрытие по кнопке х
span.onclick = function() {
    modal.classList.add('hidden');
}
// Закрытие при клике вне модального окна
window.onclick = function(event) {
    if (event.target == modal) {
        modal.classList.add('hidden');
    }
}