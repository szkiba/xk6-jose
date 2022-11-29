package jws

type Module struct{}

func New() *Module {
	return &Module{}
}
func (m *Module) Sign(key *jose.JSONWebKey, payload string, sigAlg jose.SignatureAlgorithm) (string, error) {
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

func (m *Module) Verify(key *jose.JSONWebKey, jws string) (string, error) {
	obj, err := jose.ParseSigned(jws)
	if err != nil {
		return "", err
	}
	plaintextBytes, err := obj.Verify(key)
	return string(plaintextBytes), err
}
