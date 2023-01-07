import { useMemo, createContext, useReducer } from "react";

export const MatchContext = createContext({
  user:{},
  modalTextData: {},
  modalBottomData: {},
  modalBottomSelectedItem: {},
  selectDate: '', // 날짜
  dispatch: async () => {},
});

const initialState = {
  // user: id, email, nick, sex, level, 
  user: {
    id:'',
    email:'',
    nick:'',
    sex:''
  },
  modalTextData: {
    on: false,
    title: '', // 제목
    type: '', // list, text
    content: '' // 내용
  },
  modalBottomData: {
    on: false,
    title: '성별',
    checkbox: false,
  },
  modalBottomSelectedItem: {
    "지역": "",
    "성별": [],
    "레벨": []
  },
  selectDate: ''
}
export const OPTION_SEX_DICT = { 'isMen': '남자', 'isWomen': '여자', 'isMix': '남녀모두' };
export const OPTION_LEVEL_DICT = { 
  '0' :'루키',
  '1' :'스타터',
  '2' :'비기너1',
  '3' :'비기너2',
  '4' :'비기너3',
  '5' :'아마추어1',
  '6' :'아마추어2',
  '7' :'아마추어3',
  '9' :'세미프로1',
  '10':'세미프로2',
  '11':'세미프로3',
  '12':'프로'
};
export const MATCH_STATE_DICT = { 'isOpen': '신청가능', 'isHurry': '마감임박', 'isFull': '마감' }
export const MODAL_TEXT_ON = 'MODAL_TEXT_ON';
export const MODAL_TEXT_OFF = 'MODAL_TEXT_OFF';
export const MODAL_BOTTOM_ON = 'MODAL_BOTTOM_ON';
export const MODAL_BOTTOM_OFF = 'MODAL_BOTTOM_OFF';
export const SET_MODAL_BOTTOM_SELECT_TYPE = 'SET_MODAL_BOTTOM_SELECT_TYPE';
export const SET_MODAL_BOTTOM_TITLE = 'SET_MODAL_BOTTOM_TITLE';
export const SET_MODAL_BOTTOM_SELECTED_ITEM = 'SET_MODAL_BOTTOM_SELECTED_ITEM';
export const SET_SELECT_DATE = 'SET_SELECT_DATE';

export const LOGIN_USER = 'LOGIN_USER';
export const LOGOUT_USER = 'LOGOUT_USER';

const reducer = (state, action) => {
  switch (action.type) {
    case MODAL_TEXT_ON: {
      console.log(action)
      const modalTextData = {
        ...state.modalTextData,
        title: action.modalTitle,
        type: action.modalType,
        content: action.modalContent
      };
      modalTextData.on = true;
      return {
        ...state,
        modalTextData
      }
    }
    case MODAL_TEXT_OFF: {
      const modalTextData = {
        ...state.modalTextData
      };
      modalTextData.on = false;
      return {
        ...state,
        modalTextData
      }
    }
    case MODAL_BOTTOM_ON: {
      const modalBottomData = {
        ...state.modalBottomData
      };
      modalBottomData.on = true;
      return {
        ...state,
        modalBottomData
      }
    }
    case MODAL_BOTTOM_OFF: {
      const modalBottomData = {
        ...state.modalBottomData
      };
      modalBottomData.on = false;
      return {
        ...state,
        modalBottomData
      }
    }
    case SET_MODAL_BOTTOM_SELECT_TYPE: {
      const modalBottomData = {
        ...state.modalBottomData
      };
      if (action.modalSelectType === 'single') {
        modalBottomData.checkbox = false;
      }
      if (action.modalSelectType === 'multiple') {
        modalBottomData.checkbox = true;
      }
      return {
        ...state,
        modalBottomData
      }
    }
    case SET_MODAL_BOTTOM_TITLE: {
      const modalBottomData = {
        ...state.modalBottomData
      };
      modalBottomData.title = action.title;
      return {
        ...state,
        modalBottomData
      }
    }
    case SET_MODAL_BOTTOM_SELECTED_ITEM: {
      const modalBottomData = {
        ...state.modalBottomData
      };
      const modalBottomSelectedItem = {
        ...state.modalBottomSelectedItem
      };
      modalBottomSelectedItem[modalBottomData.title] = action.modalBottomSelectedItem;
      return {
        ...state,
        modalBottomSelectedItem
      }
    }
    case SET_SELECT_DATE: {
      const selectDate = action.selectDate;
      return {
        ...state,
        selectDate
      }
    }
    case LOGIN_USER : {
      return {
        ...state,
        user: action.user
      }
    }
    case LOGOUT_USER : {
      return {
        ...state,
        user: {}
      }
    }
    default:
      return state;
  }
};

function MatchContextAPI() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { user, modalTextData, modalBottomData, modalBottomSelectedItem } = state;
  const value = useMemo(() => ({ modalTextData, modalBottomData, modalBottomSelectedItem, user, dispatch}), [user, modalTextData, modalBottomData, modalBottomSelectedItem]);

  return {MatchContext, value, state, dispatch};
}

export default MatchContextAPI; 
