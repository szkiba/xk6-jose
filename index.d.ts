/**
 * xk6-jose provides an implementation of the *Javascript Object Signing and Encryption (JOSE)* standards.
 * The underlying implementation is https://github.com/square/go-jose
 */

/**
 * Module jwk aims to provide an implementation of the JSON Web Key.
 */
export namespace jwk {
  /**
   * Array of numbers. The number range is from 0 to 255.
   */
  export type bytes = number[];

  /**
   * Byte array convertible types
   */
  export type ByteArrayLike = ArrayBuffer | string | bytes;

  /**
   * Key represents a public or private key in JWK format.
   *
   * The underlying implemetation is [JSONWebKey](https://pkg.go.dev/gopkg.in/square/go-jose.v2#JSONWebKey) from [Go JOSE](https://github.com/square/go-jose).
   * JSON representation can be create with JSON.stringify
   */
  interface Key {}

  /**
   * Parse a key from its JSON representation.
   *
   * @param source JSON source to parse
   * @returns The parsed JWK representation
   */
  function parse(source: string): Key;

  /**
   * Parse JSON Web Key Set into key array.
   *
   * @param source JSON source to parse
   * @returns The array of keys from parsed JWKS
   */
  function parseKeySet(source: string): Key[];

  /**
   * Generates a new asymmetric key with the given algorithm (`algorithm`) or import exising private key from `seed`.
   *
   * @param algorithm Key algorithm, supported values: `ed25519`
   * @param seed Seed value when importing private key
   * @returns The generated key
   */
  function generate(algorithm: string, seed?: ByteArrayLike): Key;

  /**
   * Adopt an existing asymmetric key with the given algorithm (`algorithm`).
   *
   * @param algorithm Key algorithm, supported values: `ed25519`
   * @param key private or public key
   * @param isPublic true if `key` is a public key, false if it is a private key
   * @returns The adopted key
   */
  function adopt(algorithm: string, key: ByteArrayLike, isPublic?: boolean): Key;
}

/**
 * Module jwt aims to provide an implementation of the JSON Web Token.
 * Only compact serializtion is supported.
 */
export namespace jwt {
  /**
   * Create JSON Web Token from payload and optional header.
   *
   * @param key The signing key
   * @param payload The payload claims
   * @param header The header fields
   * @returns The signed JWT in compact serialization form
   */
  function sign(key: jwk.Key, payload: object, header?: object): string;

  /**
   * Decode JSON Web Token payload without signature validation.
   *
   * @param token The JWT to decode
   * @returns The decoded payload
   */
  function decode(token: string): object;

  /**
   * Verify JSON Web Token signature and decode payload on success.
   *
   * @param token The JWT to verify
   * @param key The signature validation key (or keys)
   * @returns The payload of the verified token
   */
  function verify(token: string, ...key: jwk.Key[]): object;
}

/**
 * Module jwt aims to provide an implementation of the JSON Web Encryption.
 * Only compact serialization is supported.
 */
export namespace jwe {
  /**
   * Create JWE serialized form based on string payload (e.g. json)
   * @param key The key wrapping key
   * @param payload The payload to sign. e.g. json claims
   * @param encAlg Content encryption algorithm. See [JWA RFC chapter 4](https://www.rfc-editor.org/rfc/rfc7518#section-4.1) for details on supported algorithms
   * @param keyAlg Key wrapping encryption algorithm. See [JWA RFC chapter 5](https://www.rfc-editor.org/rfc/rfc7518#section-5.1) for details on supported algorithms
   * @return string jwe string in serialized form
   */
  function encrypt(key: jwk.Key, payload: string, encAlg: string, keyAlg: string): string

  /**
   * Decrypt JWE serialized form based to string payload (e.g. json)
   * @param key The Key wrapping key
   * @param jwe JWE in compact serialization
   * @return string jwe payload as string (e.g. json)
   */
  function decryptAsString(key: jwk.Key, jwe: string): string
}

/**
 * Module jws aims to provide an implementation of the JSON Web Signature.
 * Only compact serialization is supported.
 */
export namespace jws {
  /**
   * Create JSON Web Signature in compact serialization
   * @param key The signature key
   * @param payload The string payload to sign
   * @param sigAlg The signature algorithm, supported values: See [JWA RFC chapter 3](https://www.rfc-editor.org/rfc/rfc7518#section-3.1) for details on supported algorithms
   * @return JSON Web Signature in compact serialization
   */
  function sign(key: jwk.Key, payload: string, sigAlg: string): string


  /**
   * Verify JWS and return decoded payload as string
   * @param key The verification key
   * @param jws JSON Web Signature
   * @return decoded payload as string
   */
  function verify(key: jwk.Key, jws: string): string
}
