import React, { useRef, useEffect, useCallback } from 'react';
import Mydata from '../../util/MemesLineLink';
import classes from './DraggableComponent.module.css';

const DraggableComponent = ({ unique, line, method, imgId, boxCount, info }) => {
    const dragElement = useRef(null);
    const color = line.color;
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    // console.log('unique', unique);
    // console.log('line', line);
    // console.log('method', method);
    // console.log('info', info);


    // Initialize or reset the drag element position when `unique` or `info` changes
    useEffect(() => {
        if (unique) {
            if (unique === 0) {
                dragElement.current.style.top = "2px";
                dragElement.current.style.left = "5px";
            } else if (unique > 1) {
                dragElement.current.style.top = `calc(50% + ${unique * 5}px)`;
                dragElement.current.style.left = `calc(50% + ${unique * 5}px)`;
            }
        }
    }, [unique, imgId]);


    useEffect(() => {
        if (imgId) {
            dragElement.current = document.getElementById(`meme-text-${unique}`);
            // console.log('Updated dragElement by picture info:',  dragElement.current.getBoundingClientRect());
        }
    }, [imgId]);

    // Recalculate or reset the drag element position when `info` changes (e.g., new image loaded)
    //  useEffect(() => {
    //     if (dragElement.current) {
    //         // Reset or set initial position if needed
    //         dragElement.current.style.top = "0px";
    //         dragElement.current.style.left = "0px";
    //         console.log("Updated dragElement with new image info");
    //     }
    // }, [info]);


    // useEffect(() => {
    //     console.log('unique', unique);
    //     console.log('line', line);
    //     if (line.x !== undefined && line.y !== undefined) {
    //         // dragElement.current.style.top = `${line.x}px)`; 
    //         // dragElement.current.style.left =`${line.y}px)`;
    //     }
    //     //?
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, []);


    useEffect(() => {
        if (info) {
            if (method === 'patch' && line.x && line.y) { //update
                dragElement.current.style.top = line.y + "px";
                dragElement.current.style.left = line.x + "px";
            } else { //create
                const { width: memeWidth, height: memeHeight } = info;
                const maxTop = memeHeight - dragElement.current.clientHeight - 50;
                const maxLeft = memeWidth - dragElement.current.clientWidth - 15;
                let newTop = dragElement.current.offsetTop - pos2;
                let newLeft = dragElement.current.offsetLeft - pos1;
                newTop = Math.min(Math.max(newTop, 1), maxTop);
                newLeft = Math.min(Math.max(newLeft, 1), maxLeft);
                dragElement.current.style.top = newTop + "px";
                dragElement.current.style.left = newLeft + "px";
                if (unique === 1) {
                    dragElement.current.style.top = `${maxTop}}px`;
                    dragElement.current.style.left = '5px';
                }
                if (unique === 0) {
                    dragElement.current.style.top = `2px`;
                    dragElement.current.style.left = '8px';
                }
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [info, line]);



    const lineStyle = (unique >= boxCount || !Mydata[imgId]) ?
        (classes['line-default'] + " " + classes.line) :
        (Mydata[imgId].lines && Mydata[imgId].lines[unique]) ?
            Mydata[imgId].lines[unique] + " " + classes.line : " " + classes.line + " ";



    const elementDrag = (e) => {
        e.preventDefault();

        //const dragRect = dragElement.current.getBoundingClientRect();

        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;


        const { width: memeWidth, height: memeHeight } = info;
        // console.log('meme width: ', memeWidth);
        // console.log('meme height: ', memeHeight);
        const maxTop = memeHeight - dragElement.current.clientHeight - 5;
        const maxLeft = memeWidth - dragElement.current.clientWidth - 5;

        // console.log('memeHeight: ', memeHeight);
        // console.log('dragElement.current.clientHeight: ', dragElement.current.clientHeight);

        // console.log('maxTop: ', maxTop);
        // console.log('maxLeft: ', maxLeft);

        let newTop = dragElement.current.offsetTop - pos2;
        let newLeft = dragElement.current.offsetLeft - pos1;

        newTop = Math.min(Math.max(newTop, 1), maxTop);
        newLeft = Math.min(Math.max(newLeft, 1), maxLeft);

        dragElement.current.style.top = `${newTop}px`;
        dragElement.current.style.left = `${newLeft}px`;
    };

    const dragMouseDown = (e) => {
        e.preventDefault();
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
    };

    const closeDragElement = () => {
        document.onmouseup = null;
        document.onmousemove = null;
    };

    return (
        <div ref={dragElement}
            id={`meme-text-${unique}`}
            className={classes['meme-text'] + " " + lineStyle}
            onMouseDown={dragMouseDown}
        >
            <div
                id={`line-${unique}`}
                unique={unique}
                className={`${classes[color]} ${classes[line.textAlign]} ${classes[`font-size-${line.fontSize}`]}`}
                style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word', cursor: 'move' }}

            // style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word', cursor: 'move' }}
            >
                {line.text}
            </div>
        </div>
    );
};

export default DraggableComponent;
