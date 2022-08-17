package controllers

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/heinkozin/blackhole-mmsub-movies/libs"
	"github.com/heinkozin/blackhole-mmsub-movies/models"
	"gorm.io/gorm/clause"
)

type CreateUserInput struct {
	Name     string `json:"name" binding:"required"`
	Email    string `json:"email" binding:"required"`
	Password string `json:"password" binding:"required"`
}

type UpdateUserInput struct {
	Name     string `json:"name"`
	Email    string `json:"email"`
	Password string `json:"password"`
}

func FindUsers(c *gin.Context) {
	var users []models.User
	// All users count
	var count int64
	models.DB.Model(&models.User{}).Count(&count)
	models.DB.Scopes(libs.Paginate(c)).Find(&users)

	page, _ := strconv.Atoi(c.Query("page"))
	if page == 0 {
		page = 1
	}
	pageSize, _ := strconv.Atoi(c.Query("pageSize"))
	if pageSize == 0 {
		pageSize = 10
	}

	c.JSON(http.StatusOK, gin.H{
		"data":     users,
		"success":  true,
		"message":  "Users found successfully",
		"page":     page,
		"pageSize": pageSize,
		"total":    count,
	})
}

func FindUser(c *gin.Context) {
	// Get model if exist
	var user models.User
	if err := models.DB.Where("id = ?", c.Param("id")).First(&user).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Record not found!", "success": false})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"message": "User found successfully",
		"data":    user,
		"success": true,
	})
}

func CreateUser(c *gin.Context) {
	// Validate input
	var input CreateUserInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error(), "success": false})
		return
	}

	hashedPassword, _ := HashPassword(input.Password)

	user := models.User{Name: input.Name, Email: input.Email, Password: hashedPassword}
	// check user email in database
	if err := models.DB.Where("email = ?", input.Email).First(&user).Error; err == nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Email already exists!", "success": false})
		return
	}

	// Create user
	models.DB.Create(&user)

	c.JSON(http.StatusOK, gin.H{
		"message": "User created successfully",
		"data":    user,
		"success": true,
	})
}

func UpdateUser(c *gin.Context) {
	// Get model if exist
	var user models.User
	if err := models.DB.Where("id = ?", c.Param("id")).First(&user).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Record not found!", "success": false})
		return
	}

	// Validate input
	var input UpdateUserInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error(), "success": false})
		return
	}

	if err := models.DB.Model(&user).Clauses(clause.Returning{}).Where("id = ?", c.Param("id")).Updates(
		models.User{
			Name:     input.Name,
			Email:    input.Email,
			Password: input.Password,
		}).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err, "success": false})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "User updated successfully",
		"data":    user,
		"success": true,
	})
}

func DeleteUser(c *gin.Context) {
	// Get model if exist
	var user models.User
	if err := models.DB.Where("id = ?", c.Param("id")).First(&user).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Record not found!", "success": false})
		return
	}
	models.DB.Delete(&user)

	c.JSON(http.StatusOK, gin.H{
		"message": "User deleted successfully",
		"data":    user,
		"success": true,
	})
}
