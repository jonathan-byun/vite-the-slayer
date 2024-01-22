import { FC, useContext, useEffect, useState } from 'react'
import { DeckContext, PlayerContext } from '../../providers/Providers'
import { determineMob } from './mobs'
import Card from '../deck/Card'
import { shuffleDeck } from '../../gamelogic/deckActions'
import { TargetTypes } from '../../enums/gameEnums'

interface MobEventProps {

}

const MobEvent: FC<MobEventProps> = ({ }) => {
    const playerContext = useContext(PlayerContext)
    const deck = useContext(DeckContext)
    const [mob, setMob] = useState<Mob>()
    const [playersTurn, setPlayersTurn] = useState(true)
    const [hand, setHand] = useState<Card[]>()
    const [localDeck, setLocalDeck] = useState(deck)
    const [discard, setDiscard] = useState<Card[]>()
    const [selectedCardIndex, setSelectedCardIndex] = useState<number | null>(null)
    const player = playerContext!.player
    const healthPercentage = player.health * 100 / player.maxHealth
    const targetable = selectedCardIndex!=null ? hand![selectedCardIndex].target: TargetTypes.NONE
    useEffect(() => {
        setMob(determineMob(1))
        const nextDeck = [...deck!]
        shuffleDeck(nextDeck)
        const nextHand = nextDeck.splice(0, 5)
        setHand(nextHand)
        setLocalDeck(nextDeck)
    }, [])

    function playCardOnTarget(target:Mob|Player){
        if(!hand||selectedCardIndex==null) return
        const card = hand[selectedCardIndex]
        const updatedTarget = card.effect(target)
        if (card.target===TargetTypes.ENEMY) {
            setMob(updatedTarget)
            playerContext?.setPlayer({...player,stamina:player.stamina-card.cost})
        }
        if (card.target===TargetTypes.SELF) {
            updatedTarget.stamina=updatedTarget.stamina-card.cost
            playerContext?.setPlayer(updatedTarget)
        }
    }

    function selectCard(index: number) {
        if (selectedCardIndex === index) {
            setSelectedCardIndex(null)
        } else {
            setSelectedCardIndex(index)
        }
    }
    return <>
        <div className='absolute left-96 top-96 max-w-96'>
            <div className='flex flex-wrap gap-2'>
                {player.statuses.map((status) => {
                    return (
                        <p key={status.name} className='bg-white'>{status.name}: {status.turns}</p>
                    )
                })}
            </div>
            <div className='flex justify-center items-center rounded-full bg-blue-500 w-10 h-10 my-1'>
               <p className='text-bold text-yellow-500 text-2xl'>{player.stamina}</p> 
            </div>
            <div className='flex items-center bg-white rounded relative text-center'>
                <p className='absolute left-1/3'>{player.health}/{player.maxHealth}</p>
                <div className={'bg-green-600 h-6 rounded '} style={{ width: `${healthPercentage}%` }}>
                </div>
            </div>
            <img src='/mainChar.gif' className='w-80 h-80' />
        </div>
        {mob &&
            <div className='absolute right-96 top-96 max-w-96'>
                <div className='flex flex-wrap gap-2'>
                    {mob.statuses.map((status) => {
                        return (
                            <p key={status.name} className='bg-white'>{status.name}: {status.turns}</p>
                        )
                    })}
                </div>
                <div className='flex items-center bg-white rounded relative text-center'>
                    <p className='absolute left-1/3'>{mob.health}/{mob.maxHealth}</p>
                    <div className={'bg-green-600 h-6 rounded '} style={{ width: `${healthPercentage}%` }}>
                    </div>
                </div>
                <button onClick={()=>playCardOnTarget(mob)} disabled={targetable!=TargetTypes.ENEMY} className={'border-2 border-transparent ' + (targetable==TargetTypes.ENEMY && 'border-red-400')}>
                    <img src="/mobs/slime.gif" alt="" className='w-80 h-80' />
                </button>

            </div>
        }
        <div>
            {(hand && playersTurn) &&
                hand.map((card, i) => {
                    return (
                        <button key={i} onClick={() => selectCard(i)}
                            className={'absolute left-0 transition-transform duration-1000 border-2 '
                                + ((i == selectedCardIndex) ? 'border-yellow-300 -translate-y-[330px]' : 'hover:-translate-y-[330px] border-transparent')
                            }
                            style={{ zIndex: `${i + 1}`, translate: `${(i + 1) * (250 - hand.length)}px 250px` }}>
                            <Card card={card} />
                        </button>
                    )
                })

            }
        </div>


    </>
}

export default MobEvent