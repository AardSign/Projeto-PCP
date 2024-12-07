document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const tableName = urlParams.get('tableName'); // Exemplo: 'cpus_detailed'
  const id = urlParams.get('id'); // Exemplo: '123'

  if (tableName && id) {
    fetchProductDetails(tableName, id);
  } else {
    console.error("Parâmetros da URL estão ausentes!");
    alert("Erro: Parâmetros da URL não fornecidos.");
  }

  // Adiciona evento ao botão de adicionar aos favoritos
  const addToFavoritesLink = document.querySelector('.add-to-favorite-btn a');
  if (addToFavoritesLink) {
    addToFavoritesLink.addEventListener('click', async (event) => {
      event.preventDefault(); // Impede o comportamento padrão do link

      // Obtém os dados do produto
      const productImage = document.querySelector('.product-page-image').src;
      const productName = document.querySelector('.product-page-image').alt;

      // Verifica o usuário logado
      const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
      if (!loggedUser || !loggedUser.id) {
        alert("Erro: Usuário não autenticado.");
        return;
      }

      const userId = loggedUser.id;

      // Chama a função para adicionar aos favoritos
      addToFavorites(userId, id, productName, productImage);
    });
  }
});

async function fetchProductDetails(tableName, id) {
  try {
    const response = await fetch(`http://localhost:8080/api/components/${tableName}/${id}`);
    if (!response.ok) {
      throw new Error(`Erro ${response.status}: ${response.statusText}`);
    }

    const product = await response.json();
    renderProductDetails(product);
  } catch (error) {
    console.error("Erro ao buscar detalhes do produto:", error);
    alert("Erro ao carregar detalhes do produto. Tente novamente mais tarde.");
  }
}

function renderProductDetails(product) {
  // Atualizar a imagem do produto
  const productImage = document.querySelector('.product-page-image');
  if (productImage) {
    productImage.src = product.data["Image URL"] || "images/icons/default-product.png";
    productImage.alt = product.data.Name || "Imagem do Produto";
  }

  // Atualizar as especificações
  const specsContainer = document.querySelector('.specs-content');
  if (!specsContainer) {
    console.error("Elemento '.specs-content' não encontrado no DOM.");
    return;
  }

  specsContainer.innerHTML = ""; // Limpar conteúdo anterior

  for (const [key, value] of Object.entries(product.data)) {
    // Ignorar os campos 'id' e 'Image URL'
    if (key === "id" || key === "Image URL") {
      continue;
    }

    const specElement = document.createElement('div');
    specElement.classList.add('spec-item');
    specElement.innerHTML = `<strong>${key}:</strong> ${value || "N/A"}`;
    specsContainer.appendChild(specElement);
  }
}

async function addToFavorites(userId, partId, partName, imageUrl, tableName) {
  try {
    const favoriteData = {
      userId: userId,
      partId: partId,
      partName: partName,
      imageUrl: imageUrl,
      tableName: tableName, // Inclua o tableName
    };

    const response = await fetch(`http://localhost:8080/api/favorites/${tableName}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(favoriteData),
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(`Erro ${response.status}: ${errorMessage}`);
    }

    alert("Parte adicionada aos favoritos com sucesso!");
  } catch (error) {
    console.error("Erro ao adicionar aos favoritos:", error);
    alert("Erro ao adicionar aos favoritos. Tente novamente.");
  }
}

/// Função para adicionar o produto ao builder
function attachAddToBuilderButton() {
  const addToBuilderButton = document.querySelector('.add-builder-btn');
  if (addToBuilderButton) {
    addToBuilderButton.addEventListener('click', () => {
      const productImage = document.querySelector('.product-page-image')?.src;
      const productName = document.querySelector('.product-page-image')?.alt;
      const urlParams = new URLSearchParams(window.location.search);
      const tableName = urlParams.get('table');
      const id = urlParams.get('id');

      console.log("Dados capturados:");
      console.log("Imagem:", productImage);
      console.log("Nome:", productName);
      console.log("Tabela:", tableName);
      console.log("ID:", id);

      if (!productName || !productImage || !tableName || !id) {
        alert("Erro: Dados do produto ou parâmetros não carregados.");
        return;
      }

      addToBuilder(tableName, id, productName, productImage);
    });
  } else {
    console.error("Botão 'Adicionar ao Builder' não encontrado.");
  }
}

// Chame esta função no `DOMContentLoaded` para ativar o botão
document.addEventListener('DOMContentLoaded', attachAddToBuilderButton);


// Chame esta função no `DOMContentLoaded` para ativar o botão
document.addEventListener('DOMContentLoaded', attachAddToBuilderButton);


