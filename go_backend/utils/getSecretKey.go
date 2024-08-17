package utils

import(
	"os"
	"log"
)

func GetSecretKey() []byte {
    secretKey := os.Getenv("AUTH_SECRET")
    if secretKey == "" {
        log.Fatal("AUTH_SECRET is not set")
    }
    return []byte(secretKey)
}