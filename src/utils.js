export function isObject(subject) {
  return Object.prototype.toString.call(subject) === '[object Object]'
}

export function objectsMergeDeep(objectA, objectB) {
  return [objectA, objectB].reduce((mergedObjects, currentObject) => {
    Object.keys(currentObject).forEach((key) => {
      const valueA = mergedObjects[key]
      const valueB = currentObject[key]
      const areObjects = isObject(valueA) && isObject(valueB)

      mergedObjects[key] = areObjects
        ? objectsMergeDeep(valueA, valueB)
        : valueB
    })
    return mergedObjects
  }, {})
}
