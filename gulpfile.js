
import gulp from 'gulp';
import htmlmin from 'gulp-htmlmin';
import sassPackage from 'sass';
import gulpSass from 'gulp-sass';
import cleanCSS from 'gulp-clean-css';
import uglify from 'gulp-terser';
import imagemin from 'gulp-imagemin';
import merge from 'merge-stream';

const sass = gulpSass(sassPackage);

export function minifyHTML() {
  return gulp.src('src/*.html')
      .pipe(htmlmin({ collapseWhitespace: true }))
      .pipe(gulp.dest('dist'));
}

export function compileSass() {
  return gulp.src('src/styles/main.scss')
    .pipe(sass())
    .pipe(gulp.dest('src/css'))
}

export function minifyCSS() {
  return gulp.src('src/css/*.css')
    .pipe(cleanCSS())
    .pipe(gulp.dest('dist/styles'));
}

export function minifyJS() {
  return gulp.src('src/scripts/*js')
    .pipe(uglify())
    .pipe(gulp.dest('dist/scripts'));
}

export function optimizeImages() {
  return merge(
    gulp.src('src/images/**/*'),
    gulp.src('src/icons/**/*'))
    .pipe(imagemin())
    .pipe(gulp.dest(file => {
      return file.path.includes('icons') ? 'dist/icons' : 'dist/images';
    }))
}

export function watch() {
  gulp.watch('src/*.html', minifyHTML);
  gulp.watch('src/styles/*.scss', compileSass);
  gulp.watch('src/styles/*.css', minifyCSS);
  gulp.watch('src/scripts/*js', minifyJS);
  gulp.watch('src/images/*', optimizeImages);
}

export default gulp.series(minifyHTML, compileSass, minifyCSS, minifyJS, optimizeImages, watch);