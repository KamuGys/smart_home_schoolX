// Подключение к MQTT брокеру через WebSocket
const client = new Paho.MQTT.Client("m6.wqtt.ru", 18725, "clientId-" + Math.random().toString(16).substr(2, 8));

// Настройка обработчиков событий
client.onConnectionLost = onConnectionLost;
client.onMessageArrived = onMessageArrived;

// Параметры подключения
const options = {
    useSSL: true,
    userName: "u_70J5WQ",
    password: "lX8qS4zx",
    onSuccess: onConnect,
    onFailure: onFailure
};

// Подключение к брокеру
client.connect(options);

function onConnect() {
    console.log("Подключено к MQTT брокеру");
    // Подписка на топик humidity
    client.subscribe("humidity");
    client.subscribe("gas");
}

function onFailure(message) {
    console.log("Ошибка подключения: " + message.errorMessage);
}

function onConnectionLost(responseObject) {
    if (responseObject.errorCode !== 0) {
        console.log("Соединение потеряно: " + responseObject.errorMessage);
    }
}

function onMessageArrived(message) {
    console.log("Получено сообщение из топика " + message.destinationName + ": " + message.payloadString);
    // Обновление значения влажности на странице
    if (message.destinationName === "humidity") {
        // Обновление значения влажности на странице
        document.getElementById("humidity-value").innerText = message.payloadString;
    } else if (message.destinationName === "gas") {
        // Обновление значения газа на странице
        document.getElementById("gas-value").innerText = message.payloadString;
    }
}
// import mqtt from 'https://unpkg.com/mqtt/dist/mqtt.min.js';
//
// // Настройки MQTT
// const mqttConfig = {
//     protocol: 'wss', // Используем WebSocket Secure
//     hostname: 'm6.wqtt.ru', // Хост WQTT
//     port: 18725, // Порт для WebSocket TLS
//     username: 'u_70J5WQ', // Логин WQTT
//     password: 'lX8qS4zx', // Пароль WQTT
//     clientId: `web-client-${Math.random().toString(16).slice(3)}` // Уникальный ID клиента
// };
//
// // Создание MQTT-клиента
// const client = mqtt.connect(`wss://m6.wqtt.ru:18725/mqtt`, mqttConfig);
//
// // Обработчики событий
// client.on('connect', () => {
//     console.log('Подключено к WQTT');
//     // Подписка на топик влажности
//     client.subscribe('humidity', (err) => {
//         if (err) {
//             console.error('Ошибка подписки:', err);
//         } else {
//             console.log('Подписка на топик humidity успешна');
//         }
//     });
// });
//
// client.on('error', (err) => {
//     console.error('Ошибка подключения:', err);
// });
//
// client.on('offline', () => {
//     console.log('Отключено от WQTT');
// });
//
// // Обработчик входящих сообщений
// client.on('message', (topic, message) => {
//     if (topic === 'humidity') {
//         try {
//             const humidity = parseFloat(message.toString()); // Парсим значение влажности
//             console.log('Получено значение влажности:', humidity);
//         } catch (error) {
//             console.error('Ошибка парсинга данных:', error);
//         }
//     }
// });

// // Глобальный обработчик ошибок
// window.onerror = function(msg, url, lineNo, columnNo, error) {
//     console.error('Глобальная ошибка:', error);
//     return false;
// };// /*Климат контроль*/

// // Подключение библиотеки MQTT.js
// import mqtt from 'https://unpkg.com/mqtt/dist/mqtt.min.js';
//
// // Настройки MQTT
// const mqttConfig = {
//     protocol: 'wss', // Используем WebSocket Secure
//     hostname: 'm6.wqtt.ru', // Хост WQTT
//     port: 18725, // Порт для WebSocket TLS
//     username: 'u_70J5WQ', // Логин WQTT
//     password: 'lX8qS4zx', // Пароль WQTT
//     clientId: `web-client-${Math.random().toString(16).slice(3)}` // Уникальный ID клиента
// };
//
// // DOM-элементы
// const humidityValue = document.getElementById('humidity-value');
//
// // Создание MQTT-клиента
// const client = mqtt.connect(`wss://m6.wqtt.ru:18725/mqtt`, mqttConfig);
//
// // Обработчики событий
// client.on('connect', () => {
//     console.log('Подключено к WQTT');
//     // Подписка на топик влажности
//     client.subscribe('smart-home/humidity', (err) => {
//         if (err) {
//             console.error('Ошибка подписки:', err);
//         }
//     });
// });
//
// client.on('error', (err) => {
//     console.error('Ошибка подключения:', err);
// });
//
// client.on('offline', () => {
//     console.log('Отключено от WQTT');
// });
//
// // Обработчик входящих сообщений
// client.on('message', (topic, message) => {
//     console.log('Получено сообщение:', message.toString());
//
//     if (topic === 'smart-home/humidity') {
//         try {
//             const payload = JSON.parse(message.toString()); // Если данные в формате JSON
//             humidityValue.innerText = payload.value; // Обновление значения влажности
//         } catch (error) {
//             console.error('Ошибка парсинга данных:', error);
//         }
//     }
// });
//
// // Глобальный обработчик ошибок
// window.onerror = function(msg, url, lineNo, columnNo, error) {
//     console.error('Глобальная ошибка:', error);
//     return false;
// };






