const createStore = reducer => {
  let internalState;
  let handlers = [];
  return {
    dispatch: action => {
      internalState = reducer(internalState, action);
      handlers.forEach(h => {
        h();
      });
    },
    subscribe: handler => {
      handlers.push(handler);
    },
    getState: () => internalState
  };
};

export default createStore;
