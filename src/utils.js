export function isNumber(subject) {
  return typeof subject === 'number'
}

export function isObject(subject) {
  return Object.prototype.toString.call(subject) === '[object Object]'
}
