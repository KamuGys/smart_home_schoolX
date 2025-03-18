
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