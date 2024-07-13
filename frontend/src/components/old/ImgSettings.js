import React, {useState} from 'react';
import FlipIcon from '../../assets/icons/btn/flip.png';
import ArrowDown from '../../assets/icons/fontSize/down.png';
import ArrowUp from '../../assets/icons/fontSize/up.png';

import classes from './ImgSettings.module.css';
//check polina title-line > delete

const ImgSettings = ({flip, flipY, setFlip, setFlipY }) => {

    const [hideSetthingsImg, setHideSettingsImg] = useState(false);
    //${classes['hide-settings-img']}
    return (

        <div>
            <div className={`title-line row hide-settings-img`}>
                <fieldset className={classes['font-size-option'] + " " + classes['hide-settings-img'] + " icon-invert cursor-pointer"} onClick={() => setHideSettingsImg(!hideSetthingsImg)}>
                <label >Image Settings</label>
                    <img src={!hideSetthingsImg ? ArrowDown : ArrowUp} alt="Font Size" width="15" height="15" />
                </fieldset>
            </div>

            { !hideSetthingsImg && 
            (<div className={`settings ${classes['settings-img-area']}`}>

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
            </div>)
             }

            <hr className="solid"></hr>
        </div>
        
    );
};

export default ImgSettings;
