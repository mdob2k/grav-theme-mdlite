var gulp = require('gulp'),
    del = require('del'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    minifyCSS = require('gulp-minify-css'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify');

gulp.task('clean', function() {
    del([
        './css/**/*',
        './js/**/*'
    ]);
});

gulp.task('copy', function() {
    return gulp.src('bower_components/material-design-lite/material.js')
        .pipe(gulp.dest('./js'));
});

gulp.task('sass', function() {
    return gulp.src('./scss/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./css'));
});

gulp.task('minify-css', function() {
    return gulp.src('./css/*.css')
        .pipe(sourcemaps.init())
        .pipe(minifyCss())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./css/'));
});

gulp.task('uglify', function() {
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
    return gulp.watch('./scss/**/*.scss', ['styles']);
});

gulp.task('default', ['clean', 'copy', 'uglify', 'sass']);
