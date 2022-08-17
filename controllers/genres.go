package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/heinkozin/blackhole-mmsub-movies/libs"
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

	page := libs.PG.With(models.DB.Model(&models.Genre{}).Preload("Movies.Genres").Preload(clause.Associations)).Request(c.Request).Cache("genres").Response(&genres)

	// return genres and movie count for each genre
	for i := range genres {
		// get movie count for each genre
		genres[i].MovieCount = len(genres[i].Movies)
	}

	c.JSON(200, gin.H{
		"message": "Retrieved genres successfully",
		"data":    genres,
		"success": true,
		"pagination": libs.Pagination{
			Page:       int(page.Page),
			PageSize:   int(page.Size),
			Total:      int(page.Total),
			TotalPages: int(page.TotalPages),
			MaxPage:    int(page.MaxPage),
			First:      page.First,
			Last:       page.Last,
			Visible:    int(page.Visible),
		},
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

	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"data": err, "success": false})
		return
	}

	if err := models.DB.Model(&genre).Clauses(clause.Returning{}).Where("id = ?", c.Param("id")).Updates(models.Genre{Title: input.Title}).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"data": err, "success": false})
		return
	}

	c.JSON(200, gin.H{
		"message": "Genre updated successfully",
		"data":    genre,
		"success": true,
	})
}

func DeleteGenre(c *gin.Context) {
	genre := models.Genre{}

	if err := models.DB.Where("id = ?", c.Param("id")).Delete(&genre).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"data": err, "success": false})
		return
	}

	c.JSON(200, gin.H{
		"message": "Genre deleted successfully",
		"data":    genre,
		"success": true,
	})
}
