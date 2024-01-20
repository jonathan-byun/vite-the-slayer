import { FC } from 'react'
import MapNode from './MapNode'
import MapArrow from './MapArrow'


interface MapProps {
    levels: MapNode[][],
    currentNode: MapNode,
    setCurretNode: React.Dispatch<React.SetStateAction<MapNode | undefined>>
}

const Map: FC<MapProps> = ({ levels, currentNode, setCurretNode }) => {
    async function handleClick(e:React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        const clickedNode = currentNode.next.find((node)=>node.id===Number(e.currentTarget.id))
        await setCurretNode(clickedNode)
    }
    return currentNode && <>
        <div className='relative w-2/5 h-full m-10 bg-slate-200'>
            {
                levels.map((level) => {
                    return (
                        level.map((mapNode, i) => {
                            return (
                                <div key={mapNode.id}>
                                    <MapNode mapNode={mapNode} isNextNode={currentNode.next.indexOf(mapNode)!=-1} handleClick={handleClick}/>
                                    <MapArrow mapNode={mapNode} />
                                </div>
                            )
                        })
                    )
                })
            }-
        </div>
    </>
}

export default Map