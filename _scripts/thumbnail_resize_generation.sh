#!/bin/bash
for f in *.jpg; do convert "$f" -quality 80 -resize 350x\> "thumbs/${f%.*}-1x.jpg" ; done
for f in *.jpg; do convert "$f" -quality 80 -resize 700x\> "thumbs/${f%.*}-2x.jpg" ; done
for f in *.jpg; do convert "$f" -quality 80 -resize 1050x\> "thumbs/${f%.*}-3x.jpg" ; done
