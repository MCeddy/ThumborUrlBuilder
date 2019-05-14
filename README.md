# ThumborUrlBuilder

Thumbor client for Node JS

## Usage

```sh
# Install thumbor-url-builder module

npm install thumbor-url-builder --save
```

```typescript
// Declare thumbor-url-builder in JS
// Your encryption key is not required, but your link will be unsafe.

import { ThumborUrlBuilder } from 'thumbor-url-builder-ts';

const thumbor = new ThumborUrlBuilder('MY_KEY', 'http://myserver.thumbor.com');

// Generate your url :

const thumborUrl = thumbor
    .setImagePath('00223lsvrnzeaf42.png')
    .resize(50, 50)
    .smartCrop(true)
    .buildUrl();
```
