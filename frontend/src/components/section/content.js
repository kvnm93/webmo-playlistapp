import React from 'react';
import PropTypes from 'prop-types';
import {Icon, Row} from 'antd';

export default class Content extends React.Component
{
    render()
    {
        const {mouseOverEffect, onClick, style} = this.props;

        return <Row className={ mouseOverEffect ? "editable-area" : ""} onClick={ onClick } style={style}>
            { mouseOverEffect && <Icon type="edit" theme="outlined" className="absolute-top-right edit-icon" /> }
            { this.props.children }
            </Row>;
    }
}

Content.defaultProps = {
    mouseOverEffect: false
};

Content.propTypes = {
    mouseOverEffect: PropTypes.bool,
    onClick: PropTypes.func
};