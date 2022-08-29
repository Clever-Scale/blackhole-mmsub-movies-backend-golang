package models

import (
	"time"

	"gorm.io/gorm"
)

type Genre struct {
	ID         uint           `json:"id,omitempty" gorm:"primary_key"`
	Title      string         `json:"title,omitempty" gorm:"not null"`
	Slug       string         `json:"slug,omitempty" gorm:"not null unique index"`
	Movies     []Movie        `json:"-" gorm:"many2many:movie_genres;"`
	MovieCount int            `json:"movie_count,omitempty"`
	CreatedAt  time.Time      `json:"created_at,omitempty"`
	UpdatedAt  time.Time      `json:"updated_at,omitempty"`
	DeletedAt  gorm.DeletedAt `json:"deleted_at,omitempty" gorm:"index"`
}
