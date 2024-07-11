import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from 'react-redux';
// import { useFetch } from '../../hooks/useFetch.js';
import {
    Form,
    // useNavigate,
    // useNavigation,
    // useActionData,
    // json,
    // redirect
  } from 'react-router-dom';

import SettingsLine from './SettingsLine'; // assuming you have created a separate Settings component
import ImgSettings from './ImgSettings'; // assuming you have created a separate Settings component
// import BtnIcon from '../assets/icons/btn/pokeball.png';
import DeleteIcon from '../../assets/icons/btn/garbage.png';
import AddIcon from '../../assets/icons/btn/add.png';
// import ScrollSide from "./ScrollSide";
import DraggableComponent from "./DraggableComponent";
// import Error from '../../pages/Error.js';
import MemeCatalog from "./MemeCatalog";
import html2canvas from 'html2canvas';

// import TextLine from './TextLine'; // Adjust the path as per your project structure
import SetSameSettings from './SetSameSettings'; // Adjust the path as per your project structure



// import TextGeneratorAI from "./TextGeneratorAI";
import "../../style.css";

const MemeGenerator = () => {
    const lines = useSelector(state => state.lines);
    const hideSettings = useSelector(state => state.hideSettings);
    const item = useSelector(state => state.item);
    const flip = useSelector(state => state.flip);

    const dispatch = useDispatch();
    
    const [picInfo, setPicInfo] = useState();
    // const [aiRequest, setAiRequest] = useState(false);
    var memeRef = useRef(null);

   
    const [allMemeImgs, setAllMemeImgs] = useState([]);
   
    //ACTIONS
    const setLines = (newLines) => {
        dispatch({ type: 'SET_LINES', payload: newLines });
    };

    const setHideSettings = (hide) => {
        dispatch({ type: 'SET_HIDE_SETTINGS', payload: hide });
    };

    const setItem = (newItem) => {
        dispatch({ type: 'SET_ITEM', payload: newItem });
    };

    const setFlip = (flip) => {
        dispatch({ type: 'FLIP_IMG', payload: flip });
    };


    //re-execute every time when the item will changed
    useEffect(() => {
        // Update the memeElement ref whenever item changes
        memeRef.current = document.getElementById('meme-box');
        setPicInfo(() => memeRef.current.getBoundingClientRect());
    }, [item]);



    //called only once, at the first time when the comonent created
    // cause of dependencies to [] array that never changed.
    //need to add await and try catch and move to separate file and call it 
    //memeForm have the same code
    //or maybe will be good solution to create a new custom hook that do this useEffect
    //
    useEffect(() => {
        fetch("https://api.imgflip.com/get_memes")
            .then(response => response.json())
            .then(response => { 
                const { memes } = response.data;
                setAllMemeImgs(memes);
            });
    }, []);
    // const {
    //     isFetching,
    //     fetchedData,
    //     setFetchedData,
    //     error
    //   } = useFetch();

    //     useEffect(() => {
            
        
    //           if (error) {
    //             return <Error title="An error occurred1!" message={error.message} />;
    //           }
        
    //           if(!isFetching){
    //             console.log(fetchedData)
    //               setAllMemeImgs(fetchedData.data.memes);
    //           }
        
    // }, []);
   

      //



    //change the line set limit height by the meme height
    function handleChange(event, index) {
        const { value } = event.target;
        const newLines = [...lines];
        newLines[index].text = value;
        setLines(newLines);
    };

    //checkboxChange
    function checkboxChange(event) {
        const { name } = event.target;
        if (name === "checkbox") {
            const updateSettings = lines.map((line, index) => {
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
            setLines(updateSettings);  
            setHideSettings(!hideSettings);
        }
    };

    function handleSubmit(event) {
        event.preventDefault();
        const memeBox = document.getElementById('meme-box');
    
        // Use html2canvas to render the meme-box to a canvas
        html2canvas(memeBox, { useCORS: true }).then(canvas => {
            // Convert the canvas to a data URL
            const dataUrl = canvas.toDataURL();
    
            // Optionally, create a link element to download the image
            const a = document.createElement('a');
            a.setAttribute('download', 'meme.png');
            a.setAttribute('href', dataUrl);
            a.click();
        });
    }


    function setColor(index, color) {
        console.log("I'm trying!!");
        const updatedData = lines.map((line, i) => {
                if ((i === index || (index === 0 && hideSettings))) {
                    return { ...line, color };
                }
                return line;
            });
        setLines(updatedData);
    };

    function setTextAlign(index, textAlign) {
        const updatedLines = lines.map((line, i) => {
                if ((i === index || (index === 0 && hideSettings))) {
                    return { ...line, textAlign };
                }
                return line;
            });
        setLines(updatedLines);
    };

    function setFontSize(index, operation) {
        const newLines = lines.map((line, i) => {
                                if ((i === index || (index === 0 && hideSettings)) && (operation === "reduce" || operation === "increase")) {
                                    return { ...line, fontSize: operation === "reduce" ? line.fontSize - 1 : line.fontSize + 1 };
                                }
                                return line;
        });

        setLines(newLines);
    };

    function addLine() {
        const newLine = {
            text: "",
            color: hideSettings ? lines[0].color : "color-white ",
            textAlign: hideSettings ? lines[0].textAlign : 'text-align-center ',
            fontSize: hideSettings ? lines[0].fontSize : 10
        };
        setLines([...lines, newLine]);
    };

    function deleteLine(index) {
        if (lines.length > 1) {
            const newLines = lines.filter((line, i) => i !== index);
            setLines(newLines);
        }
    }

    return (
        <>
            <MemeCatalog
                allMemeImgs={allMemeImgs}
                setItem={setItem}
                handleSubmit={handleSubmit}
            />

        <section>
        <hr className="solid"></hr>
            <div className='title-section generator'>
                <h1  className="center ">MEME GENERATOR SECTION</h1>
            </div>
    
            <div className="edit-area">
                <Form className="meme-form" onSubmit={handleSubmit}>
                    <div className="meme-input">

                        <ImgSettings
                            setFlip={() => setFlip(!flip)}
                        />

                        {lines.map((line, index) => (
                            <div key={index}>
                            <div className="meme-input-item">
                                <div className="title-line">
                                <label>Text {`#${index + 1}`}: </label>

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
                                    placeholder={"Top Text"}
                                    value={line.text}
                                    onChange={(event) => handleChange(event, index)}
                                />  
                                : 
                                <div className="display-flex">
                                    <textarea
                                        type="text"
                                        name={"text-" + {index}}
                                        className={"margin-10 " + (index !== 0) ?  "lines " : "line-0 "}
                                        placeholder={index === 0 ? "Top Text" : (index < 2 ? "Bottom Text" : `Text #${index+1}`)}
                                        value={line.text}
                                        onChange={(event) => handleChange(event, index)}
                                    />  
                                    <button className="btn-delete" onClick={() => deleteLine(index)}>
                                        <img draggable="false" src={DeleteIcon} alt="Delete" border="0" width={45} height={45}/>
                                    </button>    
                                </div>
                                }
                            </div>
                        
                            {index === 0 && lines.length > 1 && (
                                <SetSameSettings
                                    hideSettings={hideSettings}
                                    checkboxChange={checkboxChange}
                                />
                            )}

                            <hr className="solid"></hr>
                        </div>
                            
                        ))}

                        {/* {lines.map((line, index) => (
                                        <TextLine
                                            key={index}
                                            index={index}
                                            line={line}
                                            template={lines[0]} // Adjust as per your requirement
                                            setColor={(color) => setColor(index, color)} // Example, adjust based on your logic
                                            setTextAlign={(textAlign) => setTextAlign(index, textAlign)} // Example
                                            setFontSize={(operation) => setFontSize(index, operation)} // Example
                                            handleChange={handleChange}
                                            deleteLine={deleteLine}
                                            hideSettings={hideSettings}
                                        />
                                    ))} */}

                        <div className="meme-input-btn ">
                            <button className="button-39 " type="button" onClick={addLine}> <img src={AddIcon} alt="buttonpng" border="0" width={20} height={20} /> 
                                 Add Text</button>
                        </div>

                        <button className="button-39" type="button" style={{verticalAlign: 'middle'}} onClick={addLine}>Save in My Memes</button>
                        <button className="download-btn" style={{verticalAlign: 'middle'}} type="submit"><span>Download</span></button>

                    </div>
                </Form>

                <div className="display-meme">
                    <div 
                    id="meme-box" 
                    className="meme-box meme limit">
                        <img draggable="false" className={(flip ? "meme-flip " : "") + "meme-img"} src={item.img} alt={item.name} />
                        {lines.map((line, index) => (
                            <DraggableComponent
                                key={index}
                                unique={index}
                                line={line}
                                imgId={item.id}
                                boxCount={item.box_count}
                                info={picInfo}
                            />
                        ))}
                    </div>
                    <div className="center settings-title grey">
                        <h2 className="center font-comic">{item.name}</h2>
                    </div>
                </div>
             
            </div>  

            
            <div className=" col-6 center row flex display">
                <br/>
                
                <label > original size {item.width} x {item.height}</label>
                <label > boxes {item.box_count} </label>
                <label > id {item.id} </label>
            </div>
            </section>
        </>
    );
};

export default MemeGenerator;
