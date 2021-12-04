import parseDescriptor from './src/descriptor.js'

/**
 * Parse section lines.
 *
 * "Format" descriptor (if there is one) specifies format for subsequent
 * lines in the same section.
 *
 * @arg {string[]} lines
 * @arg {Object} [options]
 * @return {Object}
 */
const parseSection = (lines, options = {}) => {
  // Format descriptor for subsequent section lines.
  let format = null

  return lines.flatMap(line => {
    const descriptor = parseDescriptor(line, format)
    if (!descriptor) {
      // Empty line.
      return null
    }

    if (descriptor.type === 'comment' && !options.comments) {
      return null
    }

    if (!format && descriptor.key === 'Format') {
      format = descriptor.value
    }

    return [descriptor]
  }).filter(descriptor => descriptor)
}

const parseAss = (text, options) => {
  text = text.toString()
  const sections = Array.from(text.matchAll(/^\s*\[(.*)\]\s*$/mg))

  return sections.map((section, index) => {
    const nextSection = sections[index + 1]
    const sectionName = section[1]

    const begin = section.index + section[0].length + 1
    const end = nextSection ? nextSection.index : text.length
    const lines = text.slice(begin, end).split('\n')

    return {
      section: sectionName,
      body: parseSection(lines, options)
    }
  })
}

export default parseAss
