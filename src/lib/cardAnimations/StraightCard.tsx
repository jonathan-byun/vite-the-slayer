import { FC, useRef } from 'react'
import { CSSTransition } from 'react-transition-group'

interface StraightCardProps {
    imageString: string,
    start: boolean,
    continueAfterAnimation: () => void
}

const StraightCard: FC<StraightCardProps> = ({ imageString, start, continueAfterAnimation }) => {
    const nodeRef = useRef(null)
    console.log('mounted')
    return (
        <CSSTransition nodeRef={nodeRef} in={start} timeout={1000}
            classNames="straight-card-animation" unmountOnExit={true} exit={false} onEntered={() => {console.log('hi'); continueAfterAnimation()}}>
            <div ref={nodeRef}>
                <img src={imageString} alt=""
                    className={'w-20 h-20'} />
            </div>
        </CSSTransition>


    )
}

export default StraightCard