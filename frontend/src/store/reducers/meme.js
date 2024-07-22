const initialState = {
    lines: [
        {
        title: "Top Text",
        text: "",
        color: "color-white ",
        textAlign: 'text-align-center',
        fontSize: 10,
        x: 1,
        y: 1
        },
        {
        title: "Bottom Text",
        text: "",
        color: "color-white ",
        textAlign: 'text-align-center',
        fontSize: 10,
        x: 1,// must be bottom of the img mb...?
        y: 1,
        }
    ],
    hideSettings: true,
    picInfo: null,
    flip: false,
    flipY: false,
    allMemeImgs: [],
    item: {
        id: "61579",
        box_count: 2,
        height: 335,
        width: 568,
        name: "One Does Not Simply",
        img: "https://i.imgflip.com/1bij.jpg",
        caption: 446250,
        data: [],//history
    }
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_ITEM':
        return { ...state, item: action.payload };
      case 'FLIP_IMG':
          return { ...state, flip: action.payload };
      case 'FLIP_Y_IMG':
        return { ...state, flipY: action.payload };
      case 'SET_LINES':
        return { ...state, lines: action.payload };
      case 'SET_HIDE_SETTINGS':
        return { ...state, hideSettings: action.payload };

        case 'SET_MEME':
            return { 
                ...state, 
                lines: action.payload.lines, 
                item: action.payload.item,
                flip: action.payload.flip,
                flipY: action.payload.flipY

            };
      // todo Add cases for other state updates
      default:
        return state;
    }
  };

  export default rootReducer;