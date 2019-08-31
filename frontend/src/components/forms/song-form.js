import React from 'react';
import { Form, Input, InputNumber } from 'antd';
import { withNamespaces } from 'react-i18next';
import PropTypes from 'prop-types';

class SongForm extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { initialValues, t , children, onSubmit } = this.props;
    const { form } = this.props;
    console.log("initial", initialValues);
    return (
      <div>
        <Form style={{width: "100%", textAlign: "left"}} onSubmit={onSubmit}>
          <Form.Item label={t('inline:TITLE')}>
                {
                    form.getFieldDecorator("title", { initialValue: initialValues ? initialValues.title : undefined,
                        rules: [{required: true, message: " "}]
                    })(
                        <Input type="text"/>
                    )
                }
          </Form.Item>
          <Form.Item label={t('inline:ARTIST')}>
                {
                    form.getFieldDecorator("artist", { initialValue: initialValues ? initialValues.artist : undefined,
                        rules: [{required: true, message: " "}]
                    })(
                        <Input type="text"/>
                    )
                }
          </Form.Item>
          <Form.Item label={t('inline:GENRE')}>
                {
                    form.getFieldDecorator("genre", { initialValue: initialValues ? initialValues.genre : undefined,
                        rules: [{required: true, message: " "}]
                    })(
                        <Input type="text"/>
                    )
                }
          </Form.Item>
          <Form.Item label={t('inline:LENGTH')}>
                {
                    form.getFieldDecorator("length", { initialValue: initialValues ? initialValues.length : undefined,
                        rules: [{required: true, message: " "}]
                    })(
                        <InputNumber min={0}/>
                    )
                }
          </Form.Item>
          { children }
        </Form>
      </div>
    );
  }


}

SongForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  initialValues: PropTypes.object
}


export default Form.create()(withNamespaces(['inline'])(SongForm));