let currentUserId = null; // Variável global para armazenar o ID do usuário autenticado

document.addEventListener('DOMContentLoaded', () => {
  initializeProfilePage();
});

// Função principal para inicializar a página de perfil
async function initializeProfilePage() {
  await loadCurrentUser(); // Carrega os dados do usuário autenticado
}

// Função para obter informações do usuário autenticado
async function loadCurrentUser() {
  try {
    const response = await fetch('http://localhost:8080/api/auth/current-user', {
      method: 'GET',
      credentials: 'include', // Garante que os cookies de sessão sejam enviados
    });

    if (response.ok) {
      const user = await response.json();

      console.log("Usuário encontrado:", user);

      currentUserId = user.id;
      document.getElementById('name').value = user.username || '';
      document.getElementById('email').value = user.email || '';
    } else {
      alert('Erro ao carregar informações do usuário. Sessão inválida.');
    }
  } catch (error) {
    console.error('Erro ao carregar dados do usuário:', error);
  }
}

// Função para atualizar as informações do usuário
document.getElementById('account-form').addEventListener('submit', async function (event) {
  event.preventDefault();

  // Verifica se o ID do usuário foi carregado
  if (!currentUserId) {
    alert('Usuário não carregado. Tente novamente.');
    return;
  }

  // Obtém os valores dos campos do formulário
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  // Monta o objeto de dados para envio
  const data = {
    username: name,
    email: email,
    password: password || undefined, // Inclui a senha apenas se foi fornecida
  };

  try {
    const response = await fetch(`http://localhost:8080/api/users/${currentUserId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      const updatedUser = await response.json();
      alert('Informações atualizadas com sucesso!');

      // Atualiza os campos do formulário com os novos valores
      document.getElementById('name').value = updatedUser.username;
      document.getElementById('email').value = updatedUser.email;
    } else {
      const error = await response.json();
      alert(`Erro: ${error.message || 'Não foi possível atualizar o usuário.'}`);
    }
  } catch (error) {
    console.error('Erro ao atualizar usuário:', error);
  }
});

// Função para excluir a conta do usuário
async function deleteAccount() {
  // Verifica se o ID do usuário foi carregado
  if (!currentUserId) {
    alert('Usuário não carregado. Tente novamente.');
    return;
  }

  if (confirm('Tem certeza de que deseja excluir sua conta? Esta ação não pode ser desfeita.')) {
    try {
      const response = await fetch(`http://localhost:8080/api/users/${currentUserId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        alert('Conta excluída com sucesso!');
        window.location.href = '/'; // Redireciona para a página inicial
      } else {
        alert('Erro ao excluir conta.');
      }
    } catch (error) {
      console.error('Erro ao excluir conta:', error);
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));

  if (!loggedUser || !loggedUser.id) {
    alert("Erro: Usuário não autenticado.");
    return;
  }

  const userId = loggedUser.id;

  // Caso você precise de um tableName fixo para a consulta, substitua "cpus_detailed" ou crie uma lógica para obtê-lo dinamicamente
  const tableName = "cpus_detailed"; // Substituir por lógica dinâmica se necessário

  fetchFavorites(userId, tableName);
});

// Função para buscar os favoritos do usuário
async function fetchFavorites(userId, tableName) {
  try {
    const response = await fetch(`http://localhost:8080/api/favorites/${tableName}/${userId}`);
    if (!response.ok) {
      throw new Error(`Erro ${response.status}: ${response.statusText}`);
    }

    const favorites = await response.json();
    renderFavorites(favorites);
  } catch (error) {
    console.error("Erro ao buscar favoritos:", error);
    alert("Erro ao carregar favoritos. Tente novamente mais tarde.");
  }
}

function renderFavorites(favorites) {
  const favoritesList = document.querySelector(".favoritos-list");
  favoritesList.innerHTML = ""; // Limpa a lista antes de renderizar

  if (favorites.length === 0) {
    favoritesList.innerHTML = "<p>Nenhum favorito encontrado.</p>";
    return;
  }

  favorites.forEach((favorite) => {
    const listItem = document.createElement("div");
    listItem.className = "favorite-item";

    listItem.innerHTML = `
      <div style="display: flex; align-items: center; cursor: pointer;" onclick="redirectToProductPage('${favorite.tableName}', '${favorite.partId}')">
        <img src="${favorite.imageUrl || 'images/icons/default-product.png'}" alt="${favorite.partName || 'Sem nome'}" class="favorite-image" style="width: 50px; height: 50px; margin-right: 10px;">
        <p class="favorite-name">${favorite.partName}</p>
      </div>
      <button class="remove-favorite-button" style="margin-left: auto;">Remover</button>
    `;

    // Adiciona evento ao botão de remoção
    listItem.querySelector(".remove-favorite-button").addEventListener("click", (event) => {
      event.stopPropagation(); // Impede o clique na remoção de redirecionar
      removeFavorite(favorite.id);
    });

    favoritesList.appendChild(listItem);
  });
}

