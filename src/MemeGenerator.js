import React from "react"
import "./MemesLink"
import meme from "./MemesLink";

class MemeGenerator extends React.Component {
    constructor(){
        super()
        this.state = {
            
            topText: "",
            bottomText: "",
            randomImg: "http://i.imgflip.com/1bij.jpg",
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
            randomImg: randMeme.url,
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
                    <input
                    type="text"
                    name="topText"
                    placeholder="Top Text"
                    value={this.state.topText}
                    onChange={this.handleChange}
                    />

                    <input
                        type="text"
                        name="bottomText"
                        placeholder="Bottom Text"
                        value={this.state.bottomText}
                        onChange={this.handleChange}
                    />

                    <button>Generate</button>
                </form>
                <div className="meme grey w3-cursive">
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

export default MemeGenerator