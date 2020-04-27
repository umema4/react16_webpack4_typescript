import { createStore } from 'react-hooks-global-state';

type Action = { type: 'signin' } | { type: 'signout' };

const initialState = {
  isAuthenticated: false,
};

export const { dispatch, useGlobalState } = createStore(
  (state, action: Action) => {
    switch (action.type) {
      case 'signin': {
        return {
          ...state,
          isAuthenticated: true,
        };
      }
      case 'signout': {
        return {
          ...state,
          isAuthenticated: false,
        };
      }
      default: {
        return state;
      }
    }
  },
  initialState
);
