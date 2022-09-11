import { memo } from 'react';
import PropTypes from 'prop-types';

import MonthlyTransactions from './MonthlyTransactions';
import './UserTransactions.css';

function UserTransactions({ user, data }) {
  const { months } = data;

  return (
    <div className="user-transactions">
      <div className="user-transactions-header" data-testid="user-transactions-header">
        {user}'s Transactions
      </div>
      <table className="custom-table" data-testid="user-transactions-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Month/Year</th>
            <th>Transactions</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>
          {months.map((month, index) => (
            <tr key={month} role="monthly-item">
              <td>{index + 1}</td>
              <td>{month}</td>
              <td>
                <MonthlyTransactions
                  transactions={data[month].transactions}
                />
              </td>
              <td>{data[month].monthPoints}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

UserTransactions.propTypes = {
  user: PropTypes.string.isRequired,
  data: PropTypes.shape({
    months: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
}

export default memo(UserTransactions);