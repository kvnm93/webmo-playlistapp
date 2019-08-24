import React from 'react';
import { Button, Row, Icon } from "antd";
import PropTypes from 'prop-types';
import './round-edit-button.less';

class EditButton extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { onClick, loading } = this.props;
    return (
      <Row type="flex" justify="center">
        <Button loading={loading} className="round-edit-button ant-btn-secondary" shape="circle" size="small" onClick={onClick}>
          <Icon type="edit" theme="outlined" />
        </Button>
      </Row>
    )
  }
}

EditButton.propTypes = {
  loading: PropTypes.bool,
  onClick: PropTypes.func.isRequired
}

export default EditButton;
