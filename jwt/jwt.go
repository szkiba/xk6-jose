// MIT License
//
// Copyright (c) 2021 Iván Szkiba
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

package jwt

import (
	"errors"

	"github.com/go-jose/go-jose/v4"
)

type Module struct{}

func New() *Module {
	return &Module{}
}

var ErrUnsupportedKey = errors.New("unsupported key")

func (m *Module) Sign(key *jose.JSONWebKey, payloadStr string, header map[string]interface{}) (string, error) {
	payload := []byte(payloadStr)
	opts := &jose.SignerOptions{}
	opts = opts.WithType("JWT")

	for k, v := range header {
		opts.WithHeader(jose.HeaderKey(k), v)
	}

	signer, err := jose.NewSigner(jose.SigningKey{Algorithm: jose.SignatureAlgorithm(key.Algorithm), Key: key}, opts)
	if err != nil {
		return "", err
	}

	object, err := signer.Sign(payload)
	if err != nil {
		return "", err
	}

	str, err := object.CompactSerialize()
	if err != nil {
		return "", err
	}

	return str, nil
}
