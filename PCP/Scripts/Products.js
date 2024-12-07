let currentPage = 0; // Página atual (começa em 0)
const pageSize = 10; // Tamanho da página

async function fetchProducts(tableName, page = 0) {
  try {
    const response = await fetch(
      `http://localhost:8080/api/components/${tableName}?page=${page}&size=${pageSize}`,
      {
        method: "GET",
        credentials: "include",
      }
    );

    if (!response.ok) {
      throw new Error(`Erro ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    renderProducts(data.content, tableName); // Renderiza os produtos com base no tipo da tabela
    renderPagination(data, tableName); // Atualiza os controles de paginação
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
    alert("Erro ao carregar produtos. Tente novamente mais tarde.");
  }
}

// Função principal para renderizar os produtos
function renderProducts(products, tableName) {
  switch (tableName) {
    case "cpus_detailed":
      renderCPUs(products);
      break;
    case "gpus_detailed":
      renderGPUs(products);
      break;
    case "cases_detailed":
      renderCases(products);
      break;
    case "cpu_coolers_detailed":
      renderCpuCoolers(products);
      break;
    case "memory_detailed":
      renderMemory(products);
      break;
    case "motherboards_detailed":
      renderMotherboards(products);
      break;
    case "power_supplies_detailed":
      renderPowerSupplies(products);
      break;
    case "storage_detailed":
      renderStorage(products);
      break;
    default:
      renderGenericProducts(products);
      break;
  }
}


function renderCPUs(products) {
  const tbody = document.querySelector(".products-list tbody");
  tbody.innerHTML = ""; // Limpa a tabela antes de renderizar os produtos

  if (products.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7">Nenhum produto encontrado</td></tr>`;
    return;
  }

  products.forEach((product) => {
    const data = product.data;
    const row = document.createElement("tr");

    // Verifique se o ID do produto está presente
    const productId = data.id || "N/A";
    const productTable = "cpus_detailed"; // Certifique-se de que o nome da tabela está correto
    const productPageUrl =
      productId !== "N/A"
        ? `productPage.html?tableName=${productTable}&id=${productId}`
        : "#";

    row.innerHTML = `
      <td style="text-align: left;">
        <a href="${productPageUrl}" 
           style="display: flex; align-items: center; text-decoration: none; color: inherit;">
          <img src="${data["Image URL"] || "default-image.jpg"}" 
               alt="${data.Name || "Sem imagem"}" 
               style="width: 50px; height: 50px; margin-right: 10px;" />
          <span>${data.Name || "Nome indisponível"}</span>
        </a>
      </td>
      <td>${data["Performance Core Clock"] || "N/A"}</td>
      <td>${data["Efficiency Core Clock"] || "N/A"}</td>
      <td>${data["L3 Cache"] || "N/A"}</td>
      <td>${data.TDP || "N/A"}</td>
      <td>${data["Integrated Graphics"] || "N/A"}</td>
      <td>
        <button class="action-button" onclick="handleAddToBuilder('${productId}', '${data.Name}', '${data["Image URL"]}', '${productTable}')">Adicionar</button>
      </td>
    `;

    tbody.appendChild(row);
  });
}


window.handleAddToBuilder = function(productId, productName, productImage, productTable) {
  if (!productId || !productName || !productImage || !productTable) {
    alert("Erro: Dados do produto incompletos.");
    return;
  }

  // Recupera o estado atual do builder ou inicializa um novo
  const builderParts = JSON.parse(localStorage.getItem("builderParts")) || {};

  // Adiciona ou atualiza a peça na categoria correspondente
  builderParts[productTable] = {
    id: productId,
    name: productName,
    image: productImage,
  };

  // Salva o estado atualizado no localStorage
  localStorage.setItem("builderParts", JSON.stringify(builderParts));

  // Confirma o sucesso e redireciona para o builder
  alert("Componente adicionado ao builder!");
  window.location.href = "builder.html";
};




function renderGPUs(products) {
  const tbody = document.querySelector(".products-list tbody");
  tbody.innerHTML = ""; // Limpa a tabela antes de renderizar os produtos

  if (products.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7">Nenhum produto encontrado</td></tr>`;
    return;
  }

  products.forEach((product) => {
    const data = product.data;
    const row = document.createElement("tr");

    row.innerHTML = `
      <td style="text-align: left; cursor: pointer;" onclick="redirectToProductPage('gpus_detailed', '${data.id || "N/A"}')">
        <img src="${data["Image URL"] || "default-image.jpg"}" alt="${data.Name || "Sem imagem"}" style="width: 50px; height: 50px;" />
        <span>${data.Name || "Nome indisponível"}</span>
      </td>
      <td>${data["Memory"] || "N/A"}</td>
      <td>${data["Memory Type"] || "N/A"}</td>
      <td>${data["Core Clock"] || "N/A"}</td>
      <td>${data.TDP || "N/A"}</td>
      <td>${data["Chipset"] || "N/A"}</td>
      <td>
        <button class="action-button" onclick="addToBuilder('gpus_detailed', '${data.id}', '${data.Name}', '${data["Image URL"] || "default-image.jpg"}')">Adicionar</button>
      </td>
    `;

    tbody.appendChild(row);
  });
}

// Função para adicionar uma peça ao builder
function addToBuilder(category, partId, partName, imageUrl) {
  const builderParts = JSON.parse(localStorage.getItem("builderParts")) || {};

  // Adiciona ou atualiza a peça no localStorage
  builderParts[category] = {
    id: partId,
    name: partName,
    image: imageUrl,
  };

  localStorage.setItem("builderParts", JSON.stringify(builderParts));
  alert(`${partName} foi adicionado ao builder com sucesso!`);
  window.location.href = "builder.html"; // Redireciona para a página do builder
}


// Função para redirecionar à página do produto específico
function redirectToProductPage(tableName, id) {
  if (id === "N/A") {
    alert("ID inválido. Não foi possível acessar o produto.");
    return;
  }
  window.location.href = `productPage.html?tableName=${tableName}&id=${id}`;
}


function renderCases(products) {
  const tbody = document.querySelector(".products-list tbody");
  tbody.innerHTML = ""; // Limpa a tabela antes de renderizar os produtos

  if (products.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6">Nenhum produto encontrado</td></tr>`;
    return;
  }

  products.forEach((product) => {
    const data = product.data;
    const row = document.createElement("tr");

    row.innerHTML = `
      <td style="text-align: left; cursor: pointer;" onclick="redirectToProductPage('cases_detailed', '${data.id || "N/A"}')">
        <img src="${data["Image URL"] || "default-image.jpg"}" alt="${data.Name || "Sem imagem"}" style="width: 50px; height: 50px;" />
        <span>${data.Name || "Nome indisponível"}</span>
      </td>
      <td>${data["Type"] || "N/A"}</td>
      <td>${data["Compatibility"] || "N/A"}</td>
      <td>${data["Material"] || "N/A"}</td>
      <td>${data["Dimensions"] || "N/A"}</td>
      <td>${data["Manufacturer"] || "N/A"}</td>
      <td>
        <button class="action-button" onclick="addToBuilder('cases_detailed', '${data.id}', '${data.Name}', '${data["Image URL"] || "default-image.jpg"}')">Adicionar</button>
      </td>
    `;

    tbody.appendChild(row);
  });
}

// Função para adicionar uma peça ao builder
function addToBuilder(category, partId, partName, imageUrl) {
  const builderParts = JSON.parse(localStorage.getItem("builderParts")) || {};

  // Adiciona ou atualiza a peça no localStorage
  builderParts[category] = {
    id: partId,
    name: partName,
    image: imageUrl,
  };

  localStorage.setItem("builderParts", JSON.stringify(builderParts));
  alert(`${partName} foi adicionado ao builder com sucesso!`);
  window.location.href = "builder.html"; // Redireciona para a página do builder
}



// Função para redirecionar à página do produto específico
function redirectToProductPage(tableName, id) {
  if (id === "N/A") {
    alert("ID inválido. Não foi possível acessar o produto.");
    return;
  }
  window.location.href = `productPage.html?tableName=${tableName}&id=${id}`;
}


function renderCpuCoolers(products) {
  const tbody = document.querySelector(".products-list tbody");
  tbody.innerHTML = ""; // Limpa a tabela antes de renderizar os produtos

  if (products.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6">Nenhum produto encontrado</td></tr>`;
    return;
  }

  products.forEach((product) => {
    const data = product.data;
    console.log("Dados do produto (CPU Coolers):", data); // Adicione aqui para verificar os dados
    const row = document.createElement("tr");

    row.innerHTML = `
      <td style="text-align: left; cursor: pointer;" onclick="redirectToProductPage('cpu_coolers_detailed', '${data.id || "N/A"}')">
        <img src="${data["Image URL"] || "default-image.jpg"}" alt="${data.Name || "Sem imagem"}" style="width: 50px; height: 50px;" />
        <span>${data.Name || "Nome indisponível"}</span>
      </td>
      <td>${data["Manufacturer"] || "N/A"}</td>
      <td>${data["Fan RPM"] || "N/A"}</td>
      <td>${data["Noise Level"] || "N/A"}</td>
      <td>${data["CPU Socket"] || "N/A"}</td>
      <td>${data["Color"] || "N/A"}</td>
      <td>
        <button class="action-button" onclick="addToBuilder('cpu_coolers_detailed', '${data.id}', '${data.Name}', '${data["Image URL"] || "default-image.jpg"}')">Adicionar</button>
      </td>
    `;

    tbody.appendChild(row);
  });
}

// Função para adicionar uma peça ao builder
function addToBuilder(category, partId, partName, imageUrl) {
  const builderParts = JSON.parse(localStorage.getItem("builderParts")) || {};

  // Adiciona ou atualiza a peça no localStorage
  builderParts[category] = {
    id: partId,
    name: partName,
    image: imageUrl,
  };

  localStorage.setItem("builderParts", JSON.stringify(builderParts));
  alert(`${partName} foi adicionado ao builder com sucesso!`);
  window.location.href = "builder.html"; // Redireciona para a página do builder
}


// Função para redirecionar à página do produto específico
function redirectToProductPage(tableName, id) {
  if (id === "N/A") {
    alert("ID inválido. Não foi possível acessar o produto.");
    return;
  }
  window.location.href = `productPage.html?tableName=${tableName}&id=${id}`;
}


function renderMemory(products) {
  const tbody = document.querySelector(".products-list tbody");
  tbody.innerHTML = ""; // Limpa a tabela antes de renderizar os produtos

  if (products.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6">Nenhum produto encontrado</td></tr>`;
    return;
  }

  products.forEach((product) => {
    const data = product.data;
    const row = document.createElement("tr");

    row.innerHTML = `
      <td style="text-align: left; cursor: pointer;" onclick="redirectToProductPage('memory_detailed', '${data.id || "N/A"}')">
        <img src="${data["Image URL"] || "default-image.jpg"}" alt="${data.Name || "Sem imagem"}" style="width: 50px; height: 50px;" />
        <span>${data.Name || "Nome indisponível"}</span>
      </td>
      <td>${data["Manufacturer"] || "N/A"}</td>
      <td>${data["Speed"] || "N/A"}</td>
      <td>${data["Form Factor"] || "N/A"}</td>
      <td>${data["Voltage"] || "N/A"}</td>
      <td>${data["Modules"] || "N/A"}</td>
      <td>
        <button class="action-button" onclick="addToBuilder('memory_detailed', '${data.id}', '${data.Name}', '${data["Image URL"] || "default-image.jpg"}')">Adicionar</button>
      </td>
    `;

    tbody.appendChild(row);
  });
}

// Função para adicionar uma peça ao builder
function addToBuilder(category, partId, partName, imageUrl) {
  const builderParts = JSON.parse(localStorage.getItem("builderParts")) || {};

  // Adiciona ou atualiza a peça no localStorage
  builderParts[category] = {
    id: partId,
    name: partName,
    image: imageUrl,
  };

  localStorage.setItem("builderParts", JSON.stringify(builderParts));
  alert(`${partName} foi adicionado ao builder com sucesso!`);
  window.location.href = "builder.html"; // Redireciona para a página do builder
}


// Função para redirecionar à página do produto específico
function redirectToProductPage(tableName, id) {
  if (id === "N/A") {
    alert("ID inválido. Não foi possível acessar o produto.");
    return;
  }
  window.location.href = `productPage.html?tableName=${tableName}&id=${id}`;
}


function renderMotherboards(products) {
  const tbody = document.querySelector(".products-list tbody");
  tbody.innerHTML = ""; // Limpa a tabela antes de renderizar os produtos

  if (products.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6">Nenhum produto encontrado</td></tr>`;
    return;
  }

  products.forEach((product) => {
    const data = product.data;
    const row = document.createElement("tr");

    row.innerHTML = `
      <td style="text-align: left; cursor: pointer;" onclick="redirectToProductPage('motherboards_detailed', '${data.id || "N/A"}')">
        <img src="${data["Image URL"] || "default-image.jpg"}" alt="${data.Name || "Sem imagem"}" style="width: 50px; height: 50px;" />
        <span>${data.Name || "Nome indisponível"}</span>
      </td>
      <td>${data["Socket/CPU"] || "N/A"}</td>
      <td>${data["Chipset"] || "N/A"}</td>
      <td>${data["Form Factor"] || "N/A"}</td>
      <td>${data["Manufacturer"] || "N/A"}</td>
      <td>${data["Onboard Video"] || "N/A"}</td>
      <td>
        <button class="action-button" onclick="addToBuilder('motherboards_detailed', '${data.id}', '${data.Name}', '${data["Image URL"] || "default-image.jpg"}')">Adicionar</button>
      </td>
    `;

    tbody.appendChild(row);
  });
}

// Função para adicionar uma peça ao builder
function addToBuilder(category, partId, partName, imageUrl) {
  const builderParts = JSON.parse(localStorage.getItem("builderParts")) || {};

  // Adiciona ou atualiza a peça no localStorage
  builderParts[category] = {
    id: partId,
    name: partName,
    image: imageUrl,
  };

  localStorage.setItem("builderParts", JSON.stringify(builderParts));
  alert(`${partName} foi adicionado ao builder com sucesso!`);
  window.location.href = "builder.html"; // Redireciona para a página do builder
}


function redirectToProductPage(tableName, id) {
  if (id === "N/A") {
    alert("ID inválido. Não foi possível acessar o produto.");
    return;
  }
  window.location.href = `productPage.html?tableName=${tableName}&id=${id}`;
}

function renderPowerSupplies(products) {
  const tbody = document.querySelector(".products-list tbody");
  tbody.innerHTML = ""; // Limpa a tabela antes de renderizar os produtos

  if (products.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6">Nenhum produto encontrado</td></tr>`;
    return;
  }

  products.forEach((product) => {
    const data = product.data;
    console.log("Dados do produto (Power Supplies):", data);

    const row = document.createElement("tr");

    row.innerHTML = `
      <td style="text-align: left; cursor: pointer;" onclick="redirectToProductPage('power_supplies_detailed', '${data.id || "N/A"}')">
        <img src="${data["Image URL"] || "default-image.jpg"}" alt="${data.Name || "Sem imagem"}" style="width: 50px; height: 50px;" />
        <span>${data.Name || "Nome indisponível"}</span>
      </td>
      <td>${data["Type"] || "N/A"}</td>
      <td>${data["Efficiency Rating"] || "N/A"}</td>
      <td>${data["Modular"] || "N/A"}</td>
      <td>${data["Wattage"] || "N/A"}</td>
      <td>${data["Manufacturer"] || "N/A"}</td>
      <td>
        <button class="action-button" onclick="addToBuilder('power_supplies_detailed', '${data.id}', '${data.Name}', '${data["Image URL"] || "default-image.jpg"}')">Adicionar</button>
      </td>
    `;

    tbody.appendChild(row);
  });
}

// Função para adicionar uma peça ao builder
function addToBuilder(category, partId, partName, imageUrl) {
  const builderParts = JSON.parse(localStorage.getItem("builderParts")) || {};

  // Adiciona ou atualiza a peça no localStorage
  builderParts[category] = {
    id: partId,
    name: partName,
    image: imageUrl,
  };

  localStorage.setItem("builderParts", JSON.stringify(builderParts));
  
  alert(`${partName} foi adicionado ao builder com sucesso!`);
  window.location.href = "builder.html"; // Redireciona para a página do builder
}


// Função para redirecionar à página do produto específico
function redirectToProductPage(tableName, id) {
  if (id === "N/A") {
    alert("ID inválido. Não foi possível acessar o produto.");
    return;
  }
  window.location.href = `productPage.html?tableName=${tableName}&id=${id}`;
}


function renderStorage(products) {
  const tbody = document.querySelector(".products-list tbody");
  tbody.innerHTML = ""; // Limpa a tabela antes de renderizar os produtos

  if (products.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6">Nenhum produto encontrado</td></tr>`;
    return;
  }

  products.forEach((product) => {
    const data = product.data;
    const row = document.createElement("tr");

    row.innerHTML = `
      <td style="text-align: left; cursor: pointer;" onclick="redirectToProductPage('storage_detailed', '${data.id || "N/A"}')">
        <img src="${data["Image URL"] || "default-image.jpg"}" alt="${data.Name || "Sem imagem"}" style="width: 50px; height: 50px;" />
        <span>${data.Name || "Nome indisponível"}</span>
      </td>
      <td>${data["Manufacturer"] || "N/A"}</td>
      <td>${data["Capacity"] || "N/A"}</td>
      <td>${data["Type"] || "N/A"}</td>
      <td>${data["Interface"] || "N/A"}</td>
      <td>${data["Cache"] || "N/A"}</td>
      <td>
        <button class="action-button" onclick="addToBuilder('storage_detailed', '${data.id}', '${data.Name}', '${data["Image URL"] || "default-image.jpg"}')">Adicionar</button>
      </td>
    `;

    tbody.appendChild(row);
  });
}

// Função para adicionar uma peça ao builder
function addToBuilder(category, partId, partName, imageUrl) {
  const builderParts = JSON.parse(localStorage.getItem("builderParts")) || {};

  // Adiciona ou atualiza a peça no localStorage
  builderParts[category] = {
    id: partId,
    name: partName,
    image: imageUrl,
  };

  localStorage.setItem("builderParts", JSON.stringify(builderParts));
  alert(`${partName} foi adicionado ao builder com sucesso!`);
  window.location.href = "builder.html"; // Redireciona para a página do builder
}


// Função para redirecionar à página do produto específico
function redirectToProductPage(tableName, id) {
  if (id === "N/A") {
    alert("ID inválido. Não foi possível acessar o produto.");
    return;
  }
  window.location.href = `productPage.html?tableName=${tableName}&id=${id}`;
}




// Função para tratar o clique no botão de ação
function handleAction(id) {
  if (id === "N/A") {
    alert("ID inválido. Não foi possível executar a ação.");
    return;
  }
  alert(`Ação executada para o item com ID: ${id}`);
}

// Função para renderizar os controles de paginação
function renderPagination(pagination, tableName) {
  const paginationContainer = document.querySelector(".pagination");
  paginationContainer.innerHTML = ""; // Limpa os controles de paginação

  const { totalPages, number } = pagination;

  // Botão "Anterior"
  if (number > 0) {
    const prevButton = document.createElement("button");
    prevButton.textContent = "Anterior";
    prevButton.onclick = () => fetchProducts(tableName, number - 1);
    paginationContainer.appendChild(prevButton);
  }

  // Número da página
  const pageNumber = document.createElement("span");
  pageNumber.textContent = `Página ${number + 1} de ${totalPages}`;
  paginationContainer.appendChild(pageNumber);

  // Botão "Próxima"
  if (number < totalPages - 1) {
    const nextButton = document.createElement("button");
    nextButton.textContent = "Próxima";
    nextButton.onclick = () => fetchProducts(tableName, number + 1);
    paginationContainer.appendChild(nextButton);
  }
}

// Inicializar ao carregar a página
document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const category = urlParams.get("category") || "cpus_detailed";
  fetchProducts(category, currentPage);
});

