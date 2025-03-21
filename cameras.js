// Состояние приложения
let currentPage = 'cameras';
let net = null; // Модель для распознавания тела
let timers = {}; // Объект для хранения таймеров для каждого видео

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    setupNavigationButtons();
    setupCameras();
    loadBodyPixModel();
});

// Загрузка модели BodyPix
async function loadBodyPixModel() {
    try {
        // Загружаем модель BodyPix
        net = await bodyPix.load({
            architecture: 'MobileNetV1', // Используем MobileNet для быстродействия
            outputStride: 16, // Точность (меньше значение = выше точность)
            multiplier: 0.75, // Баланс между производительностью и точностью
            quantBytes: 2 // Оптимизация для мобильных устройств
        });
        console.log('Модель BodyPix загружена');
    } catch (error) {
        console.error('Ошибка при загрузке модели BodyPix:', error);
    }
}

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
        videoElements.forEach((video, index) => {
            // Клонируем поток для каждой камеры
            const trackClone = stream.getVideoTracks()[0].clone();
            const newStream = new MediaStream([trackClone]);
            video.srcObject = newStream;

            // Запускаем распознавание тела для каждого видео
            detectBody(video, index);
        });
    } catch (error) {
        console.error('Ошибка при получении доступа к камере:', error);
        showFallbackImages();
    }
}

// Распознавание тела и отрисовка рамок
async function detectBody(video, cameraIndex) {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    video.parentNode.appendChild(canvas); // Добавляем canvas для отрисовки рамок

    // Устанавливаем размеры canvas равными размерам видео
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Функция для отрисовки рамок и таймера
    async function draw() {
        if (net) {
            // Получаем предсказания для тела
            const segmentation = await net.segmentPerson(video, {
                flipHorizontal: false, // Не зеркалить изображение
                internalResolution: 'medium', // Разрешение для обработки
                segmentationThreshold: 0.7 // Порог уверенности
            });

            // Очищаем canvas перед отрисовкой нового кадра
            context.clearRect(0, 0, canvas.width, canvas.height);

            // Если тело обнаружено
            if (segmentation.allPoses.length > 0) {
                const pose = segmentation.allPoses[0]; // Берём первое обнаруженное тело

                // Рисуем зелёную рамку вокруг тела
                context.strokeStyle = 'green';
                context.lineWidth = 2;
                context.strokeRect(
                    pose.bounds.minX,
                    pose.bounds.minY,
                    pose.bounds.maxX - pose.bounds.minX,
                    pose.bounds.maxY - pose.bounds.minY
                );

                // Добавляем таймер
                if (!timers[cameraIndex]) {
                    timers[cameraIndex] = { startTime: Date.now() };
                }
                const elapsedTime = Math.floor((Date.now() - timers[cameraIndex].startTime) / 1000);

                // Отображаем время в кадре
                context.fillStyle = 'green';
                context.font = '16px Arial';
                context.fillText(
                    `Время в кадре: ${elapsedTime} сек`,
                    pose.bounds.minX,
                    pose.bounds.minY - 10
                );
            } else {
                // Если тело не обнаружено, сбрасываем таймер
                delete timers[cameraIndex];
            }
        }

        // Рекурсивно вызываем функцию для обновления кадров
        requestAnimationFrame(draw);
    }

    // Запускаем отрисовку
    draw();
}

// Функция для показа заглушек вместо видео
function showFallbackImages() {
    const videoElements = document.querySelectorAll('video');
    videoElements.forEach(video => {
        const img = document.createElement('img');
        img.src = 'https://via.placeholder.com/640x360.png?text=Нет+доступа+к+камере';
        img.alt = 'Камера недоступна';
        img.style.width = '100%';
        img.style.height = '100%';
        img.style.objectFit = 'cover';
        video.parentNode.replaceChild(img, video);
    });
}
// // Состояние приложения
// let currentPage = 'cameras';
//
// // Инициализация при загрузке страницы
// document.addEventListener('DOMContentLoaded', () => {
//     setupNavigationButtons();
//     setupCameras();
// });
//
// // Настройка навигационных кнопок
// function setupNavigationButtons() {
//     const navButtons = document.querySelectorAll('.nav-btn');
//     navButtons.forEach(button => {
//         button.addEventListener('click', () => {
//             // Удаляем активный класс у всех кнопок
//             navButtons.forEach(btn => btn.classList.remove('active'));
//             // Добавляем активный класс нажатой кнопке
//             button.classList.add('active');
//             // Сохраняем текущую страницу
//             currentPage = button.dataset.page;
//             // В реальном приложении здесь был бы код для загрузки соответствующей страницы
//             console.log(`Переключение на страницу: ${currentPage}`);
//         });
//     });
// }
//
// // Настройка камер
// async function setupCameras() {
//     try {
//         // Запрашиваем доступ к камере
//         const stream = await navigator.mediaDevices.getUserMedia({ video: true });
//
//         // Получаем все элементы video
//         const videoElements = document.querySelectorAll('video');
//
//         // Подключаем поток ко всем video элементам
//         videoElements.forEach(video => {
//             // Клонируем поток для каждой камеры
//             const trackClone = stream.getVideoTracks()[0].clone();
//             const newStream = new MediaStream([trackClone]);
//             video.srcObject = newStream;
//         });
//     } catch (error) {
//         console.error('Ошибка при получении доступа к камере:', error);
//         // В случае ошибки показываем заглушку
//         showFallbackImages();
//     }
// }
//
// // Функция для показа заглушек вместо видео
// function showFallbackImages() {
//     const videoElements = document.querySelectorAll('video');
//     videoElements.forEach(video => {
//         // Создаем элемент изображения
//         const img = document.createElement('img');
//         img.src = 'https://via.placeholder.com/640x360.png?text=Нет+доступа+к+камере';
//         img.alt = 'Камера недоступна';
//         img.style.width = '100%';
//         img.style.height = '100%';
//         img.style.objectFit = 'cover';
//
//         // Заменяем видео на изображение
//         video.parentNode.replaceChild(img, video);
//     });
// }
//
//
//


