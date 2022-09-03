# Namespace: jws

Module jws aims to provide an implementation of the JSON Web Signature.
Only compact serialization is supported.

## Table of contents

### Functions

- [Encrypt](jwe.md#encrypt)
- [DecryptAsString](jwe.md#decryptAsString)


## Functions

### encrypt

▸ **encrypt**(`key`: [*Key*](../interfaces/jwk.key.md), `payload`: *string*, `encAlg`: *string*, `keyAlg`: *string*): *string*

Create JWE serialized form based on string payload (e.g. json) 

#### Parameters

| Name        | Type | Description                                                                                                                                                          |
|:------------| :------ |:---------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `key`       | [*Key*](../interfaces/jwk.key.md) | The Key wrapping key                                                                                                                                                 |
| `payload`   | *string* | The payload to sign. e.g. json claims                                                                                                                                |
| `encAlg` | *string* | Content encryption algorithm, supported values: See [JWA RFC chapter 4](https://www.rfc-editor.org/rfc/rfc7518#section-4.1) for details on supported algorithms      |
| `encAlg` | *string* | Key wrapping encryption algorithm, supported values: See [JWA RFC chapter 5](https://www.rfc-editor.org/rfc/rfc7518#section-5.1) for details on supported algorithms |

**Returns:** *string* 

JWE Serialized in compact form

___

### decryptAsString

▸ **decryptAsString**(`key`: [*Key*](../interfaces/jwk.key.md), `jwe`: *string*): *string*

Decrypt JWE serialized form based to string payload (e.g. json)

#### Parameters

| Name        | Type | Description                                                                                                                                                          |
|:------------| :------ |:---------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `key`       | [*Key*](../interfaces/jwk.key.md) | The Key wrapping key                                                                                                                                                 |
| `payload`   | *string* | The payload to sign. e.g. json claims                                                                                                                                |

**Returns:** *string*

Decrypted jwe payload as string (e.g json)