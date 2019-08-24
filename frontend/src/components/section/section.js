import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Divider, Tooltip, Icon } from 'antd';

import Edit from './edit';
import Content from './content';
import Empty from './empty'
import EditButton from "../edit-button/edit-button";
import { RoundAddButton } from "../round-add-button";
import {Default, Mobile} from "../../utils/viewports";

export default class Section extends React.Component {
    render() {
        const { children, title, tooltip, editMode, emptyMode, popover, mouseOverEffect, onContentClick, enableEdit, noSkill, addButton, id } = this.props;
        let innerContent;

        if ((children instanceof Array)) {
            const content = children.filter((child) => { return child.type === Content });
            const edit = children.filter((child) => { return child.type === Edit });
            const empty = children.filter((child) => { return child.type === Empty });

            innerContent = <React.Fragment>
                <Col span={24}>{!editMode && !emptyMode && content}</Col>
                <Col span={24}>{!editMode && emptyMode && empty}</Col>
                <Col span={24}>{editMode && edit}</Col>
            </React.Fragment>;
        }
        else {
            innerContent = <Col span={24}>{children}</Col>
        }

        return <div id={id}>
                <Default>
                    <Row type="flex" style={{ width: "100%", background: "#fff", flexDirection: "column", marginBottom: 10, padding: 40 }}>
                    {
                        title &&
                        (<Col span={24}>
                            {!editMode &&
                                <div style={{ display: 'flex' }}>
                                    <Divider>
                                        <Tooltip trigger="click hover" placement="top" title={tooltip}>
                            <h4>{title} { tooltip && <Icon type="info-circle" style={{ color: "#43D096", marginLeft: 5 }} /> }</h4>
                                        </Tooltip>
                                    </Divider>
                                    {noSkill && !emptyMode &&
                                        <div style={{ position: 'relative', right: '30px' }}>
                                            {addButton ?
                                                <RoundAddButton onClick={enableEdit} />
                                                : <EditButton onClick={enableEdit} />
                                            }
                                        </div>
                                    }
                                </div>
                            }
                            {editMode &&
                                <div style={{ display: 'flex' }}>
                                    <Divider>
                                        <Tooltip trigger="click hover" placement="top" title={tooltip}>
                                            <h4>{title} <Icon type="info-circle" style={{ color: "#43D096", marginLeft: 5 }} /> </h4>
                                        </Tooltip>
                                    </Divider>
                                </div>
                            }
                        </Col>)

                    }
                    {innerContent}
                </Row>
                </Default>
                <Mobile>
                    <Row type="flex" style={{ width: "100%", background: "#fff", flexDirection: "column", marginBottom: 10, padding: 20 }}>
                    {
                        title &&
                        (<Col span={24}>
                            {!editMode &&
                                <div style={{ display: 'flex' }}>
                                    <Divider>
                                        <Tooltip trigger="click hover" placement="top" title={tooltip}>
                            <h4>{title} { tooltip && <Icon type="info-circle" style={{ color: "#43D096", marginLeft: 5 }} /> }</h4>
                                        </Tooltip>
                                    </Divider>
                                    {noSkill && !emptyMode &&
                                        <div style={{ position: 'relative', right: '30px' }}>
                                            {addButton ?
                                                <RoundAddButton onClick={enableEdit} />
                                                : <EditButton onClick={enableEdit} />
                                            }
                                        </div>
                                    }
                                </div>
                            }
                            {editMode &&
                                <div style={{ display: 'flex' }}>
                                    <Divider>
                                        <Tooltip trigger="click hover" placement="top" title={tooltip}>
                                            <h4>{title} <Icon type="info-circle" style={{ color: "#43D096", marginLeft: 5 }} /> </h4>
                                        </Tooltip>
                                    </Divider>
                                </div>
                            }
                        </Col>)

                    }
                    {innerContent}
                </Row>
                </Mobile>
            </div>
    }
}

Section.defaultProps = {
    emptyMode: false,
    editMode: false,
    // decide if add or editbutton should be shown
    addButton: false
};

Section.propTypes = {
    addButton: PropTypes.bool,
    title: PropTypes.string,
    tooltip: PropTypes.string,
    emptyMode: PropTypes.bool,
    editMode: PropTypes.bool,
    enableEdit: PropTypes.func,
    noSkill: PropTypes.bool,
    children: PropTypes.oneOfType([PropTypes.arrayOf(
        (propValue, key, componentName, location, propFullName) => {
            for (let i = 0; i < propValue.length; i++) {
                if (propValue[i].type !== Edit && propValue[i].type !== Content && propValue[i].type !== Empty) {
                    return new Error("Section only accepts  Section.Title, Section.Edit, Section.Empty or Section.Content");
                }
            }
        }), PropTypes.object]).isRequired
};