// /*Галерея*/
// Массив ссылок на изображения
const images = [
    "https://ltdfoto.ru/images/2025/03/18/image1.png",
    "https://ltdfoto.ru/images/2025/03/18/image2.png",
    "https://ltdfoto.ru/images/2025/03/18/image3.png",
    "https://ltdfoto.ru/images/2025/03/18/image4.png",
    "https://ltdfoto.ru/images/2025/03/18/image5.png",
    "https://ltdfoto.ru/images/2025/03/18/image6.png",
    "https://ltdfoto.ru/images/2025/03/18/image7.png",
    "https://ltdfoto.ru/images/2025/03/18/image8.png",
    "https://ltdfoto.ru/images/2025/03/18/image9.png",
    "https://ltdfoto.ru/images/2025/03/18/image10.png"
];

let currentImageIndex = 0; // Индекс текущего изображения

// Получаем элементы DOM
const modal = document.getElementById("modal_2");
const currentImage = document.getElementById("current-image_2");
const prevButton = document.getElementById("prev-button_2");
const nextButton = document.getElementById("next-button_2");
const closeButton = document.querySelector(".close_2");

// Функция для открытия модального окна
document.getElementById("cnopka_help").addEventListener("click", () => {
    modal.style.display = "block"; // Показываем окно
    showImage(currentImageIndex); // Показываем первое изображение
});

// Функция для закрытия модального окна
closeButton.addEventListener("click", () => {
    modal.style.display = "none"; // Скрываем окно
});

// Функция для показа текущего изображения
function showImage(index) {
    currentImage.src = images[index]; // Устанавливаем src изображения
}

// Перелистывание на предыдущее изображение
prevButton.addEventListener("click", () => {
    if (currentImageIndex > 0) {
        currentImageIndex--;
    } else {
        currentImageIndex = images.length - 1; // Переход к последнему изображению
    }
    showImage(currentImageIndex);
});

// Перелистывание на следующее изображение
nextButton.addEventListener("click", () => {
    if (currentImageIndex < images.length - 1) {
        currentImageIndex++;
    } else {
        currentImageIndex = 0; // Переход к первому изображению
    }
    showImage(currentImageIndex);
});

// Закрытие окна при клике вне его области
window.addEventListener("click", (event) => {
    if (event.target === modal) {
        modal.style.display = "none";
    }
});



























// Кнопка смены темы
document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');

    // Определяем цветовые схемы для обеих тем
    const themes = {
        light: {
            '--bg-color': '#E7E1D8',
            '--button-bg': '#C5B8A5',
            '--button-hover': '#B7B7A4',
            '--button-active': '#C58C6D',
            '--text-color': '#3A3A3A',
            '--border-color': '#C5B8A5',
            '--shadow-color': 'rgba(0, 0, 0, 0.1)'
        },
        dark: {
            '--bg-color': '#2C3E50',
            '--button-bg': '#34495E',
            '--button-hover': '#2980B9',
            '--button-active': '#3498DB',
            '--text-color': '#ECF0F1',
            '--border-color': '#34495E',
            '--shadow-color': 'rgba(0, 0, 0, 0.3)'
        }
    };

    // Получаем сохраненное состояние темы из localStorage
    let isAlternativeTheme = localStorage.getItem('isAlternativeTheme') === 'true';

    // Функция для применения цветовой схемы
    function applyColorScheme(theme) {
        const root = document.documentElement;
        for (const [property, value] of Object.entries(theme)) {
            root.style.setProperty(property, value);
        }
    }

    // Функция для применения текущей темы
    function applyTheme() {
        if (isAlternativeTheme) {
            document.body.classList.add('alternative-theme');
            // Применяем темную цветовую схему
            applyColorScheme(themes.dark);
            // Устанавливаем фоновое изображение на весь экран
            document.body.style.backgroundImage = 'url("https://img.freepik.com/premium-photo/chic-black-interior-room_87720-108821.jpg?uid=R159719022&ga=GA1.1.1002807986.1724139632&semt=ais_hybrid")';
            document.body.style.backgroundSize = 'cover';
            document.body.style.backgroundPosition = 'center';
            document.body.style.backgroundRepeat = 'no-repeat';
            document.body.style.backgroundAttachment = 'fixed';

            // Добавляем эффект затемнения для лучшей читаемости текста
            document.body.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
            document.body.style.backgroundBlendMode = 'overlay';
        } else {
            document.body.classList.remove('alternative-theme');
            // Применяем светлую цветовую схему
            applyColorScheme(themes.light);
            // Сбрасываем все стили фона
            document.body.style.backgroundImage = 'none';
            document.body.style.backgroundSize = '';
            document.body.style.backgroundPosition = '';
            document.body.style.backgroundRepeat = '';
            document.body.style.backgroundAttachment = '';
            document.body.style.backgroundColor = '';
            document.body.style.backgroundBlendMode = '';
        }

    }

    // Функция для изменения темы
    function toggleTheme() {
        isAlternativeTheme = !isAlternativeTheme;
        localStorage.setItem('isAlternativeTheme', isAlternativeTheme);
        applyTheme();
    }

    // Применяем сохраненную тему при загрузке страницы
    applyTheme();

    // Обработчик клика по кнопке
    themeToggle.addEventListener('click', toggleTheme);

    // Обработчик для проверки изменений в localStorage из других вкладок
    window.addEventListener('storage', (event) => {
        if (event.key === 'isAlternativeTheme') {
            isAlternativeTheme = event.newValue === 'true';
            applyTheme();
        }
    });
});

























/*Что такое умный дом*/
// Функция для переключения видимости модального окна
function toggleSmartHomeModal() {
    // Получаем элемент модального окна
    const modal = document.getElementById('smartHomeModal');

    // Если модальное окно скрыто (display: none)
    if (modal.style.display === 'none' || !modal.style.display) {
        // Показываем модальное окно
        modal.style.display = 'flex';
    } else {
        // Скрываем модальное окно
        modal.style.display = 'none';
    }
}

// Закрытие модального окна при клике вне его содержимого
document.addEventListener('click', function(event) {
    const modal = document.getElementById('smartHomeModal');
    const modalContent = modal.querySelector('.modal-content');

    // Если клик был вне содержимого модального окна
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

// Функция для изменения текста (можно использовать для динамического обновления контента)
function updateSmartHomeText(newText) {
    const textElement = document.getElementById('smartHomeText');
    textElement.textContent = newText;
}

// Функция для переключения темы
function toggleTheme() {
    // Получаем текущее состояние темы из localStorage
    const currentTheme = localStorage.getItem('theme') || 'light';

    // Переключаем тему
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';

    // Сохраняем новое состояние темы
    localStorage.setItem('theme', newTheme);

    // Применяем тему к body
    document.body.className = newTheme + '-theme';

    // Обновляем стили модального окна
    const modalContent = document.querySelector('.modal-content');
    if (modalContent) {
        modalContent.className = 'modal-content ' + newTheme + '-theme';
    }
}

// Применяем сохранённую тему при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.body.className = savedTheme + '-theme';

    const modalContent = document.querySelector('.modal-content');
    if (modalContent) {
        modalContent.className = 'modal-content ' + savedTheme + '-theme';
    }
});






