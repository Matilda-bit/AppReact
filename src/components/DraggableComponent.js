import React, { useRef } from 'react';
import Mydata from '../utils/MemesLineLink';

const DraggableComponent = ({unique, line, imgId, boxCount}) => {
    const dragElement = useRef(null);
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

    const dragMouseDown = (e) => {
        e.preventDefault();
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
    };

    const elementDrag = (e) => {
        e.preventDefault();
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        dragElement.current.style.top = (dragElement.current.offsetTop - pos2) + "px";
        dragElement.current.style.left = (dragElement.current.offsetLeft - pos1) + "px";
    };

    const closeDragElement = () => {
        document.onmouseup = null;
        document.onmousemove = null;
    };
    const lineStyle = (unique >= boxCount) ? " line-default " : (Mydata[imgId].lines && Mydata[imgId].lines[unique]) ? Mydata[imgId].lines[unique] : null ;
    return (
        <div ref={dragElement} 
            id="meme-text" 
            className={"meme-text " + lineStyle} 
            >
                <div 
                    unique={unique} 
                    className={` ${line.color} ${line.textAlign} font-size-${line.fontSize}`} 
                    style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word', cursor: 'move' }}
                    onMouseDown={dragMouseDown}>
                        {line.text}
                </div>
        </div>
    );
};

export default DraggableComponent;
