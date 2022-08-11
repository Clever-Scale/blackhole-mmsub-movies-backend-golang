package main

import (
	"github.com/gin-gonic/gin"
	"github.com/rahmanfadhil/gin-bookstore/models"
)

func main() {
	r := gin.Default()

	// Connect to database
	models.ConnectDatabase()

	// Initialize routes
	InitRoutes(r)

	// Run the server
	r.Run()
}