async function fetchTableHeaders(tableName) {
  try {
    // Mapeamento manual dos cabeçalhos por tipo de produto
    const tableHeaderMapping = {
      cpus_detailed: ['Nome', 'Clock de Performance', 'Clock de Eficiência', 'Cache L3', 'TDP', 'Gráficos Integrados'],
      gpus_detailed: ['Nome', 'Memória', 'Tipo de Memória', 'Clock Base', 'TDP', 'Chipset'],
      cases_detailed: ['Nome', 'Tipo', 'Compatibilidade', 'Material', 'Dimensões', 'Fabricante'],
      cpu_coolers_detailed: ['Nome', 'Fabricante', 'RPM do Ventilador', 'Nível de Ruído', 'Soquete CPU', 'Cor'],
      memory_detailed: ['Nome', 'Fabricante', 'Velocidade', 'Fator de Forma', 'Voltagem', 'Módulos'],
      motherboards_detailed: ['Nome', 'Socket/CPU', 'Chipset', 'Fator de Forma', 'Fabricante', 'Vídeo Integrado'],
      power_supplies_detailed: ['Nome', 'Tipo', 'Eficiência Energética', 'Modular', 'Potência', 'Fabricante'],
      storage_detailed: ['Nome', 'Fabricante', 'Capacidade', 'Tipo', 'Interface', 'Cache'],
    };
    
    // Pegando os cabeçalhos manualmente ou exibindo genérico caso não mapeado
    const headers = tableHeaderMapping[tableName] || ['Nome', 'Especificação 1', 'Especificação 2', 'Especificação 3', 'Especificação 4'];

    renderTableHeaders(headers);
  } catch (error) {
    console.error('Erro ao buscar cabeçalhos:', error);
    alert('Erro ao carregar cabeçalhos. Tente novamente mais tarde.');
  }
}

function renderTableHeaders(headers) {
  const thead = document.querySelector('.products-list thead');
  thead.innerHTML = ''; // Limpa o cabeçalho anterior

  const row = document.createElement('tr');
  headers.forEach((header) => {
    const th = document.createElement('th');
    th.textContent = header;
    row.appendChild(th);
  });

  // Adiciona a coluna para as ações
  const actionTh = document.createElement('th');
  actionTh.textContent = 'Ação';
  row.appendChild(actionTh);

  thead.appendChild(row);
}

// Chamada inicial
document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const category = urlParams.get('category') || 'default_table';

  // Buscar cabeçalhos e dados
  fetchTableHeaders(category);
  fetchProducts(category);
});







