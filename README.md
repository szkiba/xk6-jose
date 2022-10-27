# xk6-jose

A k6 extension for *Javascript Object Signing and Encryption (JOSE)* standards.

**Features**

 - [parse](docs/modules/jwk.md#parse) JSON Web Key
 - [generate](docs/modules/jwk.md#generate) new JSON Web Key
 - [adopt](docs/modules/jwk.md#adopt) existing JSON Web Key
 - [sign](docs/modules/jwt.md#sign) JSON Web Token
 - [verify](docs/modules/jwt.md#verify) JSON Web Token signature
 - [decode](docs/modules/jwt.md#decode) JSON Web Token without signature verification

For complete API documentation click [here](docs/README.md)!

The underlying implementation is https://github.com/square/go-jose

Built for [k6](https://go.k6.io/k6) using [xk6](https://github.com/grafana/xk6).

## Usage

### Until v0.32.x of k6
Import an entire module's contents:
```js
import * as jwt from "k6/x/jose/jwt/v0";
```

Import a single export from a module:
```js
import { sign } from "k6/x/jose/jwt/v0";
```

### Post v0.32.x of k6
Import an entire module's contents:
```js
import * as jwt from "k6/x/jose/jwt/v1";
```

Import a single export from a module:
```js
import { sign } from "k6/x/jose/jwt/v1";
```

## Build

To build a `k6` binary with this extension, first ensure you have the prerequisites:

- [Go toolchain](https://go101.org/article/go-toolchain.html)
- Git

Then:

1. Install `xk6`:
  ```bash
  $ go install go.k6.io/xk6/cmd/xk6@latest
  ```

2. Build the binary:
  ```bash
  $ xk6 build --with github.com/szkiba/xk6-jose@latest
  ```
