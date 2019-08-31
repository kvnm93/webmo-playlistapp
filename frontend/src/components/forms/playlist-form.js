import React from 'react';
import { Form, Input, InputNumber } from 'antd';
import { withNamespaces } from 'react-i18next';
import PropTypes from 'prop-types';
import SongSearchSelect from "./song-search-select";

class PlaylistForm extends React.Component {

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
          <Form.Item label={t('inline:NAME')}>
                {
                    form.getFieldDecorator("name", { initialValue: initialValues ? initialValues.name : undefined,
                        rules: [{required: true, message: " "}]
                    })(
                        <Input type="text"/>
                    )
                }
          </Form.Item>
          <Form.Item label={t('inline:DESCRIPTION')}>
                {
                    form.getFieldDecorator("description", { initialValue: initialValues ? initialValues.description : undefined,
                        rules: [{required: true, message: " "}]
                    })(
                        <Input type="text"/>
                    )
                }
          </Form.Item>
          <Form.Item label={t('inline:COVER')}>
                {
                    form.getFieldDecorator("cover", { initialValue: initialValues ? initialValues.cover : undefined,
                        rules: [{required: true, message: " "}]
                    })(
                        <Input type="text"/>
                    )
                }
          </Form.Item>
          <SongSearchSelect formItem={{
            form: form,
            formItem: {
              label: t('inline:SONGS'),
              decorate: {
                name: "songs",
                options: {
                  initialValue: initialValues ? initialValues.songs : undefined
                }
              }
            }
          }}/>
          { children }
        </Form>
      </div>
    );
  }


}

PlaylistForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  initialValues: PropTypes.object
}


export default Form.create()(withNamespaces(['inline'])(PlaylistForm));