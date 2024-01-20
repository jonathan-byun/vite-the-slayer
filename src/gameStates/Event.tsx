import { FC } from 'react'

interface EventProps {
  player: Player
}

const Event: FC<EventProps> = ({ player }) => {
  const healthPercentage = player.health * 100 / player.maxHealth


  return <div>
    <div className='absolute left-96 bottom-96 max-w-96'>
      <div className='flex flex-wrap gap-2'>
        {player.statuses.map((status) => {
          return (
            <p className='bg-white'>{status.status}: {status.turns}</p>
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
  </div>
}

export default Event