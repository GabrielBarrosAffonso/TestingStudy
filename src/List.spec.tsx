import { render, fireEvent, waitFor, waitForElementToBeRemoved, screen } from '@testing-library/react'
import List from '../src/components/List'

describe('App Component', () => {
  it('should render list items', async () => {
    const { getByText } = render(<List initialItems={['Diego', 'Rodz', 'Mayk']}/>)

    expect(getByText('Diego')).toBeInTheDocument()
    expect(getByText('Rodz')).toBeInTheDocument()
    expect(getByText('Mayk')).toBeInTheDocument()
  })

  it('should be able to add new item to list', async () => {
    const { getByText, getByPlaceholderText, findByText } = render(<List initialItems={[]}/>)
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
    const { getByText, getByPlaceholderText, getAllByText} = render(<List initialItems={['Diego']}/>)
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