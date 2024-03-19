echo "Deleting build/ and types/ ..."

npx del-cli build/ types/ 

echo "Building CommonJS ..."

npx tsc --module commonjs --outDir build/cjs/ --declaration false --declarationMap false --esModuleInterop true --noEmitOnError true
echo {\"type\": \"commonjs\"} > build/cjs/package.json 

echo "Building ESM and Types Definitions ..."

npx tsc --module es2022 --outDir build/esm/ --declarationDir types --declaration true --declarationMap true --noEmitOnError true
echo {\"type\": \"module\"} > build/esm/package.json 

echo "Building CLI ..."

cd ./src/cli/

npx tsc --outDir ../../build/cli/ --declaration false --declarationMap false --noEmitOnError true
echo {\"type\": \"module\"} > ../../build/cli/package.json 