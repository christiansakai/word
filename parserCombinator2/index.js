function failure(expected, actual) {
  return {
    isFailure: true,
    expected,
    actual,
  }
}

function success(data, rest) {
  return { data, rest }
}

function parse(parser, input) {
  const result = parser(input)
  if (result.isFailure) {
    throw new Error(`Parse error. Expected ${result.expected}. Instead found ${result.actual}`)
  }

  return result
}

function integer(input) {
  const match = /^\d+/.exec(input)

  if (match !== null) {
    const matchedText = match[0]
    const data = +matchedText
    const rest = input.slice(matchedText.length)

    return success(data, rest)
  }

  return failure('an integer', input)
}

function plus(input) {
  if (input[0] === '+') {
    return success('+', input)
  }

  return failure('+', input)
}
