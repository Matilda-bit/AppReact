import React,{Component} from 'react';


class App extends Component {
    constructor (){
        super()
        this.state = {
            firstName: null,
            lastName: null,
            age: null,
            gender: "",
            destination: "",
            dietaryRestrictions: {
                isVegan: false,
                isKosher: false,
                islactoseFree: false
            }
        }
        this.handleChange = this.handleChange.bind(this)
    }
    handleChange(event){
        const {name, value} = event.target
        this.setState({[name]: value})
    }


    render() {
        return (
            <main>
                <form>

                    <input
                        name="first"
                        value={this.state.firstName}
                        onChange={this.handleChange}
                        placeholder="First Name" />

                        <br />

                    <input
                        name="last"
                        value={this.state.lastName}
                        onChange={this.handleChange}
                        placeholder="Last Name" />

                        <br />
               >
                    <input
                        name="age"
                        value={this.state.age}
                        onChange={this.handleChange}
                        placeholder="Age" />

                    <br />
                    <label>
                        <input
                            type="radio"
                            name="gender"
                            value="male"
                            checked={this.state.gender==="male"}
                            onChange={this.handleChange}

                        />Male
                    </label>
                    <br />
                    <label>
                        <input
                            type="radio"
                            name="gender"
                            value="female"
                            checked={this.state.gender === "female"}
                            onChange={this.handleChange}

                        />Female
                    </label>

                    <br />
                    <select
                        value={this.state.destination}
                        name="destination"
                        onChange={this.handleChange}>
                        <option value="">--Please Choose a distanation--</option>
                        <option value="germany">Germany</option>
                        <option value="norway">Norway</option>
                        <option value="north pole">North pole</option>
                        <option value="south pole">South pole</option>

                    </select>

                    <br />

                    <label>
                        <input
                            type="checkbox"
                            name="isVegan"
                            onChange={this.handleChange}
                            checked={this.state.dietaryRestrictions.isVegan}
                        /> isKosher?
                    </label>

                    <label>
                        <input
                            type="checkbox"
                            name="isKosher"
                            onChange={this.handleChange}
                            checked={this.state.dietaryRestrictions.isKosher}
                        /> Vegan?
                    </label>

                    <label>
                        <input
                            type="checkbox"
                            name="islactoseFree"
                            onChange={this.handleChange}
                            checked={this.state.dietaryRestrictions.islactoseFree}
                        /> islactoseFree?
                    </label>
                </form>
                <br />
                <br />
                <br />

                <button>Submit</button>
                <hr />

                <h2>Entered information:</h2>
                <p>Your name: {this.state.firstName} {this.state.lastName}</p>
                <p>Your age: {this.state.age}</p>
                <p>Your gender: {this.state.gender}</p>
                <p>Your destination: {this.state.destination}</p>
                <p>Your dietary restrictions: {this.state.dietaryRestrictions}</p>




            </main>
        )
    }
}
export default App;
