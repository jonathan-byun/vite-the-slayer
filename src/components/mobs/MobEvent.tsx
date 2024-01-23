import { FC, useContext, useEffect, useState } from 'react'
import { DeckContext, PlayerContext } from '../../providers/Providers'
import { determineMob, slime } from './mobs'
import Card from '../deck/Card'
import { shuffleDeck } from '../../gamelogic/deckActions'
import { TargetTypes } from '../../enums/gameEnums'
import toast from 'react-hot-toast'
import { decrementStatuses } from '../../gamelogic/statusEffects'

interface MobEventProps {

}

const MobEvent: FC<MobEventProps> = ({ }) => {
    const playerContext = useContext(PlayerContext)
    const deck = useContext(DeckContext)
    const [mob, setMob] = useState<Mob>(slime)
    const [playersTurn, setPlayersTurn] = useState(true)
    const [hand, setHand] = useState<Card[]>()
    const [localDeck, setLocalDeck] = useState(deck)
    const [discard, setDiscard] = useState<Card[]>()
    const [selectedCardIndex, setSelectedCardIndex] = useState<number | null>(null)
    const player = playerContext!.player
    const targetable = selectedCardIndex != null ? hand![selectedCardIndex].target : TargetTypes.NONE
    useEffect(() => {
        setMob(determineMob(1))
        const nextDeck = [...deck!]
        shuffleDeck(nextDeck)
        const nextHand = nextDeck.splice(0, 5)
        setHand(nextHand)
        setLocalDeck(nextDeck)
    }, [])

    function playCardOnTarget(target: Mob | Player) {
        if (!hand || selectedCardIndex == null) return
        const card = hand[selectedCardIndex]
        if (player.stamina < card.cost) {
            toast('not enough stamina')
            return
        }
        const updatedTarget = card.effect(target)
        if (card.target === TargetTypes.ENEMY) {
            setMob(updatedTarget)
            playerContext?.setPlayer({ ...player, stamina: player.stamina - card.cost })
        }
        if (card.target === TargetTypes.SELF) {
            updatedTarget.stamina = updatedTarget.stamina - card.cost
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

    function endTurn() {
        setPlayersTurn(false)
        setMob(decrementStatuses(mob)as Mob)
        takeRandomMobAction()
        console.log(resetPlayer(player))
    }

    function takeRandomMobAction() {
        const randomMove = mob?.moves[Math.floor(Math.random() * mob.moves.length)]
        playerContext?.setPlayer(randomMove?.effect(player))
        toast(`Mob used ${randomMove?.name}`)
    }

    function resetPlayer(player:Player) {
        return{
            ...player,
            stamina:player.maxStamina,
            outGoingDamageMultiplier:1,
            block:0
        }
    }
    
    return <>
        {player &&
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
                    <div className={'bg-green-600 h-6 rounded '} style={{ width: `${player.health * 100 / player.maxHealth}%` }}>
                    </div>
                </div>
                <img src='/mainChar.gif' className='w-80 h-80' />
            </div>
        }
        {(mob && mob.health > 0) &&
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
                    <div className={'bg-green-600 h-6 rounded transition-all duration-500 '} style={{ width: `${mob.health * 100 / mob.maxHealth}%` }}>
                    </div>
                </div>
                <button onClick={() => playCardOnTarget(mob)} disabled={targetable != TargetTypes.ENEMY} className={'border-2 ' + (targetable == TargetTypes.ENEMY ? 'border-red-400' : 'border-transparent')}>
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
        <div className='absolute top-10 left-[45%]'>
            {playersTurn
                ? <button onClick={() => endTurn()} className=' bg-green-700 w-24 h-24 rounded-full hover:bg-green-500'>END TURN</button>
                : <div className='bg-red-300 rounded-full w-24 h-24 flex justify-center items-center'>Enemy Turn</div>
            }
        </div>


    </>
}

export default MobEvent