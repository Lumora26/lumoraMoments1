/**
 * ==========================================================================
 * ORQUESTRADOR CENTRAL - main.js (Módulo Entrada)
 * Importa todas as subfunções lógicas e resolve o problema de escopo global.
 * ==========================================================================
 */

import { iniciarLinhaDoTempo } from './modules/programacao.js';
import { toggleModal, sendSongToDJ } from './modules/modal.js';
import { openLightbox, closeLightbox } from './utils/lightbox.js';
import { inicializarMuralRealTime, handleLiveSubmit, previewImage, removePreview } from './modules/mural.js';

// Executa as inicializações de tempo real quando o DOM estiver pronto
document.addEventListener("DOMContentLoaded", () => {
    // 1. Inicializa o cronômetro deslizante da programação vertical
    iniciarLinhaDoTempo();

    // 2. Conecta ao Firebase e passa a escutar mensagens em tempo real
    inicializarMuralRealTime();
    const btnPedirMusica = document.getElementById('btnPedirMusica');

    if (btnPedirMusica) {
        btnPedirMusica.addEventListener('click', () => {
            toggleModal('djModal', true);
        });
    }
});

// RESOLUÇÃO DE ESCOPO: Vincula os módulos à janela global "window" para os cliques do HTML funcionarem [1]
window.toggleModal = toggleModal;
window.sendSongToDJ = sendSongToDJ;
window.handleLiveSubmit = handleLiveSubmit;
window.previewImage = previewImage;
window.removePreview = removePreview;
window.openLightbox = openLightbox;
window.closeLightbox = closeLightbox;