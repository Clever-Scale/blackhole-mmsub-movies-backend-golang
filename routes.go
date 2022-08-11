package main

import (
	"github.com/gin-gonic/gin"
	"github.com/rahmanfadhil/gin-bookstore/controllers"
)

func InitRoutes(r *gin.Engine) *gin.Engine {
	// Routes

	// API version 1
	v1 := r.Group("/v1")
	{
		// books
		books := v1.Group("/books")
		books.Use(controllers.JWTAuthMiddleware())
		books.GET("/", controllers.FindBooks)
		books.GET("/:id", controllers.FindBook)
		books.POST("/", controllers.CreateBook)
		books.PATCH("/:id", controllers.UpdateBook)
		books.DELETE("/:id", controllers.DeleteBook)

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
