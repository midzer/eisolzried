#!/bin/bash
for i in *.mp4; do ffmpeg -i "$i" -vf "scale='if(gt(dar,320/320),320*dar,320)':'if(gt(dar,320/320),320,320/dar)',setsar=1,crop=320:320" -frames:v 1 "${i%.*}.jpg"; done