function redirectToProductPage(tableName, partId) {
  if (!tableName || !partId) {
    console.error("Dados insuficientes para redirecionar:", { tableName, partId });
    alert("Erro ao redirecionar para a página do produto.");
    return;
  }

  const url = `productPage.html?tableName=${encodeURIComponent(tableName)}&id=${partId}`;
  console.log("Redirecionando para:", url);
  window.location.href = url;
}

async function removeFavorite(favoriteId) {
  if (!favoriteId) {
    alert("Erro: ID do favorito inválido.");
    return;
  }

  try {
    const response = await fetch(`http://localhost:8080/api/favorites/${favoriteId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(`Erro ${response.status}: ${errorMessage}`);
    }

    alert("Favorito removido com sucesso!");
    // Atualiza a lista de favoritos após a remoção
    const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
    if (loggedUser && loggedUser.id) {
      fetchFavorites(loggedUser.id); // Atualiza a lista de favoritos
    }
  } catch (error) {
    console.error("Erro ao remover o favorito:", error);
    alert("Erro ao remover o favorito. Tente novamente.");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));

  if (!loggedUser || !loggedUser.id) {
    alert("Erro: Usuário não autenticado.");
    return;
  }

  const userId = loggedUser.id;

  // Buscar builds salvas do usuário
  fetchSavedBuilds(userId);
});

// Função para buscar builds salvas
async function fetchSavedBuilds(userId) {
  try {
    const response = await fetch(`http://localhost:8080/api/build/${userId}`);
    if (!response.ok) {
      throw new Error(`Erro ${response.status}: ${response.statusText}`);
    }

    const builds = await response.json();
    renderSavedBuilds(builds);
  } catch (error) {
    console.error("Erro ao buscar builds salvas:", error);
    alert("Erro ao carregar builds salvas. Tente novamente mais tarde.");
  }
}

// Função para renderizar builds salvas
function renderSavedBuilds(builds) {
  const buildsList = document.querySelector("#builds-list");
  buildsList.innerHTML = ""; // Limpa a lista antes de renderizar

  if (builds.length === 0) {
    buildsList.innerHTML = "<p>Nenhuma build salva encontrada.</p>";
    return;
  }

  builds.forEach((build) => {
    console.log("Renderizando build:", build); // Log para verificar os dados

    const buildItem = document.createElement("div");
    buildItem.className = "build-item";

    buildItem.innerHTML = `
      <div class="build-content">
  <div class="build-info">
    <h3>${build.nome || "Build sem nome"}</h3>
    <p><strong>Processador:</strong> ${build.processador || "N/A"}</p>
    <p><strong>Cooler:</strong> ${build.cooler || "N/A"}</p>
    <p><strong>Placa-mãe:</strong> ${build.placaMae || "N/A"}</p>
    <p><strong>GPU:</strong> ${build.gpu || "N/A"}</p>
    <p><strong>RAM:</strong> ${build.ram || "N/A"}</p>
    <p><strong>Armazenamento:</strong> ${build.armazenamento || "N/A"}</p>
    <p><strong>Fonte:</strong> ${build.fonte || "N/A"}</p>
    <p><strong>Gabinete:</strong> ${build.gabinete || "N/A"}</p>
    <p><strong>Criado em:</strong> ${new Date(build.criadoEm).toLocaleString()}</p>
  </div>
  <div class="build-actions">
    <button class="delete-build-button" onclick="removeSavedBuild(${build.id})">Excluir</button>
  </div>
</div>

    `;

    buildsList.appendChild(buildItem);
  });
}

// Função para remover uma build salva
async function removeSavedBuild(buildId) {
  if (!buildId) {
    alert("Erro: ID da build inválido.");
    return;
  }

  try {
    const response = await fetch(`http://localhost:8080/api/build/${buildId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(`Erro ${response.status}: ${errorMessage}`);
    }

    alert("Build removida com sucesso!");
    const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
    if (loggedUser && loggedUser.id) {
      fetchSavedBuilds(loggedUser.id); // Atualiza a lista após a exclusão
    }
  } catch (error) {
    console.error("Erro ao remover a build:", error);
    alert("Erro ao remover a build. Tente novamente.");
  }
}


  




