// Função para manipular erros
export function handleError(res, error) {
  console.error(error); // Log do erro no console
  res.status(500).json({ error: error.message || 'An error occurred' });
}
