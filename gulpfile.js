(function(){

"use strict";

var gulp = require('gulp');
var connect = require('gulp-connect'); //runs a local dev server
var open = require('gulp-open'); //open a url in a web browser
var browserify = require('browserify'); //bundles JS
var reactify = require('reactify'); //transforms react JSX to JS
var source = require('vinyl-source-stream'); //use conventional text streams with gulp
var concat = require('gulp-concat'); //concatenates files, used for css bundling
var lint = require('gulp-eslint'); //lint JS files, including JSX

//set base config
var config = {
    port: 9005,
    devBaseUrl: 'http://localhost',
    paths: {
        html : './src/*.html',
        js: './src/**/*.js',
        css : [
            'node_modules/bootstrap/dist/css/bootstrap.min.css',
            'node_modules/bootstrap/dist/css/bootstrap-theme.min.css'
        ],
        images: './src/images/*',
        dist : './dist',
        mainJs : './src/main.js'
    }
};

///gulp tasks
//task 1: start a local development web server
gulp.task('connect', function(){
    connect.server({
        root: ['dist'],
        port: config.port,
        base: config.devBaseUrl,
        livereload: true
    });
});

//task 2: open a default url
gulp.task('open', ['connect'], function(){
    gulp.src('dist/index.html')
    .pipe(open({uri: config.devBaseUrl + ":" + config.port + "/", app: 'chrome'}));
});

//task 3: copy html from src to dist
gulp.task('html',function(){
    gulp.src(config.paths.html)
    .pipe(gulp.dest(config.paths.dist)) //copy
    .pipe(connect.reload()); //live reload
});

//task 4: watch files or folders for changes
gulp.task('watch', function(){
    gulp.watch(config.paths.html, ['html']);
    gulp.watch(config.paths.js, ['js', 'lint']);
});

//task 5: bundle and transform js files
gulp.task('js', function(){
    browserify(config.paths.mainJs)
    .transform(reactify)
    .bundle()
    .on('error', console.error.bind(console))
    .pipe(source('bundle.js'))
    .pipe(gulp.dest(config.paths.dist + '/scripts'))
    .pipe(connect.reload());
});

//task 6: bundle css files
gulp.task('css', function(){
    gulp.src(config.paths.css)
    .pipe(concat('bundle.css'))
    .pipe(gulp.dest(config.paths.dist + '/css'));
});

//task 7: apply linting to js files
gulp.task('lint', function(){
    return gulp.src(config.paths.js)
    .pipe(lint({config: 'eslint.config.json'}))
    .pipe(lint.format());
});

//task 8: copy images over to dist
gulp.task('images', function(){
    gulp.src(config.paths.images)
    .pipe(gulp.dest(config.paths.dist + '/images'))
    .pipe(connect.reload());
    //publish favicon
    gulp.src('./src/favicon.ico')
    .pipe(gulp.dest(config.paths.dist));
});


//task Default: run all above created tasks
gulp.task('default', ['html','js', 'images','css', 'lint', 'open', 'watch']);
})();