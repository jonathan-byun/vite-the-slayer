import { FC, useEffect, useState } from 'react'

interface goopProps {
  imageString: string
}

const Straight: FC<goopProps> = ({ imageString }) => {
  const [startAnimation, setStartAnimation] = useState(false)
  useEffect(() => {
    setStartAnimation(true)
  }, [])
  return <img src={`/mobs/moves/${imageString}.png`} alt=""
    className={'w-20 h-20 absolute transition-all duration-1000 ' + (startAnimation ? 'right-2/3' : 'right:1/3')} />
}

export default Straight