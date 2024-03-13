import React from 'react';
import FlipIcon from './assets/icons/btn/flip.png';


const SettingsLine = ({setFlip }) => {
    return (
        <div className="settings settings-img">
            <div className="input-settings-color settings-img-items">
                <label className="font-monospace">Flip</label>
                <div className="display-flex">
                    <fieldset className="flip-option" onClick={() => setFlip()}>
                        <img src={FlipIcon} alt="flip" width="30" height="25" />
                    </fieldset>
                </div>
            </div>
        </div>
    );
};

export default SettingsLine;
