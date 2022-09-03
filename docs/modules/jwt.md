# Namespace: jwt

Module jwt aims to provide an implementation of the JSON Web Token.
Only compact serialization is supported.

## Table of contents

### Functions

- [decode](jwt.md#decode)
- [sign](jwt.md#sign)
- [verify](jwt.md#verify)

## Functions

### decode

▸ **decode**(`token`: *string*): *object*

Decode JSON Web Token payload without signature validation.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `token` | *string* | The JWT to decode |

**Returns:** *object*

The decoded payload

___

### sign

▸ **sign**(`key`: [*Key*](../interfaces/jwk.key.md), `payload`: *object*, `header?`: *object*): *string*

Create JSON Web Token from payload and optional header.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | [*Key*](../interfaces/jwk.key.md) | The signing key |
| `payload` | *object* | The payload claims |
| `header?` | *object* | The header fields |

**Returns:** *string*

The signed JWT in compact serialization form

___

### verify

▸ **verify**(`token`: *string*, ...`key`: [*Key*](../interfaces/jwk.key.md)[]): *object*

Verify JSON Web Token signature and decode payload on success.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `token` | *string* | The JWT to verify |
| `...key` | [*Key*](../interfaces/jwk.key.md)[] | The signature validation key (or keys) |

**Returns:** *object*

The payload of the verified token
