const gulp = require('gulp');
const del = require('del');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const jshint = require('gulp-jshint');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');
const clean = require('gulp-clean-css');
const connect = require('gulp-connect');
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');
const runSequence = require('run-sequence');
const environments = require('gulp-environments');
const development = environments.development;
const production = environments.production;
const prodDir = 'dist';
const devDir = 'bin';

gulp.task('default', function() {
  return runSequence('build', ['devserver', 'watch']);
});
gulp.task('build', function() {
  return runSequence('clean','set-dev', ['js', 'styles', 'html']);
});
gulp.task('build-prod', function() {
  return runSequence('clean', 'set-prod', ['js', 'styles', 'html']);
});

gulp.task('set-dev', development.task);
gulp.task('set-prod', production.task);
gulp.task('js', ['jsApp', 'jsLib']);


gulp.task('jsApp', function() {
  const dir = getDir();
  return gulp.src(['./src/js/canvasState.js', './src/js/clock.js', './src/js/app.js'])
  .pipe(development(sourcemaps.init()))
  .pipe(babel({presets: ['@babel/env']}))
  .pipe(uglify())
  .pipe(concat('app.min.js'))
  .pipe(development(sourcemaps.write('.')))
  .pipe(gulp.dest(`./${dir}/js`))
  .pipe(connect.reload())
});

gulp.task('jsLib', function() {
  const dir = getDir();
  return gulp.src("./node_modules/moment/min/moment.min.js")
  .pipe(gulp.dest(`./${dir}/js`))
});

gulp.task('styles', function() {
  const dir = getDir();
  return gulp.src('./src/sass/*.scss')
  .pipe(development(sourcemaps.init()))
  .pipe(sass())
  .pipe(clean())
  .pipe(concat('style.min.css'))
  .pipe(development(sourcemaps.write('.')))
  .pipe(gulp.dest(`./${dir}/css`))
  .pipe(connect.reload());
});

gulp.task('html', function() {
  const dir = getDir();
  return gulp.src('./src/app.html')
  .pipe(rename('index.html'))
  .pipe(gulp.dest(`./${dir}`))
});

gulp.task('clean', function() {
  return del([`./${devDir}`, `./${prodDir}`])
});

gulp.task('devserver', function() {
  connect.server({
    root: `./${devDir}`,
    livereload: true
  });
});

gulp.task('watch', function () {
  gulp.watch(['./src/*/*.*', '!./src/*.html'], ['jsApp', 'styles']);
 });

gulp.task('check', function() {
  return gulp.src('src/js/*.js')
  .pipe(jshint())
  .pipe(jshint.reporter('default'))
});

function getDir() {
  return production() ? prodDir : devDir;
}