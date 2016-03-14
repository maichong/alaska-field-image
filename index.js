/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-03-14
 * @author Liang <liang@maichong.it>
 */

'use strict';

const fs = require('mz/fs');
const alaska = require('alaska');
const moment = require('moment');
const mime = require('mime');
const co = require('co');
const mkdirp = require('mkdirp-then');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

exports.views = {
  cell: {
    name: 'ImageFieldCell',
    field: __dirname + '/lib/cell.js'
  },
  view: {
    name: 'ImageFieldView',
    field: __dirname + '/lib/view.js'
  }
};

exports.plain = mongoose.Schema.Types.Mixed;

/**
 * 初始化Schema
 * @param field   alaksa.Model中的字段配置
 * @param schema
 * @param Model
 */
exports.initSchema = function (field, schema, Model) {

  let defaultValue = field.default || {};

  let paths = {};

  function addPath(path, type) {
    let options = { type };
    if (defaultValue[path] !== undefined) {
      options.default = defaultValue[path];
    }
    paths[path] = options;
  }

  addPath('_id', mongoose.Schema.Types.ObjectId);
  addPath('ext', String);
  addPath('path', String);
  addPath('url', String);
  addPath('thumbUrl', String);
  addPath('name', String);
  addPath('size', Number);

  let imageSchema = new mongoose.Schema(paths);

  if (field.multi) {
    imageSchema = [imageSchema];
  }

  schema.add({
    [field.path]: imageSchema
  });

  if (!field.dir) {
    field.dir = '';
  }

  if (!field.pathFormat) {
    field.pathFormat = '';
  }

  if (!field.prefix) {
    field.prefix = '';
  }

  Model.underscoreMethod(field.path, 'upload', function (file) {
    let record = this;
    return field.type.upload(file, field).then(function (img) {
      record.set(field.path, img);
      return Promise.resolve();
    });
  });

  Model.underscoreMethod(field.path, 'data', function () {
    let value = this.get(field.path);
    return value && value.url ? value.url : '';
  });
};

/**
 * alaska-admin-view 前端控件初始化参数
 * @param field
 * @param Model
 */
exports.viewOptions = function (field, Model) {
  let options = alaska.Field.viewOptions.apply(this, arguments);
  options.multi = field.multi;
  return options;
};

/**
 * 上传
 * @param file
 * @param field
 */
exports.upload = function (file, field) {
  return co(function * () {
    if (!file) {
      alaska.error('File not found');
    }
    if (!/\.(jpg|jpeg|png)/i.test(file.filename)) {
      alaska.error('Image format error');
    }
    let buffer = yield fs.readFile(file.path);
    let local = field.dir;
    let dir = field.dir;
    let url = field.prefix;
    let id = new ObjectId();
    let img = {
      _id: id,
      ext: mime.extension(file.mime || file.mimeType).replace('jpeg', 'jpg'),
      size: buffer.length,
      path: '',
      thumbUrl: '',
      url: '',
      name: file.filename
    };
    if (field.pathFormat) {
      img.path += moment().format(field.pathFormat);
    }
    dir += img.path;
    img.path += id.toString() + '.' + img.ext;
    local += img.path;
    url += img.path;
    img.url = url;
    img.thumbUrl = url;

    let exists = yield fs.exists(dir);
    if (!exists) {
      yield mkdirp(dir);
    }

    yield fs.writeFile(local, buffer);

    return img;
  });
};
