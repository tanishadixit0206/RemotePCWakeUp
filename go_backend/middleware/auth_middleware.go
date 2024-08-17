package middleware

import (
	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt"
	"github.com/tanishadixit0206/RemotePCWakeUp/go_backend/utils"
)

func AuthRequired(c *fiber.Ctx)error{
	token:=c.Get("authjs.session-token")
	if token==""{
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"error":"Authorization token not found",
		})
	}

	auth_token,err:=jwt.Parse(token, func(auth_token *jwt.Token) (interface{}, error) {
		return utils.GetSecretKey(), nil 
	})
	
	if err!=nil||!auth_token.Valid{
		c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"error":"Invalid or expired token",
		})
	}

	return c.Next();
}
