import React, { useState, useEffect } from "react";
import "./utils/MemesLink";
import meme from "./utils/MemesLink";
// import AlignLeftIcon from './assets/icons/textAlign/align-left.png';
// import AlignCenterIcon from './assets/icons/textAlign/format.png';
// import AlignRightIcon from './assets/icons/textAlign/align-right.png';
// import FontSize from './assets/icons/fontSize/font-size.png';
// import ReduceSize from './assets/icons/fontSize/down.png';
// import IncreaseSize from './assets/icons/fontSize/up.png';
import BtnIcon from './assets/icons/btn/pokeball.png';

import Settings from './SettingsLine';

const MemeGenerator = () => {
    const [topText, setTopText] = useState("");
    const [bottomText, setBottomText] = useState("");
    const [topColor, setTopColor] = useState("color-white");
    const [bottomColor, setBottomColor] = useState("color-white");
    const [textAlignTop, setTextAlignTop]= useState(' text-align-center ');
    const [textAlignBottom, setTextAlignBottom] = useState(' text-align-center ');
    const [fontSizeTop, setFontSizeTop] = useState(10);
    const [fontSizeBottom, setFontSizeBottom] = useState(10);
    const [hideSettings, setHideSettings] = useState(true);
    const reduce = fontSizeTop > 6;
    const increase = fontSizeTop < 20;
    const [allMemeImgs, setAllMemeImgs] = useState([]);

    const [lines, setLines] = useState({
        0: {
            text: "",
            color: "color-white",
            textAlign: ' text-align-center ',
            fontSize: 10
        },
        1: {
            text: "",
            color: "color-white",
            textAlign: ' text-align-center ',
            fontSize: 10
        }
    });


    const [item, setItem] = useState({
        id: "61579",
        box_count: 2,
        height: 335,
        width: 568,
        name: "One Does Not Simply",
        img: "https://i.imgflip.com/1bij.jpg",
        data: [],
    });

    const [topLimit, setTopLimit] = useState(0);
    const [bottomLimit, setBottomLimit] = useState(0);

    useEffect(() => {
        fetch("https://api.imgflip.com/get_memes")
            .then(response => response.json())
            .then(response => { 
                const { memes } = response.data;
                console.log(response.data);
                setAllMemeImgs(memes);
            });
    }, []);

    const handleChange = (event) => {
        console.log(item.data);
        console.log(meme);
        console.log(allMemeImgs);
        //allMemeImgs
        
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

    const checkboxChange = (event) => {
        
        const {name } = event.target;
        if (name === "checkbox") {
            setTextAlignBottom(textAlignTop);
            setBottomColor(topColor);
            setHideSettings(!hideSettings);
        } 
    };

    const -= = (event) => {
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
                    <label className="text-bold comic-font">Top Text</label>
                    <Settings
                        setColor={lines[0]}
                        setTextAlign={setTextAlignTop}
                        setFontSize={setFontSizeTop}
                        setColorTotal={setBottomColor}
                        setTextAlignTotal={setTextAlignBottom}
                        setFontSizeTotal={setFontSizeBottom}
                        color={topColor}
                        textAlign={textAlignTop}
                        fontSize={fontSizeTop}
                        reduce={reduce}
                        increase={increase}
                        hideSettings={hideSettings}
                    />

                    <textarea
                        type="text"
                        name="topText"
                        className="margin-10 input-pretender"
                        placeholder="Top Text"
                        value={topText}
                        onChange={handleChange}
                    />

                    <div >
                        <label className="same-settings">Same Settings
                            <input className="checkbox" name="checkbox" type="checkbox" checked={hideSettings} onChange={checkboxChange}/>
                            <span className="checkmark"></span>
                        </label>
                    </div>

                    <label className="pt-5 text-bold comic-font">Bottom Text</label>
                    

                    {!hideSettings ? (
                        <Settings
                        setColor={setBottomColor}
                        setTextAlign={setTextAlignBottom}
                        setFontSize={setFontSizeBottom}
                        color={bottomColor}
                        textAlign={textAlignBottom}
                        fontSize={fontSizeBottom}
                        reduce={reduce}
                        increase={increase}
                        hideSettings={hideSettings}
                    />)

                     : null}

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
                        <h2 id="Top Text" className={"top " + topColor + " " + textAlignTop + " font-size-" + fontSizeTop} style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>{topText}</h2>
                        <h2 id="Bottom Text" className={"bottom " + bottomColor + " " + textAlignBottom + " font-size-" + fontSizeBottom} style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>{bottomText}</h2>
                    </div>
                </div>

                
            </form>

            <div className="center row">
                <label > original size {item.width} x {item.height}</label>
            </div>
            
        </div>
    );
};

export default MemeGenerator;
