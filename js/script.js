const camposFormulario = document.querySelectorAll('[required]');

camposFormulario.forEach(campo => {
  campo.addEventListener('blur', () => verificarCampo(campo));  
})

function verificarCampo(campo) {
    console.log(campo);
}