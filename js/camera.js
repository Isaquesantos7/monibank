const botaoIniciarCamera = document.querySelector('[data-video-botao]');
const campoCamera = document.querySelector('[data-camera]');
const video = document.querySelector('[data-video]');
const botaoTirarFoto = document.querySelector('[data-tirar-foto]');
const canvas = document.querySelector('[data-video-canvas]');
const mensagem = document.querySelector('[data-mensagem]');
const botaoEnviarFoto = document.querySelector('[data-enviar]');

let imagemURL = '';

/* Evento que iniciarĂ¡ a camera */
botaoIniciarCamera.addEventListener('click', async function() {
    const iniciarVideo = await navigator.mediaDevices.getUserMedia({video:true, audio:false});

    botaoIniciarCamera.style.display = 'none';
    campoCamera.style.display = 'block';

    video.srcObject = iniciarVideo;
});

/* Tirando foto */
botaoTirarFoto.addEventListener('click', function () {
    canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);

    imagemURL = canvas.toDataURL('image/jpeg');

    campoCamera.style.display = 'none';
    mensagem.style.display = 'bock';
})

/* Enviando foto */
botaoEnviarFoto.addEventListener('click', () => {
    const receberDadosExistentes = localStorage.getItem('cadastro');
    const coverterDados = JSON.parse(receberDadosExistentes);

    coverterDados.imagem = imagemURL;

    localStorage.setItem('cadastro', JSON.stringify(coverterDados));

    window.location.href = '../pages/abrir-conta-form-3.html'
});