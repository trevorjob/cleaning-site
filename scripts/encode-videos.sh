#!/usr/bin/env bash
# Usage: scripts/encode-videos.sh hero|overnight <source.mp4>
# Writes an AV1 file (smallest, for browsers that play it) and an H.264 fallback, plus the still frames.
set -euo pipefail

name=${1:?hero or overnight}
src=${2:?source video}
out=public/images
scale="scale='min(1280,iw)':-2"

case $name in
  hero)
    ffmpeg -v error -y -i "$src" -vf "$scale" -c:v libsvtav1 -preset 4 -crf 32 -pix_fmt yuv420p -an -movflags +faststart "$out/hero.av1.mp4"
    ffmpeg -v error -y -i "$src" -vf "$scale" -c:v libx264 -preset veryslow -crf 22 -pix_fmt yuv420p -an -movflags +faststart "$out/hero.mp4"
    ffmpeg -v error -y -i "$out/hero.mp4" -frames:v 1 -q:v 2 "$out/hero.jpg"
    ;;
  overnight)
    # Scrubbed by scroll: a keyframe every 12 frames and no reordered frames keep every seek to one paint.
    ffmpeg -v error -y -i "$src" -vf "$scale" -c:v libsvtav1 -preset 4 -crf 32 -g 12 -svtav1-params pred-struct=1 -pix_fmt yuv420p -an -movflags +faststart "$out/overnight.av1.mp4"
    ffmpeg -v error -y -i "$src" -vf "$scale" -c:v libx264 -preset veryslow -crf 20 -g 12 -bf 0 -pix_fmt yuv420p -an -movflags +faststart "$out/overnight.mp4"
    ffmpeg -v error -y -i "$out/overnight.mp4" -frames:v 1 -q:v 2 "$out/overnight-evening.jpg"
    ffmpeg -v error -y -sseof -0.1 -i "$out/overnight.mp4" -frames:v 1 -q:v 2 "$out/overnight-morning.jpg"
    ;;
  *)
    echo "Unknown video: $name (expected hero or overnight)" >&2
    exit 1
    ;;
esac

ls -lh "$out/$name".*mp4
