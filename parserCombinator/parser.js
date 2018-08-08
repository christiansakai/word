/**
 * Parse a character
 */
const char = (char) => (string) => {
  if (string[0] === char) {
    return {
      success: true,
      rest: string.slice(1),
    }
  }

  return {
    success: false,
    rest: string,
  }
}

/**
 * Run a sequence of parsers
 * until it fails
 */
const sequence = (parses) => (string) => {
  let next = string

  for (let i = 0; i < parses.length; i++) {
    const parse = parses[i]
    const { success, rest } = parse(next)

    if (!success) {
      return { success, rest }
    }

    next = rest
  }

  return {
    success: true,
    rest: next,
  }
}

/**
 * Tries each of the parsers until
 * one of it works or the whole things fails
 */
const either = (parses) => (string) => {
  for (let i = 0; i < parses.length; i++) {
    const parse = parses[i]
    const { success, rest } = parse(string)

    if (success) {
      return { success, rest }
    }
  }

  return {
    success: false,
    rest: string,
  }
}

module.exports = {
  char,
  sequence,
  either,
}
