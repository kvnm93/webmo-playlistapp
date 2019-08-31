import React from 'react';
import PropTypes from 'prop-types';
import {Select, Spin, Form, message} from 'antd';
import {getSongs} from '../../actions/app';
import {withNamespaces} from 'react-i18next';

class SongSearchSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      songs: []
    }
  }

  componentDidMount () {
    getSongs("").then(data => {
      console.log(data);
      this.setState({songs: data.data});
    })
  }

  fetchSongs = (term) =>  {
    getSongs(term).then(data => {
      console.log(data);
      this.setState({songs: data.data});
    })
  }

  onChangeValues = () => {
    const {onChangeValues} = this.props;
    const { songs } = this.state;
    onChangeValues(songs);
  }

  render() {
    const {t, loading,  mode, formItem, size } = this.props;
    const { songs } = this.state;

    return <Form.Item label={formItem.formItem.label}>
      {
        formItem.form.getFieldDecorator(formItem.formItem.decorate.name, formItem.formItem.decorate.options)(
            <Select mode={mode}
                    size={size}
                    labelInValue
                    showSearch
                    showArrow={false}
                    onSearch={this.fetchSongs}
                    filterOption={false}
                    placeholder={t('placeholders:TYPE_TO_FIND_SONGS')}
                    notFoundContent={loading ? <Spin size="small"/> : null}>
              {
                songs.map((option) => <Select.Option value={option.id} key={option.id}>{option.artist} - {option.title}</Select.Option>)
              }
            </Select>
        )
      }
    </Form.Item>
  }
}

SongSearchSelect.defaultProps = {
  mode: "multiple",
  loading: false,
  options: [],
  cities: [],
  size: "default"
};

SongSearchSelect.propTypes = {
  size: PropTypes.string,
  onChangeValues: PropTypes.func,
  mode: PropTypes.string,
  formItem: PropTypes.shape(
      {
        form: PropTypes.object.isRequired,
        label: PropTypes.string,
        decorate: PropTypes.shape({
          name: PropTypes.string.isRequired,
          options: PropTypes.object
        }).isRequired
      }
  )
};


export default withNamespaces(['placeholders'])(SongSearchSelect);
