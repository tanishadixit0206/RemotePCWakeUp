package handlers

import (
	"fmt"
	"log"
	"net/http"
	"os"
	// "github.com/dgrijalva/jwt-go"
	"github.com/golang-jwt/jwt"
)

func GoogleAuthHandler(w http.ResponseWriter, r *http.Request){
	cookie,err:=r.Cookie("auth.session-token")
	if err!=nil{
		http.Error(w,"Session token not found",http.StatusUnauthorized)
		return
	}

	sessionToken:=cookie.Value;

	log.Printf("Session Token: %s",sessionToken)

	user,err:=ValidateSessionToken(sessionToken)
	if err!=nil{
		http.Error(w,"Invalid session token",http.StatusUnauthorized)
		return
	}

	log.Printf("Authenticated user: %v",user.Email)
	w.Write([]byte("User authenticated"))
}

func ValidateSessionToken(token string)(*User,error){
	secretKey:=getSecretKey()
	
	parsedToken,err:=jwt.Parse(token,func(token *jwt.Token)(interface{},error){
		if _,ok:=token.Method.(*jwt.SigningMethodHMAC); !ok{
			return nil,fmt.Errorf("unexpected signing method: %v",token.Header["alg"])
		}
		return secretKey,nil
	})

	if err!=nil{
		return nil,err
	}

	if claims,ok :=parsedToken.Claims.(jwt.MapClaims);ok &&parsedToken.Valid{
		email:=claims["email"].(string)

		return &User{
			Email:email,
		},nil
	}else{
		return nil,fmt.Errorf("invalid token")
	}
}

func getSecretKey() []byte {
    secretKey := os.Getenv("AUTH_SECRET")
    if secretKey == "" {
        log.Fatal("AUTH_SECRET is not set")
    }
    return []byte(secretKey)
}


type User struct {
	Email string
}