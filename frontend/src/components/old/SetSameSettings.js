import classes from './SetSameSettings.module.css';
import React from 'react';
const SetSameSettings = ({ hideSettings, checkboxChange }) => {
    return (
            <div className={classes['checkbox-wrapper-6']}>
                <input
                    className={`${classes.tgl} ${classes['tgl-light']}`}
                    id="cb1-6"
                    name="checkbox"
                    type="checkbox"
                    checked={hideSettings}
                    onChange={checkboxChange}
                />
                <label className={classes['tgl-btn']} htmlFor="cb1-6"></label>
                <label>{hideSettings ? "Same settings to all lines." : "Switch to set the same settings to all lines."}</label>
            </div>
    );
};

export default SetSameSettings;
