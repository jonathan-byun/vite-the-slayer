import { FC, useRef } from 'react'
import { CSSTransition } from 'react-transition-group'

interface CrossOutCardProps {
    imageString: string,
    start: boolean,
    continueAfterAnimation: () => void
}

const CrossOutCard: FC<CrossOutCardProps> = ({ imageString, start, continueAfterAnimation }) => {
    const nodeRef = useRef(null)
    return (
        <CSSTransition nodeRef={nodeRef} in={start} timeout={1000}
            classNames="crossout-card-animation" unmountOnExit={true} exit={false} onEntered={() => { continueAfterAnimation() }}>
            <div ref={nodeRef}>
                <img src={imageString} alt=""
                    className={'w-20 h-20'} />
            </div>
        </CSSTransition>


    )
}

export default CrossOutCard