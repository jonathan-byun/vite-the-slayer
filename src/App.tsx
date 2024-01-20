import { useEffect, useReducer, useState } from 'react'
import './App.css'
import Intro from './gameStates/Intro'
import { deckReducer } from './providers/Reducer'
import { DeckContext, DeckDispatchContext } from './providers/Providers'
import { createMap, createMapNode } from './gamelogic/createMap'
import Map from './components/Map'

function App() {
  const [gameState, setGameState] = useState('title')
  const initialDeckState: DeckState = []
  const [deck, dispatchDeck] = useReducer(deckReducer, initialDeckState)
  const [map, setMap] = useState<MapNode[][]>()
  const [currentNode,setCurrentNode] = useState<MapNode>()

  let currentPage;
  switch (gameState) {
    case 'title':
      currentPage = <Intro setGameState={setGameState} />
      break;
    case 'map' :
    if(currentNode) currentPage = <Map currentNode={currentNode} setCurretNode={setCurrentNode} levels={map? map:[[]]}/>
  }

  useEffect(() => {
    startMap()
  },[])
  function startMap() {
    const map = createMap()
    const startingNode = createMapNode(0,0,0,null)
    for (let i=0; i<map[0].length;i++) {
      startingNode.next.push(map[0][i])
    }
    setMap(map)
    setCurrentNode(startingNode)
  }

  return (
    <>
      <DeckContext.Provider value={deck}>
        <DeckDispatchContext.Provider value={dispatchDeck}>
          <div className='relative w-full h-screen flex flex-col justify-center items-center'>
            <img src="/background.png" alt="background" className='absolute object-fill w-full h-screen top-0 left-0 -z-10' />
            {currentPage}
          </div>
        </DeckDispatchContext.Provider>
      </DeckContext.Provider>
    </>
  )
}

export default App
