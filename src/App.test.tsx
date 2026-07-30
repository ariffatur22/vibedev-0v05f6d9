import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'

test('renders main heading', () => {
  render(<App />)
  expect(screen.getByRole('heading', { name: /Find the best light for your indoor plant/i })).toBeInTheDocument()
})

test('shows result after selecting plant direction and distance', async () => {
  const user = userEvent.setup()
  render(<App />)

  await user.click(screen.getByRole('button', { name: /Select Pothos/i }))
  await user.click(screen.getByRole('button', { name: /Choose East window/i }))
  await user.click(screen.getByRole('button', { name: /Select Mid-Room/i }))

  expect(screen.getByText(/Estimated light level/i)).toBeInTheDocument()
  expect(screen.getByText(/Pothos thrives in indirect light and tolerates low-light corners./i)).toBeInTheDocument()
})
