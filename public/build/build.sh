r.js -o build/app.build.js
cd ../dist
mv js/vendor/requirejs/require.js require.js
rm -rf js/vendor/* build js/views js/models js/collections build.txt
mkdir js/vendor/requirejs && mv require.js js/vendor/requirejs/require.js
mv css/style.css style.css && rm -rf css/* && mv style.css css/style.css