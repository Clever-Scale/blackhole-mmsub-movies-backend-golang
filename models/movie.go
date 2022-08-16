package models

import (
	"time"

	"gorm.io/gorm"
)

type Movie struct {
	ID            uint           `json:"id" gorm:"primary_key"`
	Title         string         `json:"title" gorm:"not null"`
	Description   string         `json:"description" gorm:"not null"`
	StreamingTime uint           `json:"streaming_time"`
	ParentID      uint           `json:"parent_id" gorm:"null"`
	ImDbID        uint           `json:"imdb_id"`
	ReleasedAt    time.Time      `json:"release_date"`
	Genres        []Genre        `json:"genres" gorm:"many2many:movie_genres;"`
	MovieSource   []MovieSource  `json:"movie_sources" gorm:"foreignKey:MovieID"`
	CreatedAt     time.Time      `json:"created_at"`
	UpdatedAt     time.Time      `json:"updated_at"`
	DeletedAt     gorm.DeletedAt `json:"deleted_at" gorm:"index"`
}
