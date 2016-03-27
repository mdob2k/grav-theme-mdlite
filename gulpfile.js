var gulp = require('gulp'),
    del = require('del'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    cssnano = require('gulp-cssnano'),
    concat = require('gulp-concat'),
    merge = require('merge-stream'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify');

gulp.task('clean', function() {
    del([
        './css/**/*',
        './js/**/*',
        '!./css/theme.css',
        '!./js/theme.js'
    ]);
});

gulp.task('copy', function() {
    return gulp.src(['bower_components/material-design-lite/material*.js', 'bower_components/material-design-lite/material*.js.map'])
        .pipe(gulp.dest('./js'));
});

gulp.task('styles', function() {
    var dosass = gulp.src('./scss/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./css'));
    var donano = gulp.src('./scss/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(cssnano())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./css'));
    return merge(dosass, donano);
});

gulp.task('uglify', ['copy'], function() {
    return gulp.src([
            './js/*.js',
            '!./js/**/*.min.js'
        ])
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./js'));
});

gulp.task('watch', function() {
    return gulp.watch('./scss/**/*.scss', ['sass']);
});

gulp.task('default', ['clean', 'copy', 'styles']);
