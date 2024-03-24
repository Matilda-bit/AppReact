import React, { useRef, useEffect } from 'react';
import Mydata from '../utils/MemesLineLink';

const DraggableComponent = ({unique, line, imgId, boxCount, item, containerRef}) => {
    
    const dragElement = useRef(null);
    useEffect(() => {
        let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
        const container = containerRef.current;
        if (!container) return;

        const containerWidth = container.clientWidth;
        const containerHeight = container.clientHeight;

        const closeDragElement = () => {
            document.onmouseup = null;
            document.onmousemove = null;
        };

        const elementDrag = (e) => {
            e.preventDefault();
            const dragRect = dragElement.current.getBoundingClientRect();
            const containerRect = containerRef.current.getBoundingClientRect();

            const maxX = containerRect.width - dragRect.width;
            const maxY = containerRect.height - dragRect.height;

            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;

            let newTop = dragRect.top - pos2;
            let newLeft = dragRect.left - pos1;

            // Ensure the new position stays within the container boundaries
            newTop = Math.max(0, Math.min(newTop, maxY));
            newLeft = Math.max(0, Math.min(newLeft, maxX));

            dragElement.current.style.top = newTop + "px";
            dragElement.current.style.left = newLeft + "px";
        };

        const dragMouseDown = (e) => {
            e.preventDefault();
            pos3 = e.clientX;
            pos4 = e.clientY;
            document.onmouseup = closeDragElement;
            document.onmousemove = elementDrag;
        };
        
        dragElement.current.addEventListener('mousedown', dragMouseDown);

        return () => {
            dragElement.current.removeEventListener('mousedown', dragMouseDown);
        };
    }, [containerRef]);
     
    const lineStyle = (unique >= boxCount || !Mydata[imgId]) ? 
    " line-default  " : (Mydata[imgId].lines && Mydata[imgId].lines[unique]) ? 
    Mydata[imgId].lines[unique] + "  " : " " ;

    return (

                <div ref={dragElement}
                    id="meme-text" 
                    unique={unique} 
                    className={"meme-text " + lineStyle + ` ${line.color} ${line.textAlign} font-size-${line.fontSize} `} 
                    style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word', cursor: 'move' }}
                    >
                        {line.text}
                </div>

    );
};

export default DraggableComponent;
