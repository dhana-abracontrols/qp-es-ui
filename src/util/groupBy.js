
/* module for groupping objects */

function groupBy (list, keyGetter) {
  const map = new Map()
  list.forEach((item) => {
    let key = keyGetter(item)
    const collection = map.get(key)
    if (!collection) {
      map.set(key, [item])
    } else {
      collection.push(item)
    }
  })

  return map
}
export default groupBy
