import React, { useState, useEffect, useRef } from 'react';
import {
  Form,
  useNavigate,
  useNavigation,
  useActionData,
  json,
  redirect,
} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import html2canvas from 'html2canvas';


import ImgSettings from './old/ImgSettings'; // assuming you have created a separate Settings component
import SettingsLine from './old/SettingsLine'; // assuming you have created a separate Settings component
import SetSameSettings from './old/SetSameSettings'; // Adjust the path as per your project structure
import DraggableComponent from "./old/DraggableComponent";
import MemeCatalog from "./old/MemeCatalog";

import DeleteIcon from './../assets/icons/btn/garbage.png';
import AddIcon from './../assets/icons/btn/add.png';

import { getAuthToken } from '../util/auth';
import classes from './MemeForm.module.css';

function MemeForm({ method, meme }) {
  
  const actionData = useActionData();
  const navigate = useNavigate();
  const navigation = useNavigation(); 

  const isSubmitting = navigation.state === 'submitting';
  const lines = useSelector(state => state.lines);
  const hideSettings = useSelector(state => state.hideSettings);
  const item = useSelector(state => state.item);
  const flip = useSelector(state => state.flip);
  const flipY = useSelector(state => state.flipY);

  const [picInfo, setPicInfo] = useState();
  // const [aiRequest, setAiRequest] = useState(false);
  var memeRef = useRef(null);

 
  const [allMemeImgs, setAllMemeImgs] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
        .then(response => response.json())
        .then(response => { 
            const { memes } = response.data;
            setAllMemeImgs(memes);
        });
}, []);

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
const setFlipY = (flip) => {
  dispatch({ type: 'FLIP_Y_IMG', payload: flip });
};
//FLIP_IMG_X

    //re-execute every time when the item will changed
  useEffect(() => {
      // Update the memeElement ref whenever item changes
      memeRef.current = document.getElementById('meme-box');
      setPicInfo(() => memeRef.current.getBoundingClientRect());
  }, [item]);

