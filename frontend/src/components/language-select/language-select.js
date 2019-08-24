import React from 'react';
import PropTypes from 'prop-types';
import {Select} from "antd";
import './language-select.less';

class LanguageSelect extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { position, defaultValue, loading, onChangeLanguage } = this.props;
    return (
        <Select className={position === 'header' ? 'language-select language-select-absolute' : position === 'header-right' ? 'language-select language-select-absolute-right' : 'language-select'}
                defaultValue={defaultValue} loading={loading} onChange={onChangeLanguage}>
          <Select.Option value="de">DE</Select.Option>
          <Select.Option value="en">EN</Select.Option>
        </Select>
    );
  }

}

LanguageSelect.defaultProps = {
  loading: false
};

LanguageSelect.propTypes = {
  position: PropTypes.string,
  defaultValue: PropTypes.string,
  loading: PropTypes.bool,
  onChangeLanguage: PropTypes.func.isRequired
};

export default LanguageSelect;