import { isObject } from '../utils.js'

export default function createService(Model) {
  function get(filter) {
    return isObject(filter) ? Model.find(filter) : Model.findById(filter)
  }

  function create(item) {
    const newItem = new Model(item)
    return newItem.save()
  }

  function update(filter, item) {
    return isObject(filter)
      ? Model.findOneAndUpdate(filter, item)
      : Model.findByIdAndUpdate(filter, item)
  }

  function remove(filter) {
    return isObject(filter)
      ? Model.findOneAndRemove(filter)
      : Model.findByIdAndRemove(filter)
  }

  return {
    get,
    create,
    update,
    remove,
  }
}
