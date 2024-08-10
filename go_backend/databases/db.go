package databases

import (
    "context"
    "log"
    "time"
    "go.mongodb.org/mongo-driver/mongo"
    "go.mongodb.org/mongo-driver/mongo/options"
)

var MongoClient *mongo.Client
var MongoDB *mongo.Database

func ConnectDB() {
    mongoURI := "mongodb://localhost:27017"
    dbName := "test"

    if mongoURI == "" || dbName == "" {
        log.Fatal("MONGODB_URI or MONGO_DB_NAME is not set")
    }

    clientOptions := options.Client().ApplyURI(mongoURI)

    ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
    defer cancel()

    client, err := mongo.Connect(ctx, clientOptions)
    if err != nil {
        log.Fatal("Failed to connect to MongoDB: ", err)
    }

    err = client.Ping(ctx, nil)
    if err != nil {
        log.Fatal("Failed to ping MongoDB: ", err)
    }

    MongoClient = client
    MongoDB = client.Database(dbName)

    log.Println("Connected to MongoDB!")
}

func DisconnectDB() {
    if MongoClient != nil {
        err := MongoClient.Disconnect(context.Background())
        if err != nil {
            log.Fatal("Error disconnecting from MongoDB: ", err)
        }
        log.Println("Disconnected from MongoDB.")
    }
}
