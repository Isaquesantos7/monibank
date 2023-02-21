import validaCPF from "./valida-cpf.js";
import ehMaiorDeIdade from "./valida-idade.js";

const camposFormulario = document.querySelectorAll('[required]');
const formulario = document.querySelector('[data-formulario]');

formulario.addEventListener('submit', (e) => {
  e.preventDefault();

  const listaResposta = {
    'nome': e.target.elements['nome'].value,
    'email': e.target.elements['email'].value,
    'rg': e.target.elements['rg'].value,
    'cpf': e.target.elements['cpf'].value,
    'aniversario': e.target.elements['aniversario'].value
  }

  localStorage.setItem('cadastro', JSON.stringify(listaResposta));

  window.location.href = '../pages/abrir-conta-form-2.html';
});

camposFormulario.forEach(campo => {
  campo.addEventListener('blur', () => verificarCampo(campo));
  campo.addEventListener('invalid', (evento) => evento.preventDefault());  
})

const tiposDeErros = [
  'valueMissing',
  'typeMismatch',
  'patternMismatch',
  'tooShort',
  'customError'
]

const mensagens = {
  nome: {
    valueMissing: "O campo de nome não pode estar vazio.",
    patternMismatch: "Por favor, preencha um nome válido.",
    tooShort: "Por favor, preencha um nome válido."
  },
  
  email: {
    valueMissing: "O campo de e-mail não pode estar vazio.",
    typeMismatch: "Por favor, preencha um email válido.",
    tooShort: "Por favor, preencha um e-mail válido."
  },

  rg: {
    valueMissing: "O campo de RG não pode estar vazio.",
    patternMismatch: "Por favor, preencha um RG válido.",
    tooShort: "O campo de RG não tem caractéres suficientes."
  },

  cpf: {
    valueMissing: 'O campo de CPF não pode estar vazio.',
    patternMismatch: "Por favor, preencha um CPF válido.",
    customError: "O CPF digitado não existe.",
    tooShort: "O campo de CPF não tem caractéres suficientes."
  },

  aniversario: {
    valueMissing: 'O campo de data de nascimento não pode estar vazio.',
    customError: 'Você deve ser maior que 18 anos para se cadastrar.'
  },

  termos: {
    valueMissing: 'Você deve aceitar nossos termos antes de continuar.',
  }
}

function verificarCampo(campo) {
  let mensagem = '';
  campo.setCustomValidity('');

  if (campo.name == 'cpf' && campo.value.length >= 11) {
    validaCPF(campo); 
  }

  if (campo.name == 'aniversario' && campo.value != "") {
    ehMaiorDeIdade(campo)
  }

  /* Varrendo tipo de errros */
  tiposDeErros.forEach(error => {
    /* Verificando se o tipo de error retornando pelo validity esta incluso na lista tiposDeErros */
    if(campo.validity[error]) {
      mensagem = mensagens[campo.name][error];
    }
  });

  /* Pegando o parentNode da classe .mensagem-erro */
  const mensagemError = campo.parentNode.querySelector('.mensagem-erro');
  const validadorDeInput = campo.checkValidity();

  if (!validadorDeInput) {
    mensagemError.textContent = mensagem;
  } else {
    mensagemError.textContent = '';
  }
}