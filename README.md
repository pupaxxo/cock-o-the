```

javascript:document.head.innerHTML += '<script src="http://localhost:9000/bundle.js"></script>'

```

```js

const script = document.createElement('script');
script.onload = function () {
    
};
script.src = "http://localhost:9000/bundle.js";

document.head.appendChild(script);

```