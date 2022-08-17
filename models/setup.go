package models

import (
	"os"

	"github.com/go-redis/redis/v8"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

var RedisClient = redis.NewClient(&redis.Options{
	Addr:     os.Getenv("REDIS_HOST") + ":" + os.Getenv("REDIS_PORT"),
	Password: "", // no password set
	DB:       0,
})

func ConnectDatabase() {

	url := os.Getenv("DATABASE_URL")

	database, err := gorm.Open(postgres.Open(url), &gorm.Config{})

	if err != nil {
		panic("Failed to connect to database!")
	}

	database.AutoMigrate(&User{}, &Movie{}, &MovieSource{}, &Genre{})

	DB = database
}
