package routes

import (
	"github.com/gofiber/fiber/v2"
	"github.com/tanishadixit0206/RemotePCWakeUp/go_backend/controllers"
	"github.com/tanishadixit0206/RemotePCWakeUp/go_backend/middleware"
)

func SetUpRoutes(app *fiber.App) {
	controllers.InitUserController()
	app.Get("/auth",controllers.GoogleAuthHandler)
	api:=app.Group("/api",middleware.AuthRequired)
	api.Get("/users" , controllers.GetUsers)
	app.Get("/", controllers.GetipAddress)
}