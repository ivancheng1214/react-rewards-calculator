import { useState, useCallback } from 'react';

import { useFetchTransactionData } from './hooks/effects';
import { useMemoGetTransactionsByUsers } from './hooks/memos';

import UsersOverview from './components/UsersOverview';
import UserTransactions from './components/UserTransactions';

import './App.css';


function App() {
  const [selectedUser, setSelectedUser] = useState('');

  const transactions = useFetchTransactionData();
  const { users, transactionsByUsers } = useMemoGetTransactionsByUsers(transactions);

  const handleSelectUser = useCallback(user => {
    setSelectedUser(user);
  }, [])

  return (
    <div className="app" data-testid="app">
      {transactions ? (
        <div className="content" data-testid="content">
          <UsersOverview users={users} data={transactionsByUsers} onSelectUser={handleSelectUser} />
          {selectedUser &&
            <UserTransactions user={selectedUser} data={transactionsByUsers[selectedUser]} />
          }
        </div>
      )
        : <div data-testid="loading">Loading...</div>}
    </div>
  );
}

export default App;
