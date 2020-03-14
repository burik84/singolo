const MENU = document.getElementById('menu');
const TAG = document.getElementById('tag');
const GALLERY = document.getElementById('gallery');
const phone1 = document.getElementsByClassName("phone__vertical")[0];
const phone2 = document.getElementsByClassName("phone__vertical")[1];

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

// Скрываем изображение картинки на телефонах
phone1.addEventListener('click', (event) => {
    document.getElementsByClassName("phone__display")[0].classList.toggle('hidden');
});
phone2.addEventListener('click', (event) => {
    document.getElementsByClassName("phone__display")[1].classList.toggle('hidden');
});

// добавляем класс к tag при нажатии
TAG.addEventListener('click', (event) => {
    TAG.querySelectorAll('span').forEach(elem => elem.classList.remove('active'));
    // console.log(event.target);
    event.target.classList.add('active');
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
    let subject = document.getElementById('form-subject').value.toString();
    let description = document.getElementById('form-descr').value.toString();
    document.getElementById('modal-subject').innerText = subject ? `Тема: ${subject}` : 'Без темы'
    document.getElementById('modal-describe').innerText = description ? `Описание: ${description}` : 'Без описания';
    modal.classList.remove('hidden');
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