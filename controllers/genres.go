package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/heinkozin/blackhole-mmsub-movies/models"
	"gorm.io/gorm/clause"
)

type CreateGenreInput struct {
	Title string `json:"title" binding:"required"`
}

type UpdateGenreInput struct {
	Title string `json:"title"`
}

func FindGenres(c *gin.Context) {
	var genres []models.Genre

	var genreCount int64
	models.DB.Preload("Movies").Find(&genres).Count(&genreCount)

	// return genres and movie count for each genre
	for i := 0; i < len(genres); i++ {
		// get movie count for each genre
		genres[i].MovieCount = len(genres[i].Movies)
	}

	c.JSON(200, gin.H{
		"message": "Retrieved genres successfully",
		"data":    genres,
		"total":   genreCount,
		"success": true,
	})
}

func FindGenre(c *gin.Context) {
	var genre models.Genre
	models.DB.First(&genre, c.Param("id"))
	c.JSON(200, gin.H{
		"data":    genre,
		"success": true,
		"message": "Genre found successfully",
	})
}

func CreateGenre(c *gin.Context) {
	var input CreateGenreInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"data": err})
		return
	}

	genre := models.Genre{Title: input.Title}

	models.DB.Create(&genre)

	c.JSON(http.StatusOK, gin.H{"data": genre, "success": true, "message": "Genre created successfully"})
}

func UpdateGenre(c *gin.Context) {
	var input UpdateGenreInput
	genre := models.Genre{}

	if err := models.DB.Model(&genre).Clauses(clause.Returning{}).Where("id = ?", c.Param("id")).Update("title", input.Title).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"data": err, "success": false})
		return
	}

	c.JSON(200, gin.H{
		"message": "Genre updated successfully",
		"data":    genre,
		"success": true,
	})
}
