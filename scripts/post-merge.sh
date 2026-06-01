#!/bin/bash
set -e

npm install --legacy-peer-deps

# Remove nested three.js from stats-gl — it ships three@0.170.0 which
# breaks @react-three/fiber v8. The top-level three@0.168.0 is used
# via vite.config.ts resolve.dedupe.
rm -rf node_modules/stats-gl/node_modules/three

# Bust the Vite dep cache so it rebuilds against the correct three version
rm -rf node_modules/.vite
