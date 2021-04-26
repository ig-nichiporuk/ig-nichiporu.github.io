var gulp = require('gulp'),
	gulpIf = require('gulp-if'),
	sass = require('gulp-sass'),
	cleancss = require('gulp-clean-css'),
	browserSync = require('browser-sync').create(), //Подключаем browser-sync-пакет
	svgSprite = require('gulp-svg-sprites'),
	svgmin = require('gulp-svgmin'),
	cheerio = require('gulp-cheerio'),
	replace = require('gulp-replace'),
	// gutil = require( 'gulp-util' ),
	// ftp = require('gulp-ftp'),
	autoprefixer = require('gulp-autoprefixer'),
	del = require('del'),
	sourcemaps = require('gulp-sourcemaps');
	// uncss = require('gulp-uncss');
	fileinclude = require('gulp-file-include');






//----------------------Синхронизация браузера, отслеживание изменений в SCSS и в HTML файлах-------------------------
//----------------------Синхронизация браузера, отслеживание изменений в SCSS и в HTML файлах-------------------------
gulp.task('serve', function(done) {  // task sass выполняется первым (перед  task serve) так как записан в квадратных скобках
	browserSync.init({
		server: "src/",  // Остлеживаем всё в папке site
	});
	gulp.watch("src/media/**/*", gulp.series('clear-img', 'img-src', 'svgSpriteCol', 'svgSpriteBuild'));
	gulp.watch("src/js/**/*").on('change', browserSync.reload);
	gulp.watch("src/sass/**/*", gulp.series('clear-css', 'sass', 'css-src')); // Остлеживаем в папке site папку sass  и все файлы .scss
	gulp.watch(["src/html/*.html", "src/components/*.html"], gulp.series('html-src')).on('change', browserSync.reload); // при изменении html в папке site перезагружается браузер
	done();
});
gulp.task('sass',  function(done){ //Создаём таск "sass"
	gulp.src(['src/sass/**/*.sass','src/sass/**/*.scss']) //Берём источник
		.pipe(sourcemaps.init())
		.pipe(sass({/*outputStyle:'compressed'*/}).on('error',sass.logError)) //Преобразуем Sass в Css
		// .pipe(uncss({
  //           html: ['src/filter-industrial-tires.html']
  //       }))

		.pipe(autoprefixer(['last 2 versions', /*'> 1%',*/ /*'ie 8', 'ie 7'*/], { cascade: true }))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('src/css')) //Выгружаем результат в папку "css"
		.pipe(browserSync.stream()); //все изменения впиливаются в браузер без перезагрузки
	done();
});





//---------------------Минимизация монохромных SVG-картинок и создание спрайта---------------------------------------
//---------------------Минимизация монохромных SVG-картинок и создание спрайта---------------------------------------
gulp.task('svgSpriteBuild', function (done) {
	gulp.src('./src/media/svg-mono/**/*.svg')
		.pipe(svgmin({			// минимизируем svg
			js2svg: {
				pretty: true	// удаляет все посторонние пробелы
			},
			plugins: [{
				removeTitle: true
			}]
		}))
		.pipe(cheerio({
			run: function ($) {		// удаляет все ненужные атрибуты
				$('[fill]').removeAttr('fill');
				$('[style]').removeAttr('style');
				$('[title]').removeAttr('title');
			},
			parserOptions: { xmlMode: true }
		}))
		.pipe(replace('&gt;', '>'))	// cheerio преобразует '>' в '&gt;', заменяем.
		.pipe(svgSprite({
				mode: "symbols",
				padding: "0",
				preview: false,
				svg: {
					symbols: './sprite-mono.svg'
				}
			}
		))
		.pipe(gulp.dest('src/img'));
	done();
});



//---------------------Минимизация цветных SVG-картинок---------------------------------------------------------------
//---------------------Минимизация цветных SVG-картинок---------------------------------------------------------------
gulp.task('svgSpriteCol', function (done) {
	gulp.src('./src/media/svg-color/**/*.svg')
		.pipe(svgSprite({
				mode: "symbols",
				preview: false,
				svg: {
					symbols: './sprite-color.svg'
				}
			}
		))
		.pipe(gulp.dest('src/img'));
	done();
});


gulp.task('html-src', function (done) {
	gulp.src('./src/html/*.html').pipe(fileinclude()).pipe(gulp.dest('./src'));
	done();
});
gulp.task('css-src', function (done) {
	gulp.src('./src/sass/**/*.css').pipe(gulp.dest('./src/css/'));
	done();
});
gulp.task('img-src', function (done) {
	gulp.src(['./src/media/*.*', './src/media/global/*.*']).pipe(gulp.dest('./src/img/'));
	done();
});



gulp.task('clear-css', function (done) {
	done();
	del(['./src/css/*.*', './src/css/global/*.*']);
});
gulp.task('clear-img', function (done) {
	del(['./src/img/*']);
	done();
});







gulp.task('default', gulp.series('css-src', 'img-src', 'svgSpriteCol', 'svgSpriteBuild', 'sass', 'serve'));























