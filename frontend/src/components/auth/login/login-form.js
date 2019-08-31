import React from 'react';
import PropTypes from 'prop-types';
import { withNamespaces } from 'react-i18next';
import {Form, Input, Button, Alert, Row} from 'antd';
import "./login-form.less";

const FormItem = Form.Item;


class LoginForm extends React.Component {
    constructor(props)
    {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleSubmit(event)
    {
        event.preventDefault();

        const { form, onSubmit } = this.props;

        form.validateFieldsAndScroll((error, values) => {
            if(!error)
            {
                onSubmit(values);
            }
        })
    }

    render()
    {
        const { form, loading, error, t } = this.props;

        const _error = Array.isArray(error) ? error.join("\n") : error;

        return (
            <div className="login-form-wrapper">
                <Form onSubmit={ this.handleSubmit } className="login-form">
                    {
                        error && <Alert message={ _error } type="error" showIcon style={{marginBottom: 10}} />
                    }
                    <FormItem>
                        {
                            form.getFieldDecorator('username', {
                                rules: [{ required: true, message: t('messages:USERNAME_REQUIRED')}]
                            })(
                                <Input placeholder={ t('placeholders:USERNAME')} />
                            )
                        }
                    </FormItem>
                    <FormItem>
                        {
                            form.getFieldDecorator('password', {
                                rules: [{ required: true, message: t('messages:PASSWORD_REQUIRED') }],
                            })(
                                <Input type="password" placeholder={ t('placeholders:PASSWORD') } />
                            )
                        }
                    </FormItem>
                    <Button type="primary" htmlType="submit" className="login-form-button" loading={ loading }>{ t('buttons:LOGIN') }</Button>
                </Form>
            </div>
        )
    }
}


LoginForm.defaultProps = {
    loading: false
};

LoginForm.propTypes = {
    loading: PropTypes.bool,
    error: PropTypes.string,
    onSubmit: PropTypes.func.isRequired
};

export default Form.create()(withNamespaces(['buttons', 'inline', 'messages', 'placeholders'])(LoginForm));