/*Камера*/
// // Состояние приложения
// let currentPage = 'cameras';
// let faceDetectionModel = null; // Модель для распознавания лиц
// let timers = {}; // Объект для хранения таймеров для каждого видео
//
// // Инициализация при загрузке страницы
// document.addEventListener('DOMContentLoaded', () => {
//     setupNavigationButtons();
//     setupCameras();
//     loadFaceDetectionModel();
// });
//
// // Загрузка модели для распознавания лиц
// async function loadFaceDetectionModel() {
//     try {
//         // Загружаем модель для распознавания лиц
//         faceDetectionModel = await faceLandmarksDetection.load(
//             faceLandmarksDetection.SupportedPackages.mediapipeFacemesh,
//             { maxFaces: 3 } // Максимальное количество лиц для распознавания
//         );
//         console.log('Модель для распознавания лиц загружена');
//     } catch (error) {
//         console.error('Ошибка при загрузке модели:', error);
//     }
// }
//
// // Настройка навигационных кнопок
// function setupNavigationButtons() {
//     const navButtons = document.querySelectorAll('.nav-btn');
//     navButtons.forEach(button => {
//         button.addEventListener('click', () => {
//             // Удаляем активный класс у всех кнопок
//             navButtons.forEach(btn => btn.classList.remove('active'));
//             // Добавляем активный класс нажатой кнопке
//             button.classList.add('active');
//             // Сохраняем текущую страницу
//             currentPage = button.dataset.page;
//             console.log(`Переключение на страницу: ${currentPage}`);
//         });
//     });
// }
//
// // Настройка камер
// async function setupCameras() {
//     try {
//         // Запрашиваем доступ к камере
//         const stream = await navigator.mediaDevices.getUserMedia({ video: true });
//
//         // Получаем все элементы video
//         const videoElements = document.querySelectorAll('video');
//
//         // Подключаем поток ко всем video элементам
//         videoElements.forEach((video, index) => {
//             // Клонируем поток для каждой камеры
//             const trackClone = stream.getVideoTracks()[0].clone();
//             const newStream = new MediaStream([trackClone]);
//             video.srcObject = newStream;
//
//             // Запускаем распознавание лиц для каждого видео
//             detectFaces(video, index);
//         });
//     } catch (error) {
//         console.error('Ошибка при получении доступа к камере:', error);
//         showFallbackImages();
//     }
// }
//
// // Распознавание лиц и отрисовка рамок
// async function detectFaces(video, cameraIndex) {
//     const canvas = document.createElement('canvas');
//     const context = canvas.getContext('2d');
//     video.parentNode.appendChild(canvas); // Добавляем canvas для отрисовки рамок
//
//     // Устанавливаем размеры canvas равными размерам видео
//     canvas.width = video.videoWidth;
//     canvas.height = video.videoHeight;
//
//     // Функция для отрисовки рамок и таймера
//     async function draw() {
//         if (faceDetectionModel) {
//             // Получаем предсказания для лиц
//             const predictions = await faceDetectionModel.estimateFaces(video);
//
//             // Очищаем canvas перед отрисовкой нового кадра
//             context.clearRect(0, 0, canvas.width, canvas.height);
//
//             // Отрисовываем рамки для каждого лица
//             predictions.forEach((prediction, i) => {
//                 const boundingBox = prediction.boundingBox;
//
//                 // Рисуем зелёную рамку вокруг лица
//                 context.strokeStyle = 'green';
//                 context.lineWidth = 2;
//                 context.strokeRect(
//                     boundingBox.topLeft[0],
//                     boundingBox.topLeft[1],
//                     boundingBox.bottomRight[0] - boundingBox.topLeft[0],
//                     boundingBox.bottomRight[1] - boundingBox.topLeft[1]
//                 );
//
//                 // Добавляем таймер
//                 if (!timers[cameraIndex]) {
//                     timers[cameraIndex] = { startTime: Date.now() };
//                 }
//                 const elapsedTime = Math.floor((Date.now() - timers[cameraIndex].startTime) / 1000);
//
//                 // Отображаем время в кадре
//                 context.fillStyle = 'green';
//                 context.font = '16px Arial';
//                 context.fillText(
//                     `Время в кадре: ${elapsedTime} сек`,
//                     boundingBox.topLeft[0],
//                     boundingBox.topLeft[1] - 10
//                 );
//             });
//         }
//
//         // Рекурсивно вызываем функцию для обновления кадров
//         requestAnimationFrame(draw);
//     }
//
//     // Запускаем отрисовку
//     draw();
// }
//
// // Функция для показа заглушек вместо видео
// function showFallbackImages() {
//     const videoElements = document.querySelectorAll('video');
//     videoElements.forEach(video => {
//         const img = document.createElement('img');
//         img.src = 'https://via.placeholder.com/640x360.png?text=Нет+доступа+к+камере';
//         img.alt = 'Камера недоступна';
//         img.style.width = '100%';
//         img.style.height = '100%';
//         img.style.objectFit = 'cover';
//         video.parentNode.replaceChild(img, video);
//     });
// }







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








