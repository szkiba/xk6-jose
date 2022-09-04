# Namespace: jws

Module jws aims to provide an implementation of the JSON Web Signature.
Only compact serialization is supported.

## Table of contents

### Functions

- [sign](jws.md#sign)
- [verify](jws.md#verify)

## Functions

### sign

▸ **sign**(`key`: [*Key*](../interfaces/jwk.key.md), `payload`: *string*, `sigAlg`: *string*): *string*

Create JSON Web Signature in compact serialization

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | [*Key*](../interfaces/jwk.key.md) | The signature key |
| `payload` | *string* | The string payload to sign |
| `sigAlg` | *string* | The signature algorithm, supported values: See [JWA RFC chapter 3](https://www.rfc-editor.org/rfc/rfc7518#section-3.1) for details on supported algorithms |

**Returns:** *string*

JSON Web Signature in compact serialization

___

### verify

▸ **verify**(`key`: [*Key*](../interfaces/jwk.key.md), `jws`: *string*): *string*

Verify JWS and return decoded payload as string

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | [*Key*](../interfaces/jwk.key.md) | The verification key |
| `jws` | *string* | JSON Web Signature |

**Returns:** *string*

decoded payload as string
