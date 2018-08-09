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

function plusExpr(input) {
	const result1 = integer(input)
	if (result1.isFailure) return result1

	const { data: int1, rest: input1 } = result1

	const result2 = integer(input2)
	if (result2.isFailure) return result2

	const { rest: input2 } = result2 

	const result3 = integer(input2)
	if (result3.isFailure) return result3

	const { data: int2, rest: input3 } = result3

	if (input3.length > 0) {
		return failure('end of input', input3)
	}

	return success(int1 + int2, input3)
}

function text(match) {
	return function textParser(input) {
		if (input.startsWith(match)) {
			return success(match, input.slice(match.length))
		}

		return failure(`'${match}'`, input)
	}
}

function regex(regex) {
	const anchoredRegex = new RegExp(`^${regex.source}`)

	return function regexParser(input) {
		const match = anchoredRegex.exec(input)
		if (match != null) {
		}
	}
}
