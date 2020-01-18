#!/bin/bash
for i in *.mp4; do ffmpeg -i "$i" -vf "crop='min(200,min(iw,ih)):min(200,min(iw,ih))'" -frames:v 1 "thumbs/${i%.*}-1x.jpg"; done
for i in *.mp4; do ffmpeg -i "$i" -vf "crop='min(400,min(iw,ih)):min(400,min(iw,ih))'" -frames:v 1 "thumbs/${i%.*}-2x.jpg"; done
for i in *.mp4; do ffmpeg -i "$i" -vf "crop='min(600,min(iw,ih)):min(600,min(iw,ih))'" -frames:v 1 "thumbs/${i%.*}-3x.jpg"; done
