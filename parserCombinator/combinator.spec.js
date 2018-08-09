const {
  char,
  sequence,
  either,
} = require('./combinator')

describe('combinator', () => {
  describe('char', () => {
    it('success', () => {
      const string = 'abc'
      const parse = char('a')

      const result = parse(string)

      expect(result).toMatchObject({
        success: true,
        rest: 'bc',
      })
    })

    it('failure', () => {
      const string = 'bca'
      const parse = char('a')

      const result = parse(string)

      expect(result).toMatchObject({
        success: false,
        rest: 'bca',
      })
    })
  })

  describe('sequence', () => {
    it('success', () => {
      const string = 'abc'
      const parse = sequence([
        char('a'), 
        char('b'),
      ])

      const result = parse(string)

      expect(result).toMatchObject({
        success: true,
        rest: 'c',
      })
    })

    it('failure', () => {
      const string = 'abc'
      const parse = sequence([
        char('a'), 
        char('c'),
      ])

      const result = parse(string)

      expect(result).toMatchObject({
        success: false,
        rest: 'bc',
      })
    })
  })

  describe('either', () => {
    it('success', () => {
      const string = 'abc'
      const parse = either([
        char('1'), 
        char('a'),
      ])

      const result = parse(string)

      expect(result).toMatchObject({
        success: true,
        rest: 'bc',
      })
    })

    it('failure', () => {
      const string = 'abc'
      const parse = either([
        char('1'), 
        char('2'),
      ])

      const result = parse(string)

      expect(result).toMatchObject({
        success: false,
        rest: 'abc',
      })
    })
  })
})
