package jwe

import (
	"crypto/x509"
	"encoding/pem"
	"errors"
	"github.com/go-jose/go-jose/v4"
)

type Module struct{}

func New() *Module {
	return &Module{}
}

func (m *Module) CreateEncrypt(publicKeyPem string, payload string, kid string, alg string) (string, error) {

	block, _ := pem.Decode([]byte(publicKeyPem))
	if block == nil {
		return "", errors.New("Failed to decode PEM data")
	}

	publicKey, err := x509.ParsePKIXPublicKey(block.Bytes)
	if err != nil {
		return "", err
	}

	jwk := jose.JSONWebKey{
		Key:   publicKey,
		KeyID: kid,
	}

	// Create the encrypter with the correct arguments
	encrypter, err := jose.NewEncrypter(jose.A256GCM, jose.Recipient{Algorithm: jose.ECDH_ES, Key: jwk}, nil)
	if err != nil {
		return "", err
	}

	var plaintext = []byte(payload)
	object, err := encrypter.Encrypt(plaintext)
	if err != nil {
		return "", err
	}

	serialized, err := object.CompactSerialize()
	if err != nil {
		return "", err
	}

	return serialized, nil
}
