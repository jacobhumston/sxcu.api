npx del-cli build/ types/ 

npx tsc --module commonjs --outDir build/cjs/ --declaration false --declarationMap false --esModuleInterop true --noEmitOnError true
echo {\"type\": \"commonjs\"} > build/cjs/package.json 

npx tsc --module es2022 --outDir build/esm/ --declarationDir types --declaration true --declarationMap true --noEmitOnError true
echo {\"type\": \"module\"} > build/esm/package.json 

cd ./src/cli/

npx tsc --outDir ../../build/cli/ --declaration false --declarationMap false --noEmitOnError true
echo {\"type\": \"module\"} > ../../build/cli/package.json 