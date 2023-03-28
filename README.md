For `tailwindcss`:

In terminal:

```sh
npm i -D tailwindcss
npx tailwindcss init
```

In `config/postcss.config.js`:

```js script
const tailwindcss = require("tailwindcss");

module.exports = {
    plugins: [require("autoprefixer"), tailwindcss],
};
```

In `tailwind.config.js`:

```js script
module.exports = {
    content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
    theme: {
        extend: {},
    },
    plugins: [],
};
```

In `input.css`, or `main.css`:

```js script
@tailwind base;
@tailwind components;
@tailwind utilities;
```

# Base Development Envrionment with React and Redux (using Typescript)

After updating `babel.config.js` to use [JSX Transform](https://reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html),
functional components no longer need to import `react` with

```js script
import React from "react";
```

If run into issues, if not mentioned here, check out the `Issues`
section on the `main` branch.

## Frontend Only

```sh
git clone --branch react-ts --single-branch --depth 1 git@github.com:justin0979/devconfig.git
```

## Linters

Typescript linting:
[typescript-eslint](https://github.com/typescript-eslint/typescript-eslint)
SCSS linting:
[stylelint](https://stylelint.io/)

To disable, comment out or delete their webpack plugins in `config`.

## Redux added

Redux data is accessed in `state/` along with `hooks/`

#### Running Tests

Testing only uses jest. Enzyme was removed due to a lack of an official adapter-17.

If needing to use:

```javascript
jest.spyOn(global, "fetch").mockImplementation(() =>
    Promise.resolve({
        json: () => Promise.resolve(stuff),
    }),
);
```

use this instead:

```javascript
global.fetch = jest.fn().mockImplementation(() =>
    Promise.resolve({
        json: () => Promise.resolve(stuff),
    }),
);
```

then, remove the mock:

```javascript
global.fetch.mockRestore();
delete global.fetch();
```

#### Absolute Path

For use of absolute paths like:

```javascript
import newFile from "&newdirname/newFile";
```

update the following (assuming <code>newdirname/</code> is in <code>src/</code>):

<ul>
  <li>
    Update <code>webpack.common.ts</code>:

```typescript
export default {
    resolve: {
        alias: {
            "&newdirname": path.resolve(__dirname, "../src/newdirname"),
        },
    },
};
```

  </li>
  <li>Update <code>babel.config.js</code>:

```javascript
module.exports = {
    plugins: [
        "module-resolver",
        {
            root: ["./"],
            alias: {
                "&newdirname": "./src/newdirname",
            },
        },
    ],
};
```

  </li>
  <li>
 Update <code>tsconfig.json</code>:
 
```javascript
{
     "compilerOptions": {
      "paths": {
        "&newdirname/*": ["./src/newdirname/*"]
     }
    }
}
```
 
To import <code>index.ts</code> like:

```typescript
import * from "&newdirname"; // instead of import * from "&newdirname/index";
```

change <code>tsconfig.json</code>:

```javascript
{
  "compilerOptions": {
    "baseUrl": "./",
    "paths": {
      "&newdirname": ["src/newdirname"],
      "&newdirname/*": ["src/newdirname/*"]
    }
  }
}
```

   </li>
  </ul>
</ul>

The `tsconfig.json` comes from:
[TypeScript: Documentation Path mapping](https://www.typescriptlang.org/docs/handbook/module-resolution.html#path-mapping)

## Issues

If run into routing issues, check `output.publicPath` in `webpack.dev.js`
and/or `webpack.prod.js`.
If run into routing issues, check `output.publicPath` in `webpack.dev.js`
and/or `webpack.prod.js`.
