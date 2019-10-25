#!/bin/bash
for f in *.jpg; do convert "$f" -quality 80 -gravity center -crop 1:1+0+0 +repage -resize 200x200\> "thumbs/${f%.*}-1x.jpg" ; done
for f in *.jpg; do convert "$f" -quality 80 -gravity center -crop 1:1+0+0 +repage -resize 400x400\> "thumbs/${f%.*}-2x.jpg" ; done
for f in *.jpg; do convert "$f" -quality 80 -gravity center -crop 1:1+0+0 +repage -resize 600x600\> "thumbs/${f%.*}-3x.jpg" ; done
