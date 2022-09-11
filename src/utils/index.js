/**
 *
 * @param amount
 * @returns the reward points by amount
 */
export function calcPointsPerTransaction(amount) {
  if (amount >= 50 && amount <= 100) {
    return amount - 50;
  } else if (amount > 100) {
    return (2 * (amount - 100) + 50);
  }
  return 0;
}

function getMonthYearFromDate(date) {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const [month, , year] = date.split('/');
  const monthIndex = parseInt(month, 10) - 1;

  return `${months[monthIndex]} ${year}`
}

/**
 *
 * @param rawData
 * @returns the object like below by aggregating the raw transactions
 * {
    user1: {
      "Dec 2021": {
        transactions: [...],
        monthPoints: X,
      },
      "Jan 2022": {
        transactions: [...],
        monthPoints: Y
      },
      ...
      totalPoints: Z,
    },
    user2: {
      ...
    },
 * }
 */
export function getTransactionsByUsers(rawData) {
  if (!rawData || !rawData.length) {
    return null;
  }

  return rawData.reduce((result, record) => {
    const { user, date, amount } = record;
    const mmYY = getMonthYearFromDate(date);
    const point = calcPointsPerTransaction(amount);
    const recordWithPoint = { ...record, point };
    const newMonthData = {
      transactions: [recordWithPoint],
      monthPoints: point,
    }

    // NOTE: If user data was found then
    if (result[user]) {
      const monthData = result[user][mmYY];

      // NOTE: if monthly data exits, add the new transaction to transactions array
      // And calculate the monthly total points by adding a new point.
      if (monthData) {
        const { transactions, monthPoints } = monthData;
        const updatedMonthData = {
          transactions: [...transactions, recordWithPoint],
          monthPoints: monthPoints + point,
        }

        return {
          ...result,
          [user]: {
            ...result[user],
            [mmYY]: updatedMonthData,
            totalPoints: result[user].totalPoints + point,
            counts: result[user].counts + 1,
            totalAmount: result[user].totalAmount + amount,
          }
        }
      }

      // NOTE: if monthly data doesn't exist, insert a new monthly data to the user data node.
      return {
        ...result,
        [user]: {
          ...result[user],
          [mmYY]: newMonthData,
          totalPoints: result[user].totalPoints + point,
          months: [...result[user].months, mmYY],
          counts: result[user].counts + 1,
          totalAmount: result[user].totalAmount + amount
        }
      }
    }

    // NOTE: if user data was not found, create a new user data node.
    return {
      ...result,
      [user]: {
        [mmYY]: newMonthData,
        totalPoints: point,
        months: [mmYY],
        counts: 1,
        totalAmount: amount,
      }
    }
  }, {})
}