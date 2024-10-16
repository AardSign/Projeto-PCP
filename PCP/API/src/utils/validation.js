// Função para validar e-mail
export function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
}

// Função para validar senha (mínimo de 6 caracteres)
export function validatePassword(password) {
  return password.length >= 6;
}

// Função para validar ID
export function validateId(id) {
  return Number.isInteger(parseInt(id)) && parseInt(id) > 0;
}
