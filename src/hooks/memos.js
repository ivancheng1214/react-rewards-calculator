import { useMemo } from "react";
import { getTransactionsByUsers } from "../utils";

export function useMemoGetTransactionsByUsers(transactions) {
  return useMemo(() => {
    if (!transactions) {
      return {};
    }

    const transactionsByUsers = getTransactionsByUsers(transactions);
    const users = Object.keys(transactionsByUsers);

    // NOTE: sort users by its total rewards point
    users.sort((a, b) => {
      return transactionsByUsers[b].totalPoints - transactionsByUsers[a].totalPoints
    });

    return {
      users,
      transactionsByUsers
    }
  }, [transactions])
}