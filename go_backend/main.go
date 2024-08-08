package main

import (
	"github.com/gofiber/fiber/v2"
	"github.com/tanishadixit0206/RemotePCWakeUp/go_backend/databases"
	"github.com/tanishadixit0206/RemotePCWakeUp/go_backend/routes"

	// "go_backend/config"
	"log"
)

func main(){
	app := fiber.New()

	databases.ConnectDB()
	defer databases.DisconnectDB()

	routes.SetUpRoutes(app)

	log.Fatal(app.Listen(":3000"))
}