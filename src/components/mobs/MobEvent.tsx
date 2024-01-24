import { FC, useContext, useEffect, useState } from 'react'
import { DeckContext, PlayerContext } from '../../providers/Providers'
import { determineMob, slime } from './mobs'
import Card from '../deck/Card'
import { shuffleDeck } from '../../gamelogic/deckActions'
import { MoveTypes, TargetTypes } from '../../enums/gameEnums'
import toast from 'react-hot-toast'
import { calculateDamage, decrementStatuses } from '../../gamelogic/statusEffects'
import { DiVim } from 'react-icons/di'

interface MobEventProps {

}

const MobEvent: FC<MobEventProps> = ({ }) => {
    const playerContext = useContext(PlayerContext)
    const deck = useContext(DeckContext)
    const [mob, setMob] = useState<Mob>(slime)
    const [playersTurn, setPlayersTurn] = useState(true)
    const [hand, setHand] = useState<Card[]>()
    const [localDeck, setLocalDeck] = useState(deck)
    const [discard, setDiscard] = useState<Card[]>([])
    const [selectedCardIndex, setSelectedCardIndex] = useState<number | null>(null)
    const [mobIntent, setMobIntent] = useState(0)
    const [showMoveAnimation, setShowMoveAnimation] = useState(true)
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
        const updatedTarget = card.effect(target, player)
        if (card.target === TargetTypes.ENEMY) {
            setMob(updatedTarget)
            playerContext?.setPlayer({ ...player, stamina: player.stamina - card.cost })
        }
        if (card.target === TargetTypes.SELF) {
            updatedTarget.stamina = updatedTarget.stamina - card.cost
            playerContext?.setPlayer(updatedTarget)
        }
        setDiscard([...discard, hand.slice(selectedCardIndex)[0]])
        setHand(hand.filter((card, i) => i !== selectedCardIndex))
        setSelectedCardIndex(null)
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
        setSelectedCardIndex(null)
        playerContext?.setPlayer(decrementStatuses(resetPlayer(takeMobAction(player))) as Player)
        setMob(decrementStatuses(resetMob(mob)) as Mob)
    }

    function takeMobAction(player: Player) {
        const randomMoveIndex = Math.floor(Math.random() * mob.moves.length)
        const queuedMove = mob.moves[mobIntent]
        toast(`Mob used ${queuedMove.name}`)
        setMobIntent(randomMoveIndex)
        return (queuedMove.effect(player, mob))
    }

    function resetPlayer(player: Player) {
        return {
            ...player,
            stamina: player.maxStamina,
            outGoingDamageMultiplier: 1,
            block: 0
        }
    }

    function resetMob(mob: Mob) {
        return {
            ...mob,
            outGoingDamageMultiplier: 1,
            block: 0,
        }
    }
    return <>
        {player &&
            <div className='absolute left-96 bottom-40 max-w-96'>
                <div className='flex flex-wrap gap-2'>
                    {player.statuses.map((status) => {
                        return (
                            <p key={status.name} className='bg-white'>{status.name}: {status.turns}</p>
                        )
                    })}
                </div>
                <div className='flex my-1 gap-1'>
                    <div className='flex justify-center items-center rounded-full bg-blue-500 w-10 h-10'>
                        <p className='font-bold text-yellow-500 text-2xl'>{player.stamina}</p>
                    </div>
                    {player.block > 0 && <div className='bg-slate-400 text-2xl font-bold w-10 h-10 flex justify-center items-center rounded-full'><p> {player.block}</p></div>}
                </div>

                <div className='flex items-center bg-white rounded relative text-center'>
                    <p className='absolute left-1/3'>{player.health}/{player.maxHealth}</p>
                    <div className={'bg-green-600 h-6 rounded '} style={{ width: `${player.health * 100 / player.maxHealth}%` }}>
                    </div>
                </div>
                <button onClick={() => playCardOnTarget(player)} disabled={targetable != TargetTypes.SELF} className={'border-2 ' + ((targetable === TargetTypes.SELF) ? 'border-green-400' : 'border-transparent')}>
                    <img src='/mainChar.gif' className='w-80 h-80' />
                </button>
            </div>
        }
        {
            (showMoveAnimation) &&
            <div>
              {mob.moves[mobIntent].animation}
            </div>
            
        }
        {(mob && mob.health > 0) &&
            <div className='absolute right-96 bottom-40 max-w-96'>
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
                <div className='flex items-center gap-1 flex-wrap'>
                    {mob.moves[mobIntent].type.map((intent) => {
                        return (
                            <div key={intent} className='flex items-center bg-slate-300'>
                                <img src={`/mobs/movetypes/${intent}.png`} alt="" className='w-10 h-10' />
                                {intent === MoveTypes.DAMAGE &&
                                    <p className='bg-slate-500 font-bold -ml-2 rounded-full w-5 h-5 flex items-center justify-center'>
                                        {calculateDamage(mob.moves[mobIntent].damage, player, mob)}
                                    </p>}
                            </div>

                        )
                    })}
                </div>
                <button onClick={() => playCardOnTarget(mob)} disabled={targetable != TargetTypes.ENEMY} className={'border-2 ' + (targetable == TargetTypes.ENEMY ? 'border-red-400' : 'border-transparent')}>
                    <img src="/mobs/slime.gif" alt="" className='w-80 h-80' />
                </button>

            </div>
        }
        <div>
            {(hand && playersTurn) &&
                hand.map((card, i) => {
                    const translateEffect = ((i === selectedCardIndex
                        ? '50rem -10rem'
                        : `${(i + 1) * (250 - hand.length)}px 250px`
                    ))
                    return (
                        <button key={i} onClick={() => selectCard(i)}
                            className={'absolute left-0 transition-all duration-1000 border-2 '
                                + ((i == selectedCardIndex) ? 'border-yellow-300' : 'border-transparent')
                            }
                            style={{ zIndex: `${i + 1}`, translate: translateEffect }}>
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