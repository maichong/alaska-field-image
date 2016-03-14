'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _contextPure = require('material-ui/lib/mixins/context-pure');

var _contextPure2 = _interopRequireDefault(_contextPure);

var _flatButton = require('material-ui/lib/flat-button');

var _flatButton2 = _interopRequireDefault(_flatButton);

var _fontIcon = require('material-ui/lib/font-icon');

var _fontIcon2 = _interopRequireDefault(_fontIcon);

var _lodash = require('lodash');

var _ = _interopRequireWildcard(_lodash);

var _alaskaAdminView = require('alaska-admin-view');

var _api = require('alaska-admin-view/lib/utils/api');

var _api2 = _interopRequireDefault(_api);

var _qs = require('qs');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @copyright Maichong Software Ltd. 2016 http://maichong.it
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @date 2016-03-14
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @author Liang <liang@maichong.it>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var ImageFieldView = function (_React$Component) {
  _inherits(ImageFieldView, _React$Component);

  function ImageFieldView(props, context) {
    _classCallCheck(this, ImageFieldView);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ImageFieldView).call(this, props));

    _this.handleAddImage = _this.handleAddImage.bind(_this);
    _this.state = {
      muiTheme: context.muiTheme,
      views: context.views,
      settings: context.settings,
      max: props.field.max || 1000
    };
    if (!props.field.multi) {
      _this.state.max = 1;
    }
    return _this;
  }

  _createClass(ImageFieldView, [{
    key: 'getChildContext',
    value: function getChildContext() {
      return {
        muiTheme: this.state.muiTheme,
        views: this.context.views,
        settings: this.context.settings
      };
    }
  }, {
    key: 'componentWillMount',
    value: function componentWillMount() {}
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {}
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps, nextContext) {
      var newState = {};
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
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {}
  }, {
    key: 'handleRemoveItem',
    value: function handleRemoveItem(item) {
      var multi = this.props.field.multi;
      var value = null;
      if (multi) {
        value = [];
        _.each(this.props.value, function (i) {
          if (i != item) {
            value.push(i);
          }
        });
      }
      this.props.onChange && this.props.onChange(value);
    }
  }, {
    key: 'handleAddImage',
    value: function handleAddImage() {
      var me = this;
      var _props = this.props;
      var model = _props.model;
      var field = _props.field;
      var data = _props.data;
      var value = _props.value;

      var multi = field.multi;
      if (value) {
        if (!multi) {
          value = [value];
        } else {
          value = value.concat();
        }
      } else {
        value = [];
      }
      var url = this.state.settings.services['alaska-admin'].prefix + '/api/upload?' + (0, _qs.stringify)({
        service: model.service.id,
        model: model.name
      });
      var nextState = {
        errorText: ''
      };
      _.each(this.refs.imageInput.files, function (file) {
        if (value.length >= me.state.max) {
          return;
        }
        if (file && !/\.(jpg|jpeg|png)$/i.test(file.name)) {
          nextState.errorText = '图片格式不允许';
          return;
        }

        _api2.default.post(url, {
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
  }, {
    key: 'getStyles',
    value: function getStyles() {
      var muiTheme = this.state.muiTheme;
      var styles = {
        root: {
          marginTop: 14
        },
        label: {
          display: 'block',
          lineHeight: '22px',
          marginBottom: 5,
          fontSize: 12,
          color: '#999'
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
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(props) {
      return !(0, _alaskaAdminView.shallowEqual)(props, this.props, 'data', 'onChange', 'model');
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props2 = this.props;
      var field = _props2.field;
      var value = _props2.value;
      var disabled = _props2.disabled;
      var _state = this.state;
      var errorText = _state.errorText;
      var max = _state.max;

      var styles = this.getStyles();
      if (!field.multi) {
        value = value ? [value] : [];
      }
      var items = [];
      _.each(value, function (item, index) {
        items.push(_react2.default.createElement(
          'div',
          { style: styles.item, key: index },
          _react2.default.createElement('img', { src: item.thumbUrl, style: styles.img }),
          _react2.default.createElement(_flatButton2.default, {
            label: '删除',
            disabled: disabled,
            onTouchTap: _this2.handleRemoveItem.bind(_this2, item),
            style: { width: '100%' }
          })
        ));
      });
      if (items.length < max) {
        //还未超出
        var input = undefined;
        if (!disabled) {
          input = _react2.default.createElement('input', {
            ref: 'imageInput',
            multiple: this.state.multi,
            accept: 'image/png;image/jpg;',
            style: styles.input,
            type: 'file',
            onChange: this.handleAddImage
          });
        }

        items.push(_react2.default.createElement(
          'div',
          { style: styles.item, key: 'add' },
          _react2.default.createElement(
            _fontIcon2.default,
            { className: 'material-icons', style: styles.icon },
            'add'
          ),
          input
        ));
      }

      var errorLabel = errorText ? _react2.default.createElement(
        'p',
        { style: styles.error },
        errorText
      ) : null;
      return _react2.default.createElement(
        'div',
        { style: styles.root },
        _react2.default.createElement(
          'label',
          { style: styles.label },
          field.label
        ),
        items,
        errorLabel
      );
    }
  }]);

  return ImageFieldView;
}(_react2.default.Component);

ImageFieldView.propTypes = {
  children: _react2.default.PropTypes.node
};
ImageFieldView.contextTypes = {
  muiTheme: _react2.default.PropTypes.object,
  views: _react2.default.PropTypes.object,
  settings: _react2.default.PropTypes.object
};
ImageFieldView.childContextTypes = {
  muiTheme: _react2.default.PropTypes.object,
  views: _react2.default.PropTypes.object,
  settings: _react2.default.PropTypes.object
};
ImageFieldView.mixins = [_contextPure2.default];
exports.default = ImageFieldView;