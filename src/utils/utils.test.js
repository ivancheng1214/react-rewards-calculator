
import { calcPointsPerTransaction } from './';
test('calculate rewards point per transaction', () => {
  expect(calcPointsPerTransaction(120)).toBe(90)
  expect(calcPointsPerTransaction(50)).toBe(0)
  expect(calcPointsPerTransaction(100)).toBe(50)
})
