package controllers

import (
	"errors"
	"net/http"
	"strings"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v4"
	"github.com/rahmanfadhil/gin-bookstore/models"
)

type LoginUserInput struct {
	Email    string `json:"email" binding:"required"`
	Password string `json:"password" binding:"required"`
}

type LoginSuccess struct {
	User  models.User `json:"user"`
	Token string      `json:"token"`
}

type Claims struct {
	ID int `json:"id"`
	jwt.RegisteredClaims
}

var secret = []byte("gin-bookstore")

func LoginUser(c *gin.Context) {
	// Validate input
	var input LoginUserInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"data": err})
		return
	}
	// Check user in database
	user := models.User{Email: input.Email, Password: input.Password}
	if err := models.DB.Find(&user, "email = ? AND password = ?", input.Email, input.Password).First(&user).Error; err != nil {
		c.JSON(http.StatusFound, gin.H{"data": "Credential wrong!"})
		return
	}
	// Generate token
	token, _ := GenerateToken(int(user.ID))
	c.JSON(http.StatusOK, gin.H{"success": true, "data": &LoginSuccess{user, token}})
}

func GenerateToken(id int) (string, error) {
	const TokenExpireDuration = time.Hour * 24 * 7
	// Create our own statement
	c := Claims{int(id), jwt.RegisteredClaims{
		ExpiresAt: jwt.NewNumericDate(time.Now().Add(TokenExpireDuration)),
		Issuer:    "gin-bookstore",
	}}
	// Creates a signed object using the specified signing method
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, c)
	// Use the specified secret signature and obtain the complete encoded string token
	return token.SignedString(secret)
}

// ParseToken parsing JWT
func ParseToken(tokenString string) (*Claims, error) {
	// Parse token
	token, err := jwt.ParseWithClaims(tokenString, &Claims{}, func(token *jwt.Token) (i interface{}, err error) {
		return secret, nil
	})
	if err != nil {
		return nil, err
	}
	if claims, ok := token.Claims.(*Claims); ok && token.Valid { // Verification token
		return claims, nil
	}
	return nil, errors.New("invalid token")
}

// JWT auth middleware authentication middleware based on JWT
func JWTAuthMiddleware() func(c *gin.Context) {
	return func(c *gin.Context) {
		// There are three ways for the client to carry a Token. 1 Put in request header 2 Put in the request body 3 Put in URI
		// Here, it is assumed that the Token is placed in the Authorization of the Header and starts with Bearer
		// The specific implementation method here should be determined according to your actual business situation
		authHeader := c.Request.Header.Get("Authorization")
		if authHeader == "" {
			c.JSON(http.StatusOK, gin.H{
				"code": 2003,
				"msg":  "Request header auth Empty",
			})
			c.Abort()
			return
		}
		// Split by space
		parts := strings.SplitN(authHeader, " ", 2)
		if !(len(parts) == 2 && parts[0] == "Bearer") {
			c.JSON(http.StatusOK, gin.H{
				"code": 2004,
				"msg":  "Request header auth Incorrect format",
			})
			c.Abort()
			return
		}
		// parts[1] is the obtained tokenString. We use the previously defined function to parse JWT to parse it
		mc, err := ParseToken(parts[1])
		if err != nil {
			c.JSON(http.StatusOK, gin.H{
				"code": 2005,
				"msg":  "invalid Token",
			})
			c.Abort()
			return
		}
		// Save the currently requested username information to the requested context c
		c.Set("id", mc.ID)
		c.Next() // Subsequent processing functions can use c.Get("username") to obtain the currently requested user information
	}
}
