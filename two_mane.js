const host = 'm6.wqtt.ru'; // Замените на хост WQTT
const port = 18722; // Порт MQTT
const clientId = 'web-client-' + Math.random().toString(16).substr(2, 8);
const username = 'u_70J5WQ'; // Логин (если требуется)
const password = 'lX8qS4zx'; // Пароль (если требуется)

const client = new Paho.MQTT.Client(host, port, clientId);

client.onConnectionLost = (responseObject) => {
    console.error('Соединение потеряно:', responseObject.errorMessage);
};

client.onMessageArrived = (message) => {
    console.log('Получено сообщение:', message.payloadString);

    const topic = message.destinationName;
    const payload = JSON.parse(message.payloadString); // Если данные в формате JSON

    switch (topic) {
        case 'smart-home/temperature':
            document.getElementById('temperature').innerText = `Температура: ${payload.value}°C`;
            break;
        case 'smart-home/humidity':
            document.getElementById('humidity').innerText = `Влажность: ${payload.value}%`;
            break;
        case 'smart-home/motion':
            document.getElementById('motion').innerText = `Движение: ${payload.value ? 'Обнаружено' : 'Нет'}`;
            break;
        case 'smart-home/leak':
            document.getElementById('leak').innerText = `Протечка: ${payload.value}%`;
            break;
        case 'smart-home/gas': // Новый топик для датчика газа
            document.getElementById('gas').innerText = `Газ: ${payload.value} ppm`;
            break;
        default:
            console.warn('Неизвестный топик:', topic);
    }
};

client.connect({
    onSuccess: () => {
        console.log('Подключено к WQTT');
        // Подписка на топики
        client.subscribe('smart-home/temperature');
        client.subscribe('smart-home/humidity');
        client.subscribe('smart-home/motion');
        client.subscribe('smart-home/leak');
        client.subscribe('smart-home/gas'); // Подписка на топик газа
    },
    onFailure: (err) => {
        console.error('Ошибка подключения:', err.errorMessage);
    },
    userName: username,
    password: password,
});
// Состояние приложения
let currentPage = 'cameras';

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    setupNavigationButtons();
    setupCameras();
});

// Настройка навигационных кнопок
function setupNavigationButtons() {
    const navButtons = document.querySelectorAll('.nav-btn');
    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Удаляем активный класс у всех кнопок
            navButtons.forEach(btn => btn.classList.remove('active'));
            // Добавляем активный класс нажатой кнопке
            button.classList.add('active');
            // Сохраняем текущую страницу
            currentPage = button.dataset.page;
            // В реальном приложении здесь был бы код для загрузки соответствующей страницы
            console.log(`Переключение на страницу: ${currentPage}`);
        });
    });
}

// Настройка камер
async function setupCameras() {
    try {
        // Запрашиваем доступ к камере
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });

        // Получаем все элементы video
        const videoElements = document.querySelectorAll('video');

        // Подключаем поток ко всем video элементам
        videoElements.forEach(video => {
            // Клонируем поток для каждой камеры
            const trackClone = stream.getVideoTracks()[0].clone();
            const newStream = new MediaStream([trackClone]);
            video.srcObject = newStream;
        });
    } catch (error) {
        console.error('Ошибка при получении доступа к камере:', error);
        // В случае ошибки показываем заглушку
        showFallbackImages();
    }
}

// Функция для показа заглушек вместо видео
function showFallbackImages() {
    const videoElements = document.querySelectorAll('video');
    videoElements.forEach(video => {
        // Создаем элемент изображения
        const img = document.createElement('img');
        img.src = 'https://via.placeholder.com/640x360.png?text=Нет+доступа+к+камере';
        img.alt = 'Камера недоступна';
        img.style.width = '100%';
        img.style.height = '100%';
        img.style.objectFit = 'cover';

        // Заменяем видео на изображение
        video.parentNode.replaceChild(img, video);
    });
}




















//климат-контроль

// Создаем канал для обмена данными между страницами
const controlChannel = new BroadcastChannel('smartHomeControl');

// Функция для обновления состояния переключателей
function updateSwitchState(switchId, isOn) {
    const switchElement = document.getElementById(switchId);
    if (switchElement) {
        switchElement.checked = isOn;
    }
}

// Функция для обновления значения влажности
function updateHumidity(value) {
    const humidityElement = document.getElementById('humidity-value');
    if (humidityElement) {
        humidityElement.textContent = value;
    }
}

// Обработчики событий для переключателей
document.querySelectorAll('.switch input').forEach(switchInput => {
    switchInput.addEventListener('change', (e) => {
        // Отправляем сообщение о изменении состояния
        controlChannel.postMessage({
            type: 'switchToggle',
            id: e.target.id,
            isOn: e.target.checked
        });
    });
});

// Слушаем сообщения от других страниц
controlChannel.onmessage = (event) => {
    const { type, id, isOn, humidity } = event.data;

    if (type === 'switchToggle') {
        updateSwitchState(id, isOn);
    } else if (type === 'humidityUpdate') {
        updateHumidity(humidity);
    }
};

// Симуляция получения данных о влажности
function simulateHumidityData() {
    // Генерируем случайное значение влажности от 30 до 70
    const humidity = Math.floor(Math.random() * (70 - 30 + 1)) + 30;

    // Отправляем сообщение об обновлении влажности
    controlChannel.postMessage({
        type: 'humidityUpdate',
        humidity: humidity
    });

    // Обновляем значение на странице
    updateHumidity(humidity);
}

// Обновляем данные каждые 5 секунд
setInterval(simulateHumidityData, 5000);

// Инициализируем начальное значение влажности
simulateHumidityData();




























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










/*Меню входа*/
// Valid credentials list
const validCredentials = [
    { username: 'команда', password: 'команда2' }
];

// DOM elements
const loginForm = document.getElementById('loginForm');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const errorMessage = document.getElementById('errorMessage');
const numberErrorModal = document.getElementById('numberErrorModal');

// Event listeners
loginForm.addEventListener('submit', handleSubmit);
usernameInput.addEventListener('input', handleUsernameInput);

// Handle username input
function handleUsernameInput(e) {
    const value = e.target.value;

    // Check for numbers in username
    if (/\d/.test(value)) {
        numberErrorModal.style.display = 'flex';
        e.target.value = value.replace(/\d/g, '');
    }
}

// Handle form submission
function handleSubmit(e) {
    e.preventDefault();

    const username = usernameInput.value;
    const password = passwordInput.value;

    // Validate credentials
    const isValid = validCredentials.some(
        cred => cred.username === username && cred.password === password
    );

    if (isValid) {
        // Redirect to dashboard
        window.location.href = 'selection.html';
    } else {
        // Show error message
        errorMessage.textContent = 'Неверное имя пользователя или пароль';
    }
}

// Close modal
function closeModal() {
    numberErrorModal.style.display = 'none';
}







