document.addEventListener("DOMContentLoaded", () => {
  const userActions = document.getElementById("user-actions");

  if (!userActions) {
    console.error("Elemento 'user-actions' não encontrado. Verifique se ele existe na página.");
    return;
  }

  // Obter os dados do usuário logado do localStorage
  const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));

  // Verifica se o usuário está logado
  if (loggedUser) {
    userActions.innerHTML = `
      <div class="user-info">
        <a href="profilePage.html" class="user-link">${loggedUser.username}</a>
        <a href="#" id="logout-link" class="logout-link">
          <img src="images\icons/arrow-out-square.svg" alt="Sair"> Sair
        </a>
      </div>
    `;

    // Adiciona evento ao botão de logout
    const logoutLink = document.getElementById("logout-link");
    if (logoutLink) {
      logoutLink.addEventListener("click", () => {
        localStorage.removeItem("loggedUser"); // Remove apenas os dados do usuário
        window.location.href = "login.html"; // Redireciona para a página de login
      });
    } else {
      console.error("Logout link não encontrado.");
    }
  } else {
    console.warn("Usuário não está logado. Exibindo opções padrão.");
    userActions.innerHTML = `
      <div class="login">
        <a href="login.html" class="login-button">
          <p>Login</p>
          <img src="images/icons/entrance.svg" class="login-logo">
        </a>
      </div>
      <div>
        <a href="register.html" class="register-button">
          <p>Cadastrar</p>
          <img src="images/icons/user-plus.svg" class="register-logo">
        </a>
      </div>
    `;
  }
});



document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.querySelector(".search-bar");
  const resultsContainer = document.querySelector(".search-results");

  const allowedTables = [
    "cases_detailed",
    "cpu_coolers_detailed",
    "cpus_detailed",
    "gpus_detailed",
    "memory_detailed",
    "motherboards_detailed",
    "power_supplies_detailed",
    "storage_detailed",
  ];

  searchInput.addEventListener("input", async () => {
    const query = searchInput.value.trim().toLowerCase();

    if (!query) {
      resultsContainer.style.display = "none";
      return;
    }

    try {
      const results = await fetchComponentsFromAllTables(query);
      console.log("Resultados filtrados para exibição:", results);
      renderSearchResults(results);
    } catch (error) {
      console.error("Erro ao buscar componentes:", error);
      resultsContainer.innerHTML = `<p>Erro ao buscar resultados. Tente novamente mais tarde.</p>`;
      resultsContainer.style.display = "block";
    }
  });

  async function fetchComponentsFromAllTables(query) {
    const allResults = [];

    for (const tableName of allowedTables) {
      try {
        const response = await fetch(
          `http://localhost:8080/api/components/${tableName}?page=0&size=100`
        );
        if (response.ok) {
          const page = await response.json();
          const components = page.content || [];

          console.log(`Dados retornados da tabela ${tableName}:`, components);

          const filtered = components.filter((component) => {
            console.log(`Componente analisado na tabela ${tableName}:`, component);
            const queryLower = query.toLowerCase();
            return (
              (component.name && component.name.toLowerCase().includes(queryLower)) ||
              (component.brand && component.brand.toLowerCase().includes(queryLower)) ||
              (component.model && component.model.toLowerCase().includes(queryLower)) ||
              (component.id && component.id.toString().includes(queryLower))
            );
          });

          allResults.push(...filtered.map((component) => ({ ...component, tableName })));
        }
      } catch (error) {
        console.error(`Erro ao buscar componentes da tabela ${tableName}:`, error);
      }
    }

    console.log("Resultados finais após filtrar:", allResults);
    return allResults;
  }

  function renderSearchResults(results) {
    resultsContainer.innerHTML = ""; // Limpa os resultados anteriores
  
    // Exibe mensagem de "Nenhum resultado encontrado" se a lista estiver vazia
    if (results.length === 0) {
      resultsContainer.innerHTML = `<p>Nenhum resultado encontrado.</p>`;
      resultsContainer.style.display = "block"; // Certifique-se de que o container está visível
      console.log("Nenhum resultado encontrado.");
      return;
    }
  
    console.log("Resultados a serem exibidos:", results);
  
    const list = document.createElement("ul");
    results.forEach((component) => {
      const name = component.name || "Nome indisponível";
      const tableName = component.tableName || "Tabela desconhecida";
  
      const listItem = document.createElement("li");
      listItem.innerHTML = `
        <a href="productPage.html?table=${tableName}&id=${component.id || ""}" class="product-link">
          ${name}
        </a>
      `;
      list.appendChild(listItem);
    });
  
    resultsContainer.appendChild(list);
    resultsContainer.style.display = "block"; // Certifique-se de que o container está visível
  }
  

  document.addEventListener("click", (event) => {
    if (!searchInput.contains(event.target) && !resultsContainer.contains(event.target)) {
      resultsContainer.style.display = "none";
    }
  });

  resultsContainer.addEventListener("mouseleave", () => {
    resultsContainer.style.display = "none";
  });
});
