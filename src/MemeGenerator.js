import React, { useState, useEffect } from "react";
import "./utils/MemesLink";
import meme from "./utils/MemesLink";
//import Circle from '@uiw/react-color-circle';//uninstall!
import AlignLeftIcon from './assets/icons/textAlign/align-left.png';
import AlignCenterIcon from './assets/icons/textAlign/format.png';
import AlignRightIcon from './assets/icons/textAlign/align-right.png';
import FontSize from './assets/icons/fontSize/font-size.png';
import ReduceSize from './assets/icons/fontSize/down.png';
import IncreaseSize from './assets/icons/fontSize/up.png';

const MemeGenerator = () => {
    const [topText, setTopText] = useState("");
    const [bottomText, setBottomText] = useState("");
    const [topColor, setTopColor] = useState("color-white");
    const [textAlign, setTextAlign] = useState(' text-align-center ');
    const [fontSize, setFontSize] = useState(10);
    const reduce = fontSize > 6;
    const increase = fontSize < 20;
    const [allMemeImgs, setAllMemeImgs] = useState([]);
    const [item, setItem] = useState({
        id: "61579",
        box_count: 2,
        height: 335,
        width: 568,
        name: "One Does Not Simply",
        img: "http://i.imgflip.com/1bij.jpg"
    });

    const [topLimit, setTopLimit] = useState(0);
    const [bottomLimit, setBottomLimit] = useState(0);

    useEffect(() => {
        fetch("http://api.imgflip.com/get_memes")
            .then(response => response.json())
            .then(response => { 
                const { memes } = response.data;
                setAllMemeImgs(memes);
            });
    }, []);

    const handleChange = (event) => {
        
        const { name, value } = event.target;
        if (name === "topText") {
            let el1 = document.getElementById("Top Text");
            if(el1){
                setTopLimit(el1.offsetHeight);
            }
            if(topLimit < (item.height/2) || topText > value) {
                setTopText(value);
            }
        } else if (name === "bottomText") {
                let el1 = document.getElementById("Bottom Text");
                if(el1){
                    setBottomLimit(el1.offsetHeight);
                }
                if(bottomLimit < (item.height/2) || bottomText > value) {
                    setBottomText(value);
                }
        }
    };

    //checkboxChange

    const handleSubmit = (event) => {
        event.preventDefault();
        const randNum = Math.floor(Math.random() * meme.length);
        const randMeme = meme[randNum];
        setItem({
            id: randMeme.id,
            box_count: randMeme.box_count,
            height: randMeme.height,
            width: randMeme.width,
            name: randMeme.name,
            img: randMeme.url
        });
    };

    return (
        <div>
            <h1 className="center">MEME GENERATOR SECTION</h1>
            <div className="random-meme center">
                <button className="pb-15" onClick={handleSubmit}> RANDOM MEME IMG </button>
            </div>

            <form className="meme-form" onSubmit={handleSubmit}>
                <div className="meme-input">
                    <label className="text-bold comic-font">Top Text</label>

                    <div className="settings">
                        <div className="input-settings-color">
                            <label className="settings-title">Color</label> 
                            <div className="color-options">
                                <div
                                    className="color-option"
                                    style={{ backgroundColor: "black" }}
                                    onClick={() => setTopColor('color-black')}
                                />
                                <div
                                    className="color-option"
                                    style={{ backgroundColor: "white" }}
                                    onClick={() => setTopColor('color-white')}
                                />
                            </div>
                        </div>

                        <div className="input-settings-color">
                            <label className="settings-title">Text Align</label> 
                            <div className="display-flex">
                                <div className="align-option" onClick={() => setTextAlign(' text-align-left ')}>
                                    <img src={AlignLeftIcon} alt="Left Align" width="25" height="15" />
                                </div>
                                <div className="align-option" onClick={() => setTextAlign(' text-align-center ')}>
                                    <img src={AlignCenterIcon} alt="Center Align" width="25" height="15" />
                                </div>
                                <div className="align-option" onClick={() => setTextAlign(' text-align-right ')}>
                                    <img src={AlignRightIcon} alt="Right Align" width="25" height="15" />
                                </div>
                            </div>                
                        </div>

                        <div className="input-settings-color">
                            <label className="settings-title">Font Size</label>
                            <div className="display-flex">
                                <fieldset className="font-size-option"  onClick={() => reduce ? setFontSize(fontSize - 1) : null}>
                                        <img src={ReduceSize} alt="Font Size" width="15" height="15" />
                                </fieldset>
                                <div className="font-size-option no-cursor">
                                        <img src={FontSize} alt="Font Size" width="25" height="25" />
                                </div>
                                <fieldset className="font-size-option" onClick={() => increase ? setFontSize(fontSize + 1) : null}>
                                        <img src={IncreaseSize} alt="Font Size" width="15" height="15" />
                                </fieldset>
                            </div>
                        </div>
                    </div>

                    <textarea
                        type="text"
                        name="topText"
                        className="margin-10 input-pretender"
                        placeholder="Top Text"
                        value={topText}
                        onChange={handleChange}
                    />

                    <label className="pt-5 text-bold comic-font">Bottom Text</label>
                    <div >
                        <label class="same-settings">Same Settings
                            <input className="checkbox" type="checkbox" checked="checked" onChange={checkboxChange}/>
                            <span class="checkmark"></span>
                        </label>
                    </div>

                    <textarea
                        type="text"
                        name="bottomText"
                        className="margin-10 input-pretender"
                        placeholder="Bottom Text"
                        value={bottomText}
                        onChange={handleChange}
                    />

                    <button className="">SUBMIT</button>
                </div>

                <div className="display-flex-col">
                    <div className="center settings-title grey">
                        <h2 className="center">"{item.name}"</h2>
                    </div>
                    <div className="meme limit">
                        <img src={item.img} alt={item.name} />
                        <h2 id="Top Text" className={"top " + topColor + " " + textAlign + " font-size-" + fontSize} style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>{topText}</h2>
                        <h2 id="Bottom Text" className={"bottom " + topColor + " " + textAlign + " font-size-" + fontSize} style={{ whiteSpace: 'pre-wrap' }}>{bottomText}</h2>
                    </div>
                    
                </div>

                
            </form>

            <div className="center row">
                <div>
                    <label > original size {item.width} x {item.height}</label>
                </div>
            </div>
            
        </div>
    );
};

export default MemeGenerator;
