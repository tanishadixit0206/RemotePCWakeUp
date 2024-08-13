package routes

import (
	"github.com/gofiber/fiber/v2"
	"github.com/tanishadixit0206/RemotePCWakeUp/go_backend/controllers"
	// "github.com/tanishadixit0206/RemotePCWakeUp/go_backend/handlers"

)

func SetUpRoutes(app *fiber.App) {
	controllers.InitUserController()
	api := app.Group("/api")
	app.Get("/auth",func(c *fiber.Ctx)error{
		// email:=handlers.GoogleAuthHandler
		return c.JSON(fiber.Map{
			"email":"yo",
		})
	})
	api.Get("/users" , controllers.GetUsers)
	app.Get("/", func(c *fiber.Ctx) error {
		ipAddress:=c.IP()
		return c.JSON(fiber.Map{
			"message": "Welcome to the Fiber App!",
			"ip": ipAddress,
		})
	})
}