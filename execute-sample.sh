
# App compile
npm run build

# copying the original files to a new directory
cp -R ./sample-pictures ./sample-pictures-no-faces

# Apply the runtime on the new directory
node dist/index.js --dir=./sample-pictures-no-faces
