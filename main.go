package main

import (
	"github.com/gin-gonic/gin"
	_ "github.com/heinkozin/blackhole-mmsub-movies/docs"
	"github.com/heinkozin/blackhole-mmsub-movies/models"
	"github.com/heinkozin/blackhole-mmsub-movies/routes"
	"github.com/joho/godotenv"
	swaggerFiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"
)

// @title          Blackhole MMSub Movies API
// @version        1.0
// @description    This is a movie streaming website api.
// @termsOfService http://swagger.io/terms/

// @contact.name  Hein Ko Zin
// @contact.url   https://github.com/HeinKoZin
// @contact.email heinkozin4@gmail.com

// @license.name Apache 2.0
// @license.url  http://www.apache.org/licenses/LICENSE-2.0.html

// @host     localhost:8080
// @BasePath /api/v1

// @securityDefinitions.apikey BearerAuth
// @in header
// @name Authorization
func main() {

	// Load .env file
	godotenv.Load(".env.local")

	r := gin.Default()

	// Connect to database
	models.ConnectDatabase()

	// Initialize routes
	routes.InitRoutes(r)

	// Swagger UI
	r.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))

	// Run the server
	r.Run()
}
