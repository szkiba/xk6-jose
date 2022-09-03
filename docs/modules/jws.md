# Namespace: jws

Module jws aims to provide an implementation of the JSON Web Signature.
Only compact serialization is supported.

## Table of contents

### Functions

- [Sign](jwk.md#sign)


## Functions

### sign

▸ **sign**(`key`: [*Key*](../interfaces/jwk.key.md), `payload`: *string*, `signatureAlgorithm`: *string*): *string*

Create JWS serialized form based on string payload (e.g. json) 

#### Parameters

| Name        | Type | Description                                                                                                                                            |
|:------------| :------ |:-------------------------------------------------------------------------------------------------------------------------------------------------------|
| `key`       | [*Key*](../interfaces/jwk.key.md) | The signing key                                                                                                                                        |
| `payload`   | *string* | The payload to sign. e.g. json claims                                                                                                                  |
| `algorithm` | *string* | Signature algorithm, supported values: See [JWA RFC chapter 3](https://www.rfc-editor.org/rfc/rfc7518#section-3.1) for details on supported algorithms |

**Returns:** *string* 

JWS Serialized in compact form

___