document.getElementById('register-form').addEventListener('submit', async function (event) {
  event.preventDefault(); // Impede o envio padrão do formulário

  // Obtendo valores dos campos
  const username = document.getElementById('register-username').value;
  const email = document.getElementById('register-email').value;
  const password = document.getElementById('register-password').value;
  const confirmPassword = document.getElementById('register-confirm-password').value;

  // Validação de senha
  if (password.length < 8) {
    alert("A senha deve ter pelo menos 8 caracteres.");
    return;
  }

  if (password !== confirmPassword) {
    alert("As senhas não coincidem. Por favor, tente novamente.");
    return;
  }

  // Dados para envio
  const data = { username, email, password };

  try {
    // Requisição POST para registrar o usuário
    const response = await fetch('http://localhost:8080/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      alert('Usuário registrado com sucesso!');
      window.location.href = '/login.html'; // Redireciona para a página de login
    } else {
      const error = await response.json();
      alert(`Erro: ${error.message || 'Não foi possível registrar o usuário'}`);
    }
  } catch (error) {
    console.error('Erro ao registrar usuário:', error);
    alert('Erro de conexão. Verifique sua internet e tente novamente.');
  }
});
