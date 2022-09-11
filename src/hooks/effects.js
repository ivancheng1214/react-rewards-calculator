import { useState, useEffect } from "react";

import { fetchTransactionData } from "../apiClient";

/**
 *
 * custom useEffect hook that deals with fetching transactions from mock api
 * refer apiClient/index.js
 * @returns api response
 *
 */
export function useFetchTransactionData() {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      let response;
      try {
        response = await fetchTransactionData();
      } catch (e) {
        console.error('api call failed');
      }

      setData(response);
    }

    fetchData();
  }, []);

  return data;
}