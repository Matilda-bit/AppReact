import React from 'react';
import FlipIcon from '../../assets/icons/btn/flip.png';

import classes from './ImgSettings.module.css';


const ImgSettings = ({setFlip }) => {
    return (

        <div>
            <div className="title-line">
                <label >Image Settings</label>
            </div>

            <div className={`settings ${classes['settings-img-area']}`}>

                <div className={classes['settings-img-items']}>
                    <label>Flip</label>
                    <fieldset className={`icon-invert ${classes['flip-option']}`} onClick={() => setFlip()}>
                        <img src={FlipIcon} alt="flip" width="30" height="25" />
                    </fieldset>
                </div>
                <div className={classes['settings-img-items']}>
                    <label>Flip</label>
                    <fieldset className={`icon-invert ${classes['flip-option']}`} onClick={() => setFlip()}>
                        <img src={FlipIcon} alt="flip" width="30" height="25" />
                    </fieldset>
                </div>

            </div>

            <hr className="solid"></hr>
        </div>
        
    );
};

export default ImgSettings;
