import { render, fireEvent, waitFor, waitForElementToBeRemoved } from '@testing-library/react'
import App from './App'

describe('App Component', () => {
  it('should render list items', () => {
    const { getByText } = render(<App />)

    expect(getByText('Diego')).toBeInTheDocument()
    expect(getByText('Rodz')).toBeInTheDocument()
    expect(getByText('Mayk')).toBeInTheDocument()
  })

  it('should be able to add new item to list', async () => {
    const { getByText, getByPlaceholderText, findByText } = render(<App />)
    const inputElement = getByPlaceholderText('Novo Item')
    const addButton = getByText('Adicionar');

    fireEvent.change(inputElement, {target: {value: 'Novo'}})

    fireEvent(
      addButton,
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }),
    )

    expect(await findByText('Novo')).toBeInTheDocument()
  })

  it('should be able to remove item to list', async () => {
    const { getByText, getByPlaceholderText, getAllByText} = render(<App />)
    const inputElement = getByPlaceholderText('Novo Item')
    const removeButtons = getAllByText('Remover')

    fireEvent.change(inputElement, {target: {value: 'Novo'}})

    fireEvent(
      removeButtons[0],
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }),
    )

    await waitForElementToBeRemoved(() => {
      return getByText('Diego')
    })
  })
})