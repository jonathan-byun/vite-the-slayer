import { useEffect, useReducer, useState } from 'react'
import './App.css'
import Intro from './gameStates/Intro'
import { deckReducer } from './providers/Reducer'
import { DeckContext, DeckDispatchContext, PlayerContext } from './providers/Providers'
import { createMap, createMapNode } from './gamelogic/createMap'
import Map from './components/map/Map'
import Event from './gameStates/Event'
import { applyVulnerable } from './gamelogic/statusEffects'
import { StatusNames } from './enums/gameEnums'
import { playerStartingCards } from './deck/cards'
import { Toaster } from 'react-hot-toast'




function App() {
  const [gameState, setGameState] = useState('event')
  const initialDeckState: DeckState = playerStartingCards
  const [deck, dispatchDeck] = useReducer(deckReducer, initialDeckState)
  const [map, setMap] = useState<MapNode[][]>()
  const [currentNode, setCurrentNode] = useState<MapNode>()
  const [player, setPlayer] = useState<Player>({
    health: 40,
    maxHealth: 50,
    stamina: 3,
    maxStamina:3,
    block: 0,
    incomingDamageMultiplier: 1,
    outGoingDamageMultiplier: 1,
    outGoingFlatDamage: 0,
    statuses: [{ name: StatusNames.VULNERABLE, turns: 1, effect:applyVulnerable}]
  })

  let currentPage;
  switch (gameState) {
    case 'title':
      currentPage = <Intro setGameState={setGameState} />
      break;
    case 'map':
      if (currentNode) currentPage = <Map setGameState={setGameState} currentNode={currentNode} setCurretNode={setCurrentNode} levels={map ? map : [[]]} />
      break;
    case 'event':
      currentPage = <Event />
  }

  useEffect(() => {
    startMap()
  }, [])
  function startMap() {
    const map = createMap()
    const startingNode = createMapNode(0, 0, 0, null)
    for (let i = 0; i < map[0].length; i++) {
      startingNode.next.push(map[0][i])
    }
    setMap(map)
    setCurrentNode(startingNode)
  }

  return (
    <>
      <DeckContext.Provider value={deck}>
        <DeckDispatchContext.Provider value={dispatchDeck}>
          <PlayerContext.Provider value={{player,setPlayer}}>
            <Toaster position='top-center' reverseOrder={false} />
            <div className='relative flex flex-col justify-center items-center w-screen h-screen overflow-hidden'>
              <img src="/background.png" alt="background" className='absolute w-screen h-screen object-fill top-0 left-0 -z-10' />
              {currentPage}
            </div>
          </PlayerContext.Provider>
        </DeckDispatchContext.Provider>
      </DeckContext.Provider>
    </>
  )
}

export default App
