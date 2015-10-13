var gulp = require('gulp');
var argv = require('yargs').argv;
var browser = require('browser-sync').create();
var _ = require('gulp-load-plugins')();

var o = !!argv.o | !!argv.open;

gulp.task('build', ['page','style','script','image','font']);

gulp.task('style', function(){
   return gulp.src('./src/scss/index.scss')
      .pipe(_.newer('./app/assets/css/index.css'))
      .pipe(_.cssGlobbing({extensions:['.scss']}))
      .pipe(_.sass()).on('error', _.sass.logError)
      .pipe(_.autoprefixer())
      .pipe(_.cssmin())
      .pipe(gulp.dest('./app/assets/css/'))
      .pipe(browser.stream());
});
gulp.task('script', function(){
   return gulp.src('./src/js/**/*.js')
      .pipe(_.newer('./app/assets/js/index.js'))
      .pipe(_.concat('index.js'))
      .pipe(_.uglify())
      .pipe(gulp.dest('./app/assets/js/'))
      .pipe(browser.stream());
});
gulp.task('image', function() {
   return gulp.src('./src/img/**/*.{jpg,png,svg}')
      .pipe(_.cached('imaging'))
      .pipe(_.imagemin({
         optimizationLevel: 4,
         progressive: true
      }))
      .pipe(gulp.dest('./app/assets/img/'))
      .pipe(browser.stream());
});
gulp.task('font', function(){
	return gulp.src('./src/fonts/**/*')
		.pipe(_.cached('fonts'))
		.pipe(gulp.dest('./app/assets/fonts/'))
		.pipe(browser.stream());
});
gulp.task('page', function(){
  gulp.src('./src/*.php')
     .pipe(gulp.dest('./app/'))
     .pipe(browser.stream());
  return gulp.src('./src/*.html')
    .pipe(_.htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('./app/'))
    .pipe(browser.stream());
})
gulp.task('serve', function(){
   browser.init({
      server: {baseDir: './app/'},
      open: (o ? 'external' : false),
      notify: false
   });
});
gulp.task('default', ['serve'], function() {
   gulp.watch('./src/scss/**/*', ['style']);
   gulp.watch('./src/js**/*', ['script']);
   gulp.watch('./src/fonts/**/*', ['font']);
   gulp.watch('./src/img/**/*', ['image']);
   gulp.watch('./src/*.{html,php}', ['page']);
});
