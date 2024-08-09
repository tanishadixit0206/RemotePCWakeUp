package routes

import (
	"github.com/gofiber/fiber/v2"
	"github.com/tanishadixit0206/RemotePCWakeUp/go_backend/controllers"
)

func SetUpRoutes(app *fiber.App) {
	controllers.InitUserController()
	api := app.Group("/api")

	api.Get("/users" , controllers.GetUsers)
}