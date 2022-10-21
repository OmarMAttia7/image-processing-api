## Image Processing API
A simple image processing API, made as a submission for Udacity's back-end development with NodeJS course first project.

## Table of Contents

 - [Compile and Run](#compile-and-run)
 - [Testing](#testing)
 - [Formatting and Linting](#formatting-and-linting)
 - [Usage](#usage)
 - [Multiple Image Sizes and Extensions](#sizes-and-extensions)

<h2 id="compile-and-run">Compile and Run</h2>

 1. run `npm install` to install dependencies
 2. run `npm run build` to compile TypeScript
 3. run `npm run start` to start the application

You can also start the development server without compiling by running `npm run dev`

<h2 id="testing">Testing</h2>

<p>run `npm run test` to run all tests, you should compile before testing.</p>
<p>The tests cover the functionality of the /api/images endpoint as well as tests for the functions in the api/services directory.</p>
<p>The `/tests` directory currently compiles inside the `/dist` directory, it should be possible to separate them using another `tsconfig` file but I haven't had the chance to experiment with it yet.</p>

<h2 id="formatting-and-linting">Formatting and Linting</h2>

 - `npm run format` to run prettier and automatically fix formatting errors.
 - `npm run lint` to run ESLint on the source code without fixing errors.
 - `npm run lint:fix` to run ESLint on the source code and fix all fixable errors.
 - `npm run lint-format` runs the `lint:fix` and `format` scripts.

<h2 id="usage">Usage</h2>

The only current endpoint is `/api/images/`, upon requesting it you should be able to see simple instructions on how to use the image resizing functionality.

You can request `/api/images/:image` to get the full sized image if it exists.
Request `/api/images/:image?width={width}&height={height}` to get a resized image with the dimensions `{width}` and `{height}`.

<h2 id="sizes-and-extensions">Multiple Image Sizes and Extensions</h2>
<h3>Image Sizes</h3>
<p>The application supports resizing to multiple sizes of the same image.</p>
<h3>Extensions</h3>
<p>I have only tested jpgs and pngs, but the application should be able to correctly handle any image format that has a MIME type starting with `image/`</p>
