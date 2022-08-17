package controllers

import (
	"net/http"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/heinkozin/blackhole-mmsub-movies/libs"
	"github.com/heinkozin/blackhole-mmsub-movies/models"
	"gorm.io/gorm/clause"
)

type CreateMovieInput struct {
	Title         string    `json:"title" binding:"required"`
	Description   string    `json:"description" binding:"required"`
	StreamingTime uint      `json:"streaming_time" binding:"required"`
	ParentID      uint      `json:"parent_id"`
	ImDbID        uint      `json:"imdb_id"`
	ReleasedAt    time.Time `json:"release_date" binding:"required"`
	Genres        []uint    `json:"genres" binding:"required"`
}

type UpdateMovieInput struct {
	Title         string    `json:"title"`
	Description   string    `json:"description"`
	StreamingTime uint      `json:"streaming_time"`
	ParentID      uint      `json:"parent_id"`
	ImDbID        uint      `json:"imdb_id"`
	ReleasedAt    time.Time `json:"release_date"`
	Genres        []uint    `json:"genres"`
}

func FindMovies(c *gin.Context) {
	var movies []models.Movie
	var movieCount int64

	models.DB.Model(&models.Movie{}).Count(&movieCount)
	models.DB.Scopes(libs.Paginate(c)).Preload("Genres.Movies").Preload(clause.Associations).Find(&movies)

	for i := 0; i < len(movies); i++ {
		for y := 0; y < len(movies[i].Genres); y++ {
			movies[i].Genres[y].MovieCount = len(movies[i].Genres[y].Movies)
		}
	}

	page, _ := strconv.Atoi(c.Query("page"))
	if page == 0 {
		page = 1
	}
	pageSize, _ := strconv.Atoi(c.Query("pageSize"))
	if pageSize == 0 {
		pageSize = 10
	}

	c.JSON(200, gin.H{
		"message":  "Movies retrieved successfully",
		"total":    movieCount,
		"page":     page,
		"pageSize": pageSize,
		"data":     movies,
		"success":  true,
	})
}

func FindMovie(c *gin.Context) {
	var movie models.Movie

	if err := models.DB.Preload("Genres.Movies").First(&movie, c.Param("id")).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"data": err, "success": false})
		return
	}

	for i := 0; i < len(movie.Genres); i++ {
		movie.Genres[i].MovieCount = len(movie.Genres[i].Movies)
	}

	c.JSON(200, gin.H{
		"message": "Retrieved movie",
		"data":    movie,
		"success": true,
	})
}

func CreateMovie(c *gin.Context) {
	var input CreateMovieInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"data": err, "success": false})
		return
	}

	movie := models.Movie{
		Title:         input.Title,
		Description:   input.Description,
		StreamingTime: input.StreamingTime,
		ParentID:      input.ParentID,
		ImDbID:        input.ImDbID,
		ReleasedAt:    input.ReleasedAt,
	}

	// Create the movie, and then the genres
	models.DB.Create(&movie)

	// connect the movie to the genres
	for _, genreID := range input.Genres {
		var genre models.Genre
		models.DB.Where("id = ? ", genreID).First(&genre)
		models.DB.Model(&movie).Preload("Movies").Association("Genres").Append(&genre)
	}

	c.JSON(http.StatusOK, gin.H{
		"data":    movie,
		"success": true,
		"message": "Movie created successfully",
	})
}

func UpdateMovie(c *gin.Context) {
	// Get model if exist
	var input UpdateMovieInput
	var movie models.Movie
	if err := models.DB.Where("id = ?", c.Param("id")).First(&movie).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Record not found!", "success": false})
		return
	}

	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err, "success": false})
		return
	}

	if err := models.DB.Model(&movie).Preload("Genres.Movies").Preload(clause.Associations).Where("id = ?", c.Param("id")).Updates(
		models.Movie{
			Title:         input.Title,
			Description:   input.Description,
			StreamingTime: input.StreamingTime,
			ParentID:      input.ParentID,
			ImDbID:        input.ImDbID,
		}).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err, "success": false})
		return
	}

	// connect the movie to the genres
	for _, genreID := range input.Genres {
		var genre models.Genre
		models.DB.Where("id = ? ", genreID).First(&genre)
		models.DB.Model(&movie).Preload("Movies").Association("Genres").Append(&genre)
	}

	for i := 0; i < len(movie.Genres); i++ {
		movie.Genres[i].MovieCount = len(movie.Genres[i].Movies)
	}

	c.JSON(200, gin.H{
		"message": "Movie updated successfully",
		"data":    movie,
		"success": true,
	})
}

func DeleteMovie(c *gin.Context) {
	var movie models.Movie
	if err := models.DB.Where("id = ?", c.Param("id")).First(&movie).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Record not found!", "success": false})
		return
	}

	models.DB.Delete(&movie)

	c.JSON(200, gin.H{
		"message": "Movie deleted successfully",
		"data":    movie,
		"success": true,
	})
}
