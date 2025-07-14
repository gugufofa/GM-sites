const formContato = document.getElementById('formContato');

formContato.addEventListener('submit', function() {
  const statusForm = document.getElementById('statusForm');
  statusForm.textContent = "Enviando...";
});
