import { render, screen, } from '@testing-library/react';

import UserTransactions from './UserTransactions';

import mockData from '../../apiClient/mockData';
import { getTransactionsByUsers } from '../../utils';

test('renders overview table', () => {

  const allTransactions = getTransactionsByUsers(mockData);
  const users = Object.keys(allTransactions);
  const user = users[0];
  const userTransactions = allTransactions[user];

  render(<UserTransactions user={user} data={userTransactions} />);

  const headerElem = screen.getByTestId('user-transactions-header');
  const tableElem = screen.getByTestId('user-transactions-table');
  const userElems = screen.getAllByRole('monthly-item');

  expect(headerElem).toHaveTextContent(`${user}'s Transactions`);
  expect(tableElem).toBeInTheDocument();
  expect(userElems).toBeTruthy();
});

