var test = require('tape');
var path = require('path');
var loadMulticonfig = require('..');

test('defined file that does not exist', function(t) {
  var planned = 0;

  loadMulticonfig(null, {
    config: '/does/not/exist',
  })
    .catch(function(error) {
      t.equal(error.code, 'ENOENT', 'with expected format');
    });
  planned += 1;

  t.plan(planned);
});

test('defined JSON file with syntax error', function(t) {
  var planned = 0;

  loadMulticonfig(null, {
    config: path.join(__dirname, './fixtures/foo-invalid.json'),
  })
    .catch(function(error) {
      t.ok(/^Failed to parse/.test(error.message), 'without expected format');
    });
  planned += 1;

  loadMulticonfig(null, {
    config: path.join(__dirname, './fixtures/foo-invalid.json'),
    format: 'json',
  })
    .catch(function(error) {
      t.equal(error.name, 'JSONError', 'with expected format');
    });
  planned += 1;

  t.plan(planned);
});

test('defined YAML file with syntax error', function(t) {
  var planned = 0;

  loadMulticonfig(null, {
    config: path.join(__dirname, './fixtures/foo-invalid.yaml'),
  })
    .catch(function(error) {
      t.ok(/^Failed to parse/.test(error.message), 'without expected format');
    });
  planned += 1;

  loadMulticonfig(null, {
    config: path.join(__dirname, './fixtures/foo-invalid.yaml'),
    format: 'yaml',
  })
    .catch(function(error) {
      t.equal(error.name, 'YAMLException', 'with expected format');
    });
  planned += 1;

  t.plan(planned);
});

test('defined JS file with syntax error', function(t) {
  var planned = 0;

  loadMulticonfig(null, {
    config: path.join(__dirname, './fixtures/foo-invalid.js'),
  })
    .catch(function(error) {
      t.ok(/^Failed to parse/.test(error.message), 'without expected format');
    });
  planned += 1;

  loadMulticonfig(null, {
    config: path.join(__dirname, './fixtures/foo-invalid.js'),
    format: 'js',
  })
    .catch(function(error) {
      t.equal(error.name, 'ReferenceError', 'with expected format');
    });
  planned += 1;

  t.plan(planned);
});
