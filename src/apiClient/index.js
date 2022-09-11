import transactionData from './mockData';

/**
 * Api function that returns the mock data
 * @returns mock data after 0.5 seconds(deliberately delayed 0.5 seconds)
 */
export function fetchTransactionData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(transactionData)
    }, 500);
  })
}