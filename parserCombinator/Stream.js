class Stream {
  constructor(iterable, cursor, length) {
    this.iterable = iterable
    this.cursor = cursor
		this.length = typeof length === 'undefined'
			? iterable.length - this.cursor
			: length
  }

	head() {
		if (this.length <= 0) {
			throw new TypeError('index out of range')
		}

		return this.iterable[this.cursor]
	}

	move(distance) {
		return new Stream(
			this.iterable,
			this.cursor + distance,
			this.length - distance,
		)
	}

	slice(start, stop) {
		if (stop < start) {
			throw new Error('stop < start')
		}

		if (stop && stop > this.length) {
			throw new Error('index out of range')
		}

		return new Stream(
			this.iterable,
			this.cursor + start,
			(stop || this.length) - start,
		)
	}
}
