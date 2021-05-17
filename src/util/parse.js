/*
    parse the source data to create json array
    create header for the excel file
*/

const keyify = (obj, prefix = '') =>
  Object.keys(obj).reduce((res, el) => {
    if (Array.isArray(obj[el])) {
      for (var i = 0; i < obj[el].length; i++) {
        res = [...res, ...keyify(obj[el][i], prefix + el + '.' + i + '.')]
      }
      return res
    } else if (typeof obj[el] === 'object' && obj[el] !== null) {
      return [...res, ...keyify(obj[el], prefix + el + '.')]
    }
    return [...res, prefix + el]
  }, [])

const leaf = (obj, path) => (path.split('.').reduce((value, el) => value && value[el], obj))

const sorted = (obj) => Object.keys(obj)
  .sort()
  .reduce((acc, key) => ({
    ...acc, [key]: obj[key]
  }), {})

const parse = async (source) => {
  if (source.length > 1) {
    let keys = keyify(source[0])

    let wellData = []
    let headerKeys = {}
    keys.forEach((k) => {
      if (k.includes('label')) {
        // keys.push(leaf(source[0],k))
        if (!(leaf(source[0], k) in headerKeys)) { headerKeys[leaf(source[0], k)] = leaf(source[0], k) }
      } else if (!k.includes('value') && !k.includes('label')) {
        k = k.replace('attributes.', '')
        k = k.replace('wellData.', '')
        if (!(k in headerKeys)) { headerKeys[k] = k }
      }
    })
    console.log(sorted(headerKeys))
    for (var i = 0; i < source.length; i++) {
      let well = {}
      keys.forEach((k) => {
        if (k.includes('label')) {
          let value = k.replace('label', 'value')
          if (!(leaf(source[i], k) in well)) { well[leaf(source[i], k)] = leaf(source[i], value) }
        } else if (!k.includes('value') && !k.includes('label')) {
          // console.log(k + '-'+ leaf(source[i],k))
          let modified = k.replace('attributes.', '')
          modified = modified.replace('wellData.', '')
          if (!(modified in well)) { well[modified] = leaf(source[i], k) }
        }
      })
      // console.log(sorted(well))
      wellData.push(sorted(well))
    }
    wellData.unshift(sorted(headerKeys))
    console.log(wellData[1])
    return wellData
  } else {
    let keys = keyify(source)

    let wellData = []
    let headerKeys = {}
    keys.forEach((k) => {
      if (k.includes('label')) {
        // keys.push(leaf(source[0],k))
        if (!(leaf(source, k) in headerKeys)) { headerKeys[leaf(source, k)] = leaf(source, k) }
      } else if (!k.includes('value') && !k.includes('label')) {
        k = k.replace('attributes.', '')
        k = k.replace('wellData.', '')
        if (!(k in headerKeys)) { headerKeys[k] = k }
      }
    })
    console.log(Object.keys(headerKeys).length)

    let well = {}
    keys.forEach((k) => {
      if (k.includes('label')) {
        let value = k.replace('label', 'value')
        if (!(leaf(source, k) in well)) { well[leaf(source, k)] = leaf(source, value) }
      } else if (k.includes('wellData') && source['wellData.Region'] === 'SK') {
        let modified = k.replace('wellData.', '')
        // console.log(source['wellData'][modified])
        //  let k1='wellData'+modified
        if (!(k in well)) { well[modified] = source['wellData'][modified] }
      } else if (k.includes('attributes')) {
        let modified = k.replace('attributes.', '')
        if (!(k in well)) { well[modified] = leaf(source, k) }
      } else if (!(k.includes('value'))) {
        if (!(k in well)) { well[k] = leaf(source, k) }
      }
    })
    console.log(Object.keys(well).length)
    wellData.push(sorted(well))
    wellData.unshift(sorted(headerKeys))
    console.log(wellData[1])
    return wellData
  }
}
export default parse
