import { memo } from 'react';
import PropTypes from 'prop-types';

import './UsersOverview.css';

function UsersOverview({ users, data, onSelectUser }) {
  return (
    <div className="users-overview">
      <div className="users-overview-header" data-testid="users-overview-header">
        Overview
      </div>
      <table className='custom-table' data-testid="users-overview-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Transactions</th>
            <th>Total Amount($)</th>
            <th>Points</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user} role="user-item">
              <td>{index + 1}</td>
              <td>{user}</td>
              <td>{data[user].counts}</td>
              <td>{data[user].totalAmount}</td>
              <td>{data[user].totalPoints}</td>
              <td>
                <button className="custom-button" onClick={() => onSelectUser(user)}>View</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

UsersOverview.propTypes = {
  users: PropTypes.arrayOf(PropTypes.string).isRequired,
  data: PropTypes.shape({}).isRequired,
  onSelectUser: PropTypes.func.isRequired,
}

export default memo(UsersOverview)