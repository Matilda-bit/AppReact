import React from 'react';
import Arrow from '../../assets/icons/fontSize/up.png';

const ScrollSide = ({ctsStyle, alt, cstFunc}) => {
    let isScrolling = false;

    const startScrolling = () => {
        if (!isScrolling) {
            isScrolling = true;
            const scrollLoop = () => {
                cstFunc();
                if (isScrolling) {
                    requestAnimationFrame(scrollLoop);
                }
            };
            scrollLoop();
        }
    };

    const stopScrolling = () => {
        isScrolling = false;
    };


    return (
        <fieldset
            className={ctsStyle}
            onMouseDown={() => startScrolling()}
            onMouseUp={stopScrolling}
            onMouseLeave={stopScrolling}
        >
            <img draggable="false" src={Arrow} alt={alt} width="50" height="50" />
        </fieldset>
    );
};

export default ScrollSide;
