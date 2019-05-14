# ThumborUrlBuilder TS

TypeScript client for building Thumbor URLs.

## Usage

```sh
# Install thumbor-url-builder-ts module

npm install thumbor-url-builder-ts --save
```

```typescript
import { ThumborUrlBuilder } from 'thumbor-url-builder-ts';

// Your encryption key is not required, but your link will be unsafe.
const thumbor = new ThumborUrlBuilder('MY_KEY', 'http://myserver.thumbor.com');

// Generate your url
const thumborUrl = thumbor
    .setImagePath('00223lsvrnzeaf42.png')
    .resize(50, 50)
    .smartCrop(true)
    .buildUrl();
```
