/**
    pan.ts gulpfile

    Creates the following:
    - DIST_DIR/index.js
 */

var gulp = require('gulp')
  , _ = require('lodash')
  , $ = require('gulp-load-plugins')()
  , jasmineReporters = require('jasmine-reporters')
  , source = require('vinyl-source-stream')
  , fs   = require('fs')
  , path = require('path')
  , del  = require('del')
  , glob = require('glob')
  , merge = require('merge-stream')
  , dtsgen = require('dts-generator')

var MODULE_NAME = 'pan.ts'
var MODULE_NAME_SAFE = 'pants'
var BUILD_DIR = 'build'
var DIST_DIR  = 'dist'

gulp.task('default', ['clean', 'build'])

gulp.task('build', ['build-ts', 'build-dts'], function () {
    var js = gulp.src(['build/*.js', 'build/*.js.map'])

    var dtsHeader = "\ndeclare module " + MODULE_NAME_SAFE + " {\n"

    var dtsFooter = "\n}\n\n"
                  + "declare module '" + MODULE_NAME + "' {\n"
                  + "    export = " + MODULE_NAME_SAFE + ";\n"
                  + "}\n"

    var dts = gulp.src('build/*.d.ts')
                 .pipe($.replace('export declare', 'export'))
                 .pipe($.indent({ tabs: false, amount: 4, }))
                 .pipe($.insert.wrap(dtsHeader, dtsFooter))
                 // .pipe($.rename(MODULE_NAME_SAFE + '.d.ts'))

    return merge(js, dts)
                 .pipe(gulp.dest(DIST_DIR))
})

gulp.task('build-dts', function () {
    require('dts-generator').generate({
        name: 'pan.ts',
        baseDir: 'src',
        files: tsconfig().files.map(function (f) { return f.replace('src/', '') }),
        out: 'dist/pants.d.ts'
    });
})

gulp.task('build-ts', function () {
    var tsCompiler = $.typescript({
        outDir: 'build',
        typescript: require('ntypescript'),
        removeComments: false,
        target: 'ES5',
        module: 'commonjs',
        sortOutput: true,
        declaration: true,
        definitionFiles: true,
        noExternalResolve: true,
        sourceMap: true,
    })

    var tsResult = gulp.src(tsconfig().files)
                       .pipe(tsCompiler)

    return merge(tsResult.js, tsResult.dts)
                .pipe( gulp.dest(BUILD_DIR) )
})

gulp.task('clean', function (next) {
    del(BUILD_DIR)
    // del(DIST_DIR)
    next()
})

gulp.task('watch', function () {
    gulp.watch('src/**/*.ts', ['build-ts'])
})

gulp.task('test', ['build-tests'], function () {
    return gulp.src('spec/build/all-tests.js')
               .pipe($.jasmine({
                    verbose: true,
               }))
})

gulp.task('build-tests', function () {
    var files = glob.sync('src/**/*.spec.ts')

    var bundler = browserify({ basedir: '.', debug: true })

    // add all of the specs found by the file glob
    files.forEach(function (file) { bundler.add(file) })
    bundler.plugin('tsify') // tsify's config is automatically read from the tsconfig.json in the same directory as the gulpfile, if one exists.

    return bundler.bundle()
                  .pipe(source('all-tests.js'))
                  .pipe(gulp.dest('spec/build'))
})



var _tsconfigCache = null
function tsconfig (opts) {
    if (_tsconfigCache == null) {
        var json = fs.readFileSync(path.join(__dirname, 'tsconfig.json'))
        var obj  = JSON.parse(json)
        obj      = _.assign(obj, opts || {})
        _tsconfigCache = obj
    }
    return _tsconfigCache
}

