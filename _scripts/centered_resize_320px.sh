#!/bin/bash
mogrify *.jpg -resize 320x320^ -gravity center -extent 320x320 *.jpg

