const formContato = document.getElementById('formContato');
const statusForm = document.getElementById('statusForm');

formContato.addEventListener('submit', function(e) {
  e.preventDefault();
  statusForm.textContent = "Enviando...";
  
  // Simulação de envio
  setTimeout(() => {
    statusForm.textContent = "Mensagem enviada com sucesso! Entraremos em contato em breve.";
    formContato.reset();
  }, 1500);
});
