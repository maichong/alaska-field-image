'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _getMuiTheme = require('material-ui/lib/styles/getMuiTheme');

var _getMuiTheme2 = _interopRequireDefault(_getMuiTheme);

var _contextPure = require('material-ui/lib/mixins/context-pure');

var _contextPure2 = _interopRequireDefault(_contextPure);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @copyright Maichong Software Ltd. 2016 http://maichong.it
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @date 2016-03-14
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @author Liang <liang@maichong.it>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var ImageFieldCell = function (_React$Component) {
  _inherits(ImageFieldCell, _React$Component);

  function ImageFieldCell(props, context) {
    _classCallCheck(this, ImageFieldCell);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ImageFieldCell).call(this, props));

    _this.state = {
      muiTheme: context.muiTheme ? context.muiTheme : (0, _getMuiTheme2.default)(),
      views: context.views,
      settings: context.settings
    };
    return _this;
  }

  _createClass(ImageFieldCell, [{
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
      this.setState(newState);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {}
  }, {
    key: 'render',
    value: function render() {
      var props = this.props;
      var state = this.state;
      var styles = {
        root: {}
      };
      return _react2.default.createElement(
        'div',
        { style: styles.root },
        'ImageFieldCell Component'
      );
    }
  }]);

  return ImageFieldCell;
}(_react2.default.Component);

ImageFieldCell.propTypes = {
  children: _react2.default.PropTypes.node
};
ImageFieldCell.contextTypes = {
  muiTheme: _react2.default.PropTypes.object,
  views: _react2.default.PropTypes.object,
  settings: _react2.default.PropTypes.object
};
ImageFieldCell.childContextTypes = {
  muiTheme: _react2.default.PropTypes.object,
  views: _react2.default.PropTypes.object,
  settings: _react2.default.PropTypes.object
};
ImageFieldCell.mixins = [_contextPure2.default];
exports.default = ImageFieldCell;