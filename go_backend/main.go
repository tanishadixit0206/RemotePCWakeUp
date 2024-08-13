package main

import (
	"github.com/gofiber/fiber/v2"
	"github.com/tanishadixit0206/RemotePCWakeUp/go_backend/databases"
	"github.com/tanishadixit0206/RemotePCWakeUp/go_backend/routes"
	"github.com/tanishadixit0206/RemotePCWakeUp/go_backend/handlers"
	"net/http"
	"log"
)


func main(){

	databases.ConnectDB()
	defer databases.DisconnectDB()
	app := fiber.New()

	routes.SetUpRoutes(app)
	http.HandleFunc("/auth",handlers.GoogleAuthHandler)
	log.Fatal(app.Listen(":3000"))
}