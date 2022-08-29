package controllers

import (
	"image"
	"mime/multipart"
	"net/http"
	"path/filepath"

	"github.com/disintegration/imaging"
	"github.com/gin-gonic/gin"
	"github.com/gin-gonic/gin/binding"
	"github.com/heinkozin/blackhole-mmsub-movies/libs"
	"github.com/heinkozin/blackhole-mmsub-movies/models"
	"github.com/lithammer/shortuuid/v4"
	"gorm.io/gorm/clause"
)

type CreateUserInput struct {
	Name     string `json:"name" binding:"required"`
	Email    string `json:"email" binding:"required"`
	Password string `json:"password" binding:"required"`
}

type UpdateUserInput struct {
	Name       string               `form:"name"`
	Email      string               `form:"email"`
	Password   string               `form:"password"`
	ProfilePic multipart.FileHeader `form:"profile_pic"`
}

// ListUser godoc
// @Summary     List All User
// @Description List All User
// @Tags        user
// @Produce     json
// @Success     200 {object} libs.JSONResult{message=string,data=[]models.User,success=bool}
// @Router      /users [get]
// @Security BearerAuth
func FindUsers(c *gin.Context) {
	var users []models.User

	page := libs.PG.With(models.DB.Model(models.User{}).Preload(clause.Associations)).Request(c.Request).Cache("users").Response(&users)

	c.JSON(http.StatusOK, libs.JSONResult{
		Message: "Users found successfully",
		Data:    users,
		Success: true,
		Pagination: &libs.Pagination{
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

func FindUser(c *gin.Context) {
	// Get model if exist
	var user models.User
	if err := models.DB.Where("id = ?", c.Param("id")).First(&user).Error; err != nil {
		c.JSON(http.StatusBadRequest, libs.JSONResult{Message: "Record not found!", Success: false})
		return
	}
	c.JSON(http.StatusOK, libs.JSONResult{
		Message: "User found successfully",
		Data:    user,
		Success: true,
	})
}

// RegisterUser godoc
// @Summary     Register User
// @Description Register User
// @Tags        Auth
// @Accept      json
// @Produce     json
// @Param request body CreateUserInput true "query params"
// @Success     200 {object} libs.JSONResult{message=string,data=models.User,success=bool}
// @Router      /auth/register [post]
func CreateUser(c *gin.Context) {
	// Validate input
	var input CreateUserInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, libs.JSONResult{Message: err.Error(), Success: false})
		return
	}

	hashedPassword, _ := HashPassword(input.Password)

	user := models.User{Name: input.Name, Email: input.Email, Password: hashedPassword}
	// check user email in database
	if err := models.DB.Where("email = ?", input.Email).First(&user).Error; err == nil {
		c.JSON(http.StatusBadRequest, libs.JSONResult{Message: "Email already exists!", Success: false})
		return
	}

	// Create user
	models.DB.Create(&user)

	c.JSON(http.StatusOK, libs.JSONResult{
		Message: "User created successfully",
		Data:    user,
		Success: true,
	})
}

func UpdateUser(c *gin.Context) {
	// Get model if exist
	var user models.User

	if err := models.DB.Where("id = ?", c.Param("id")).First(&user).Error; err != nil {
		c.JSON(http.StatusBadRequest, libs.JSONResult{Message: "Record not found!", Success: false})
		return
	}

	// Validate input
	var input UpdateUserInput
	if err := c.MustBindWith(&input, binding.Form); err != nil {
		c.JSON(http.StatusBadRequest, libs.JSONResult{Message: err.Error(), Success: false})
		return
	}

	file, _ := c.FormFile("profile_pic")

	var fileName string

	if file != nil {
		// accept only jpeg, png, jpg image
		if !(filepath.Ext(file.Filename) == ".jpg" || filepath.Ext(file.Filename) == ".png" || filepath.Ext(file.Filename) == ".jpeg") {
			c.JSON(http.StatusBadRequest, libs.JSONResult{Message: "Invalid image format!", Success: false})
			return
		}

		multiFile, _ := file.Open()

		// reduce uploaded image size to 1MB
		img, _, err := image.Decode(multiFile)

		if err != nil {
			c.JSON(http.StatusBadRequest, libs.JSONResult{Message: "Invalid image format!", Success: false})
			return
		}

		dstImage128 := imaging.Resize(img, 500, 500, imaging.CatmullRom)

		// generate uuid for file name
		fileName = shortuuid.New() + filepath.Ext(file.Filename)

		// Upload file
		if err := imaging.Save(dstImage128, "./uploads/"+fileName); err != nil {
			c.JSON(http.StatusBadRequest, libs.JSONResult{Message: err.Error(), Success: false})
			return
		}

	}

	if err := models.DB.Model(&user).Clauses(clause.Returning{}).Where("id = ?", c.Param("id")).Updates(
		models.User{
			Name:       input.Name,
			Email:      input.Email,
			Password:   input.Password,
			ProfilePic: fileName,
		}).Error; err != nil {
		c.JSON(http.StatusBadRequest, libs.JSONResult{Message: err.Error(), Success: false})
		return
	}

	c.JSON(http.StatusOK, libs.JSONResult{
		Message: "User updated successfully",
		Data:    user,
		Success: true,
	})
}

func DeleteUser(c *gin.Context) {
	// Get model if exist
	var user models.User
	if err := models.DB.Where("id = ?", c.Param("id")).First(&user).Error; err != nil {
		c.JSON(http.StatusBadRequest, libs.JSONResult{Message: "Record not found!", Success: false})
		return
	}
	models.DB.Delete(&user)

	c.JSON(http.StatusOK, libs.JSONResult{
		Message: "User deleted successfully",
		Data:    user,
		Success: true,
	})
}
