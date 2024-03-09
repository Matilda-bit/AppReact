import React, { useState, useEffect } from "react";
import "./utils/MemesLink";
import meme from "./utils/MemesLink";
import Circle from '@uiw/react-color-circle';

const MemeGenerator = () => {
    const [topText, setTopText] = useState("");
    const [bottomText, setBottomText] = useState("");
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
                    <label className="pb-15 text-bold">Top Text</label>
                    <input
                        type="text"
                        name="topText"
                        className="margin-10"
                        placeholder="Top Text"
                        value={topText}
                        onChange={handleChange}
                    />
                    <label className="pb-15 pt-5">Bottom Text</label>
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
