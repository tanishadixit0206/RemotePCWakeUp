package main

import (
	// "fmt"
	"log"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/joho/godotenv"
	// "github.com/tanishadixit0206/RemotePCWakeUp/go_backend/controllers"
	"github.com/tanishadixit0206/RemotePCWakeUp/go_backend/databases"
	"github.com/tanishadixit0206/RemotePCWakeUp/go_backend/routes"
)


func main(){
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	app := fiber.New()
	app.Use(cors.New(cors.Config{
		AllowOrigins: "http://192.168.1.104:3000/",
		AllowCredentials: true,
	}))
	
	databases.ConnectDB()
	defer databases.DisconnectDB()
	routes.SetUpRoutes(app)

	log.Fatal(app.Listen("192.168.1.104:8080"))
}