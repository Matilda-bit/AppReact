import React from 'react';
import AlignLeftIcon from './assets/icons/textAlign/align-left.png';
import AlignCenterIcon from './assets/icons/textAlign/format.png';
import AlignRightIcon from './assets/icons/textAlign/align-right.png';
import FontSize from './assets/icons/fontSize/font-size.png';
import ReduceSize from './assets/icons/fontSize/down.png';
import IncreaseSize from './assets/icons/fontSize/up.png';

const Settings = ({ setColor, setTextAlign, setFontSize, setColorTotal, setTextAlignTotal, setFontSizeTotal, color, textAlign, fontSize, reduce, increase, hideSettings }) => {
    return (
        <div className="settings">
            <div className="input-settings-color">
                <label className="settings-title">Color</label>
                <div className="color-options">
                    <div
                        className="color-option"
                        style={{ backgroundColor: "black" }}
                        onClick={() => { setColor('color-black'); hideSettings && setColorTotal('color-black'); }}
                    />
                    <div
                        className="color-option"
                        style={{ backgroundColor: "white" }}
                        onClick={() => { setColor('color-white'); hideSettings && setColorTotal('color-white'); }}
                    />
                </div>
            </div>

            <div className="input-settings-color">
                <label className="settings-title">Text Align</label>
                <div className="display-flex">
                    <div className="align-option" onClick={() => { setTextAlign(' text-align-left '); hideSettings && setTextAlignTotal(' text-align-left '); }}>
                        <img src={AlignLeftIcon} alt="Left Align" width="25" height="15" />
                    </div>
                    <div className="align-option" onClick={() => { setTextAlign(' text-align-center '); hideSettings && setTextAlignTotal(' text-align-center '); }}>
                        <img src={AlignCenterIcon} alt="Center Align" width="25" height="15" />
                    </div>
                    <div className="align-option" onClick={() => { setTextAlign(' text-align-right '); hideSettings && setTextAlignTotal(' text-align-right '); }}>
                        <img src={AlignRightIcon} alt="Right Align" width="25" height="15" />
                    </div>
                </div>
            </div>

            <div className="input-settings-color">
                <label className="settings-title">Font Size</label>
                <div className="display-flex">
                    <fieldset className="font-size-option" onClick={() => reduce ? setFontSize(fontSize - 1) : null}>
                        <img src={ReduceSize} alt="Font Size" width="15" height="15" />
                    </fieldset>
                    <div className="font-size-option no-cursor">
                        <img src={FontSize} alt="Font Size" width="25" height="25" />
                    </div>
                    <fieldset className="font-size-option" onClick={() => increase ? setFontSize(fontSize + 1) : null}>
                        <img src={IncreaseSize} alt="Font Size" width="15" height="15" />
                    </fieldset>
                </div>
            </div>
        </div>
    );
};

export default Settings;
