import React, { useRef } from 'react';

const DraggableComponent = ({key, line}) => {
    const dragElement = useRef(null);
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    console.log(line);
    console.log('Hello');

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
    console.log(line.text);
    console.log('text');
    return (
        <div ref={dragElement} id="meme meme-text" className='meme-text' 
        style={{ position: 'absolute', top: '50px', left: '50px', marginLeft: 'auto', marginRight: 'auto', border: '1px solid black', padding: '10px' }}>
            <div 
                id="meme-text" 
                key={key} 
                className={` 'meme-text ' ${(key === 0) ? "top" : "bottom"} ${line.color} ${line.textAlign} font-size-${line.fontSize}`} 
                style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word', cursor: 'move' }}
                onMouseDown={dragMouseDown}>
                    {line.text}
            </div>
        </div>
    );
};

export default DraggableComponent;
