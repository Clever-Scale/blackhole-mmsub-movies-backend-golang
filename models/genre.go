package models

import (
	"time"

	"gorm.io/gorm"
)

type Genre struct {
	ID        uint           `json:"id" gorm:"primary_key"`
	Title     string         `json:"title" gorm:"not null"`
	Movies    []Movie        `json:"movies" gorm:"many2many:movie_genres;"`
	CreatedAt time.Time      `json:"created_at"`
	UpdatedAt time.Time      `json:"updated_at"`
	DeletedAt gorm.DeletedAt `json:"deleted_at" gorm:"index"`
}
