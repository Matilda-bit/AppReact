import React, { useRef, useEffect } from 'react';
import Mydata from '../../util/MemesLineLink';

const DraggableComponent = ({unique, line, imgId, boxCount, info}) => {
    const dragElement = useRef(null);
    useEffect(() => {
        if(info){
                const { width: memeWidth, height: memeHeight } = info;
                const maxTop = memeHeight - dragElement.current.clientHeight - 5;
                const maxLeft = memeWidth - dragElement.current.clientWidth - 5;
                let newTop = dragElement.current.offsetTop - pos2;
                let newLeft = dragElement.current.offsetLeft - pos1;
                newTop = Math.min(Math.max(newTop, 1), maxTop);
                newLeft = Math.min(Math.max(newLeft, 1), maxLeft);
                dragElement.current.style.top = newTop + "px"; 
        }}, [info, line]);


    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    const lineStyle = (unique >= boxCount || !Mydata[imgId]) ? 
    " line-default line " : (Mydata[imgId].lines && Mydata[imgId].lines[unique]) ? 
    Mydata[imgId].lines[unique] + " line " : " line ";

    const dragMouseDown = (e) => {
        e.preventDefault();
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
    };

    const elementDrag = (e) => {
        e.preventDefault();

        //const dragRect = dragElement.current.getBoundingClientRect();
         
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
       
       
        const {width: memeWidth, height: memeHeight } = info;
        const maxTop = memeHeight - dragElement.current.clientHeight - 5;
        const maxLeft = memeWidth - dragElement.current.clientWidth - 5;
        let newTop = dragElement.current.offsetTop - pos2;
        let newLeft = dragElement.current.offsetLeft - pos1;
        newTop = Math.min(Math.max(newTop, 1), maxTop);
        newLeft = Math.min(Math.max(newLeft, 1), maxLeft);

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
            onMouseDown={dragMouseDown}
            >
                <div 
                    id={`line-${unique}`}
                    unique={unique} 
                    className={` ${line.color} ${line.textAlign} font-size-${line.fontSize} `} 
                    style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word', cursor: 'move' }}
                    >
                        {line.text}
                </div>
        </div>
    );
};

export default DraggableComponent;
