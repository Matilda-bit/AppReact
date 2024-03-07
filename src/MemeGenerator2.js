import React, { useState } from "react"
import "./utils/MemesLink"
import meme from "./utils/MemesLink";

import Circle from '@uiw/react-color-circle';

const MemeGenerator = (props) => {

}
class test{
    

    constructor(){
        super()
        this.state = {
            
            topText: "",
            bottomText: "",
            allMemeImgs: [],
            item: {
                id: "61579",
                box_count: 2,
                height: 335,
                width: 568,
                name: "One Does Not Simply",
                img: "http://i.imgflip.com/1bij.jpg"
            }

        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount() {
        fetch("http://api.imgflip.com/get_memes")
            .then(response => response.json())
            .then(response => {
                const {memes} = response.data
                this.setState({ allMemeImgs: memes })

            })
        console.log("Len is:", this.state.allMemeImgs.length)
    }

    handleChange(event){

        const{name,value}= event.target
        this.setState({
            [name]: value
        })

    }
    handleSubmit(event){
        event.preventDefault()
        const randNum = (Math.floor(Math.random() * meme.length))
        console.log(meme)
        const randMeme = meme[randNum];

        this.setState({
            item: {
                id: randMeme.id,
                box_count: randMeme.box_count,
                height: randMeme.height,
                width: randMeme.width,
                name: randMeme.name,
                img: randMeme.url
            }
        })
    }

    render(){ 

        return(
            <div>

                <h1 className="center">MEME GENERATOR SECTION</h1>
                <form className="meme-form" onSubmit={this.handleSubmit}>
                    <div className="meme-input ">
                        <label className="pb-15 text-bold">Top Text</label>
                        <div className="input-settings">
                            <label className="settings-item pb-15 pt-5">Color</label>
                            <label className="settings-item pb-15 pt-5">Text Align</label>
                            <label className="settings-item pb-15 pt-5">Font Size</label>
                        </div>
                        <div className="input-settings">
                            {/* <Circle 
                                colors={[ '#F44E3B', '#FE9200', '#FCDC00', '#DBDF00' ]}
                                color={hex}
                                onChange={(color) => {
                                    // setHex(color.hex);
                                }}
                            /> */}

                            
                            <label className="settings-item pb-15 pt-5">Text Align</label>
                            <label className="settings-item pb-15 pt-5">Font Size</label>
                        </div>
                        <input
                        type="text"
                        name="topText"
                        className="margin-10"
                        placeholder="Top Text"
                        value={this.state.topText}
                        onChange={this.handleChange}
                        />

                        <label className="pb-15 pt-5">Bottom Text</label>
                        <input
                            type="text"
                            name="bottomText"
                            className="margin-10"
                            placeholder="Bottom Text"
                            value={this.state.bottomText}
                            onChange={this.handleChange}
                        />
                     </div>
                    <div className="input-setting">
                    
                    </div>
                        <button className="pb-15">RANDOM MEME</button>
                </form>
                <div className="meme grey">
                    <h2 className="center">"{this.state.item.name}"</h2>
                </div>

                <div className="meme limit">
                    <img src={this.state.item.img} alt={this.state.item.name} />
                    <h2 className="top">{this.state.topText}</h2>
                    <h2 className="bottom">{this.state.bottomText}</h2>

                </div>

                <div className="center row">
                    <div>
                        <label > image hight:</label>
                        <label > {this.state.item.height}</label>
                    </div>
                    
                    <div>
                        <label>image wight:</label>
                        <label > {this.state.item.width}</label>
                    </div>
                </div>
            </div>
        )
    }


}

export default MemeGenerator;