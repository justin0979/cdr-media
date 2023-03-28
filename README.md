# App to practice media sharing (photos, song albums) between users

To start:

```sh
npm i
npm run start
npm run start:server
```

<details>

<summary><strong>For `tailwindcss` install and setup</strong></summary>

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

In `index.tsx`:

```js script
import ReactDOM from "react-dom/client";
import "./input.css";
import "./App";
```

</details>
