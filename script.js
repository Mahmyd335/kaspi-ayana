const btn1 = document.getElementById("btn1")
const btn2 = document.getElementById("btn2")
const section = document.getElementById("section")

btn2.addEventListener('click', () => {
  section.style.display = 'block'
  btn2.style.background = 'white'
  btn1.style.background = '#d9d9d9'
  btn2.style.zIndex = '1'
  btn1.style.zIndex = '0'
})

btn1.addEventListener('click', () => {
  section.style.display = 'none'
  btn1.style.background = 'white'
  btn2.style.background = '#d9d9d9'
  btn1.style.zIndex = '1'
  btn2.style.zIndex = '0'
})



const footerBtn1 = document.getElementById("footerBtn1");
const wind = document.getElementById("window");
const closeBtn = document.getElementById("x");

footerBtn1.addEventListener("click", () => {
  // Показываем окно
  wind.style.display = "flex";

  // Сбрасываем анимацию
  wind.classList.remove("active");
  void wind.offsetWidth; // триггер для перезапуска анимации
  wind.classList.add("active");
});

closeBtn.addEventListener("click", () => {
  // Убираем анимацию и скрываем окно после окончания анимации
  wind.classList.remove("active");
  
  // Можно использовать таймер равный длительности анимации (0.5s)
  setTimeout(() => {
    wind.style.display = "none";
  }, 500); // 500ms = длительность анимации в CSS
});



const text4 = document.querySelector(".text4");

// Функция для генерации случайной цифры от 0 до 9
function getRandomDigit() {
  return Math.floor(Math.random() * 10);
}

// Функция для генерации нового числа той же длины
function getRandomNumberString(length) {
  let result = '';
  for (let i = 0; i < length; i++) {
    result += getRandomDigit();
  }
  return result;
}

// Событие клика
footerBtn1.addEventListener("click", () => {
  const length = text4.textContent.length; // сохраняем длину исходного числа
  text4.textContent = getRandomNumberString(length);
});



const footerBtn2 = document.getElementById("footerBtn2");

footerBtn2.addEventListener("click", async () => {
  if (navigator.share && navigator.canShare) {
    try {
      // путь к PDF (должен быть доступен по URL)
      const response = await fetch("090124552135-20251219143643327.pdf");
      const blob = await response.blob();
      const file = new File([blob], "example.pdf", {
        type: "application/pdf"
      });

      if (navigator.canShare({ files: [file] })) {
        await navigator.share({
          title: "Поделиться PDF",
          files: [file]
        });
        console.log("PDF успешно отправлен!");
      } else {
        alert("Ваш браузер не поддерживает отправку файлов");
      }
    } catch (err) {
      console.error("Ошибка при шаринге PDF:", err);
    }
  } else {
    alert("Ваш браузер не поддерживает Web Share API");
  }
});





const footerBtn3 = document.getElementById("footerBtn3");

// Текст для шаринга
const shareText = "Мұрат Мирас Манасұлы"
                  "040124552135"
                  "24.01.2004"
                  "16.10.2020"
                  "17.10.2030";

footerBtn3.addEventListener("click", async () => {
  if (navigator.share) {
    try {
      await navigator.share({
        title: 'Поделиться текстом',
        text: shareText
      });
      console.log('Текст успешно отправлен!');
    } catch (err) {
      console.error('Ошибка при попытке поделиться:', err);
    }
  } else {
    alert('Ваш браузер не поддерживает Web Share API');
  }
});


const zoomArea = document.querySelector('.con-section');

let scale = 1;
let startDistance = 0;
let originX = 0;
let originY = 0;

zoomArea.addEventListener('touchstart', e => {
  if (e.touches.length === 2) {
    startDistance = getDistance(e.touches[0], e.touches[1]);
    
    // Находим середину между пальцами
    const rect = zoomArea.getBoundingClientRect();
    originX = ((e.touches[0].clientX + e.touches[1].clientX) / 2) - rect.left;
    originY = ((e.touches[0].clientY + e.touches[1].clientY) / 2) - rect.top;
  }
}, { passive: false });

zoomArea.addEventListener('touchmove', e => {
  if (e.touches.length === 2) {
    e.preventDefault();

    const newDistance = getDistance(e.touches[0], e.touches[1]);
    scale *= newDistance / startDistance;
    scale = Math.min(Math.max(scale, 1), 5); // ограничение масштаба

    // Используем origin пальцев для transform
    zoomArea.style.transformOrigin = `${originX}px ${originY}px`;
    zoomArea.style.transform = `scale(${scale})`;

    startDistance = newDistance;
  }
}, { passive: false });

function getDistance(t1, t2) {
  return Math.hypot(
    t2.clientX - t1.clientX,
    t2.clientY - t1.clientY
  );
}



