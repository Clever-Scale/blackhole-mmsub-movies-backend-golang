package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/rahmanfadhil/gin-bookstore/models"
)

type LoginUserInput struct {
	Email    string `json:"email" binding:"required"`
	Password string `json:"password" binding:"required"`
}

func LoginUser(c *gin.Context) {
	// Validate input
	var input LoginUserInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"data": err})
	}

	// Check user in database
	user := models.User{Email: input.Email, Password: input.Password}

	if err := models.DB.Find(&user, "email = ? AND password = ?", input.Email, input.Password).First(&user).Error; err != nil {
		c.JSON(http.StatusFound, gin.H{"data": "Credential wrong!"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": user})
}
