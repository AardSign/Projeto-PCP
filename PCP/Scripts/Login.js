document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  const usernameInput = document.querySelector("input[placeholder='Nome de usuário']");
  const passwordInput = document.querySelector("input[placeholder='Senha']");
  const redirectToRegisterButton = document.querySelector(".register-redirect-btn");

  if (!form) {
    console.error("O formulário não foi encontrado na página.");
    return;
  }

  // Função para tratar o login
  form.addEventListener("submit", async (event) => {
    event.preventDefault(); // Impede o envio padrão do formulário.

    // Limpa mensagens anteriores
    const existingAlert = document.querySelector(".alert-box");
    if (existingAlert) existingAlert.remove();

    // Validações
    if (!usernameInput.value.trim()) {
      criarAlerta("error", "Nome de usuário é obrigatório.");
      return;
    }

    if (!passwordInput.value.trim()) {
      criarAlerta("error", "Senha é obrigatória.");
      return;
    }

    // Autenticação do usuário via API
    try {
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include", // Envia cookies da sessão
        body: JSON.stringify({
          username: usernameInput.value.trim(),
          password: passwordInput.value.trim()
        })
      });

      if (!response.ok) {
        const errorMessage = await response.text(); // Captura mensagens de erro da API
        throw new Error(errorMessage || "Erro ao autenticar. Tente novamente.");
      }

      const userData = await response.json();

      // Valida se os dados do usuário estão presentes
      if (!userData || !userData.id) {
        throw new Error("Resposta inesperada do servidor.");
      }

      // Login bem-sucedido
      criarAlerta("success", "Login realizado com sucesso!");
      localStorage.setItem("loggedUser", JSON.stringify(userData)); // Salva os dados do usuário no localStorage

      // Redireciona para a página inicial após um pequeno delay
      setTimeout(() => {
        window.location.href = "index.html";
      }, 1000);
      
    } catch (error) {
      criarAlerta("error", `Erro no login: ${error.message}`);
      console.error("Erro durante o login:", error);
    }
  });

  // Redireciona para a página de cadastro
  if (redirectToRegisterButton) {
    redirectToRegisterButton.addEventListener("click", () => {
      window.location.href = "register.html";
    });
  }

  // Função para criar alertas na tela
  function criarAlerta(tipo, mensagem) {
    const alertBox = document.createElement("div");
    alertBox.textContent = mensagem;
    alertBox.className = `alert-box ${tipo === "error" ? "alert-error" : "alert-success"}`;
    document.body.insertBefore(alertBox, document.body.firstChild);

    // Remove a mensagem automaticamente após 4 segundos
    setTimeout(() => alertBox.remove(), 4000);
  }
});
