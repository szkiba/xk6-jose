// MIT License
//
// Copyright (c) 2022 Iván Szkiba
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
	"github.com/szkiba/xk6-jose/jwt/internals"
)

type Module struct{}

func New() *Module {
	return &Module{}
}

func (m *Module) Sign(key *jose.JSONWebKey, payload, header map[string]interface{}) (string, error) {
	str, err := internals.Sign(key, payload, header)
	if err != nil {
		return "", err
	}

	return str, nil
}

func (m *Module) Decode(compact string) (interface{}, error) {
	payload, err := internals.Decode(compact)
	if err != nil {
		return nil, err
	}

	return payload, nil
}

func (m *Module) Verify(compact string, keys ...interface{}) (interface{}, error) {
	payload, err := internals.Verify(compact, keys)
	if err != nil {
		return nil, err
	}

	return payload, nil
}
