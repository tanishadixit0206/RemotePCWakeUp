package controllers

import (
	"context"
	"fmt"
	"log"
	"time"
	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt"
	"github.com/tanishadixit0206/RemotePCWakeUp/go_backend/databases"
	"github.com/tanishadixit0206/RemotePCWakeUp/go_backend/models"
	"github.com/tanishadixit0206/RemotePCWakeUp/go_backend/utils"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func GoogleAuthHandler(c *fiber.Ctx) error {
	cookie := c.Cookies("authjs.session-token")
	if cookie == "" {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"error": "Session token not found",
		})
	}

	sessionToken := cookie

	log.Printf("Session Token: %s", sessionToken)

	user, err := ValidateSessionToken(sessionToken)
	if err != nil {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"error": "Invalid session token",
		})
	}

	fmt.Printf("Authenticated user: %v", user.Email)

	if err:= UpsertUser(user);err!=nil{
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error":"Failed to store user details",
		})
	}

	return c.SendString("User authenticated")
}

func ValidateSessionToken(token string) (*models.User, error) {
	secretKey := utils.GetSecretKey()

	parsedToken, err := jwt.Parse(token, func(parsedToken *jwt.Token) (interface{}, error) {
		return secretKey, nil
	})

	if err != nil {
		fmt.Print(err,parsedToken);
		return nil,err
	}

	if claims, ok := parsedToken.Claims.(jwt.MapClaims); ok && parsedToken.Valid {
		email := claims["email"].(string)
		name:=claims["name"].(string)

		return &models.User{
			Username:name,
			Email: email,
		}, nil
	} else {
		log.Printf("Invalid token claims: %v", parsedToken.Claims)
		return nil, fmt.Errorf("invalid token")
	}
}

func UpsertUser(user *models.User) error{
	ctx,cancel:=context.WithTimeout(context.Background(),10*time.Second)
	defer cancel()

	filter:=bson.D{{Key: "email",Value: user.Email}}

	update:=bson.D{
		{Key: "$set",Value: bson.D{
			{Key: "username",Value: user.Username},
			{Key: "email",Value: user.Email},
		}},
	}

	_,err:=databases.MongoDB.Collection("users").UpdateOne(ctx,filter,update,options.Update().SetUpsert(true))
	return err
}