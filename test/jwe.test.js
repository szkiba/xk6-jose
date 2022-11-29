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

import jwe from "k6/x/jose/jwe";
import jwk from "k6/x/jose/jwk";
import { describe } from "./expect.js";
import encoding from 'k6/encoding';

// The two required and one recommended content encryption algorithms

const rsaAlgs = ["RSA-OAEP-256"];
const ecAlgs = ["ECDH-ES","ECDH-ES+A128KW","ECDH-ES+A192KW","ECDH-ES+A256KW"]
const encAlgs = ["A128CBC-HS256","A192CBC-HS384","A256CBC-HS512","A128GCM","A192GCM","A256GCM"];

const rsaKey = `
{
    "p": "zvGdcCQlvW5HN1XxYnMk53rv7gcU2jNpyCzjh0Wi179ajsZz3vqg-U9fI47el8-sQBwJDmRwrAGjTPPECVRcwVrX2-h0zmy78VqBr0ZiMftej7sXT-z_p61u2AqreqrBXF15yWMZpcO8veUYmwjUwK-MugS2U6pRItVgAISvz88",
    "kty": "RSA",
    "q": "sbdERxpnR9cZXA_Ec-D-VBoXnKutbk3EovWpQX3uDBldI9OtNtbFlfx-H7uP8BtqKo50VcK3njLkSKiK55DD6nDNUubq9XoAoOKxyDwtjA2zVdfr49Uncqe63-Un8EhK-wyWGcUUtONr1yddJI_qjiLXXoeKsvgcN0LzQHoZUws",
    "d": "R0C7zPRGxfeRC7ep-ZGa7UKkz7pp_mN7rtPiHEFlTLchz7ofCQYqLLKSj0Ele8nH09MbB2ajVNOAVYLVTyYTGsFvVR0mHsf7fLrlLetUvq2XyI7AyLpOP1Qj-yejSJKkGmV715mVxdvm4CLZ2b1Wuu0tYf83cO6egfbtxOy0UuZpwMnBmysXwI2EvMB-uvzw8htz8zJH2JedUILuwpdV48-mZV2dscIsoA89NfIt-VlOjTO1ym0HeebLo-MpHFctQVl45_o79vqBlCubHjekO2RaUh_X-l8HNa6d0BRsBGK_M1yMgVCio1kiOiMwHtECLRKnEbQQJKiSY5Zqb-2brQ",
    "e": "AQAB",
    "use": "enc",
    "kid": "xk6-jose-tests-rsa-2",
    "qi": "qSfr8UJU96QKilxugVOYhSsxGp8FXnN95TBOAVmN_sfzPJuQjoNUl1AljsG--XTPfdyyvwNjyio6KYHgVXqTvdSJXSZfAnukRFXUbFpxlVHFL24a3YjoMAaZh5Hccf4LFAxCiklN8TC5UnqZShMXSy9HonYTycjLTMrTAmYdZBw",
    "dp": "BjRuYQdkbkqZLgqQo0AKkjo4aW2i7WvvNwZJiCvJVyiwoWlH3h6rpu3_T0SgXfLnGkD88IaIbk_aQptofFMgONftcvWEUxAljnYFP2kf1pnP2wVkDIxxmeh0U1v2ikYGaCuRVD15bmPxC8yLsVJRdrmMwaMUiGup5R56s2lHEDc",
    "dq": "DColTFCsXSiGHd0eb2gpQIyArUK7Hl_IY_c43LjIAKAD1h35L1XINJoR8A4grijSPZN-txgbBYMqSSbwSyWHo5aRF2mjD6aIQHsD_FbSL1IIwomDJhdDGgANNKI096ebKlAUPjNVVYRzr0iMgaIwRgZwg5H3loSROd8lU3aIIT0",
    "n": "j6kzw7xUae5VurcPhFkYDSYojA44qghRO4dyLN81vKJy1ario_dMhPKpGx0fUDVUz3gmlEgBadUeNhl-BOTSqoNuOZNDC54TVSW3UEf5NhHFb_kkmCbNreAI8PZXBzy4HF10f4jmB4bQeGrfkIlbKdfJ_2PyPANt7Qflsaf5oiIY8Cs1CNwZmG3DEjS6AuuzWTVtFzkq3AP5vdBMBlA58eqNgfFp_RgSzIdbUi05kyxXhCkpEgiGvsgxcd1VdsR9lb_mNx0zA3aJdIF4W_Puy1IxGylGMHO--N26yxZmxhV7XibqNGO4NVpKVXygPlXMA8k-qUbscg9nJ3n-pSUK5Q"
}
`;
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

  /**
   * Test all rsa algs with all contentEncryption algs
   */
  rsaAlgs.forEach((alg) => {
    const privateKey = jwk.parse(rsaKey);
    encAlgs.forEach((enc) => {
      describe(`${alg}-${enc}`, (t) => {
        verifyAlgEnc(privateKey, enc, alg, t);
      })
    })
  })

  /**
   * Test all ec algs with all contentEncryption algs
   */
  ecAlgs.forEach((alg) => {
    const privateKey = jwk.parse(ecKey);
    encAlgs.forEach((enc) => {
      describe(`${alg}-${enc}`, (t) => {
        verifyAlgEnc(privateKey, enc, alg, t);
      })
    })
  })


  function verifyAlgEnc(key, enc, kwAlg, t) {
    const payload = {foo: "bar", answer: 42};
    try {
      let jweString = jwe.encrypt(key.public(), JSON.stringify(payload), enc, kwAlg);
      //Validate basic layout
      t.expect(jweString.length).as("jweString length").toBeGreaterThan(0);
      const fields = jweString.split(".");
      t.expect(fields.length).as("number of fields").toEqual(5);

      //Validate header is as expected
      const headersString = encoding.b64decode(fields[0], 'rawurl', 's');
      const headers = JSON.parse(headersString);
      t.expect(headers.kid).as("JWE header value 'kid'").toEqual(key.key_id);
      t.expect(headers.alg).as("JWE header value 'alg'").toEqual(kwAlg);
      t.expect(headers.enc).as("JWE header value 'enc'").toEqual(enc);

      //Decrypt and validate payload
      let decryptedString = jwe.decryptAsString(key, jweString);
      let decrypted = JSON.parse(decryptedString);
      const expect = (prop) => t.expect(decrypted[prop]).as(prop);
      expect("answer").toEqual(42);
      expect("foo").toEqual("bar");
    } catch (e) {
      console.error(`Error for alg ${kwAlg} and enc ${enc}`, e)
      throw e;
    }
  }
}