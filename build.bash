#!/bin/bash

# Defined as the current working directory.
current_directory=$(pwd)

# Define the nme directory.
nme_directory="$current_directory/node_modules/.bin"
if [[ -n "${NMEDIR}" ]]; then
    nme_directory="${NMEDIR}"
fi

# Function for formatted echo.
function formatted_echo() {
    echo "> $1"
}

# Node Module Execute (nme) function.
# The module executable location can be changed with the NMEDIR environment variable.
function nme() {
    if [ -f "$nme_directory/$1" ]; then
        formatted_echo "Executing: $*"
        "$nme_directory/"$*
    else
        formatted_echo "FATAL!: The executable '$nme_directory/$1' was not found!"
        formatted_echo "Note: The location can be changed using the NMEDIR environment variable."
        exit
    fi
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
        #echo_line
        formatted_echo "Step $1 is executing...."
        #echo_line
        elif [ "$2" = "end" ]; then
        #echo_line
        formatted_echo "Step $1 has finished executing."
        #echo_line
    fi
}

# Function to delete a directory.
function delete_directory() {
    # Check for the directroy, execute accordingly.
    if [ -d "$1" ]; then
        formatted_echo "Deleting the '$1' directory..."
        rm -r "$1"
    else
        formatted_echo "The directory '$1' does not exists, skipping deletion..."
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
    nme tsc --module commonjs --outDir build/cjs/ --declaration false --declarationMap false --esModuleInterop true --noEmitOnError true
    echo "{\"type\": \"commonjs\"}" >build/cjs/package.json
    
    # Build ESM and Types.
    formatted_echo "Building ESM and Type Definitions..."
    nme tsc --module es2022 --outDir build/esm/ --declarationDir build/types/ --declaration true --declarationMap true --noEmitOnError true
    echo "{\"type\": \"module\"}" >build/esm/package.json
    
    # Build the CLI.
    formatted_echo "Building CLI ..."
    cd ./src/cli/ || exit
    nme tsc --outDir ../../build/cli/ --declaration false --declarationMap false --noEmitOnError true
    echo "{\"type\": \"module\"}" >../../build/cli/package.json
    
    # Echo the end of the step.
    echo_step "build" "end"
}

# Function to format.
function format() {
    # Reset directory.
    cd "$current_directory" || exit
    
    # Format.
    # https://github.com/prettier/prettier/issues/15438
    echo_step "format" "start"
    formatted_echo "Formatting..."
    if [ -d "build" ]; then
        formatted_echo "Build directory found! Formatting..."
        nme prettier ./build --write --ignore-path .prettierignore --cache
    fi
    if [ -d "docs" ]; then
        formatted_echo "Docs directory found! Formatting..."
        nme prettier ./docs --write --ignore-path .prettierignore --cache
    fi
    nme prettier ./ --write --cache
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
    formatted_echo "Running eslint..."
    nme eslint src/
    echo_step "eslint" "end"
}

# Function to generate docs.
function docs() {
    # Reset directory.
    cd "$current_directory" || exit
    
    # Generate docs.
    echo_step "docs" "start"
    formatted_echo "Generating docs..."
    delete_directory "docs"
    nme typedoc --hideGenerator --githubPages false
    node tools/gen-web.cjs
    echo_step "docs" "end"
}

# Function to link the package.
function link() {
    # Reset directory.
    cd "$current_directory" || exit
    
    # Link the package.
    echo_step "link" "start"
    formatted_echo "Linking package..."
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
    formatted_echo "Fixing linked script's permissions..."
    chmod +x node_modules/.bin/sxcu || echo "Failed to fix permissions."
    echo_step "fix perms" "end"
}

# Function for running the docs-server.
function docs_server() {
    # Reset directory.
    cd "$current_directory" || exit
    
    # Run the docs server.
    echo_step "docs server" "start"
    formatted_echo "Starting docs server..."
    node tools/docs-server.js
    echo_step "docs server" "end"
}

# Function for cleaning build/doc etc folders.
function clean() {
    # Reset directory.
    cd "$current_directory" || exit
    
    # Clean
    echo_step "clean" "start"
    delete_directory "build"
    delete_directory "docs"
    echo_step "clean" "end"
}

# List of commands.
command_list="help, build, format, test [other, other-cjs], eslint, docs, link, fix-perms, compile, docs-server, clean"

# Function to parse command.
# First paramter should be the name of the command.
# Second paramater is optional, used in commands such as test.
function parse_command() {
    if [ "$1" = "build" ]; then
        build
        elif [ "$1" = "format" ]; then
        format
        elif [ "$1" = "test" ]; then
        test "$2"
        elif [ "$1" = "eslint" ]; then
        eslint
        elif [ "$1" = "docs" ]; then
        docs
        elif [ "$1" = "link" ]; then
        link
        elif [ "$1" = "fix-perms" ]; then
        fix_perms
        elif [ "$1" = "compile" ]; then
        build
        docs
        format
        eslint
        link
        fix_perms
        elif [ "$1" = "docs-server" ]; then
        docs_server
        elif [ "$1" = "clean" ]; then
        clean
        elif [ "$1" = "help" ]; then
        formatted_echo "::[---> HELP ~ sxcu.api/build.bash <---]::"
        formatted_echo
        formatted_echo "Commands: $command_list"
        formatted_echo "Square brackets indicate the avalible second paramaters for that command, if any."
        formatted_echo
        formatted_echo "NOTE: If you do not wish to enter the REPL, just use the command directly. (Ex; bash build.bash help)"
        formatted_echo
        formatted_echo "If you need any help, create an issue! https://github.com/jacobhumston/sxcu.api/issues"
    else
        formatted_echo "Unknown command '$1'."
        formatted_echo "Commands: $command_list"
    fi
}

if [ "$1" = "" ]; then
    while true; do
        clear
        formatted_echo "::[---> REPL ~ sxcu.api/build.bash <---]::"
        formatted_echo
        formatted_echo "Welcome to the sxcu.api build REPL!"
        formatted_echo "For a list of commands, enter 'help'. Enter 'exit' to exit."
        read -r -p "$ " arg1 arg2
        clear
        if [ "$arg1" == "exit" ]; then
            exit
        else
            parse_command "$arg1" "$arg2"
        fi
        read -p "> Press any key to continue..." -r -n 1
    done
else
    parse_command "$1" "$2"
fi
