const where = (predicate) =>
	new Parser((stream) => {
		if (stream.length === 0) {
			return new Failure('unexpected end', stream)
		}

		const value = stream.head()
		if (predicate(value)) {
			return new Success(value, stream.move(1))
		}

		return new Failure('char did not match', stream)
	})

const char = c => where((x) => x === c)
