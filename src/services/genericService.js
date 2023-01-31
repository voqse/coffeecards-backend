export default function createService(Model) {
  function get(id) {
    return Model.findById(id)
  }

  function getAll(filter) {
    return Model.find(filter)
  }

  function create(item) {
    const newItem = new Model(item)
    return newItem.save()
  }

  function update(id, item) {
    // TODO: Check user permission.
    return Model.findByIdAndUpdate(id, item)
  }

  function remove(id) {
    // TODO: Check user permission.
    return Model.findByIdAndDelete(id)
  }

  return {
    get,
    getAll,
    create,
    update,
    remove,
  }
}
