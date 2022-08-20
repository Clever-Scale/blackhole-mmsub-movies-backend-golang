package controllers

import (
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/heinkozin/blackhole-mmsub-movies/libs"
	"github.com/heinkozin/blackhole-mmsub-movies/models"
	"gorm.io/gorm/clause"
)

type CreateMovieInput struct {
	Title         string   `json:"title" binding:"required"`
	Description   string   `json:"description" binding:"required"`
	StreamingTime uint     `json:"streaming_time" binding:"required"`
	ParentID      uint     `json:"parent_id"`
	ImDbID        string   `json:"imdb_id"`
	ReleasedAt    string   `json:"release_date" binding:"required"`
	Rating        float32  `json:"rating"`
	Genres        []string `json:"genres" binding:"required"`
}

type UpdateMovieInput struct {
	Title         string  `json:"title"`
	Description   string  `json:"description"`
	StreamingTime uint    `json:"streaming_time"`
	ParentID      uint    `json:"parent_id"`
	ImDbID        string  `json:"imdb_id"`
	ReleasedAt    string  `json:"release_date"`
	Rating        float32 `json:"rating"`
	Genres        []uint  `json:"genres"`
}

func FindMovies(c *gin.Context) {
	var movies []models.Movie

	page := libs.PG.With(models.DB.Model(&models.Movie{}).Preload("Genres.Movies").Preload(clause.Associations)).Request(c.Request).Cache("movies").Response(&movies)

	for i := range movies {
		for y := range movies[i].Genres {
			movies[i].Genres[y].MovieCount = len(movies[i].Genres[y].Movies)
		}
	}

	c.JSON(200, gin.H{
		"message": "Movies retrieved successfully",
		"data":    movies,
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

func FindMovie(c *gin.Context) {
	var movie models.Movie

	if err := models.DB.Preload("Genres.Movies").First(&movie, c.Param("id")).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"data": err, "success": false})
		return
	}

	for i := range movie.Genres {
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
		Rating:        input.Rating,
	}

	// Create the movie, and then the genres
	models.DB.Create(&movie)

	// connect the movie to the genres
	for _, genreTitle := range input.Genres {
		slug := strings.ToLower(strings.Replace(genreTitle, " ", "-", -1))
		var genre models.Genre
		if err := models.DB.Where("LOWER(slug) = ? ", slug).First(&genre).Error; err != nil {
			genre = models.Genre{
				Title: genreTitle,
				Slug:  slug,
			}
			models.DB.Create(&genre)
		}
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

	for i := range movie.Genres {
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
