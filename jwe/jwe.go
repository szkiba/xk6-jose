package jwe

import (
	"context"
	"gopkg.in/square/go-jose.v2"
)

type Module struct{}

func New() *Module {
	return &Module{}
}

func (m *Module) Encrypt(ctx context.Context, key *jose.JSONWebKey, payload string, encAlg jose.ContentEncryption, algorithm jose.KeyAlgorithm) (string, error) {
	crypter, err := jose.NewEncrypter(encAlg, jose.Recipient{Algorithm: algorithm, Key: key}, nil)
	if err != nil {
		return "", err
	}
	obj, err := crypter.Encrypt([]byte(payload))
	if err != nil {
		return "", err
	}
	return obj.CompactSerialize()
}

func (m *Module) DecryptAsString(ctx context.Context, key *jose.JSONWebKey, ciphertext string) (string, error) {
	obj, err := jose.ParseEncrypted(ciphertext)
	if err != nil {
		return "", err
	}
	plaintext, err := obj.Decrypt(key.Key)
	return string(plaintext), err
}
