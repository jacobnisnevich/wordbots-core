let babel = require('babel-core/register')({
	presets: ['es2015', 'stage-2', 'react']
});
require('./server');

require.extensions['.png'] = function () {
  return null;
};
