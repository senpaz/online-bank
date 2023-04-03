const ERROR_CODES = {
  'EMAIL_NOT_FOUND': 'Email not found',
  'INVALID_PASSWORD': 'Invalid password',
  'EMAIL_EXISTS': 'Email already exists'
}
export function error(code){
  return ERROR_CODES[code] || 'Unknown error'
}
