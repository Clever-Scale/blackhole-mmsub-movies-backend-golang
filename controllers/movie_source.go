package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/heinkozin/blackhole-mmsub-movies/models"
)

type CreateMovieSourceInput struct {
	Name       string `json:"name" binding:"required"`
	Link       string `json:"link" binding:"required"`
	Resolution string `json:"resolution" binding:"required"`
	MovieID    uint   `json:"movie_id" binding:"required"`
}

func CreateMovieSource(c *gin.Context) {
	var input CreateMovieSourceInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"data": err})
		return
	}

	movieSource := models.MovieSource{
		Name:       input.Name,
		Link:       input.Link,
		Resolution: input.Resolution,
		MovieID:    input.MovieID,
	}

	models.DB.Create(&movieSource)

	c.JSON(http.StatusCreated, gin.H{
		"message": "Movie source created successfully",
		"data":    &movieSource,
	})

}
