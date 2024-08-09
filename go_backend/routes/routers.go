package routes

import (
	"github.com/gofiber/fiber/v2"
	"github.com/tanishadixit0206/RemotePCWakeUp/go_backend/controllers"
)

func SetUpRoutes(app *fiber.App) {
	api := app.Group("/api")

	api.Get("/" , controllers.Getuser)
	app.Get("/", func(c *fiber.Ctx) error {
		ipAddress:=c.IP()
		return c.JSON(fiber.Map{
			"message": "Welcome to the Fiber App!",
			"ip": ipAddress,
		})
	})
}