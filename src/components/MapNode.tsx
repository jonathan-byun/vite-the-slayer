import { FC, } from 'react'

import { MdQuestionMark } from "react-icons/md";
import { FaSpaghettiMonsterFlying } from "react-icons/fa6";
import { FaShop } from "react-icons/fa6";
import { FaBed } from "react-icons/fa";
import { GiBossKey } from "react-icons/gi";



interface MapNodeProps {
    mapNode: MapNode,
    isNextNode: boolean,
    handleClick:Function
}

const MapNode: FC<MapNodeProps> = ({ mapNode, isNextNode,handleClick }) => {

    const fromBottom = (mapNode.level + 1) / .08
    const fromLeft = (mapNode.position + 1) / .05

    const bottomPositioning = {
        12.5: 'bottom-[10%]',
        25: 'bottom-[20%]',
        37.5: 'bottom-[35%]',
        50: 'bottom-[50%]',
        62.5: 'bottom-[60%]',
        75: 'bottom-[70%]',
        87.5: 'bottom-[80%]',
        100: 'bottom-[90%]'
    } as numberStringObject

    const leftPositioning = {
        20: 'left-[10%]',
        40: 'left-[30%]',
        60: 'left-[50%]',
        80: 'left-[70%]',
        100: 'left-[80%]'
    } as numberStringObject

    let encounterIcon;
    switch (mapNode.encounterType) {
        case 'RANDOM':
            encounterIcon = <MdQuestionMark size={30} />
            break;
        case 'MOB':
            encounterIcon = <FaSpaghettiMonsterFlying size={30} />
            break;
        case 'SHOP':
            encounterIcon = <FaShop size={30} />
            break;
        case 'REST':
            encounterIcon = <FaBed size={30} />
            break;
        case 'BOSS':
            encounterIcon = <GiBossKey size={30} />
    }

    return <>
        <button disabled={!isNextNode} onClick={(e)=>handleClick(e)} id={mapNode.id.toString()}
            className={`absolute ${bottomPositioning[fromBottom]} ${leftPositioning[fromLeft]} `
                + (isNextNode && 'animate-bounce')}>
            {encounterIcon}
        </button>
    </>
}

export default MapNode