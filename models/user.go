package models

import (
	"time"

	"gorm.io/gorm"
)

type Role string

const (
	ADMIN Role = "admin"
	USER  Role = "user"
	GUEST Role = "guest"
)

type User struct {
	ID         uint           `json:"id" gorm:"primary_key"`
	Name       string         `json:"name"`
	Email      string         `json:"email" gorm:"unique_index"`
	Password   string         `json:"-"`
	ProfilePic string         `json:"profile_pic"`
	Role       Role           `json:"role"`
	CreatedAt  time.Time      `json:"created_at"`
	UpdatedAt  time.Time      `json:"updated_at"`
	DeletedAt  gorm.DeletedAt `json:"deleted_at" gorm:"index"`
}
