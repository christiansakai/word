class Result {
	constructor(value, rest) {
		this.value = value
		this.rest = rest
	}
}

class Success extends Result {
	map(func) {
		return new Success(func(this.value), this.rest)
	}

	bimap(s, f) {
		return new Success(s(this.value), this.rest)
	}

	chain(f) {
		return f(this.value, this.rest)
	}

	fold(s, f) {
		return s(this.value, this.rest)
	}
}

class Failure extends Result {
	map() { 
		return this 
	}

	bimap(s, f) {
		return new Failure(f(this.value), this.rest)
	}

	chain(f) {
		return this
	}

	fold(s, f) {
		return f(this.value, this.rest)
	}
}
