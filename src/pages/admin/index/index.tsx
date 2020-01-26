import React, { Component } from "react";
import { connect } from "react-redux";

interface Props {}
interface State {}

export class index extends Component<Props, State> {
  state = {};
  componentDidMount() {
    console.log(1, this.props);
  }
  handleClick() {
    // this.props.history.push('/login')
  }
  render() {
    return (
      <div>
        <h3 onClick={this.handleClick.bind(this)}>welcome</h3>
      </div>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(index);
