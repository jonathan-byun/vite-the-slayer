import { FC } from 'react'

interface CardProps {
    card: Card,
    handPosition: number
}

const Card: FC<CardProps> = ({ card, handPosition }) => {
    const cardZIndex = {
        1: 'z-[1]',
        2: 'z-[2]',
        3: 'z-[3]',
        4: 'z-[4]',
        5: 'z-[5]',
        6: 'z-[6]',
        7: 'z-[7]',
        8: 'z-[8]',
        9: 'z-[9]'
    } as numberStringObject
    return (
        <div className={`${cardZIndex[handPosition]}`}>
            <div className='bg-amber-600 w-[280px] h-[360px] p-6 flex flex-col items-center gap-1 border-[1px] border-black'>
                <div className='flex justify-between bg-amber-400 rounded-sm w-full'>
                    <p className='font-bold px-2 py-4 border-y-2 border-l-2 border-orange-800 w-full'>{card.name}</p>
                    <p className='font-bold px-4 border-2 border-orange-800 flex items-center'>{card.cost}</p>
                </div>

                <div className='w-full h-[10rem] relative border-orange-800 border-2 overflow-hidden'>
                    <img src={`/cards/${card.name.toLowerCase()}.gif`} alt="" className='w-full h-full' />
                </div>

                <div className='w-full h-[5rem] border-orange-800 border-2 overflow-y-auto p-3'>
                    <p>{card.description}</p>
                </div>
            </div>
        </div>)
}

export default Card