import { FC, useContext } from 'react'
import { PlayerContext } from '../providers/Providers'
import MobEvent from '../components/mobs/MobEvent'

interface EventProps {
  
}

const Event: FC<EventProps> = () => {
  


  return <div>
    <MobEvent />
  </div>
}

export default Event