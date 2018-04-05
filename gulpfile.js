const gulp = require('gulp');
const exec = require('child_process').exec;
const bs = require('browser-sync').create();
const sass = require('gulp-sass');

const path = {
	html: ['*/*.html'],
	sass: 'sass/**/*.sass'
}

gulp.task('jekyll:build', ['sass'], function(done) {
	exec('jekyll build', function(error, stdout, stderr) {
		if(error) {
			console.log('exec error ' + error);
			return;
		}
		console.log('exec stdout ' + stdout);
		console.log('exec stderr ' + stderr);
		done();
	});
});

gulp.task('browser-sync', ['jekyll:build'], function() {
	bs.init({
		server: {
			baseDir: "_site"
		}
	});
});

gulp.task('sass', function() {
	return gulp.src('./sass/style.sass')
		   .pipe(sass())
		   .pipe(gulp.dest('./_site/assets/styles'))
		   .pipe(bs.stream())
		   .pipe(gulp.dest('./assets/styles/'));
});

gulp.task('jekyll:rebuild', ['jekyll:build'], function() {
	bs.reload();
});

gulp.task('watch', function() {
	gulp.watch(path.html, ['jekyll:rebuild']);
	gulp.watch(path.sass, ['sass']);
});

gulp.task('default', ['browser-sync'], function() {
    gulp.start('watch');
});