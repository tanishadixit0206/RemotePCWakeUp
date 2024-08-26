package routes

import (
	"os"

	"github.com/gofiber/fiber/v2"
	"github.com/tanishadixit0206/RemotePCWakeUp/go_backend/controllers"
	// "github.com/tanishadixit0206/RemotePCWakeUp/go_backend/middleware"
)

func SetUpRoutes(app *fiber.App) {
	controllers.InitUserController()
	app.Get("/auth",controllers.GoogleAuthHandler)
	api:=app.Group("/api",
	// middleware.AuthRequired
	)
	api.Get("/users" , controllers.GetUsers)
	api.Get("/wol",
	func(c *fiber.Ctx) error {
		mac:=
		os.Getenv("TEST_MAC") 
		err := controllers.Wol(mac)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).SendString(err.Error())
	}
	return c.SendString("WOL command sent successfully!")
	})
	api.Get("/", controllers.GetConnectedDevices)
}