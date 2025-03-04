import React from "react";
import { connect } from "react-redux";
import { getAddSubButtonClassSelector } from "../../selectors/game_selectors";
import { ReduxState } from "../../store";
import "./buttons.css";

interface OwnProps {
  n?: number;
}

interface StateProps {
  socket?: WebSocket;
  addClass: string;
  subClass: string;
}

type Props = OwnProps & StateProps;

const AddSubButton: React.FC<Props> = ({ socket, addClass, subClass, n }) => {
  const onClick = (a: string) => {
    if (socket) {
      if (n === undefined) {
        socket.send(JSON.stringify({ type: a }));
      } else {
        socket.send(JSON.stringify({ type: `${a}_nth`, n }));
      }
    }
  };

  return (
    <React.Fragment>
      <button onClick={() => onClick("add")} className={`Add${addClass}`}>
        +
      </button>
      <button onClick={() => onClick("sub")} className={`Subtract${subClass}`}>
        -
      </button>
    </React.Fragment>
  );
};

const mapStateToProps = (state: ReduxState, ownProps: OwnProps): StateProps => {
  return {
    socket: state.socket,
    addClass: getAddSubButtonClassSelector(
      typeof ownProps.n === "number" ? ownProps.n + 1 : "add"
    )(state),
    subClass: getAddSubButtonClassSelector(
      typeof ownProps.n === "number" ? -(ownProps.n + 1) : "sub"
    )(state),
  };
};

export default connect(mapStateToProps)(AddSubButton);
