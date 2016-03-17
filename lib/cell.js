'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

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

  function ImageFieldCell() {
    _classCallCheck(this, ImageFieldCell);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(ImageFieldCell).apply(this, arguments));
  }

  _createClass(ImageFieldCell, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(props) {
      return props.value != this.props.value;
    }
  }, {
    key: 'render',
    value: function render() {
      var value = this.props.value;
      if (!value || !value.thumbUrl) {
        return _react2.default.createElement('div', null);
      }
      var styles = {
        img: {
          height: 40,
          maxWidth: 100
        }
      };
      return _react2.default.createElement('img', { src: value.thumbUrl, style: styles.img });
    }
  }]);

  return ImageFieldCell;
}(_react2.default.Component);

exports.default = ImageFieldCell;