# Namespace: jwe

Module jwt aims to provide an implementation of the JSON Web Encryption.
Only compact serialization is supported.

## Table of contents

### Functions

- [decryptAsString](jwe.md#decryptasstring)
- [encrypt](jwe.md#encrypt)

## Functions

### decryptAsString

▸ **decryptAsString**(`key`: [*Key*](../interfaces/jwk.key.md), `jwe`: *string*): *string*

Decrypt JWE serialized form based to string payload (e.g. json)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | [*Key*](../interfaces/jwk.key.md) | The Key wrapping key |
| `jwe` | *string* | JWE in compact serialization |

**Returns:** *string*

string jwe payload as string (e.g. json)

___

### encrypt

▸ **encrypt**(`key`: [*Key*](../interfaces/jwk.key.md), `payload`: *string*, `encAlg`: *string*, `keyAlg`: *string*): *string*

Create JWE serialized form based on string payload (e.g. json)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | [*Key*](../interfaces/jwk.key.md) | The key wrapping key |
| `payload` | *string* | The payload to sign. e.g. json claims |
| `encAlg` | *string* | Content encryption algorithm. See [JWA RFC chapter 4](https://www.rfc-editor.org/rfc/rfc7518#section-4.1) for details on supported algorithms |
| `keyAlg` | *string* | Key wrapping encryption algorithm. See [JWA RFC chapter 5](https://www.rfc-editor.org/rfc/rfc7518#section-5.1) for details on supported algorithms |

**Returns:** *string*

string jwe string in serialized form
