
// робот код
document.addEventListener('DOMContentLoaded', () => {
    const collectToysCheckbox = document.getElementById('collect-toys');
    const stayHomeCheckbox = document.getElementById('stay-home');
    const themeToggle = document.getElementById('theme-toggle');
    const positionIndicator = document.getElementById('position-indicator');

    // Theme toggle functionality
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('alternative-theme');
    });

    // Mutual exclusive checkboxes
    collectToysCheckbox.addEventListener('change', () => {
        if (collectToysCheckbox.checked) {
            stayHomeCheckbox.checked = false;
            moveIndicator('collecting');
        } else {
            moveIndicator('idle');
        }
    });

    stayHomeCheckbox.addEventListener('change', () => {
        if (stayHomeCheckbox.checked) {
            collectToysCheckbox.checked = false;
            moveIndicator('home');
        } else {
            moveIndicator('idle');
        }
    });

    // Position indicator movement
    function moveIndicator(state) {
        switch(state) {
            case 'collecting':
                positionIndicator.style.top = '30%';
                positionIndicator.style.right = '40%';
                break;
            case 'home':
                positionIndicator.style.top = '70%';
                positionIndicator.style.right = '20%';
                break;
            case 'idle':
                positionIndicator.style.top = '50%';
                positionIndicator.style.right = '20px';
                break;
        }
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



























//датчик температуры код

// Массив цветовых тем
const themes = [
    {
        primary: '#C58C6D',
        secondary: '#DDBEA9',
        background: '#F1E3D3',
        accent: '#B7B7A4',
        dark: '#6B705C'
    },
    {
        primary: '#6B705C',
        secondary: '#B7B7A4',
        background: '#DDBEA9',
        accent: '#F1E3D3',
        dark: '#C58C6D'
    }
];

let currentTheme = 0;
let currentTemperature = 4; // Начальный уровень температуры (4 активных блока)

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    updateTemperatureDisplay();
    setupNavigationButtons();
    setupTemperatureControls();
    setupThemeToggle();
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
            // Здесь можно добавить логику переключения страниц
        });
    });
}

// Настройка контроля температуры
function setupTemperatureControls() {
    const decreaseBtn = document.getElementById('decreaseTemp');
    const increaseBtn = document.getElementById('increaseTemp');

    decreaseBtn.addEventListener('click', () => {
        if (currentTemperature > 0) {
            currentTemperature--;
            updateTemperatureDisplay();
        }
    });

    increaseBtn.addEventListener('click', () => {
        if (currentTemperature < 8) {
            currentTemperature++;
            updateTemperatureDisplay();
        }
    });
}

// Обновление отображения температуры
function updateTemperatureDisplay() {
    const bars = document.querySelectorAll('.temp-bar');
    bars.forEach((bar, index) => {
        // Так как шкала отображается справа налево, инвертируем индекс
        const reverseIndex = bars.length - 1 - index;
        if (reverseIndex < currentTemperature) {
            bar.classList.remove('empty');
        } else {
            bar.classList.add('empty');
        }
    });
}

// Настройка переключателя тем
function setupThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    themeToggle.addEventListener('click', () => {
        currentTheme = (currentTheme + 1) % themes.length;
        applyTheme(themes[currentTheme]);
    });
    // Применяем начальную тему
    applyTheme(themes[currentTheme]);
}

// Применение темы
function applyTheme(theme) {
    document.body.style.backgroundColor = theme.background;
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.style.backgroundColor = theme.secondary;
    });
    document.querySelector('.nav-btn.active').style.backgroundColor = theme.primary;
    document.querySelectorAll('button:not(.nav-btn)').forEach(btn => {
        btn.style.backgroundColor = theme.accent;
    });
    document.getElementById('themeToggle').style.backgroundColor = theme.dark;
}











// смена стиля страницы

// import './mane.css'
// import javascriptLogo from './javascript.svg'
// import viteLogo from '/vite.svg'
//
// // Create a BroadcastChannel for communication between pages
// const colorChannel = new BroadcastChannel('colorScheme');
//
// // Function to toggle theme
// function toggleTheme() {
//     const root = document.documentElement;
//     const isCustomTheme = root.classList.toggle('custom-theme');
//
//     // Broadcast the theme change to other pages
//     colorChannel.postMessage({ isCustomTheme });
// }
//
// // Listen for messages from other pages
// colorChannel.onmessage = (event) => {
//     const root = document.documentElement;
//     if (event.data.isCustomTheme) {
//         root.classList.add('custom-theme');
//     } else {
//         root.classList.remove('custom-theme');
//     }
// };
//
// document.querySelector('#app').innerHTML = `
//   <div>
//     <a href="https://vitejs.dev" target="_blank">
//       <img src="${viteLogo}" class="logo" alt="Vite logo" />
//     </a>
//     <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
//       <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
//     </a>
//     <h1>Color Theme Toggle</h1>
//     <div class="card">
//       <button id="themeToggle" type="button">Toggle Theme</button>
//     </div>
//     <p class="read-the-docs">
//       Click the button to change the color scheme
//     </p>
//   </div>
// `
//
// // Add click event listener to the theme toggle button
// document.querySelector('#themeToggle').addEventListener('click',)
//
//































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
