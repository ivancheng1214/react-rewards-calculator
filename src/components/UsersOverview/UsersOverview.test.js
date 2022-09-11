import { render, screen, } from '@testing-library/react';

import UsersOverview from './UsersOverview';

import mockData from '../../apiClient/mockData';
import { getTransactionsByUsers } from '../../utils';

test('renders overview table', () => {

  const data = getTransactionsByUsers(mockData);
  const users = Object.keys(data);
  const eventHandler = jest.fn();

  render(<UsersOverview users={users} data={data} onSelectUser={eventHandler} />);

  const headerElem = screen.getByTestId('users-overview-header');
  const tableElem = screen.getByTestId('users-overview-table');
  const userElems = screen.getAllByRole('user-item');

  expect(headerElem).toHaveTextContent('Overview');
  expect(tableElem).toBeInTheDocument();
  expect(userElems).toBeTruthy();
});

