var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var ts = require("gulp-typescript");
var changed = require('gulp-changed');
var babel = require('gulp-babel');
var gutil = require("gulp-util");
var webpack = require('webpack');
var webpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config.js');


gulp.task('serve', ['compile'], function() {

  nodemon({
    args: [],
    ignore: [],
    watch: [
      `dist/entry.js`
    ],
    execMap: {
      js: 'node --nolazy'
    },
    script: `server.js`,
    ext: 'ts tsx js html'
  });

});

gulp.task('webpack', function(){
    new webpackDevServer(webpack(config), config.devServer).listen(3000, function() {
      console.log('webpack server run at ' + 3000);
    });
})
gulp.task('compile', function() {
  var tsProject = ts.createProject('./tsconfig.json');
  return gulp.src([`./src/**/*.ts`], {
      base: 'src/'
    })
    .pipe(changed('./dist'), {
      hasChanged: changed.compareSha1Digest
    })
    .pipe(ts(tsProject)).js
    .pipe(babel({
      "plugins": [
        ["transform-runtime", {
          "polyfill": false,
          "regenerator": true
        }]
      ],
      presets: ["react", "es2015", "stage-3"]
    }))
    .pipe(gulp.dest('./dist'));
});