let currentTimelineIndex = 0;

export function iniciarLinhaDoTempo() {
    atualizarPosicaoCard(currentTimelineIndex);
    
    // Intervalo de ciclo para girar os itens a cada 10 segundos
    setInterval(() => {
        currentTimelineIndex = (currentTimelineIndex + 1) % 3;
        atualizarPosicaoCard(currentTimelineIndex);
    }, 10000);
}

function atualizarPosicaoCard(index) {
    const activeNode = document.getElementById(`item-${index}`);
    const slidingCard = document.getElementById('sliding-card');
    
    if (!activeNode || !slidingCard) return;

    const topPos = activeNode.offsetTop;
    const heightPos = activeNode.offsetHeight;

    slidingCard.style.top = `${topPos}px`;
    slidingCard.style.height = `${heightPos}px`;

    for (let i = 0; i < 3; i++) {
        const node = document.getElementById(`item-${i}`);
        if (!node) continue;

        const bullet = node.querySelector(".bullet");
        const label = node.querySelector(".label-text");
        const title = node.querySelector(".node-title");
        const desc = node.querySelector(".node-desc");

        if (i === index) {
            if (bullet) bullet.classList.add("active");
            if (label) label.classList.add("active");
            if (title) title.classList.add("active");
            if (desc) desc.classList.add("active");
        } else {
            if (bullet) bullet.classList.remove("active");
            if (label) label.classList.remove("active");
            if (title) title.classList.remove("active");
            if (desc) desc.classList.remove("active");
        }
    }
}