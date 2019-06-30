import React from "react";
import ReactDOM from "react-dom";
import { createStore } from 'redux'
import { connect, Provider } from 'react-redux'

const container = createStore(
  (model = { running: false, time: 0 }, action) => {
    const updates = {
      START: model => Object.assign({}, model, { running: true }),
      STOP: model => Object.assign({}, model, { running: false }),
      TICK: model =>
        Object.assign({}, model, { time: model.time + (model.running ? 1 : 0) })
    };
    return (updates[action.type] || (() => model))(model);
  }
);

const mapStateToProps = state => state;
const mapDispatchToProps = (dispatch, props) => ({
  onStart: () => {
    dispatch({ type: "START" });
  },
  onStop: () => {
    dispatch({ type: "STOP" });
  }
});

const Stopwatch = connect(mapStateToProps, mapDispatchToProps)(
  props => {
    const minutes = Math.floor(props.time / 60);
    const seconds = props.time - minutes * 60;
    const secondsFormatted = `${seconds < 10 ? "0" : ""}${seconds}`;

    return (
      <div>
        <p>
          {minutes}:{secondsFormatted}
        </p>
        <button onClick={props.running ? props.onStop : props.onStart}>
          {props.running ? "Stop" : "Start"}
        </button>
      </div>
    );
  }
);

ReactDOM.render(
  <Provider store={container}>
    <Stopwatch />
  </Provider>,
  document.getElementById("root")
);

setInterval(() => {
  container.dispatch({ type: "TICK" });
}, 1000);
