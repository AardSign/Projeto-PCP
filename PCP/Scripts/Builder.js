document.addEventListener("DOMContentLoaded", async () => {
  const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
  
  if (!loggedUser || !loggedUser.id) {
    alert("Erro: Usuário não autenticado.");
    return;
  }

  const userId = loggedUser.id;

  // Função para buscar partes do builder do backend
  async function fetchBuilderParts() {
    try {
      const response = await fetch(`http://localhost:8080/api/build`);
      if (!response.ok) {
        throw new Error(`Erro ${response.status}: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Erro ao buscar partes do builder:", error);
      return {};
    }
  }

  // Função para salvar partes do builder no backend
  async function saveBuilderParts(builderParts) {
    try {
      const response = await fetch(`http://localhost:8080/api/build`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(builderParts),
      });
      if (!response.ok) {
        throw new Error(`Erro ${response.status}: ${response.statusText}`);
      }
    } catch (error) {
      console.error("Erro ao salvar partes do builder:", error);
    }
  }

  // Carregar partes do backend ou localStorage
  let builderParts = await fetchBuilderParts();
  if (!Object.keys(builderParts).length) {
    builderParts = JSON.parse(localStorage.getItem("builderParts")) || {};
  }

  const rows = document.querySelectorAll(".tr-product");

  rows.forEach((row) => {
    const category = row.querySelector(".add-component-button").getAttribute("data-category");
    const selectedCell = row.querySelector(".empty");
    const button = row.querySelector(".add-component-button");

    if (builderParts[category]) {
      // Exibe o componente adicionado
      selectedCell.innerHTML = `
        <div class="selected-part">
          <img src="${builderParts[category].image}" alt="${builderParts[category].name}" class="part-image">
          <p>${builderParts[category].name}</p>
          <button class="remove-part-button" data-category="${category}">Remover</button>
        </div>
      `;
      button.style.display = "none"; // Oculta o botão "Adicionar Componente"
    } else {
      // Espaço vazio para a categoria
      selectedCell.innerHTML = "";
      button.style.display = "inline-block"; // Mostra o botão "Adicionar Componente"
    }
  });

  // Evento para remover o componente
  document.querySelectorAll(".remove-part-button").forEach((button) => {
    button.addEventListener("click", async (e) => {
      const category = e.target.getAttribute("data-category");
      delete builderParts[category];
      localStorage.setItem("builderParts", JSON.stringify(builderParts));
      await saveBuilderParts(builderParts); // Salvar mudanças no backend
      window.location.reload(); // Recarrega a página para refletir as mudanças
    });
  });

  // Evento para adicionar componente (redirecionamento para produtos)
  document.querySelectorAll(".add-component-button").forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault(); // Impede o comportamento padrão do botão
      const category = button.getAttribute("data-category"); // Obtém a categoria do atributo
      if (category) {
        localStorage.setItem("redirectToBuilder", "true"); // Marca que o redirecionamento é para o builder
        localStorage.setItem("selectedCategory", category); // Salva a categoria selecionada
        window.location.href = `products.html?category=${category}`; // Redireciona para a página de produtos
      } else {
        console.error("Categoria não encontrada para o botão:", button);
      }
    });
  });
});





// Mapeamento de categorias para cada tipo de botão
const categories = {
  cpu: "cpus_detailed",
  gpu: "gpus_detailed",
  memory: "memory_detailed",
  motherboard: "motherboards_detailed",
  storage: "storage_detailed",
  psu: "power_supplies_detailed",
  case: "cases_detailed",
  cooler: "cpu_coolers_detailed",
};

// Adiciona categorias dinamicamente aos botões
document.querySelectorAll(".add-component-button").forEach((button) => {
  const buttonType = button.getAttribute("data-type"); // Tipo de componente definido no botão
  if (categories[buttonType]) {
    button.setAttribute("data-category", categories[buttonType]);
  } else {
    console.error(`Tipo de botão não reconhecido: ${buttonType}`);
  }
});

// Redireciona ao clicar no botão



document.addEventListener("DOMContentLoaded", () => {
  let isSubmitting = false; // Flag para evitar múltiplos envios

  const saveBuildButton = document.getElementById("save-build-button");

  // Dados do usuário logado
  const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
  if (!loggedUser || !loggedUser.id) {
    alert("Erro: Usuário não autenticado.");
    return;
  }

  const userId = loggedUser.id; // Define o userId corretamente no escopo

  saveBuildButton.addEventListener("click", async () => {
    if (isSubmitting) return; // Impede múltiplos cliques enquanto processa
    isSubmitting = true;

    // Desabilitar o botão para evitar cliques adicionais
    saveBuildButton.disabled = true;

    // Gerar nome da build automaticamente
    let buildNumber = parseInt(localStorage.getItem("lastBuildNumber")) || 0;
    buildNumber += 1; // Incrementa o número da build
    const buildName = `Build ${buildNumber}`;
    localStorage.setItem("lastBuildNumber", buildNumber); // Salva o novo número

    // Recuperar dados do localStorage para as partes selecionadas
    const builderParts = JSON.parse(localStorage.getItem("builderParts")) || {};
    console.log("Partes do builder antes de salvar:", builderParts);

    // Criar objeto da build com base nos dados do localStorage
    const buildData = {
      nome: buildName,
      systemUserId: userId,
      criadoEm: new Date().toISOString(),
      atualizadoEm: new Date().toISOString(),
      processador: builderParts["cpus_detailed"]?.name || null,
      cooler: builderParts["cpu_coolers_detailed"]?.name || null,
      placaMae: builderParts["motherboards_detailed"]?.name || null,
      gpu: builderParts["gpus_detailed"]?.name || null,
      ram: builderParts["memory_detailed"]?.name || null,
      armazenamento: builderParts["storage_detailed"]?.name || null,
      fonte: builderParts["power_supplies_detailed"]?.name || null,
      gabinete: builderParts["cases_detailed"]?.name || null,
    };    

    console.log("Dados completos da build antes de enviar:", buildData);

    // Enviar dados para o backend
    try {
      const response = await fetch("http://localhost:8080/api/build", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(buildData),
      });

      if (!response.ok) {
        const error = await response.text();
        console.error("Erro ao salvar a build:", error);
        alert("Erro ao salvar a build!");
      } else {
        // Exibir mensagem de sucesso
        const successMessage = document.createElement("div");
        successMessage.innerText = "Build salva com sucesso!";
        successMessage.style.position = "fixed";
        successMessage.style.top = "10px";
        successMessage.style.right = "10px";
        successMessage.style.backgroundColor = "green";
        successMessage.style.color = "white";
        successMessage.style.padding = "10px";
        successMessage.style.borderRadius = "5px";
        document.body.appendChild(successMessage);

        // Remover mensagem automaticamente após 3 segundos
        setTimeout(() => {
          successMessage.remove();
        }, 3000);

        console.log("Build salva:", await response.json());
      }
    } catch (error) {
      console.error("Erro ao salvar a build:", error);
    } finally {
      // Reativar o botão após o envio
      saveBuildButton.disabled = false;
      isSubmitting = false;
    }
  });






  
  


});