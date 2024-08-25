package main

import (
	"log"
	"net"
	"time"
	"os"

	"github.com/joho/godotenv"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/krolaw/dhcp4"
	"github.com/tanishadixit0206/RemotePCWakeUp/go_backend/databases"
	"github.com/tanishadixit0206/RemotePCWakeUp/go_backend/routes"
)

type DHCPServer struct{}

func (d *DHCPServer) ServeDHCP(p dhcp4.Packet, msgType dhcp4.MessageType, options dhcp4.Options) dhcp4.Packet {
	switch msgType {
	case dhcp4.Discover:
		return dhcp4.ReplyPacket(p, dhcp4.Offer, net.IPv4(192, 168, 1, 1), net.IPv4(192, 168, 1, 100), 48*3600, nil)
	case dhcp4.Request:
		return dhcp4.ReplyPacket(p, dhcp4.ACK, net.IPv4(192, 168, 1, 1), net.IPv4(192, 168, 1, 100), 48*3600, nil)
	}
	return nil
}

func main(){
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	app := fiber.New()
	app.Use(cors.New(cors.Config{
		AllowOrigins: "http://localhost:5173/",
		AllowCredentials: true,
	}))
	
	databases.ConnectDB()
	defer databases.DisconnectDB()
	routes.SetUpRoutes(app)
	// log.Fatal(app.Listen(":3000"))

	// DHCP server is run in a different goroutine
	go func() {
		server := &DHCPServer{}
		listener, err := net.ListenPacket("udp4", ":67")
		if err != nil {
			log.Fatal("Failed to start DHCP server: ", err)
		}
		defer listener.Close()

		log.Println("DHCP server is live...")
		dhcp4.Serve(listener, server)
	}()

	log.Fatal(app.Listen("192.168.0.103:3000"))
}