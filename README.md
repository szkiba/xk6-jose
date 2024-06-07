# xk6-jose

> [!WARNING]
> This extension is deprecated. In the meantime, [k6 supports webcrypto](https://grafana.com/docs/k6/latest/javascript-api/k6-experimental/webcrypto/), it is advisable to use it in new tests.
> If you need this extension because of your old tests or if you want to continue development, feel free to fork it.

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

1. Install `xk6`:
  ```bash
  $ go install go.k6.io/xk6/cmd/xk6@latest
  ```

2. Build the binary:
  ```bash
  $ xk6 build --with github.com/szkiba/xk6-jose@latest
  ```
