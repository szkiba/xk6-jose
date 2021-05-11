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

Built for [k6](https://github.com/loadimpact/k6) using [xk6](https://github.com/k6io/xk6).

## Usage

Import an entire module's contents:
```JavaScript
import * as jwt from "k6/x/jose/jwt";
```

Import a single export from a module:
```JavaScript
import { sign } from "k6/x/jose/jwt";
```

## Build

To build a `k6` binary with this extension, first ensure you have the prerequisites:

- [Go toolchain](https://go101.org/article/go-toolchain.html)
- Git

Then:

1. Download `xk6`:
  ```bash
  $ go get -u github.com/k6io/xk6
  ```

2. Build the binary:
  ```bash
  $ xk6 build --with github.com/szkiba/xk6-jose
  ```
