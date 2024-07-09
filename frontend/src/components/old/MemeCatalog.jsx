import React, { useRef, useEffect } from "react";
// import { useDispatch } from 'react-redux';
import ScrollSide from "./ScrollSide";
import BtnIcon from '../../assets/icons/btn/pokeball.png';

function MemeCatalog({ allMemeImgs, setItem }) {
    const scrollRef = useRef(null);

    useEffect(() => {
        const head = document.querySelector(".meme-images");
        let isDragging = false;
        let startX = 0;
        let scrollLeft = 0;
    
        const startDragging = (e) => {
            isDragging = true;
            startX = e.pageX - head.offsetLeft;
            scrollLeft = head.scrollLeft;
        };
    
        const stopDragging = () => {
            isDragging = false;
        };
    
        const dragging = (e) => {
            if (!isDragging) return;
            e.preventDefault();
            const x = e.pageX - head.offsetLeft;
            const diff = x - startX;
            const direction = Math.sign(diff);
            scrollLeft = scrollLeft - diff;
            scroll(-direction*10);
            head.scrollLeft = scrollLeft;
            startX = x + direction; 
        };
    
        head.addEventListener("mousedown", startDragging);
        head.addEventListener("mouseup", stopDragging);
        head.addEventListener("mouseleave", stopDragging);
        head.addEventListener("mousemove", dragging);
    
        return () => {
            head.removeEventListener("mousedown", startDragging);
            head.removeEventListener("mouseup", stopDragging);
            head.removeEventListener("mouseleave", stopDragging);
            head.removeEventListener("mousemove", dragging);
        };
    }, []); //executed once after the component created
    

    function scroll(amount){
        if (scrollRef.current) {
            scrollRef.current.scrollLeft += amount; // Adjust as needed
        }
    };

    function handleSubmit(event) {
        event.preventDefault();
        const randNum = Math.floor(Math.random() * allMemeImgs.length);
        const randMeme = allMemeImgs[randNum];
        setItem({
            id: randMeme.id,
            box_count: randMeme.box_count,
            height: randMeme.height,
            width: randMeme.width,
            name: randMeme.name,
            img: randMeme.url,
            caption: randMeme.caption,
            data: randMeme
        });
    };

    return (
        <section id='meme-catalog-section-new'>
            <div className='title-section center'>
                <h1>Meme Catalog </h1>
                <p className="">
                    Please, select a meme you want from the catalog list or use the button to render a random meme.
                </p>
            </div>

            <div className="random-meme-section container-1 ">
                <div className="meme-catalog scroll" ref={scrollRef}>
                    <ScrollSide
                        ctsStyle={"scroll-btn left "}
                        alt="Left Scroll"
                        cstFunc={() => scroll(-10)} />

                    <div >
                        <div className="meme-images">
                            {allMemeImgs.map((meme, index) => (
                                <img
                                    key={index}
                                    src={meme.url}
                                    alt={meme.name}
                                    draggable="false"
                                    onClick={() => setItem({
                                        id: meme.id,
                                        box_count: meme.box_count,
                                        height: meme.height,
                                        width: meme.width,
                                        name: meme.name,
                                        img: meme.url,
                                        data: meme
                                    })}
                                />
                            ))}
                        </div>
                    </div>
                    <ScrollSide
                        ctsStyle={"scroll-btn right suit-icon "}
                        alt="Right Scroll"
                        cstFunc={() => { scroll(10) }} />
                </div>
            </div>

            <div className="random-btn-box center">
                <button
                    className="random-button" onClick={handleSubmit}>
                    <img draggable="false" src={BtnIcon} alt="buttonpng" border="0" width={35} height={35} />
                    RANDOM MEME IMG
                </button>
            </div>

        </section>
    );
};

export default MemeCatalog;
