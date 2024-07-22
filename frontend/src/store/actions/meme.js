export const FLIP_IMG = 'FLIP_IMG';
export const FLIP_Y_IMG = 'FLIP_Y_IMG';

export const SET_ITEM = 'SET_ITEM';
export const SET_HIDE_SETTINGS = 'SET_HIDE_SETTINGS';
export const SET_LINES = 'SET_LINES';
export const SET_MEME = 'SET_MEME';

  //ACTIONS
export const setLines = (newLines) => {
    return { type: SET_LINES, payload: newLines };
};

export const setHideSettings = (hide) => {
    return { type: SET_HIDE_SETTINGS, payload: hide };
};

export const setItem = (newItem) => {
    return { type: SET_ITEM, payload: newItem };
};

export const setFlip = (flip) => {
return { type: FLIP_IMG, payload: flip };
};

export const setFlipY = (flip) => {
  return { type: FLIP_Y_IMG, payload: flip };
};

export const setMeme = (meme) => {
    return { type: SET_MEME, payload: meme };
  };

//shinema huinya