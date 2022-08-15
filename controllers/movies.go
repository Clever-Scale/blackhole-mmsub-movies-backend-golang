package controllers

import (
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/heinkozin/blackhole-mmsub-movies/models"
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
	models.DB.Preload("Genres").Find(&movies)

	c.JSON(200, gin.H{
		"data": movies,
	})
}

func FindMovie(c *gin.Context) {
	var movie models.Movie

	if err := models.DB.Preload("Genres").First(&movie, c.Param("id")).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"data": err})
		return
	}

	c.JSON(200, gin.H{
		"message": "Retrieved movie",
		"data":    movie,
	})
}

func CreateMovie(c *gin.Context) {
	var input CreateMovieInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"data": err})
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
		models.DB.Model(&movie).Association("Genres").Append(&genre)
	}

	// models.DB.Create(&movie).Association("Genres").Append(models.Genre{ID: input.Genres})

	c.JSON(http.StatusOK, gin.H{"data": movie})
}

func UpdateMovie(c *gin.Context) {
	// Get model if exist
	var input UpdateMovieInput
	var movie models.Movie
	if err := models.DB.Where("id = ?", c.Param("id")).First(&movie).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Record not found!"})
		return
	}

	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err})
		return
	}

	if err := models.DB.Model(&movie).Where("id = ?", c.Param("id")).Updates(input).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err})
		return
	}

	c.JSON(200, gin.H{
		"message": "Movie updated successfully",
		"data":    input,
	})
}

func DeleteMovie(c *gin.Context) {
	c.JSON(200, gin.H{
		"message": "pong",
	})
}
