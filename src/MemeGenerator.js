import React, { useState, useEffect } from "react";
import "./utils/MemesLink";
import BtnIcon from './assets/icons/btn/pokeball.png';
import Settings from './Settings'; // assuming you have created a separate Settings component

import AddIcon from './assets/icons/btn/add.png';

const MemeGenerator = () => {
    const [lines, setLines] = useState([
        {
            title: "Top Text",
            text: "",
            color: "color-white",
            textAlign: 'text-align-center',
            fontSize: 10
        },
        {
            title: "Bottom Text",
            text: "",
            color: "color-white",
            textAlign: 'text-align-center',
            fontSize: 10
        }
    ]);
    const [hideSettings, setHideSettings] = useState(true);
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
                console.log(response.data);
                setAllMemeImgs(memes);
            });
    }, []);




    const handleChange = (event, index) => {
        const { name, value } = event.target;
        setLines(prevLines => {
            return prevLines.map((line, i) => {
                if (i === index) {
                    return { ...line, [name]: value };
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
                                color: lines[0].color
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
            setLines(prevLines => [
                ...prevLines,
                {
                    text: "",
                    color: "color-white",
                    textAlign: 'text-align-center',
                    fontSize: 10
                }
            ]);
        };

    return (
        <div>
            <h1 className="center">MEME GENERATOR SECTION</h1>
            <div className="random-meme center">
                <button className="pb-15" onClick={handleSubmit}> 
                    <img src={BtnIcon} alt="buttonpng" border="0" width={35} height={35} />
                    RANDOM MEME IMG </button>
            </div>

            <form className="meme-form" onSubmit={handleSubmit}>
            <div className="meme-input">
                {lines.map((line, index) => (
                    <div>
                    <div key={index} className="meme-input-item">
                        <label className="text-bold comic-font">{index === 0 ? "Text " + (index+1) : "Text " + (index+1)}</label>
                        {/* {!hideSettings &&  */}
                        <Settings 
                            index={index}
                            template={line[0]}
                            setColor={lines[index].color}
                            setTextAlign={lines[index].textAlign}
                            setFontSize={lines[index].fontSize}
                            // reduce={reduce}
                            // increase={increase}
                            hideSettings={hideSettings}
                        />
                        {/* } */}
                        <textarea
                            type="text"
                            name="text"
                            className="margin-10 input-pretender"
                            placeholder={index === 0 ? "Top Text" : "Bottom Text"}
                            value={line.text}
                            onChange={(event) => handleChange(event, index)}
                        />         
                    </div>
                    
                    {(index === 0) ? 
                        (<div >
                            <label className="same-settings">Same settings to all lines
                                <input className="checkbox" name="checkbox" type="checkbox" checked={hideSettings} onChange={checkboxChange}/>
                                <span className="checkmark"></span>
                            </label>
                        </div>) : null}
                        </div>
                    
                ))}

                <div className="meme-input-item">
                <button className="meme-input" type="button" onClick={addLine}> <img src={AddIcon} alt="buttonpng" border="0" width={35} height={35} /> 
                    Add Line</button>
                
                    <button className="meme-input-item">SUBMIT</button>
                </div>
            </div>
            <div className="display-flex-col">
                <div className="center settings-title grey">
                    <h2 className="center">"{item.name}"</h2>
                </div>
                <div className="meme limit">
                    <img src={item.img} alt={item.name} />
                    {lines.map((line, index) => (
                        <h2 key={index} className={`line- ${line.color} ${line.textAlign} font-size-${line.fontSize}`} style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>{line.text}</h2>
                    ))}
                </div>
            </div>

            <div className="center row">
                <label > original size {item.width} x {item.height}</label>
            </div>
            </form>

            
            
        </div>
    );
};

export default MemeGenerator;
