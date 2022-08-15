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
	models.DB.Preload("Movies").Find(&genres)
	c.JSON(200, gin.H{
		"message": "Retrieved genres successfully",
		"data":    genres,
	})
}

func FindGenre(c *gin.Context) {
	var genre models.Genre
	models.DB.First(&genre, c.Param("id"))
	c.JSON(200, gin.H{
		"message": genre,
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

	c.JSON(http.StatusOK, gin.H{"data": genre})
}

func UpdateGenre(c *gin.Context) {
	var input UpdateGenreInput
	genre := models.Genre{}

	if err := models.DB.Model(&genre).Clauses(clause.Returning{}).Where("id = ?", c.Param("id")).Update("title", input.Title).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"data": err})
		return
	}

	c.JSON(200, gin.H{
		"message": "Genre updated successfully",
		"data":    genre,
	})
}
