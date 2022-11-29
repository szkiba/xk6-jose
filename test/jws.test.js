/**
 * MIT License
 *
 * Copyright (c) 2022 Daniel Maison
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

import jws from "k6/x/jose/jws";
import jwk from "k6/x/jose/jwk";
import { describe } from "./expect.js";

const ecKey = `
{
    "kty": "EC",
    "d": "4hpgpcEu7abpl06G6qPXVzA9PoJZoQfYBzqfHEuWJwg",
    "use": "enc",
    "crv": "P-256",
    "kid": "xk6-jose-tests-ec-3",
    "x": "6UOCiHZ-sCPc13tBGPrWbMKtgTmwOPGyhKxEdTZVgaA",
    "y": "cPBzf_zqFJ8-XS0a7byPqAayGKSIiF69NAN2n-NAD-g"
}
`;

export default function () {
  describe("sign", (t) => {
    const jwsSerialized = jws.sign(jwk.parse(ecKey),{ foo: "bar" },"ES256");

    t.expect(jwsSerialized.length).as("token length").toBeGreaterThan(0);
    t.expect(jwsSerialized.split(".").length).as("number of fields").toEqual(3);
  });

  describe("verify", (t) => {
    const key1 = jwk.parse(ecKey)

    const jwsString = jws.sign(key1, JSON.stringify({ foo: "bar", answer: 42 }), "ES256");
    const payloadString = jws.verify(key1.public(), jwsString);
    const payload = JSON.parse(payloadString)
    const expect = (prop) => t.expect(payload[prop]).as(prop);

    expect("answer").toEqual(42);
    expect("foo").toEqual("bar");
  });

}
