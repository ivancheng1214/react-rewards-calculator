import { memo } from 'react'
import PropTypes from 'prop-types';

import './MonthlyTransactions.css';

function MonthlyTransactions({ transactions }) {
  return (
    <>
      {transactions.map(transaction => (
        <div key={transaction.date} className="transaction-item">
          <span>{transaction.date}</span>
          <span>{transaction.amount}$</span>
          <span>{transaction.point}</span>
        </div>
      ))}
    </>
  )
}

MonthlyTransactions.propTypes = {
  transactions: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string.isRequired,
      amount: PropTypes.number.isRequired,
      point: PropTypes.number.isRequired,
    })
  ).isRequired
}

export default memo(MonthlyTransactions);