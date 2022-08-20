package models

import (
	"time"

	"gorm.io/gorm"
)

type Genre struct {
	ID         uint           `json:"id" gorm:"primary_key"`
	Title      string         `json:"title" gorm:"not null"`
	Slug       string         `json:"slug" gorm:"not null unique index"`
	Movies     []Movie        `json:"-" gorm:"many2many:movie_genres;"`
	MovieCount int            `json:"movie_count"`
	CreatedAt  time.Time      `json:"created_at"`
	UpdatedAt  time.Time      `json:"updated_at"`
	DeletedAt  gorm.DeletedAt `json:"deleted_at" gorm:"index"`
}
