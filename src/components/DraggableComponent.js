import React, { useRef, useEffect, useState } from 'react';
import Mydata from '../utils/MemesLineLink';

const DraggableComponent = ({unique, line, imgId, boxCount}) => {
    const dragElement = useRef(null);
    const memeElement = useRef(null);
    const [memeRect, setMemeRect] = useState(null);
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    const lineStyle = (unique >= boxCount || !Mydata[imgId]) ? 
    " line-default line " : (Mydata[imgId].lines && Mydata[imgId].lines[unique]) ? 
    Mydata[imgId].lines[unique] + " line " : " line " ;
     
    useEffect(() => {
        const element = document.getElementById('meme-box');
        if (element) {
            setMemeRect(element.getBoundingClientRect());
            memeElement.current = element;
        }
    }, []);

    console.log(memeRect);
    console.log(memeElement.current);

    const dragMouseDown = (e) => {
        e.preventDefault();
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
    };

    const elementDrag = (e) => {
        e.preventDefault();

        const dragRect = dragElement.current.getBoundingClientRect();
         
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
       
        const { x: minLeft, y: minTop, width: memeWidth, height: memeHeight } = memeRect;
        const maxTop = memeHeight - dragElement.current.clientHeight - 5;
        const maxLeft = memeWidth - dragElement.current.clientWidth - 5;
        let newTop = dragElement.current.offsetTop - pos2;
        let newLeft = dragElement.current.offsetLeft - pos1;
        newTop = Math.min(Math.max(newTop, 0), maxTop);
        newLeft = Math.min(Math.max(newLeft, 0), maxLeft);

        dragElement.current.style.top = newTop + "px";
        dragElement.current.style.left = newLeft + "px";
    };

    const closeDragElement = () => {
        document.onmouseup = null;
        document.onmousemove = null;
    };


    return (
        <div ref={dragElement} 
            id="meme-text" 
            className={"meme-text " + lineStyle} 
            >
                <div 
                    unique={unique} 
                    className={` ${line.color} ${line.textAlign} font-size-${line.fontSize} `} 
                    style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word', cursor: 'move' }}
                    onMouseDown={dragMouseDown}>
                        {line.text}
                </div>
        </div>
    );
};

export default DraggableComponent;
