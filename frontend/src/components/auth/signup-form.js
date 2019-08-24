import React from 'react';
import PropTypes from 'prop-types';
import "./signup-form.less";
import { withNamespaces } from 'react-i18next';
import { Form, Input, Button, Alert, Row, Select } from 'antd';
import { detectLanguage } from '../../utils';

const FormItem = Form.Item;

class SignupForm extends React.Component
{
    constructor(props)
    {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleSubmit(event)
    {
        event.preventDefault();

        const { form, onSubmit, i18n } = this.props;

        form.validateFieldsAndScroll((error, values) => {
            if(!error) {
                values.language = detectLanguage(i18n);
                onSubmit(values);
            }
        })
    }

    render()
    {
        const { form, loading, error, t, business_type_enumerations } = this.props;

        const _error = Array.isArray(error) ? error.join("\n") : error;

        return (
            <div className="signup-form-wrapper">
                <Row type="flex" justify="center">
                    <h2>{t('inline:SIGNUP')}</h2>
                </Row>
                <Form onSubmit={ this.handleSubmit } className="signup-form">
                    {
                        error && <Alert message={ _error } type="error" showIcon style={{marginBottom: 10}} />
                    }
                    <FormItem>
                        {
                            form.getFieldDecorator("first_name", {
                                rules: [{ required: true, message: t('messages:FIRSTNAME_REQUIRED') }]
                            })(
                                <Input placeholder={ t('placeholders:FIRSTNAME') }/>
                            )
                        }
                    </FormItem>
                    <FormItem>
                        {
                            form.getFieldDecorator("last_name", {
                                rules: [{ required: true, message: t('messages:SURNAME_REQUIRED') }]
                            })(
                                <Input placeholder={ t('placeholders:NAME') }/>
                            )
                        }
                    </FormItem>
                    <FormItem>
                        {
                            form.getFieldDecorator("user_role", {
                                rules: [{ required: true, message: t('messages:ROLE_REQUIRED') }]
                            })(
                                <Select placeholder={t('placeholders:SELECT_A_ROLE')}>
                                    <Select.Option value={"1"}>{t('options:ADMIN')}</Select.Option>
                                    <Select.Option value={"2"}>{t('options:LISTENER')}</Select.Option>
                                </Select>
                            )
                        }
                    </FormItem>
                    <FormItem>
                        {
                            form.getFieldDecorator('email', {
                                rules: [{ required: true, message: t('messages:EMAIL_REQUIRED') }]
                            })(
                                <Input placeholder={ t('placeholders:EMAIL') } />
                            )
                        }
                    </FormItem>
                    <FormItem>
                        {
                            form.getFieldDecorator('password', {
                                rules: [{ required: true, message: t('messages:PASSWORD_REQUIRED') }]
                            })(
                                <Input type="password" placeholder={ t('placeholders:PASSWORD') } />
                            )
                        }
                    </FormItem>
                    <Button type="primary" htmlType="submit" className="signup-form-button" loading={ loading }>{ t('buttons:SIGNUP') }</Button>
                </Form>
            </div>
        );
    }
}


SignupForm.defaultProps = {
    loading: false
};

SignupForm.propTypes = {
    loading: PropTypes.bool,
    error: PropTypes.string,
    onSubmit: PropTypes.func.isRequired
};

export default Form.create()(withNamespaces(['buttons', 'inline', 'placeholders', 'messages', 'options'])(SignupForm));