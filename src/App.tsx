import { useState } from "react"

function App() {
  const [newItem, setNewItem] = useState('')
  const [list, setList] = useState(['Diego', 'Rodz', 'Mayk'])

  function addToList() {
    setTimeout(() => {
      setList(state => [...state, newItem])
    }, 500)
  }

  function removeFromList(item: string) {
    setTimeout(() => {
      setList(state => state.filter(item => item != item))
    }, 500)
  }

  return (
    <div className="App">
      <h1>Hello World</h1>
      <input placeholder="Novo Item" value={newItem} onChange={e => setNewItem(e.target.value)} />
      <button onClick={addToList}>Adicionar</button>
      <ul>
        {
          list.map((item) => {
          return(
            <li key={item}>
              {item}
              <button onClick={() => removeFromList(item)}>Remover</button>  
            </li>

            )
        })
        }
      </ul>
    </div>
  )
}

export default App
