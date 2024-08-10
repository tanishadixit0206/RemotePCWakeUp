package controllers

import (
	"context"
	"log"
	"time"
	"github.com/gofiber/fiber/v2"
	"github.com/tanishadixit0206/RemotePCWakeUp/go_backend/databases"
	"github.com/tanishadixit0206/RemotePCWakeUp/go_backend/models"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

var userCollection *mongo.Collection

func InitUserController() {
    if databases.MongoDB == nil {
        log.Fatal("MongoDB connection is not initialized")
    }
    userCollection = databases.MongoDB.Collection("users")
}

func GetUsers(c *fiber.Ctx) error {
    if userCollection == nil {
        return c.Status(500).JSON(fiber.Map{
            "error": "User collection is not initialized",
        })
    }

    var users []models.User
    ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
    defer cancel()

    cursor, err := userCollection.Find(ctx, bson.D{})
    if err != nil {
        log.Println("Failed to find users:", err)
        return c.Status(500).JSON(fiber.Map{
            "error": "Failed to retrieve users",
        })
    }
    defer cursor.Close(ctx)

    if err = cursor.All(ctx, &users); err != nil {
        log.Println("Failed to decode users:", err)
        return c.Status(500).JSON(fiber.Map{
            "error": "Failed to decode users",
        })
    }

    return c.JSON(users)
}
