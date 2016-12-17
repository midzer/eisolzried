[![Build Status](https://travis-ci.org/midzer/eisolzried.svg?branch=master)](https://travis-ci.org/midzer/eisolzried)

Diese Webseite wird mit [jekyll](http://jekyllrb.com) gebaut.

Um sie lokal zu testen, sollte folgendes genügen:

```
git clone https://github.com/midzer/eisolzried.git
cd eisolzried
gem install jekyll bundler
bundle install
jekyll serve
```

Sollte alles geklappt haben, ist die Webseite im Browser über http://127.0.0.1:4000 zu finden.

Die Produktivversion wird mit `JEKYLL_ENV=production jekyll build` gebaut.
