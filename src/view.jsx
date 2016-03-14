/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-03-14
 * @author Liang <liang@maichong.it>
 */

import React from 'react';
import ContextPure from 'material-ui/lib/mixins/context-pure';
import FlatButton from 'material-ui/lib/flat-button';
import FontIcon from 'material-ui/lib/font-icon';
import * as _ from 'lodash';
import { shallowEqual } from 'alaska-admin-view';
import api from 'alaska-admin-view/lib/utils/api';
import {stringify} from 'qs';


export default class ImageFieldView extends React.Component {

  static propTypes = {
    children: React.PropTypes.node
  };

  static contextTypes = {
    muiTheme: React.PropTypes.object,
    views: React.PropTypes.object,
    settings: React.PropTypes.object,
  };

  static childContextTypes = {
    muiTheme: React.PropTypes.object,
    views: React.PropTypes.object,
    settings: React.PropTypes.object,
  };

  static mixins = [
    ContextPure
  ];

  constructor(props, context) {
    super(props);
    this.handleAddImage = this.handleAddImage.bind(this);
    this.state = {
      muiTheme: context.muiTheme,
      views: context.views,
      settings: context.settings,
      max: props.field.max || 1000
    };
    if (!props.field.multi) {
      this.state.max = 1;
    }
  }

  getChildContext() {
    return {
      muiTheme: this.state.muiTheme,
      views: this.context.views,
      settings: this.context.settings,
    };
  }

  componentWillMount() {
  }

  componentDidMount() {
  }

  componentWillReceiveProps(nextProps, nextContext) {
    let newState = {};
    if (nextContext.muiTheme) {
      newState.muiTheme = nextContext.muiTheme;
    }
    if (nextContext.views) {
      newState.views = nextContext.views;
    }
    if (nextProps.field) {
      newState.max = nextProps.field.max || 1000;
      if (!nextProps.field.multi) {
        newState.max = 1;
      }
    }
    this.setState(newState);
  }

  componentWillUnmount() {
  }

  handleRemoveItem(item) {
    let multi = this.props.field.multi;
    let value = null;
    if (multi) {
      value = [];
      _.each(this.props.value, i=> {
        if (i != item) {
          value.push(i);
        }
      });
    }
    this.props.onChange && this.props.onChange(value);
  }

  handleAddImage() {
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
    let url = this.state.settings.services['alaska-admin'].prefix + '/api/upload?' + stringify({
        service: model.service.id,
        model: model.name
      });
    let nextState = {
      errorText: ''
    };
    _.each(this.refs.imageInput.files, file => {
      if (value.length >= me.state.max) {
        return;
      }
      if (file && !/\.(jpg|jpeg|png)$/i.test(file.name)) {
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
      });
    });
    this.setState(nextState);
  }

  getStyles() {
    let muiTheme = this.state.muiTheme;
    let styles = {
      root: {
        marginTop: 14
      },
      label: {
        display: 'block',
        lineHeight: '22px',
        marginBottom: 5,
        fontSize: 12,
        color: '#999',
      },
      list: {},
      item: {
        position: 'relative',
        display: 'inline-block',
        cursor: 'pointer',
        marginRight: 10,
        marginBottom: 10,
        verticalAlign: 'top',
        minHeight: 88
      },
      icon: {
        position: 'absolute',
        fontSize: 84,
        width: 84,
        height: 84,
        minHeight: 84,
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        color: '#999',
        border: 'dashed 2px #999'
      },
      input: {
        display: 'block',
        cursor: 'pointer',
        position: 'absolute',
        height: 88,
        width: 88,
        zIndex: 2,
        opacity: 0
      },
      img: {
        display: 'block',
        height: 88,
        marginBottom: 5
      },
      error: {
        color: muiTheme.baseTheme.palette.accent1Color,
        fontSize: 12
      }
    };
    return styles;
  }

  shouldComponentUpdate(props) {
    return !shallowEqual(props, this.props, 'data', 'onChange', 'model');
  }

  render() {
    let { field, value, disabled } = this.props;
    let { errorText, max } = this.state;
    let styles = this.getStyles();
    if (!field.multi) {
      value = value ? [value] : [];
    }
    let items = [];
    _.each(value, (item, index)=> {
      items.push(<div style={styles.item} key={index}>
        <img src={item.thumbUrl} style={styles.img}/>
        <FlatButton
          label="删除"
          disabled={disabled}
          onTouchTap={this.handleRemoveItem.bind(this,item)}
          style={{width: '100%'}}
        />
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
            style={styles.input}
            type="file"
            onChange={this.handleAddImage}
          />;
      }

      items.push(<div style={styles.item} key="add">
        <FontIcon className="material-icons" style={styles.icon}>add</FontIcon>
        {input}
      </div>);
    }

    let errorLabel = errorText ? <p style={styles.error}>{errorText}</p> : null;
    return (
      <div style={styles.root}>
        <label style={styles.label}>{field.label}</label>
        {items}
        {errorLabel}
      </div>
    );
  }
}