// // MQTT Configuration
// const mqttConfig = {
//     protocol: 'wss',
//     hostname: 'm6.wqtt.ru',
//     port: 18725,
//     username: 'u_70J5WQ',
//     password: 'lX8qS4zx',
//     clientId: mqtt_${Math.random().toString(16).slice(3)}
// };
//
// // DOM Elements
// const connectionStatus = document.getElementById('connectionStatus');
// const humidityValue = document.getElementById('humidityValue');
// const lastUpdate = document.getElementById('lastUpdate');
//
// // Create MQTT Client
// const client = mqtt.connect(wss://${mqttConfig.hostname}:${mqttConfig.port}/mqtt, mqttConfig);
//
// // Connection Event Handlers
// client.on('connect', () => {
//     console.log('Connected to MQTT broker');
//     connectionStatus.textContent = 'Connected';
//     connectionStatus.classList.remove('disconnected');
//     connectionStatus.classList.add('connected');
//
//     // Subscribe to humidity topic
//     client.subscribe('humidity', (err) => {
//         if (err) {
//             console.error('Subscription error:', err);
//         }
//     });
// });
//
// client.on('error', (err) => {
//     console.error('Connection error:', err);
//     connectionStatus.textContent = 'Connection Error';
//     connectionStatus.classList.remove('connected');
//     connectionStatus.classList.add('disconnected');
// });
//
// client.on('offline', () => {
//     console.log('Disconnected from MQTT broker');
//     connectionStatus.textContent = 'Disconnected';
//     connectionStatus.classList.remove('connected');
//     connectionStatus.classList.add('disconnected');
// });
//
// // Message Handler
// client.on('message', (topic, message) => {
//     if (topic === 'humidity') {
//         try {
//             const humidity = parseFloat(message.toString());
//             humidityValue.textContent = humidity.toFixed(1);
//             lastUpdate.textContent = Last updated: ${new Date().toLocaleTimeString()};
//         } catch (error) {
//             console.error('Error parsing humidity value:', error);
//         }
//     }
// });
//
// // Error Handler
// window.onerror = function(msg, url, lineNo, columnNo, error) {
//     console.error('Global error:', error);
//     return false;
// };






// // Настройки MQTT
// const host = 'm6.wqtt.ru'; // Хост WQTT
// const port = 18722; // Порт WQTT
// const clientId = 'web-client-' + Math.random().toString(16).substr(2, 8); // Уникальный ID клиента
// const username = 'u_70J5WQ'; // Логин WQTT
// const password = 'lX8qS4zx'; // Пароль WQTT
//
// // Создание MQTT-клиента
// const client = new Paho.MQTT.Client(host, Number(port), clientId);
//
// // Обработчик потери соединения
// client.onConnectionLost = (responseObject) => {
//     console.error('Соединение потеряно:', responseObject.errorMessage);
// };
//
// // Обработчик входящих сообщений
// client.onMessageArrived = (message) => {
//     console.log('Получено сообщение:', message.payloadString);
//
//     const topic = message.destinationName;
//     const payload = JSON.parse(message.payloadString); // Если данные в формате JSON
//
//     // Обновление значения влажности
//     if (topic === 'humidity') {
//         document.getElementById('humidity-value').innerText = payload.value;
//     }
// };
//
// // Подключение к MQTT-брокеру
// client.connect({
//     onSuccess: () => {
//         console.log('Подключено к WQTT');
//         // Подписка на топик влажности
//         client.subscribe('humidity');
//     },
//     onFailure: (err) => {
//         console.error('Ошибка подключения:', err.errorMessage);
//     },
//     userName: username,
//     password: password,
// });








































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