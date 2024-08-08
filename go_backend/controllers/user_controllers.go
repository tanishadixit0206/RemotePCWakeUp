package controllers

import "github.com/gofiber/fiber/v2"

func Getuser(c *fiber.Ctx) error {
	return c.JSON(fiber.Map{
		"message" : "all user will be fshown here",
	})
}