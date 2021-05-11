# Namespace: jwk

Module jwk aims to provide an implementation of the JSON Web Key.

## Table of contents

### Interfaces

- [Key](../interfaces/jwk.key.md)

### Type aliases

- [ByteArrayLike](jwk.md#bytearraylike)
- [bytes](jwk.md#bytes)

### Functions

- [adopt](jwk.md#adopt)
- [generate](jwk.md#generate)
- [parse](jwk.md#parse)
- [parseKeySet](jwk.md#parsekeyset)

## Type aliases

### ByteArrayLike

Ƭ **ByteArrayLike**: ArrayBuffer \| *string* \| [*bytes*](jwk.md#bytes)

Byte array convertible types

___

### bytes

Ƭ **bytes**: *number*[]

Array of numbers. The number range is from 0 to 255.

## Functions

### adopt

▸ **adopt**(`algorithm`: *string*, `key`: [*ByteArrayLike*](jwk.md#bytearraylike), `isPublic?`: *boolean*): [*Key*](../interfaces/jwk.key.md)

Adopt an existing asymmetric key with the given algorithm (`algorithm`).

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `algorithm` | *string* | Key algorithm, supported values: `ed25519` |
| `key` | [*ByteArrayLike*](jwk.md#bytearraylike) | private or public key |
| `isPublic?` | *boolean* | true if `key` is a public key, false if it is a private key |

**Returns:** [*Key*](../interfaces/jwk.key.md)

The adopted key

___

### generate

▸ **generate**(`algorithm`: *string*, `seed?`: [*ByteArrayLike*](jwk.md#bytearraylike)): [*Key*](../interfaces/jwk.key.md)

Generates a new asymmetric key with the given algorithm (`algorithm`) or import exising private key from `seed`.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `algorithm` | *string* | Key algorithm, supported values: `ed25519` |
| `seed?` | [*ByteArrayLike*](jwk.md#bytearraylike) | Seed value when importing private key |

**Returns:** [*Key*](../interfaces/jwk.key.md)

The generated key

___

### parse

▸ **parse**(`source`: *string*): [*Key*](../interfaces/jwk.key.md)

Parse a key from its JSON representation.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `source` | *string* | JSON source to parse |

**Returns:** [*Key*](../interfaces/jwk.key.md)

The parsed JWK representation

___

### parseKeySet

▸ **parseKeySet**(`source`: *string*): [*Key*](../interfaces/jwk.key.md)[]

Parse JSON Web Key Set into key array.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `source` | *string* | JSON source to parse |

**Returns:** [*Key*](../interfaces/jwk.key.md)[]

The array of keys from parsed JWKS
