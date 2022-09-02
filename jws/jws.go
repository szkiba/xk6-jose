package jws

import (
	"context"
	"gopkg.in/square/go-jose.v2"
)

type Module struct{}

func New() *Module {
	return &Module{}
}
func (m *Module) Sign(ctx context.Context, key *jose.JSONWebKey, payload string, sigAlg jose.SignatureAlgorithm) (string, error) {
	signer, err := jose.NewSigner(jose.SigningKey{Algorithm: sigAlg, Key: key}, nil)
	if err != nil {
		return "", err
	}
	obj, err := signer.Sign([]byte(payload))
	if err != nil {
		return "", err
	}
	return obj.CompactSerialize()
}
