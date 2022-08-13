package main

import (
	"github.com/gin-gonic/gin"
	"github.com/heinkozin/blackhole-mmsub-movies/controllers"
)

func InitRoutes(r *gin.Engine) *gin.Engine {
	// Routes

	// API version 1
	v1 := r.Group("/v1")
	{
		// users
		users := v1.Group("/users")
		users.Use(controllers.JWTAuthMiddleware())
		users.GET("/", controllers.FindUsers)
		users.GET("/:id", controllers.FindUser)
		users.POST("/", controllers.CreateUser)
		users.PATCH("/:id", controllers.UpdateUser)
		users.DELETE("/:id", controllers.DeleteUser)

		// authentication
		auth := v1.Group("/auth")
		auth.POST("/register", controllers.CreateUser)
		auth.POST("/login", controllers.LoginUser)
	}

	return r
}
