import React from 'react';
import { Button, Row, Icon } from "antd";
import PropTypes from 'prop-types';
import './round-add-button.less';

class RoundAddButton extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { onClick, loading } = this.props;
    return (
      <Row type="flex" justify="center">
        <Button loading={loading} className="round-add-button" type="primary" shape="circle" size="small" onClick={onClick}>
          <Icon type="plus" theme="outlined"/>
        </Button>
      </Row>
    )
  }
}

RoundAddButton.propTypes = {
  loading: PropTypes.bool,
  onClick: PropTypes.func.isRequired
}

export default RoundAddButton;
