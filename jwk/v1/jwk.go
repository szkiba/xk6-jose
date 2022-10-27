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

package v1

import (
	"github.com/szkiba/xk6-jose/jwk/internals"
)

type Module struct{}

func New() *Module {
	return &Module{}
}

func (m *Module) Parse(source string) (*jose.JSONWebKey, error) {
	key, err := internals.Parse(source)
	if err != nil {
		return nil, err
	}

	return key, nil
}

func (m *Module) ParseKeySet(source string) ([]jose.JSONWebKey, error) {
	keys, err := internals.ParseKeySet(source)
	if err != nil {
		return nil, err
	}

	return keys, nil
}

func (m *Module) Generate(algorithm string, seedIn interface{}) (*jose.JSONWebKey, error) {
	jwk, err := internals.Generate(algorithm, seedIn)
	if err != nil {
		return nil, err
	}

	return jwk, nil
}

func (m *Module) Adopt(algorithm string, keyIn interface{}, isPublic bool) (*jose.JSONWebKey, error) {
	jwk, err := internals.Adopt(algorithm, keyIn, isPublic)
	if err != nil {
		return nil, err
	}

	return jwk, nil
}
