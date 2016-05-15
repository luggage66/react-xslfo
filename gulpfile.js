"use strict";
const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const del = require('del');

const paths = {
    src: 'src/**/*.{js,jsx}',
    dest: 'dist'
}

gulp.task('clean', () => {
    return del('dist/**');
});

gulp.task('build', () => {
    return gulp.src(paths.src)
        .pipe(sourcemaps.init())
        .pipe(babel())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(paths.dest));
});

gulp.task('watch', ['clean', 'build'], () => {
    return gulp.watch(paths.src, ['build']);
});

gulp.task('default', ['build']);
