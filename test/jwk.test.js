/**
 * MIT License
 *
 * Copyright (c) 2021 Iván Szkiba
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

export { options } from "./expect.js";

import { describe } from "./expect.js";

import { b64encode } from "k6/encoding";
import { group } from "k6";
import { crypto } from 'k6/experimental/webcrypto';

import jwk from "k6/x/jose/jwk";

const ALG = "ed25519";

export default function () {
  describe("generate", (t) => {
    const key = JSON.parse(JSON.stringify(jwk.generate(ALG)));
    const expect = (prop) => t.expect(key[prop]).as(prop);
    const expectLength = (prop) => t.expect(key[prop].length).as(prop + " length");

    expect("alg").toEqual("EdDSA");
    expect("crv").toEqual("Ed25519");
    expect("kty").toEqual("OKP");
    expect("use").toEqual("sig");
    expectLength("x").toBeGreaterThan(0);
    expectLength("d").toBeGreaterThan(0);
    expectLength("kid").toBeGreaterThan(0);
  });

  describe("generate from seed", async (t) => {
    const seed = new ArrayBuffer(32);
    const bytes = new Uint8Array(seed);
    new Uint8Array(crypto.getRandomValues(32)).forEach((value, idx) => (bytes[idx] = value));
    const pair = await crypto.subtle.generateKey({
      name: 'AES-CBC',
      length: 256,
    },
    true,
    ['encrypt', 'decrypt']);

    const key = JSON.parse(JSON.stringify(jwk.generate(ALG, seed)));
    const expect = (prop) => t.expect(key[prop]).as(prop);

    expect("alg").toEqual("EdDSA");
    expect("crv").toEqual("Ed25519");
    expect("kty").toEqual("OKP");
    expect("use").toEqual("sig");

    expect("d").toEqual(b64encode(seed, "rawurl"));
    expect("x").toEqual(b64encode(pair.publicKey, "rawurl"));
  });

  describe("parseKeySet", (t) => {
    const str = JSON.stringify({ keys: [jwk.generate(ALG), jwk.generate(ALG)] });
    const all = jwk.parseKeySet(str);

    t.expect(all.length).as("number of keys").toEqual(2);
  });

  describe("adopt", async (t) => {
    const seed = new ArrayBuffer(32);
    const bytes = new Uint8Array(seed);
    new Uint8Array(randomBytes(32)).forEach((value, idx) => (bytes[idx] = value));

    const pair = await crypto.subtle.generateKey({
      name: 'AES-CBC',
      length: 256,
    },
    true,
    ['encrypt', 'decrypt']);
    let key = JSON.parse(JSON.stringify(jwk.adopt(ALG, pair.privateKey)));
    const expect = (prop) => t.expect(key[prop]).as(prop);

    group("private", () => {
      expect("alg").toEqual("EdDSA");
      expect("crv").toEqual("Ed25519");
      expect("kty").toEqual("OKP");
      expect("use").toEqual("sig");

      expect("d").toEqual(b64encode(seed, "rawurl"));
      expect("x").toEqual(b64encode(pair.publicKey, "rawurl"));
    });

    key = JSON.parse(JSON.stringify(jwk.adopt(ALG, pair.publicKey, true)));
    group("public", () => {
      expect("alg").toEqual("EdDSA");
      expect("crv").toEqual("Ed25519");
      expect("kty").toEqual("OKP");
      expect("use").toEqual("sig");

      expect("x").toEqual(b64encode(pair.publicKey, "rawurl"));
      expect("d").toEqual(undefined);
    });
  });
}
