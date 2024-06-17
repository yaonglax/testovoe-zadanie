const cards = document.querySelectorAll('.card');
const leafTop = document.querySelector(".leaf-container__image--top");
const leafBottom = document.querySelector(".leaf-container__image--bottom");
const bubbleBig = document.querySelectorAll(".card__bubble-big");
const bubbleLittle = document.querySelectorAll(".card__bubble-little");
const cardsRow = document.querySelector(".main-container__cards-row");
const cardsArray = Array.from(cards);
const moveDistance = 2;
const rightOffset = parseInt(getComputedStyle(leafBottom).right);
let position = 0;
let timeoutId = null;

cards.forEach(card => {
    const img = card.querySelector('.card__image');
    const originalSrc = img.src;
    const hoverSrc = img.getAttribute('data-hover');

    card.addEventListener('mouseover', () => {
        clearTimeout(timeoutId);
        img.src = hoverSrc;
        position = moveDistance * (cardsArray.indexOf(card) + 1);
        leafTop.style.left = position + 'px';
        leafTop.style.top = "9%";
        leafBottom.style.bottom = "31%";
        const newRightPosition = rightOffset + position;
        leafBottom.style.right = newRightPosition + 'px';
        timeoutId = setTimeout(() => {
            bubbleBig.forEach(element => {
                element.classList.add("animate-big");
            });
            bubbleLittle.forEach(element => {
                element.classList.add("animate-little");
            });
        }, 50);
    });

    card.addEventListener('mouseout', () => {
        bubbleBig.forEach(element => {
            element.classList.remove("animate-big");
        });
        bubbleLittle.forEach(element => {
            element.classList.remove("animate-little");
        });
        clearTimeout(timeoutId);
        img.src = originalSrc;
    });
});

cardsRow.addEventListener("mouseleave", () => {
    leafTop.style.left = position + 'px';
    leafTop.style.top = "10%";
    leafBottom.style.right = rightOffset + 'px';
    leafBottom.style.bottom = "30%";
});
