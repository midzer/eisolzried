#!/bin/bash
for f in *.jpg; do convert "$f" -resize 200x200^ -gravity center -extent 200x200 "thumbs/${f%.*}@1x.jpg" ; done
for f in *.jpg; do convert "$f" -resize 400x400^ -gravity center -extent 400x400 "thumbs/${f%.*}@2x.jpg" ; done
for f in *.jpg; do convert "$f" -resize 600x600^ -gravity center -extent 600x600 "thumbs/${f%.*}@3x.jpg" ; done
