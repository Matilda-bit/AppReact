import React, { useState, useEffect, useRef } from "react";
import "../utils/MemesLink";
import SettingsLine from './SettingsLine'; // assuming you have created a separate Settings component
import SettingsImg from './SettingsImg'; // assuming you have created a separate Settings component
import BtnIcon from '../assets/icons/btn/pokeball.png';
import DeleteIcon from '../assets/icons/btn/garbage.png';
import AddIcon from '../assets/icons/btn/add.png';
import ScrollSide from "./ScrollSide";

const MemeGenerator = () => {
    const [lines, setLines] = useState([
        {
            title: "Top Text",
            text: "",
            color: "color-white ",
            textAlign: 'text-align-center',
            fontSize: 10
        },
        {
            title: "Bottom Text",
            text: "",
            color: "color-white ",
            textAlign: 'text-align-center',
            fontSize: 10
        }
    ]);
    const [hideSettings, setHideSettings] = useState(true);
    //const [hideSettingsImg, setHideSettingsImg] = useState(true);
    const [flip, setFlip] = useState(false);
    const [allMemeImgs, setAllMemeImgs] = useState([]);
    const [item, setItem] = useState({
        id: "61579",
        box_count: 2,
        height: 335,
        width: 568,
        name: "One Does Not Simply",
        img: "https://i.imgflip.com/1bij.jpg",
        data: [],
    });

    useEffect(() => {
        fetch("https://api.imgflip.com/get_memes")
            .then(response => response.json())
            .then(response => { 
                const { memes } = response.data;
                setAllMemeImgs(memes);
            });
    }, []);

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
    }, []);
    
    
    const scrollRef = useRef(null);

    const scroll = (amount) => {
        if (scrollRef.current) {
            scrollRef.current.scrollLeft += amount; // Adjust as needed
        }
    };



    const handleChange = (event, index) => {
        const { value } = event.target;
        setLines(prevLines => {
            return prevLines.map((line, i) => {
                if (i === index) {
                    return { ...line, text: value };
                }
                return line;
            });
        });
    };

    //checkboxChange
    const checkboxChange = (event) => {
        const { name } = event.target;
        if (name === "checkbox") {
            setLines(prevLines => {
                return prevLines.map((line, index) => {
                    if (index !== 0) {
                        return {
                            ...line,
                            textAlign: lines[0].textAlign,
                            color: lines[0].color,
                            fontSize: lines[0].fontSize
                        };
                    }
                    return line;
                });
            });
            setHideSettings(!hideSettings);
        }
    };
    
    const handleSubmit = (event) => {
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
            data: randMeme
        });
    };

    const addLine = () => {
        const newLine = {
            text: "",
            color: hideSettings ? lines[0].color : "color-white ",
            textAlign: hideSettings ? lines[0].textAlign : 'text-align-center ',
            fontSize: hideSettings ? lines[0].fontSize : 10
        };
        setLines(prevLines => [...prevLines, newLine]);
    };
    
    const setColor = (index, color) => {
        setLines(prevLines => {
            return prevLines.map((line, i) => {
                if ((i === index || (index === 0 && hideSettings))) {
                    return { ...line, color };
                }
                return line;
            });
        });
    };

    const setTextAlign = (index, textAlign) => {
        setLines(prevLines => {
            return prevLines.map((line, i) => {
                if ((i === index || (index === 0 && hideSettings))) {
                    return { ...line, textAlign };
                }
                return line;
            });
        });
    };

    const setFontSize = (index, operation) => {
        setLines(prevLines => {
            return prevLines.map((line, i) => {
                if ((i === index || (index === 0 && hideSettings)) && (operation === "reduce" || operation === "increase")) {
                    return { ...line, fontSize: operation === "reduce" ? line.fontSize - 1 : line.fontSize + 1 };
                }
                return line;
            });
        });
    };

    const deleteLine = (index) => {
        if (lines.length > 1) {
            setLines(prevLines => prevLines.filter((line, i) => i !== index));
        }
    };

    return (
        <div>
            <h1 className="center">MEME GENERATOR SECTION</h1>
            <div className="random-meme-section">
                <div className="random width-30">
                    <button className="pb-15 center align-items-center" onClick={handleSubmit}> 
                        <img draggable="false" src={BtnIcon} alt="buttonpng" border="0" width={35} height={35} />
                        RANDOM MEME IMG </button>
                </div>

                <div className="meme-catalog" ref={scrollRef} >
                    <ScrollSide 
                        ctsStyle={"scroll-btn left suit-icon "} 
                        alt="Left Scroll" 
                        cstFunc={() => {scroll(-10)}}/>
                    <div className="meme-images">
                        {allMemeImgs.map((meme, index) => (
                            <img 
                            key={index} 
                            src={meme.url} 
                            alt={meme.name} 
                            draggable="false"
                            style={{ height: '90px', cursor: 'pointer' }} 
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

                    <ScrollSide 
                        ctsStyle={"scroll-btn right suit-icon "} 
                        alt="Right Scroll" 
                        cstFunc={() => {scroll(10)}}/>
                </div>
                
            </div>

            

            <form className="meme-form" onSubmit={handleSubmit}>
            <div className="meme-input">
                <div>
                    <div className="title-line">
                        <label >Image Settings</label>
                    </div>
                    <SettingsImg
                        setFlip={() => setFlip(!flip)}
                    />

                    <hr className="solid"></hr>
                </div>

                {lines.map((line, index) => (
                    <div key={index}>
                    <div className="meme-input-item">
                        <div className="title-line">
                            <label >{index === 0 ? "Text " + (index+1) : "Text " + (index+1)}</label>
                        </div>
                        <SettingsLine 
                            index={index}
                            line={lines[index]}
                            template={lines[0]}
                            setColor={(color) => setColor(index, color)}
                            setTextAlign={(textAlign) => setTextAlign(index, textAlign)}
                            setFontSize={(operation) => setFontSize(index, operation)}
                            hideSettings={hideSettings}
                        />

                        {(index === 0) ? <textarea
                            type="text"
                            name={"text-" + {index}}
                            className={"margin-10 " + (index !== 0) ?  "lines " : "line-0 "}
                            placeholder={index === 0 ? "Top Text" : "Bottom Text"}
                            value={line.text}
                            onChange={(event) => handleChange(event, index)}
                        />  
                        : 
                        <div className="display-flex">
                            <textarea
                                type="text"
                                name={"text-" + {index}}
                                className={"margin-10 " + (index !== 0) ?  "lines " : "line-0 "}
                                placeholder={index === 0 ? "Top Text" : "Bottom Text"}
                                value={line.text}
                                onChange={(event) => handleChange(event, index)}
                            />  
                            <button className="btn-delete" type="submit" onClick={() => deleteLine(index)}>
                                <img draggable="false" src={DeleteIcon} alt="Delete" border="0" width={45} height={45}/>
                            </button>    
                        </div>
                        }
                        
                           
                    </div>
                    
                    {(index === 0 && lines.length > 1) ? 
                        (<div >
                            <div className="checkbox-wrapper-6"> 
                                <input className="tgl tgl-light" id="cb1-6" name="checkbox" type="checkbox" checked={hideSettings} onChange={checkboxChange}/> 
                                <label className="tgl-btn" htmlFor="cb1-6"/><span>Same settings to all lines</span>
                            </div>
                        </div>) : null}

                    <hr className="solid"></hr>
                </div>
                    
                ))}

                <div className="meme-input-btn ">
                <button className="button-39" type="button" onClick={addLine}> <img src={AddIcon} alt="buttonpng" border="0" width={20} height={20} /> 
                    Add Line</button>
                </div>

                <div className="meme-input-item">                
                    <button className="meme-input-item">SUBMIT</button>
                </div>
            </div>
            <div className="display-meme">
                <div className="center settings-title grey">
                    <h2 className="center">"{item.name}"</h2>
                </div>
                <div className="meme limit">
                    <img draggable="false" className={(flip) ? "meme-flip " : null}  src={item.img} alt={item.name} />
                    {lines.map((line, index) => (
                        <h2 key={index} className={`${(index === 0) ? "top" : "bottom"} ${line.color} ${line.textAlign} font-size-${line.fontSize}`} style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>{line.text}</h2>
                    ))}
                </div>
            </div>

            <div className="center row">
                <label > original size {item.width} x {item.height}</label>
                <label > boxes {item.box_count} </label>
            </div>
            </form>

            
            
        </div>
    );
};

export default MemeGenerator;
