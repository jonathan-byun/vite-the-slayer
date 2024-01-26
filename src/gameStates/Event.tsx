import { FC, useContext } from 'react'
import MobEvent from '../components/mobs/MobEvent'

interface EventProps {
  currentNode: MapNode
}

const Event: FC<EventProps> = ({ currentNode }) => {



  return <div>
    <MobEvent level={currentNode.level} />
  </div>
}

export default Event