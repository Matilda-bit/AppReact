import React, { useRef, useEffect } from 'react';
import DraggableComponent from '../DraggableComponent'; // Adjust the path as necessary

const MemeBox = ({ item, lines, flip }) => {
    
    const containerRef = useRef(null);

    useEffect(() => {
        // Update the memeElement ref whenever item changes
        containerRef.current = document.getElementById('meme-box');
        // console.log(containerRef);
    }, [containerRef]);

    return (
        <div className="display-meme">
            <div className="center settings-title grey">
                <h2 className="center">"{item.name}"</h2>
            </div>
            <div ref={containerRef} id="meme-box" className="meme-box meme limit">
                <img draggable="false" className={(flip ? "meme-flip " : "") + "meme-img"} src={item.img} alt={item.name} />
                {lines.map((line, index) => (
                    <DraggableComponent
                        key={index}
                        unique={index}
                        line={line}
                        imgId={item.id}
                        boxCount={item.box_count}
                        memeElement={containerRef} // Pass containerRef as memeElement
                    />
                ))}
            </div>
        </div>
    );
};

export default MemeBox;
