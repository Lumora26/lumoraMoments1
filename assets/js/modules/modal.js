export function toggleModal(modalId, show) {
    const modal = document.getElementById(modalId);
    if (!modal) return;

    if (show) {
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    } else {
        modal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }
}

export function sendSongToDJ(event) {
    event.preventDefault();
    
    const nome = document.getElementById('dj_guest').value;
    const musica = document.getElementById('dj_song').value;
    const djs_whatsapp_number = "5511961475002"; // Substitua pelo número real do DJ
    
    const textTemplate = `Olá, DJ! Meu nome é ${nome}. Estou na festa de 15 Anos da Bia e gostaria muito de pedir a música: "${musica}" para tocar na pista de dança! 🎉`;
    const encodedText = encodeURIComponent(textTemplate);
    
    window.open(`https://wa.me/${djs_whatsapp_number}?text=${encodedText}`, '_blank');
    
    document.getElementById('dj_guest').value = "";
    document.getElementById('dj_song').value = "";
    toggleModal('djModal', false);
}