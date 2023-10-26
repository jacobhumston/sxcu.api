$(build):
	npx del-cli build/ types/

	npx tsc --module commonjs --outDir build/cjs/ --declaration false 
	echo '{"type": "commonjs"}' > build/cjs/package.json

	npx tsc --module es2022 --outDir build/esm/ --declarationDir types --declaration true
	echo '{"type": "module"}' > build/esm/package.json