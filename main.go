package main

import (
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"github.com/rahmanfadhil/gin-bookstore/models"
)

func main() {

	// Load .env file
	godotenv.Load()

	r := gin.Default()

	// Connect to database
	models.ConnectDatabase()

	// Initialize routes
	InitRoutes(r)

	// Run the server
	r.Run()
}
