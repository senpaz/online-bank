const ERROR_CODES = {
  'EMAIL_NOT_FOUND': 'Email не найден',
  'INVALID_PASSWORD': 'Неверный пароль',
  'EMAIL_EXISTS': 'Email уже существует',
  'auth': 'Необходимо авторизоваться'
}
export function error(code){
  return ERROR_CODES[code] || 'Неизвестная ошибка'
}
