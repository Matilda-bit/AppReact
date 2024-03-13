import React from 'react';
import AlignLeftIcon from '../assets/icons/textAlign/align-left.png';
import AlignCenterIcon from '../assets/icons/textAlign/format.png';
import AlignRightIcon from '../assets/icons/textAlign/align-right.png';
import FontSize from '../assets/icons/fontSize/font-size.png';
import ReduceSize from '../assets/icons/fontSize/down.png';
import IncreaseSize from '../assets/icons/fontSize/up.png';

const SettingsLine = ({index, line, template, setColor, setTextAlign, setFontSize, hideSettings }) => {
    const tem = index === 0; 
    let reduce = line.fontSize > 6;
    let increase = line.fontSize < 20;
    if(!tem && hideSettings) {
        return null;
    }
    return (
        <div className="settings">
            <div className="input-settings-color">
                <label className="font-monospace">Color</label>
                <div className="color-options">
                    <div
                        className={((line.color === 'color-black ')? "option-selected " : "color-option ")}
                        style={{ backgroundColor: "black" }}
                        onClick={() => { setColor((hideSettings && index !== 0) ? template.color : 'color-black '); }}
                    />
                    <div
                        className={"color-option " + ((line.color === 'color-white ')? "option-selected " : null)}
                        style={{ backgroundColor: "white" }}
                        // onClick={() => { setColor('color-white '); hideSettings && setColor('color-white '); }}
                        onClick={() => { setColor((hideSettings && index !== 0) ? template.color : 'color-white '); }}
                    />
                </div>
            </div>

            <div className="input-settings-color">
                <label className="font-monospace">Text Align</label>
                <div className="display-flex">
                    <div className="align-option" 
                    //onClick={() => { setTextAlign(' text-align-left '); hideSettings && setTextAlign(' text-align-left '); }}
                    onClick={() => { setTextAlign((hideSettings && index !== 0) ? template.setTextAlign : ' text-align-left '); }}
                    >
                        <img src={AlignLeftIcon} alt="Left Align" width="25" height="15" />
                    </div>
                    <div className="align-option" onClick={() => { setTextAlign(' text-align-center '); hideSettings && setTextAlign(' text-align-center '); }}>
                        <img src={AlignCenterIcon} alt="Center Align" width="25" height="15" />
                    </div>
                    <div className="align-option" onClick={() => { setTextAlign(' text-align-right '); hideSettings && setTextAlign(' text-align-right '); }}>
                        <img src={AlignRightIcon} alt="Right Align" width="25" height="15" />
                    </div>
                </div>
            </div>

            <div className="input-settings-color">
                <label className="font-monospace">Font Size</label>
                <div className="display-flex">
                    <fieldset className="font-size-option" onClick={() => reduce ? setFontSize("reduce") : null}>
                        <img src={ReduceSize} alt="Font Size" width="15" height="15" />
                    </fieldset>
                    <div className="font-size-option no-cursor">
                        <img src={FontSize} alt="Font Size" width="25" height="25" />
                    </div>
                    <fieldset className="font-size-option" onClick={() => increase ? setFontSize("increase") : null}>
                        <img src={IncreaseSize} alt="Font Size" width="15" height="15" />
                    </fieldset>
                </div>
            </div>
        </div>
    );
};

export default SettingsLine;
