import { createStore } from 'redux';
// import React, { createContext, useReducer } from 'react';

// export const MemeContext = createContext({

const initialState = {
    lines: [
      {
        title: "Top Text",
        text: "",
        color: "color-white ",
        textAlign: 'text-align-center',
        fontSize: 10
      },
      {
        title: "Bottom Text",
        text: "",
        color: "color-white ",
        textAlign: 'text-align-center',
        fontSize: 10
      }
    ],
    hideSettings: true,
    picInfo: null,
    flip: false,
    allMemeImgs: [],
    item: {
      id: "61579",
      box_count: 2,
      height: 335,
      width: 568,
      name: "One Does Not Simply",
      img: "https://i.imgflip.com/1bij.jpg",
      caption: 446250,
      data: [],
    }
};
//     }
//   }
// );

// const memeReducer = (state, action) => {

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_ITEM':
      return { ...state, item: action.payload };
    case 'FLIP_IMG':
        return { ...state, flip: action.payload };
    case 'SET_LINES':
      return { ...state, lines: action.payload };
    case 'SET_HIDE_SETTINGS':
      return { ...state, hideSettings: action.payload };
    // todo Add cases for other state updates
    default:
      return state;
  }
};

const store = createStore(reducer);

export default store;

// function MemeContextProvider({ children }) {
//     const [memeState, dispatch] = useReducer(memeReducer, []);
  
//     function setItem(memeData) {
//       dispatch({ type: 'SET_ITEM', payload: memeData });
//     }
  
//     function flipImg(flip) { //memeData
//       dispatch({ type: 'FLIP_IMG', payload: flip });
//     }
  
//     function setLines(lines) { //memeData
//       dispatch({ type: 'SET_LINES', payload: lines });
//     }
  
//     function hideSettings(hide) { //memeData
//       dispatch({ type: 'SET_HIDE_SETTINGS', payload: hide });
//     }
  
//     const value = {
//       setItem: setItem,
//       flipImg: flipImg,
//       setLines: setLines,
//       hideSettings: hideSettings,
//     };
  
//     return (
//       <MemeContext.Provider value={value}>
//         {children}
//       </MemeContext.Provider>
//     );
//   }
  
//   export default MemeContextProvider;


