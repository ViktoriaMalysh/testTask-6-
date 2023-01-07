import { CLEAR, CONTACTS_IDS, CONTACTS, CONTACT } from "./types";

const initialState = {
  contacts: [],
  contacts_ids: [],
  contact: {},
};

export const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONTACTS_IDS:
      return { ...state, contacts_ids: action.payload };
    case CONTACTS:
      return { ...state, contacts: action.payload };
    case CONTACT:
      return { ...state, contact: action.payload };

    case CLEAR:
      return initialState;

    default:
      return state;
  }
};
