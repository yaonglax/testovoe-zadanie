const cards = document.querySelectorAll('.card');
const leafTop = document.querySelector(".leaf-container__image--top");
const leafBottom = document.querySelector(".leaf-container__image--bottom");
const bubble = document.querySelectorAll(".card__bubble");
const cardsRow = document.querySelector(".main-container__cards-row");
const cardsArray = Array.from(cards);
const rightOffset = parseInt(getComputedStyle(leafBottom).right);
const startingPointTop = -0.3;
const startingPointBottom = 29.7;


cards.forEach(card => {
    const img = card.querySelector('.card__image');
    const hoverSrc = img.getAttribute('data-hover');
    const originalSrc = img.src;
    const leaftopTopOffset = getComputedStyle(leafTop).top;
    const leafbottomBottomOffset = getComputedStyle(leafBottom).bottom;
    card.addEventListener('mouseover', () => {
        img.src = hoverSrc;
        const position = cardsArray.indexOf(card) + 1;
        leafTop.style.left = startingPointTop + (position - 1) / 3 + '%';
        leafTop.style.top = 9 + '%'
        leafBottom.style.bottom = 29 + '%'
        leafBottom.style.right = startingPointBottom + (position - 1) / 5 + '%';
        let containsBubble = false;
        bubble.forEach(b => {
            if (card.contains(b)) {
                b.classList.remove("bubble-animation");
                let randomX = (Math.random() * parseInt(getComputedStyle(card).width) / 5).toFixed(0);
                let randomY = (Math.random() * parseInt(getComputedStyle(card).height) / 5).toFixed(0);
                let randomScale = Math.random() * 1.5;
                containsBubble = true;
                b.style.top = `${randomY}%`
                b.style.left = `${randomX}%`
                b.classList.add("bubble-animation");
                b.style.transform = `translate(${randomX}px, ${randomY}px) scale(${randomScale})`;
                console.log(randomX, randomY)
            }

        });
    });
    card.addEventListener('mouseout', () => {
        img.src = originalSrc;
    });

    cardsRow.addEventListener("mouseleave", () => {
        leafTop.style.top = leaftopTopOffset;
        leafBottom.style.bottom = leafbottomBottomOffset;
        if (parseFloat(leafTop.style.left) < 0) {
            leafTop.style.left = 0
            leafBottom.style.right = rightOffset + 'px'
        }

    })


});

