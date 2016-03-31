'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash');

var _ = _interopRequireWildcard(_lodash);

var _alaskaAdminView = require('alaska-admin-view');

var _qs = require('qs');

var _reactBootstrap = require('react-bootstrap');

require('../style.less');

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

  function ImageFieldView(props) {
    _classCallCheck(this, ImageFieldView);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ImageFieldView).call(this, props));

    _this.handleAddImage = function () {
      var me = _this;
      var t = _this.context.t;
      var _this$props = _this.props;
      var model = _this$props.model;
      var field = _this$props.field;
      var data = _this$props.data;
      var value = _this$props.value;

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
      var url = _this.context.settings.services['alaska-admin'].prefix + '/api/upload?' + (0, _qs.stringify)({
        service: model.service.id,
        model: model.name
      });
      var nextState = {
        errorText: ''
      };
      _.each(_this.refs.imageInput.files, function (file) {
        if (value.length >= me.state.max || !file) {
          return;
        }
        var matchs = file.name.match(/\.(\w+)$/);
        if (!matchs || !matchs[1] || field.allowed.indexOf(matchs[1].replace('jpeg', 'jpg').toLowerCase()) < 0) {
          nextState.errorText = t('Invalid image format');
          return;
        }
        _alaskaAdminView.api.post(url, {
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
      _this.setState(nextState);
    };

    _this.state = {
      max: props.field.max || 1000,
      errorText: ''
    };
    if (!props.field.multi) {
      _this.state.max = 1;
    }
    return _this;
  }

  _createClass(ImageFieldView, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps, nextContext) {
      var newState = {};
      if (nextProps.errorText !== undefined) {
        newState.errorText = nextProps.errorText;
        this.setState(newState);
      }
    }
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
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(props, state) {
      return !(0, _alaskaAdminView.shallowEqual)(props, this.props, 'data', 'onChange', 'model') || !(0, _alaskaAdminView.shallowEqual)(state, this.state);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props;
      var field = _props.field;
      var value = _props.value;
      var disabled = _props.disabled;
      var _state = this.state;
      var errorText = _state.errorText;
      var max = _state.max;

      if (!field.multi) {
        value = value ? [value] : [];
      }
      var items = [];
      _.each(value, function (item, index) {
        items.push(_react2.default.createElement(
          'div',
          { key: index, className: 'image-field-item' },
          _react2.default.createElement('img', { src: item.thumbUrl }),
          _react2.default.createElement(
            _reactBootstrap.Button,
            {
              disabled: disabled,
              onClick: _this2.handleRemoveItem.bind(_this2, item),
              bsStyle: 'link',
              block: true
            },
            '删除'
          )
        ));
      });
      if (items.length < max) {
        //还未超出
        var input = void 0;
        if (!disabled) {
          input = _react2.default.createElement('input', {
            ref: 'imageInput',
            multiple: this.state.multi,
            accept: 'image/png;image/jpg;',
            type: 'file',
            onChange: this.handleAddImage
          });
        }

        items.push(_react2.default.createElement(
          'div',
          { className: 'image-field-item image-field-add', key: 'add' },
          _react2.default.createElement('i', { className: 'fa fa-plus-square-o' }),
          input
        ));
      }

      var help = field.help;
      var className = 'form-group image-field';
      if (errorText) {
        className += ' has-error';
        help = errorText;
      }
      var helpElement = help ? _react2.default.createElement(
        'p',
        { className: 'help-block' },
        help
      ) : null;
      return _react2.default.createElement(
        'div',
        { className: className },
        _react2.default.createElement(
          'label',
          { className: 'control-label col-xs-2' },
          field.label
        ),
        _react2.default.createElement(
          'div',
          { className: 'col-xs-10' },
          items,
          helpElement
        )
      );
    }
  }]);

  return ImageFieldView;
}(_react2.default.Component);

ImageFieldView.contextTypes = {
  settings: _react2.default.PropTypes.object,
  t: _react2.default.PropTypes.func
};
exports.default = ImageFieldView;