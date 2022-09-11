import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';

import App from './App';

test('renders app container with loading text', () => {
  render(<App />);

  const appContainerElem = screen.getByTestId('app');
  const loadingElem = screen.getByTestId('loading');

  expect(appContainerElem).toBeInTheDocument();
  expect(loadingElem).toBeInTheDocument();
});

test('renders app content after fetching data', async () => {
  render(<App />);

  await waitForElementToBeRemoved(() => screen.queryByText(/Loading/i));

  const contentElem = screen.getByTestId('content');
  expect(contentElem).toBeInTheDocument();
});