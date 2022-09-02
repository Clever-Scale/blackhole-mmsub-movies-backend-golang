package routes

import (
	"github.com/gin-gonic/gin"
	"github.com/heinkozin/blackhole-mmsub-movies/controllers"
	"github.com/heinkozin/blackhole-mmsub-movies/models"
)

func InitRoutes(r *gin.Engine) *gin.Engine {
	// Routes

	// Homepage
	// r.Use(static.Serve("/dashboard", static.LocalFile("./blackhole-dashboard/dist", true)))
	r.Static("/dashboard", "dashboard-dist")

	api := r.Group("/api")

	// API version 1
	v1 := api.Group("/v1")
	{
		// users
		users := v1.Group("/users")
		users.GET("/", controllers.JWTAuthMiddleware(), controllers.FindUsers)
		users.GET("/:id", controllers.JWTAuthMiddleware(), controllers.FindUser)
		users.POST("/", controllers.CreateUser)
		users.PATCH("/:id", controllers.JWTAuthMiddleware(), controllers.UpdateUser)
		users.DELETE("/:id", controllers.JWTAuthMiddleware(), controllers.RoleGuard(models.ADMIN), controllers.DeleteUser)

		// movies
		movies := v1.Group("/movies")
		movies.GET("/", controllers.FindMovies)
		movies.GET("/:id", controllers.FindMovie)
		movies.POST("/", controllers.JWTAuthMiddleware(), controllers.CreateMovie)
		movies.PATCH("/:id", controllers.JWTAuthMiddleware(), controllers.UpdateMovie)
		movies.DELETE("/:id", controllers.JWTAuthMiddleware(), controllers.DeleteMovie)

		// movie source
		movie_source := v1.Group("/movie-sources")
		movie_source.GET("/", controllers.FindMovie)
		movie_source.GET("/:id", controllers.FindMovie)
		movie_source.POST("/", controllers.JWTAuthMiddleware(), controllers.CreateMovieSource)
		movie_source.PATCH("/:id", controllers.JWTAuthMiddleware(), controllers.UpdateMovie)
		movie_source.DELETE("/:id", controllers.JWTAuthMiddleware(), controllers.DeleteMovie)

		// genres
		genres := v1.Group("/genres")
		genres.GET("/", controllers.FindGenres)
		genres.GET("/:id", controllers.FindGenre)
		genres.POST("/", controllers.JWTAuthMiddleware(), controllers.CreateGenre)
		genres.PATCH("/:id", controllers.JWTAuthMiddleware(), controllers.UpdateGenre)
		genres.DELETE("/:id", controllers.JWTAuthMiddleware(), controllers.DeleteGenre)

		// authentication
		auth := v1.Group("/auth")
		auth.POST("/register", controllers.CreateUser)
		auth.POST("/login", controllers.LoginUser)
		auth.POST("/me", controllers.JWTAuthMiddleware(), controllers.Me)
	}

	return r
}
