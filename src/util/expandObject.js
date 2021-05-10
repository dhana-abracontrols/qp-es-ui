const DEFAULT = {
  recurse: true,
  fullLabel: true,
  separator: '.'
}

/**
 * Recursive helper function of `expandObject`.
 *
 * @param {Object} [object={}] Expandee
 * @param {String} [heading=''] Usually property name
 * @param {Object} [options]
 * @param {Boolean} [options.recurse=true] Whether or not objects found in the
 * expandee should be expanded
 * @param {Boolean} [options.fullLabel=true] Whether or not to keep the full
 * label trail on recursion
 * @returns {Object[]} Array of `label`/`value` mappings from the expandee.
 */
const expander = (object, heading = '', options) => {
  const entries = []
  const words = Object.keys(object || {})

  words.forEach((word) => {
    const label = heading
      ? `${heading}${options.separator}${word}`
      : `${word}`
    const value = object[word]

    if (value && typeof value === 'object' && options.recurse) {
      const expansion = (options.fullLabel)
        ? expander(value, label, options)
        : expander(value, word, options)
      entries.push(...expansion)
    } else {
      entries.push({ label, value })
    }
  })

  return entries
}

/**
 * Given an object, expand its properties once or recursively until the
 * remaining properties are all primative.
 *
 * @example
 * const test = { a: { b: 1 }, c: 2 }
 * expandObject(test, 'test')
 * // [ { label: 'test.a.b', value: 2 }, { label: 'test.c', value: 2 } ]
 * expandObject(test, 'test', { fullLabel: false })
 * // [ { label: 'a.b', value: 2 }, { label: 'test.c', value: 2 } ]
 * expandObject(test.a)
 * // [ { label: 'b', value: 2 } ]
 *
 * @param {Object} [object={}] Expandee
 * @param {String} [heading=''] Usually property name
 * @param {Object} [options]
 * @param {Boolean} [options.recurse=true] Whether or not objects found in the
 * expandee should be expanded
 * @param {Boolean} [options.fullLabel=true] Whether or not to keep the full
 * label trail on recursion
 * @returns {Object[]} Array of `label`/`value` mappings from the expandee.
 */
const expandObject = (object, heading = '', _options = {}) => {
  const options = Object.assign({}, DEFAULT, _options)
  return expander(object, heading, options)
}

export default expandObject
