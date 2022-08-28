package main

import (
	"github.com/gin-gonic/gin"
	"github.com/heinkozin/blackhole-mmsub-movies/models"
	"github.com/heinkozin/blackhole-mmsub-movies/routes"
	"github.com/joho/godotenv"
)

func main() {

	// Load .env file
	godotenv.Load(".env.local")

	r := gin.Default()

	// Connect to database
	models.ConnectDatabase()

	// Initialize routes
	routes.InitRoutes(r)

	// Run the server
	r.Run()
}
