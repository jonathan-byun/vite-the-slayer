import { FC } from 'react'

interface IntroProps {
    setGameState: React.Dispatch<React.SetStateAction<string>>
}

const Intro: FC<IntroProps> = ({ setGameState }) => {
    return (
        <>
            <img src="/mainChar.gif" alt="hero" className='absolute w-50 h-50 bottom-32 left-96' />

            <h1 className='bg-slate-300 py-5 px-10 text-5xl font-bold'>VITE THE SLAYER</h1>

            <button className='bg-red-300 px-20 py-5 text-3xl font-bold my-5 border-2 border-black hover:bg-red-200' onClick={() => setGameState('map')}>START</button>

        </>
    )
}

export default Intro