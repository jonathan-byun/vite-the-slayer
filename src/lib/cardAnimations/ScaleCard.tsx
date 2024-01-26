import { FC, useRef } from 'react'
import { CSSTransition } from 'react-transition-group'

interface ScaleCardProps {
    imageString: string,
    start: boolean,
    continueAfterAnimation: () => void
}

const ScaleCard: FC<ScaleCardProps> = ({ imageString, start, continueAfterAnimation }) => {
    const nodeRef = useRef(null)
    return (
        <div className='left-1/4 top-1/2 absolute h-20 w-20'>
            <CSSTransition nodeRef={nodeRef} in={start} timeout={1000}
                classNames="scale-card-animation" unmountOnExit={true} exit={false} onEntered={() => { continueAfterAnimation() }}>
                <div ref={nodeRef}>
                    <img src={imageString} alt=""
                        className={'w-20 h-20'} />
                </div>
            </CSSTransition>
        </div>



    )
}

export default ScaleCard