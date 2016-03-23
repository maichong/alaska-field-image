/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-03-14
 * @author Liang <liang@maichong.it>
 */

import React from 'react';
import * as _ from 'lodash';
import { shallowEqual } from 'alaska-admin-view';
import { api } from 'alaska-admin-view';
import { stringify } from 'qs';
import { Button } from 'react-bootstrap';

import '../style.less';

export default class ImageFieldView extends React.Component {

  static contextTypes = {
    settings: React.PropTypes.object
  };

  constructor(props) {
    super(props);
    this.state = {
      max: props.field.max || 1000,
      errorText: ''
    };
    if (!props.field.multi) {
      this.state.max = 1;
    }
  }

  componentWillReceiveProps(nextProps, nextContext) {
    let newState = {};
    if (nextProps.errorText !== undefined) {
      newState.errorText = nextProps.errorText;
      this.setState(newState);
    }
  }

  handleRemoveItem(item) {
    let multi = this.props.field.multi;
    let value = null;
    if (multi) {
      value = [];
      _.each(this.props.value, i => {
        if (i != item) {
          value.push(i);
        }
      });
    }
    this.props.onChange && this.props.onChange(value);
  };

  handleAddImage = () => {
    let me = this;
    let { model, field, data, value} = this.props;
    let multi = field.multi;
    if (value) {
      if (!multi) {
        value = [value];
      } else {
        value = value.concat();
      }
    } else {
      value = [];
    }
    let url = this.context.settings.services['alaska-admin'].prefix + '/api/upload?' + stringify({
        service: model.service.id,
        model: model.name
      });
    let nextState = {
      errorText: ''
    };
    _.each(this.refs.imageInput.files, file => {
      if (value.length >= me.state.max || !file) {
        return;
      }
      let matchs = file.name.match(/\.(\w+)$/);
      if (!matchs || !matchs[1] || field.allowed.indexOf(matchs[1].replace('jpeg', 'jpg').toLowerCase()) < 0) {
        nextState.errorText = '图片格式不允许';
        return;
      }
      api.post(url, {
        id: data._id == '_new' ? '' : data._id,
        path: field.path,
        file: file
      }).then(function (res) {
        value.push(res);
        me.props.onChange && me.props.onChange(multi ? value : res);
      }, function (error) {
        me.setState({ errorText: error.message });
      });
    });
    this.setState(nextState);
  };

  shouldComponentUpdate(props, state) {
    return !shallowEqual(props, this.props, 'data', 'onChange', 'model') || !shallowEqual(state, this.state);
  }

  render() {
    let { field, value, disabled } = this.props;
    let { errorText, max } = this.state;
    if (!field.multi) {
      value = value ? [value] : [];
    }
    let items = [];
    _.each(value, (item, index)=> {
      items.push(<div key={index} className="image-field-item">
        <img src={item.thumbUrl}/>
        <Button
          disabled={disabled}
          onClick={this.handleRemoveItem.bind(this,item)}
          bsStyle="link"
          block
        >删除</Button>
      </div>);
    });
    if (items.length < max) {
      //还未超出
      let input;
      if (!disabled) {
        input =
          <input
            ref="imageInput"
            multiple={this.state.multi}
            accept="image/png;image/jpg;"
            type="file"
            onChange={this.handleAddImage}
          />;
      }

      items.push(<div className="image-field-item image-field-add" key="add">
        <i className="fa fa-plus-square-o"/>
        {input}
      </div>);
    }

    let help = field.help;
    let className = 'form-group image-field';
    if (errorText) {
      className += ' has-error';
      help = errorText;
    }
    let helpElement = help ? <p className="help-block">{help}</p> : null;
    return (
      <div className={className}>
        <label className="control-label col-xs-2">{field.label}</label>
        <div className="col-xs-10">
          {items}
          {helpElement}
        </div>
      </div>
    );
  }
}
