/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-03-14
 * @author Liang <liang@maichong.it>
 */

import React from 'react';

export default class ImageFieldCell extends React.Component {

  shouldComponentUpdate(props) {
    return props.value != this.props.value;
  }

  render() {
    let value = this.props.value;
    if (!value || !value.thumbUrl) {
      return <div></div>;
    }
    let styles = {
      img: {
        height: 40,
        maxWidth: 100
      }
    };
    return (
      <img src={value.thumbUrl} style={styles.img}/>
    );
  }
}
