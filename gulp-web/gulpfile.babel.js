import gulp from 'gulp'
import babel from 'gulp-babel'
import cleanCSS from 'gulp-clean-css'
import eslint from 'gulp-eslint'
import uglify from 'gulp-uglify'
import size from 'gulp-size'
import cache from 'gulp-cache'
import imagemin from 'gulp-imagemin'
import autoprefixer from 'gulp-autoprefixer'
import runSequence from 'run-sequence'
import browserSync from 'browser-sync'
import gulpIf from 'gulp-if'
import del from 'del'
import path from 'path'

const reload = browserSync.reload
const prod = process.env.NODE_ENV === 'production'

const paths = {
  styles: {
    src: 'src/styles/**/*.css',
    dest: 'dist/css/'
  },
  js: {
    src: 'src/js/**/*.js',
    dest: 'dist/js/'
  },
  images: {
    src: 'src/images/**/*',
    dest: 'dist/images/'
  },
  assets: {
    src: 'src/assets/**/*',
    dest: 'dist/assets/'
  },
  rootFile: {
    src: 'src/*',
    dest: 'dist/'
  }
}

// eslint 检查
gulp.task('lint', () => {
  return gulp.src([paths.js.src, '!node_modules/**'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(gulpIf(!browserSync.active, eslint.failAfterError()))
})

// Optimize images
gulp.task('images', () => {
  return gulp.src(paths.images.src)
    .pipe(cache(imagemin({
      progressive: true,
      interlaced: true
    })))
    .pipe(gulp.dest(paths.images.dest))
    .pipe(size({title: 'images'}))
})

// Copy all files at the root level (app)
gulp.task('rootFile', () => {
  return gulp.src(paths.rootFile.src, {dot: true, nodir: true})
    .pipe(gulp.dest(paths.rootFile.dest))
    .pipe(size({title: 'rootFile'}))
})

// Copy font
gulp.task('assets', () => {
  return gulp.src(paths.assets.src, {dot: true, nodir: true})
    .pipe(gulp.dest(paths.assets.dest))
    .pipe(size({title: 'assets'}))
})

gulp.task('copy', ['rootFile', 'images', 'assets'])

// css
gulp.task('styles', () => {
  const AUTOPREFIXER_BROWSERS = [
    'ie >= 10',
    'ie_mob >= 10',
    'ff >= 30',
    'chrome >= 34',
    'safari >= 7',
    'opera >= 23',
    'ios >= 7',
    'android >= 4.4',
    'bb >= 10'
  ]

  return gulp.src(paths.styles.src)
    .pipe(gulpIf(prod, autoprefixer(AUTOPREFIXER_BROWSERS)))
    .pipe(gulpIf(prod, cleanCSS()))
    .pipe(gulp.dest(paths.styles.dest))
    .pipe(size({title: 'styles'}))
})

// babel 编译
gulp.task('script', () => {
  return gulp.src(paths.js.src)
    .pipe(babel())
    .pipe(gulpIf(prod, uglify()))
    .pipe(gulp.dest(paths.js.dest))
    .pipe(size({title: 'script'}))
})

// 清理文件
gulp.task('clean', () => {
  return del(['dist/**/*'], {dot: true})
})

// 监视文件改动并重新载入
gulp.task('server', ['styles', 'lint', 'script', 'copy'], function() {
  browserSync({
    server: {
      baseDir: 'dist'
    },
    port: 3000
  })

  gulp.watch([paths.styles.src], ['styles', reload])
  gulp.watch([paths.js.src], ['lint', 'script', reload])
  gulp.watch([paths.rootFile.src], {dot: true}, ['rootFile', reload])
  gulp.watch([paths.images.src], ['images', reload])
  gulp.watch([paths.assets.src], ['assets', reload])
})

gulp.task('build', ['clean'], cb => {
  return runSequence('styles', ['lint', 'script'], 'copy', cb)
})
