// Массив с возможными уведомлениями
const notifications = [
    "⚠️ Внимание! Превышен уровень угарного газа.",
    "🚨 Обнаружена утечка газа! Немедленно проветрите помещение.",
    "💧 Обнаружена протечка воды! Проверьте сантехнику.",
    "🌡️ Температура в помещении превышает допустимую норму.",
    "🔥 Обнаружено задымление! Проверьте источники огня.",
    "💧 Высокая влажность! Возможна конденсация.",
];

// Функция для показа уведомления на сайте
function showOnSiteNotification(message) {
    const notificationContainer = document.getElementById("notification-container");

    // Создаем элемент уведомления
    const notification = document.createElement("div");
    notification.className = "notification";
    notification.textContent = message;

    // Добавляем уведомление в контейнер
    notificationContainer.appendChild(notification);

    // Удаляем уведомление через 5 секунд
    setTimeout(() => {
        notification.remove();
    }, 5000);
}

// Функция для показа уведомления вне сайта (через браузер)
function showBrowserNotification(message) {
    // Проверяем, поддерживает ли браузер уведомления
    if (!("Notification" in window)) {
        console.log("Браузер не поддерживает уведомления.");
        return;
    }

    // Запрашиваем разрешение на показ уведомлений
    if (Notification.permission === "granted") {
        // Если разрешение уже есть, показываем уведомление
        new Notification(message);
    } else if (Notification.permission !== "denied") {
        // Если разрешения нет, запрашиваем его
        Notification.requestPermission().then((permission) => {
            if (permission === "granted") {
                new Notification(message);
            }
        });
    }
}

// Функция для генерации случайного уведомления
function generateRandomNotification() {
    const randomIndex = Math.floor(Math.random() * notifications.length);
    return notifications[randomIndex];
}

// Функция для отправки уведомлений
function sendNotification() {
    const message = generateRandomNotification();

    // Показываем уведомление на сайте
    showOnSiteNotification(message);

    // Показываем уведомление вне сайта
    showBrowserNotification(message);
}

// Запускаем уведомления каждые 2 минуты (120 000 миллисекунд)
setInterval(sendNotification, 2 * 60 * 1000);

// Первое уведомление при загрузке страницы
sendNotification();












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

