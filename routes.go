package main

import (
	"github.com/gin-gonic/gin"
	"github.com/rahmanfadhil/gin-bookstore/controllers"
)

func InitRoutes(r *gin.Engine) *gin.Engine {
	// Routes

	// books
	books := r.Group("/books")
	books.GET("/", controllers.FindBooks)
	books.GET("/:id", controllers.FindBook)
	books.POST("/", controllers.JWTAuthMiddleware(), controllers.CreateBook)
	books.PATCH("/:id", controllers.JWTAuthMiddleware(), controllers.UpdateBook)
	books.DELETE("/:id", controllers.JWTAuthMiddleware(), controllers.DeleteBook)

	// users
	users := r.Group("/users")
	users.GET("/", controllers.JWTAuthMiddleware(), controllers.FindUsers)
	users.GET("/:id", controllers.JWTAuthMiddleware(), controllers.FindUser)
	users.POST("/", controllers.JWTAuthMiddleware(), controllers.CreateUser)
	users.PATCH("/:id", controllers.JWTAuthMiddleware(), controllers.UpdateUser)
	users.DELETE("/:id", controllers.JWTAuthMiddleware(), controllers.DeleteUser)

	// authentication
	auth := r.Group("/auth")
	auth.POST("/login", controllers.LoginUser)

	return r
}
