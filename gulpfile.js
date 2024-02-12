
import gulp from 'gulp';
import htmlmin from 'gulp-htmlmin';
import sassPackage from 'sass';
import gulpSass from 'gulp-sass';
import cleanCSS from 'gulp-clean-css';
import uglify from 'gulp-terser';
import concat from 'gulp-concat';
import imagemin from 'gulp-imagemin';
import merge from 'merge-stream';
import plumber from 'gulp-plumber';

const sass = gulpSass(sassPackage);
const paths = {
  scripts: ['!gulpfile.js', './*.js', 'src/scripts/**/*.js'],
  dest: 'dist/scripts'
};

function errorHandler(error) {
  console.error(error, error.message, error.fileName, error.lineNumber);
  this.emit('end');
}

export function minifyHTML() {
  return gulp.src('src/*.html')
    .pipe(plumber(errorHandler))
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('dist'));
  }
  
  export function compileSass() {
    return gulp.src('src/styles/main.scss')
    .pipe(plumber(errorHandler))
    .pipe(sass())
    .pipe(gulp.dest('src/css'))
  }
  
  export function minifyCSS() {
    return gulp.src('src/css/*.css')
    .pipe(plumber(errorHandler))
    .pipe(cleanCSS())
    .pipe(gulp.dest('dist/styles'));
  }
  
  export function minifyJS() {
    return gulp.src(paths.scripts)
    .pipe(plumber(errorHandler))
    .pipe(concat('index.js'))
    .pipe(uglify())
    .pipe(gulp.dest(paths.dest));
  }
  
  export function optimizeImages() {
    return merge(
      gulp.src('src/images/**/*'),
      gulp.src('src/icons/**/*'))
      .pipe(plumber(errorHandler))
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