// Função para formatar um nome de componente
export function formatComponentName(name) {
  return name.trim().toLowerCase();
}

// Função para formatar dados de resposta
export function formatResponse(data) {
  return {
      success: true,
      data,
  };
}
