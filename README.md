[![Build Status](https://travis-ci.org/midzer/eisolzried.svg?branch=master)](https://travis-ci.org/midzer/eisolzried)

Diese statische Webseite wird mit [jekyll](http://jekyllrb.com) gebaut. Um sie lokal zu testen, sollte folgendes genügen:

```
git clone https://github.com/midzer/eisolzried.git
cd eisolzried
gem install jekyll bundler
bundle
bundle exec jekyll serve
```

Nun ist die Webseite im Browser über http://localhost:4000 zu finden. Die Produktivversion wird mit `JEKYLL_ENV=production bundle exec jekyll build` gebaut.

