import { FC, useContext } from 'react'
import { PlayerContext } from '../../providers/Providers'

interface MobEventProps {

}

const MobEvent: FC<MobEventProps> = ({ }) => {
    const playerContext = useContext(PlayerContext)
    const player = playerContext!.player
    const healthPercentage = player.health * 100 / player.maxHealth
    return <>
        <div className='absolute left-96 top-96 max-w-96'>
            <div className='flex flex-wrap gap-2'>
                {player.statuses.map((status) => {
                    return (
                        <p key={status.status} className='bg-white'>{status.status}: {status.turns}</p>
                    )
                })}
            </div>
            <div className='flex items-center bg-white rounded relative text-center'>
                <p className='absolute left-1/3'>{player.health}/{player.maxHealth}</p>
                <div className={'bg-green-600 h-6 rounded '} style={{ width: `${healthPercentage}%` }}>
                </div>
            </div>
            <img src='/mainChar.gif' className='w-80 h-80' />
        </div>
        <div className='absolute right-96 top-96 max-w-96'>
            <img src="/mobs/slime.gif" alt="" className='w-80 h-80'/>
        </div>
    </>
}

export default MobEvent