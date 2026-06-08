import { db } from '../firebase/config.js';
import { collection, addDoc, query, where, orderBy, onSnapshot } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-firestore.js";
import { openLightbox } from '../utils/lightbox.js';
console.log("DB:", db);

let selectedImageBase64 = ""; // Armazena a foto ativa em formato Base64 para envio
const EVENTO_ID = "bia-15anos"; // Identificador exclusivo desta festa para separar dados no banco

/**
 * Escuta o banco de dados Firebase em tempo real utilizando onSnapshot.
 * Caso qualquer pessoa envie uma mensagem, a tela de todos atualiza na hora sem recarregar.
 */
export function inicializarMuralRealTime() {
    console.log("Firestore conectado:", db)
    const q = query(
        collection(db, "mensagens"),
        where("eventoId", "==", EVENTO_ID),
        orderBy("createdAt", "desc"), // Exibe as mensagens mais recentes no topo

    );

    // O onSnapshot age como uma escuta ativa na nuvem do Firebase
    onSnapshot(q, (snapshot) => {
        const mural = document.getElementById("muralFeed");
        if (!mural) return;

        mural.innerHTML = ""; // Limpa o mural para evitar duplicações

        snapshot.forEach((doc) => {
            const msg = doc.data();
            const docId = doc.id;
            let layoutFoto = "";

            if (msg.photo) {
                // Cria um identificador único de elemento para anexar o lightbox
                layoutFoto = `
                    <div class="mural-media" id="media-${docId}">
                        <img src="${msg.photo}" alt="Foto Homenagem">
                    </div>
                `;
            }

            // Injeta o card na tela
            mural.innerHTML += `
                <div class="mural-card">
                    <div class="mural-card-header">
                        <div class="mural-author-container">
                            <span class="mural-author">${msg.author}</span>
                            <span class="mural-relation-badge">${msg.relation}</span>
                        </div>
                        <span class="mural-time">Agora</span>
                    </div>
                    ${msg.text ? `<p class="mural-text">${msg.text}</p>` : ''}
                    ${layoutFoto}
                </div>
            `;

            // Vincula dinamicamente a abertura em tela cheia na imagem do mural
            if (msg.photo) {
                setTimeout(() => {
                    const imgEl = document.getElementById(`media-${docId}`);
                    if (imgEl) {
                        imgEl.onclick = () => openLightbox(msg.photo);
                    }
                }, 50);
            }
        });
    });
}

/**
 * Captura a foto da câmera/galeria e gera a visualização prévia em Base64.
 */
export function previewImage(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            selectedImageBase64 = e.target.result;
            document.getElementById('image_preview').src = selectedImageBase64;
            document.getElementById('preview_container').classList.remove('hidden');
            document.getElementById('photo_placeholder').innerHTML = "<span>✓</span> Foto Carregada";
        };
        reader.readAsDataURL(file);
    }
}

/**
 * Limpa a seleção da foto carregada.
 */
export function removePreview() {
    selectedImageBase64 = "";
    document.getElementById('form_photo').value = "";
    document.getElementById('preview_container').classList.add('hidden');
    document.getElementById('photo_placeholder').innerHTML = "<span>📸</span> Tirar Foto / Subir Imagem";
}

/**
 * Envia e salva a mensagem diretamente na coleção "mensagens" do Firebase Firestore.
 */
export async function handleLiveSubmit(event) {
    event.preventDefault();

    const nome = document.getElementById('form_name').value;
    const relacao = document.getElementById('form_relation').value;
    const texto = document.getElementById('form_text').value;

    if (!texto.trim() && !selectedImageBase64) {
        alert("Por favor, digite um recado ou tire uma foto para enviar sua homenagem!");
        return;
    }

    try {
        // Envia o documento direto para o banco de dados online
        await addDoc(collection(db, "mensagens"), {
            eventoId: EVENTO_ID,
            author: nome,
            relation: relacao,
            text: texto,
            photo: selectedImageBase64, // Envia a foto em string Base64 compactada
            createdAt: new Date().toISOString()
        });

        // Limpa os campos do formulário para o próximo envio
        document.getElementById('form_name').value = "";
        document.getElementById('form_text').value = "";
        removePreview();

        alert("Sua homenagem foi publicada instantaneamente no mural ao vivo! 🎉");
    } catch (error) {
        console.error("Erro ao salvar no Firebase:", error);
        alert("Houve um problema ao enviar. Verifique sua conexão.");
    }
}