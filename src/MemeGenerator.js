import React, { useState, useEffect } from "react";
import "./utils/MemesLink";
import meme from "./utils/MemesLink";
//import Circle from '@uiw/react-color-circle';//uninstall!
import AlignLeftIcon from './assets/icons/textAlign/align-left.png';
import AlignCenterIcon from './assets/icons/textAlign/format.png';
import AlignRightIcon from './assets/icons/textAlign/align-right.png';
import FontSize from './assets/icons/fontSize/font-size.png';

const MemeGenerator = () => {
    const [topText, setTopText] = useState("");
    const [bottomText, setBottomText] = useState("");
    //const [hex, setHex] = useState('#F44E3B');
    const [boxColor, setBoxColor] = useState('black');
    const [textAlign, setTextAlign] = useState('center');
    const [allMemeImgs, setAllMemeImgs] = useState([]);
    const [item, setItem] = useState({
        id: "61579",
        box_count: 2,
        height: 335,
        width: 568,
        name: "One Does Not Simply",
        img: "http://i.imgflip.com/1bij.jpg"
    });

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
            setTopText(value);
        } else if (name === "bottomText") {
            setBottomText(value);
        }
    };

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
            <form className="meme-form" onSubmit={handleSubmit}>
                <div className="meme-input">
                    <label className="text-bold comic-font">Top Text</label>

                    <div className="input-settings">
                        <label className="settings-title">Color</label>
                        <label className="settings-title">Text Align</label>             
                        <label className="settings-title">Font Size</label>         
                    </div>

                    <div className="input-settings">
                        <div className="color-options">
                            <div
                                className="color-option"
                                style={{ backgroundColor: "black" }}
                                onClick={() => setBoxColor('black')}
                            />
                            <div
                                className="color-option"
                                style={{ backgroundColor: "white" }}
                                onClick={() => setBoxColor('white')}
                            />
                        </div>


                        <div className="align-options">
                            <div className="align-option" onClick={() => setTextAlign('left')}>
                                <img src={AlignLeftIcon} alt="Left Align" width="25" height="15" />
                            </div>
                            <div className="align-option" onClick={() => setTextAlign('center')}>
                                <img src={AlignCenterIcon} alt="Center Align" width="25" height="15" />
                            </div>
                            <div className="align-option" onClick={() => setTextAlign('right')}>
                                <img src={AlignRightIcon} alt="Right Align" width="25" height="15" />
                            </div>
                        </div>
                            
                        <div className="align-options">
                            <div className="align-option" onClick={() => setTextAlign('left')}>
                                <img src={FontSize} alt="Font Size" width="25" height="25" />
                            </div>
        
                        </div>
                     </div>

                    <input
                        type="text"
                        name="topText"
                        className="margin-10"
                        placeholder="Top Text"
                        value={topText}
                        color={boxColor}
                        onChange={handleChange}
                    />




                    <label className="pt-5 text-bold comic-font">Bottom Text</label>
                    <input
                        type="text"
                        name="bottomText"
                        className="margin-10"
                        placeholder="Bottom Text"
                        value={bottomText}
                        onChange={handleChange}
                    />
                </div>
                <button className="pb-15">RANDOM MEME</button>
            </form>
            <div className="meme grey">
                <h2 className="center">"{item.name}"</h2>
            </div>
            <div className="meme limit">
                <img src={item.img} alt={item.name} />
                <h2 className="top">{topText}</h2>
                <h2 className="bottom">{bottomText}</h2>
            </div>
            <div className="center row">
                <div>
                    <label > image hight:</label>
                    <label > {item.height}</label>
                </div>
                <div>
                    <label>image width:</label>
                    <label > {item.width}</label>
                </div>
            </div>
        </div>
    );
};

export default MemeGenerator;


//div>

// <h1 className="center">MEME GENERATOR SECTION</h1>
// <form className="meme-form" onSubmit={this.handleSubmit}>
//     <div className="meme-input ">
//         <label className="pb-15 text-bold">Top Text</label>
//         <div className="input-settings">
//             <label className="settings-item pb-15 pt-5">Color</label>
//             <label className="settings-item pb-15 pt-5">Text Align</label>
//             <label className="settings-item pb-15 pt-5">Font Size</label>
//         </div>
//         <div className="input-settings">
//             {/* <Circle 
//                 colors={[ '#F44E3B', '#FE9200', '#FCDC00', '#DBDF00' ]}
//                 color={hex}
//                 onChange={(color) => {
//                     // setHex(color.hex);
//                 }}
//             /> */}

            
//             <label className="settings-item pb-15 pt-5">Text Align</label>
//             <label className="settings-item pb-15 pt-5">Font Size</label>
//         </div>
//         <input
//         type="text"
//         name="topText"
//         className="margin-10"
//         placeholder="Top Text"
//         value={this.state.topText}
//         onChange={this.handleChange}
//         />

//         <label className="pb-15 pt-5">Bottom Text</label>
//         <input
//             type="text"
//             name="bottomText"
//             className="margin-10"
//             placeholder="Bottom Text"
//             value={this.state.bottomText}
//             onChange={this.handleChange}
//         />
//      </div>
//     <div className="input-setting">
    
//     </div>
//         <button className="pb-15">RANDOM MEME</button>
// </form>
// <div className="meme grey">
//     <h2 className="center">"{this.state.item.name}"</h2>
// </div>

// <div className="meme limit">
//     <img src={this.state.item.img} alt={this.state.item.name} />
//     <h2 className="top">{this.state.topText}</h2>
//     <h2 className="bottom">{this.state.bottomText}</h2>

// </div>

// <div className="center row">
//     <div>
//         <label > image hight:</label>
//         <label > {this.state.item.height}</label>
//     </div>
    
//     <div>
//         <label>image wight:</label>
//         <label > {this.state.item.width}</label>
//     </div>
// </div>
// </div>