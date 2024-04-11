# Defined as the current working directory. 
current_directory=$(pwd)

# Function for formatted echo.
function formatted_echo() {
    echo "> $1"
}

# Function to echo the current step.
# First paramter should be name, second should be 'start' or 'end'.
function echo_step() {
    # Function to echo a line.
    function echo_line() {
        echo ">==============================================<"
    }

    # Log the start/end message accordingly.
    if [ "$2" = "start" ]; then
        echo_line
        formatted_echo "Step $1 is executing...."
        echo_line
    elif [ "$2" = "end" ]; then
        echo_line
        formatted_echo "Step $1 has finished executing."
        echo_line
    fi
}

# Function to delete a directory.
function delete_directory() {
    # Check for the directroy, execute accordingly.
    if [ -d "$1" ]; then
        formatted_echo "Deleting the '$1' directory..."
        rm -r "$1"
    else
        formatted_echo "The directory '$1' does not exits, skipping..."
    fi
}

# Function to build the project.
function build() {
    # Reset directory.
    cd "$current_directory" || exit

    # Echo the step.
    echo_step "build" "start"

    # Delete the build folder.
    delete_directory 'build'

    # Build CommonJs.
    formatted_echo "Building CommonJS..."
    npx tsc --module commonjs --outDir build/cjs/ --declaration false --declarationMap false --esModuleInterop true --noEmitOnError true
    echo "{\"type\": \"commonjs\"}" >build/cjs/package.json

    # Build ESM and Types.
    formatted_echo "Building ESM and Type Definitions..."
    npx tsc --module es2022 --outDir build/esm/ --declarationDir build/types/ --declaration true --declarationMap true --noEmitOnError true
    echo "{\"type\": \"module\"}" >build/esm/package.json

    # Build the CLI.
    formatted_echo "Building CLI ..."
    cd ./src/cli/ || exit
    npx tsc --outDir ../../build/cli/ --declaration false --declarationMap false --noEmitOnError true
    echo "{\"type\": \"module\"}" >../../build/cli/package.json

    # Echo the end of the step.
    echo_step "build" "end"
}

# Function to format.
function format() {
    # Reset directory.
    cd "$current_directory" || exit

    # Format.
    echo_step "format" "start"
    formatted_echo "Formatting..."
    npx prettier ./ ./build --write
    echo_step "format" "end"
}

# Function to test.
function test() {
    # Reset directory.
    cd "$current_directory" || exit

    # Run the selcted tests.
    echo_step "test" "start"
    if [ "$1" = "other" ]; then
        formatted_echo "Running other (ESM) test..."
        node test/other.js --trace-uncaught --trace-warnings --trace-exit
    elif [ "$1" = "other-cjs" ]; then
        formatted_echo "Running other (CommonJs) test..."
        node test/other.cjs --trace-uncaught --trace-warnings --trace-exit
    else
        formatted_echo "Running tests..."
        node test/index.js --trace-uncaught --trace-warnings --trace-exit
    fi
    echo_step "test" "end"
}

# Function to run eslint.
function eslint() {
    # Reset directory.
    cd "$current_directory" || exit

    # Run eslint.
    echo_step "eslint" "start"
    npx eslint src/
    echo_step "eslint" "end"
}

# Function to generate docs.
function docs() {
    # Reset directory.
    cd "$current_directory" || exit

    # Generate docs.
    echo_step "docs" "start"
    delete_directory "docs"
    npx typedoc --hideGenerator --githubPages false
    node tools/gen-web.cjs
    echo_step "docs" "end"
}

# Function to link the package.
function link() {
    # Reset directory.
    cd "$current_directory" || exit

    # Link the package.
    echo_step "link" "start"
    npm link ./ --force
    npm link sxcu.api --force
    echo_step "link" "end"
}

# Fix linked package permissions.
function fix_perms() {
    # Reset directory.
    cd "$current_directory" || exit

    # Fix linked script permissions.
    echo_step "fix perms" "start"
    chmod +x node_modules/.bin/sxcu || echo "Failed to fix permissions."
    echo_step "fix perms" "end"
}
