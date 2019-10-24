#!/bin/bash
for i in *.mp4; do ffmpeg -i "$i" -vf "scale='if(gt(dar,200/200),200*dar,200)':'if(gt(dar,200/200),200,200/dar)',setsar=1,crop=200:200" -frames:v 1 "${i%.*}@1x.jpg"; done
for i in *.mp4; do ffmpeg -i "$i" -vf "scale='if(gt(dar,400/400),400*dar,400)':'if(gt(dar,400/400),400,400/dar)',setsar=1,crop=400:400" -frames:v 1 "${i%.*}@2x.jpg"; done
for i in *.mp4; do ffmpeg -i "$i" -vf "scale='if(gt(dar,600/600),600*dar,600)':'if(gt(dar,600/600),600,600/dar)',setsar=1,crop=600:600" -frames:v 1 "${i%.*}@3x.jpg"; done
