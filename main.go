package main

import (
	"github.com/gin-gonic/gin"
	"github.com/rahmanfadhil/gin-bookstore/controllers"
	"github.com/rahmanfadhil/gin-bookstore/models"
)

func main() {
	r := gin.Default()

	// Connect to database
	models.ConnectDatabase()

	// Routes

	// books
	books := r.Group("/books")
	books.GET("/books", controllers.FindBooks)
	books.GET("/books/:id", controllers.FindBook)
	books.POST("/books", controllers.JWTAuthMiddleware(), controllers.CreateBook)
	books.PATCH("/books/:id", controllers.JWTAuthMiddleware(), controllers.UpdateBook)
	books.DELETE("/books/:id", controllers.JWTAuthMiddleware(), controllers.DeleteBook)

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

	// Run the server
	r.Run()
}
