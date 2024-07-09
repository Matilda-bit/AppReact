// TextLine.js

import React from 'react';
import DeleteIcon from '../../assets/icons/btn/delete.png'; // Adjust path as per your project structure
import SettingsLine from './SettingsLine'; // assuming you have created a separate Settings component

const TextLine = ({ index, line, template, setColor, setTextAlign, setFontSize, handleChange, deleteLine, hideSettings }) => {

    return (
        <div className="meme-input-item">
             <div className="title-line">
                                    <label >{index === 0 ? "Text " + (index+1) : "Text " + (index+1)}</label>
                                </div>
                                <SettingsLine 
                                    index={index}
                                    line={line}
                                    template={template}
                                    setColor={(color) => setColor(index, color)}
                                    setTextAlign={(textAlign) => setTextAlign(index, textAlign)}
                                    setFontSize={(operation) => setFontSize(index, operation)}
                                    hideSettings={hideSettings}
                                />

                                {(index === 0) ? <textarea
                                    type="text"
                                    name={"text-" + {index}}
                                    className={"margin-10 " + (index !== 0) ?  "lines " : "line-0 "}
                                    placeholder={index === 0 ? "Top Text" : "Bottom Text"}
                                    value={line.text}
                                    onChange={(event) => handleChange(event, index)}
                                />  
                                : 
                                <div className="display-flex">
                                    <textarea
                                        type="text"
                                        name={"text-" + {index}}
                                        className={"margin-10 " + (index !== 0) ?  "lines " : "line-0 "}
                                        placeholder={index === 0 ? "Top Text" : "Bottom Text"}
                                        value={line.text}
                                        onChange={(event) => handleChange(event, index)}
                                    />  
                                    <button className="btn-delete" type="submit" onClick={() => deleteLine(index)}>
                                        <img draggable="false" src={DeleteIcon} alt="Delete" border="0" width={45} height={45}/>
                                    </button>    
                                </div>
                                }
            </div>
           
    );
};

export default TextLine;
