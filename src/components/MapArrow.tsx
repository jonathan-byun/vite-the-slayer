import { FC } from 'react'
import Xarrow from "react-xarrows";

interface MapArrowProps {
  mapNode:MapNode,
}

const MapArrow: FC<MapArrowProps> = ({mapNode}) => {
  return <>
  {mapNode.next.map((next) => {
    return (
        <Xarrow
            start={mapNode.id.toString()}
            end={next.id.toString()}
            startAnchor={'top'}
            endAnchor={'bottom'}
            dashness={true}
            animateDrawing
            curveness={.1}
            strokeWidth={2}
            headSize={0}
            color='black'
            key={`${mapNode.id}${next.id}`}
        />

    )
})}
</>
  
}

export default MapArrow