function cancelHandler() {
  navigate('..');
}

    //change the line set limit height by the meme height
    function handleChange(event, index) {
      const { value } = event.target;
      if(value && hideSettings){
        setColor(0, lines[0].color);
      }
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
                      fontSize: lines[0].fontSize,
                      x: 0,
                      y: 0
                  };
              }
              return line;
          });
          setLines(updateSettings);  
          setHideSettings(!hideSettings);
      }
  };

  function handleDownload(event) {
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

  function handleSubmit(event) {
  console.log("Click!!")
  event.preventDefault();

  const dataToSubmit = generateData();

  const formData = new FormData(event.target);
    const searchParams = new URLSearchParams();

    for (const [key, value] of formData.entries()) {
      searchParams.append(key, value);
    }

    // Append the generated data to the searchParams
    searchParams.append('generatedData', dataToSubmit);
    // navigation.setParams(params);

    console.log("end of hamdleSubmit")
    navigate("/memes/new", {replace: true});
  }

  const generateData = () => {
    const memeBox = document.getElementById('meme-box');
    const  updatedLines = lines.map((line, index) => {
      const memeTextElement = document.getElementById(`meme-text-${index}`);
      if (memeTextElement) {
        const { offsetLeft: x, offsetTop: y } = memeTextElement;
        return {
          ...line,
          x,
          y,
        };
      }
      return line;
    });
      const data = {
        lines: updatedLines,
        item: item,
        flip: flip,
        flipY: flipY,
        // memeBox: memeBox
      };
      return data;
  };

  function setColor(index, color) {
      const updatedData = lines.map((line, i) => {
              if ((i === index || (index === 0 && hideSettings))) {
                  return { ...line, color };
              }
              return line;
          });
      setLines(updatedData);
  };


  useEffect(() => {
    if(meme){
      //update the state
      setLines(meme.lines);
      setItem(meme.item);
      setFlip(meme.flip);
      setFlipY(meme.flipY);
    }
    setColor(0,'color-white');
  }, []);
  
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
          color: hideSettings ? lines[0].color : "color-white",
          textAlign: hideSettings ? lines[0].textAlign : 'text-align-center',
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

  return (<>
            <MemeCatalog
                allMemeImgs={allMemeImgs}
                setItem={setItem}
            />

            <section>
            <hr className="solid"></hr>
            <h1  className="center">MEME GENERATOR SECTION</h1>
           
            <div className={classes['edit-area']}>
              <Form 
              className={`${classes['meme-form']} ${classes.form}`} 
              method={method}
              id="meme-form"
              name="meme-form"
              htmlFor="meme-form"
              onSubmit={handleSubmit}
              > 
                 {actionData && actionData.errors && (
                  <ul>
                    {Object.values(actionData.errors).map((err) => (
                      <li key={err}>{err}</li>
                    ))}
                  </ul>
                )}
                 <div className={`${classes['meme-input']}`}>

                  <ImgSettings
                      flip={flip}
                      flipY={flipY}
                      setFlip={() => setFlip(!flip)}
                      setFlipY={() => setFlipY(!flipY)}
                  />

                  {lines.map((line, index) => (
                      <div key={index}>
                        <hr className="solid"></hr>
                      <div className={classes['meme-input-item']}>
                        <div className="title-line">
                          <label>Text {`#${index + 1}`}: </label>
                        </div>
                        <SettingsLine 
                            id={`line-` + index}
                            name={`line-` + index}
                            index={index}
                            line={lines[index]}
                            template={lines[0]}
                            setColor={(color) => setColor(index, color)}
                            setTextAlign={(textAlign) => setTextAlign(index, textAlign)}
                            setFontSize={(operation) => setFontSize(index, operation)}
                            hideSettings={hideSettings}
                        />

                          {(index === 0) ? <textarea
                              type="input"
                              name={"text-" + {index}}
                              className={`${classes['margin-10']} ${index !== 0 ? classes.lines : classes['line-0']}`}
                              placeholder={"Top Text"}
                              value={line.text}
                              onChange={(event) => handleChange(event, index)}
                          />  
                          : 
                          <div className={classes['display-flex']}>
                              <textarea
                                  id={"text-" + {index}}
                                  type="input"
                                  name={"text-" + {index}}
                                  className={classes['margin-10'] +  " "  + (index !== 0) ? classes.lines : classes['line-0']}
                                  placeholder={index === 0 ? "Top Text" : (index < 2 ? "Bottom Text" : `Text #${index+1}`)}
                                  value={line.text}
                                  onChange={(event) => handleChange(event, index)}
                              />  
                              <button className={classes['btn-delete']} type="button" onClick={() => deleteLine(index)}>
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
                  </div>
                  ))}

                    <div className={classes['meme-input-btn'] + " center"}>
                        <button 
                        className={classes['button-39'] + " margin-10"} 
                        type="button" onClick={addLine}> 
                          <img 
                          src={AddIcon} 
                          alt="buttonpng" 
                          className="icon-invert margin-r-10"
                          border="0" 
                          width={20} 
                          eight={20} 
                          /> 
                              Add Text Line
                        </button>
                    </div>
                    <hr className="solid"></hr>
                    <div ></div>

                    <button 
                    className={classes['button-39'] + " margin-10"} 
                    type="submit"
                    style={{verticalAlign: 'middle'}} 
                    disabled={isSubmitting}
                    >
                       {isSubmitting ? 'Saving...' : 'Save Meme'}
                    </button>

                    <div className="center">
                      <button 
                      className={classes['download-btn']} 
                      style={{verticalAlign: 'middle'}} 
                      type="button" 
                      onClick={handleDownload}
                      >
                        <span>Download</span>
                      </button>
                    </div>
                </div>
        <div className={classes.actions}>
          <button type="button" onClick={cancelHandler} disabled={isSubmitting}>
            Cancel
          </button>
        </div>
        </Form>

        <div className={`${classes['display-meme'] + classes.form}`}>
            <div 
            id="meme-box" 
            className={`${classes['meme-box']} center`}>
                <img 
                draggable="false" 
                className={(flip ? classes['meme-flip'] : "") + " " + (flipY ? classes['meme-flip-y'] : "")} 
                src={item.img} 
                alt={item.name} 
                />
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
            <div className="center margin-10">
                <h2 className="font-comic">{item.name}</h2>
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
}

export default MemeForm;

//export async function action({ request, params }) {
export async function action(memeData, method) {

  console.log("action function runs: ");

  let url = 'http://localhost:8080/memes';

  if (method === 'PATCH') {
    const memeId = memeData.id;
    url = 'http://localhost:8080/memes/' + memeId; 
  }

  console.log(url);
  console.log("method: " + method);
  // console.log( "id: " + memeData.id);
  console.log("memeData: ");
  console.log(memeData);

  const token = getAuthToken();
    const response = await fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify(memeData),
    });
  
    if (response.status === 422) {
      return response;
    }
  
    if (!response.ok) {
      throw json({ message: 'Could not save meme.' }, { status: 500 });
    }
    console.log("RESPONSE!!!!!")
    console.log(response);

  return redirect('/memes');
}
