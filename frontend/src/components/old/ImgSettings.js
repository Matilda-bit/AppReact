import React from 'react';
import FlipIcon from '../../assets/icons/btn/flip.png';

import classes from './ImgSettings.module.css';
//check polina title-line > delete

const ImgSettings = ({flip, flipY, setFlip, setFlipY }) => {
    return (

        <div>
            <div className="title-line">
                <label >Image Settings</label>
            </div>

            <div className={`settings ${classes['settings-img-area']}`}>

                <div className={classes['settings-img-items']}>
                    <label>Flip</label>
                    <div className={`row jc-center ${classes['margin-10']} `}>
                      
                        <fieldset className={`icon-invert ${classes['flip-option']} ${classes['margin-lr-5']}`} onClick={() => setFlip()}>
                            <img src={FlipIcon} alt="flip" width="30" height="25" />
                        </fieldset>
                        
                        <fieldset className={` icon-invert ${classes['flip-option']} ${classes['margin-lr-5']} ${classes.rotate}`} onClick={() => setFlipY()}>
                            <img src={FlipIcon} alt="flipY" width="30" height="25" />
                        </fieldset>
                       
                    
                        
                    </div>
                </div>
            </div>

            <hr className="solid"></hr>
        </div>
        
    );
};

export default ImgSettings;
