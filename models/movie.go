package models

import (
	"time"

	"gorm.io/gorm"
)

type Movie struct {
	ID            uint      `json:"id" gorm:"primary_key"`
	Title         string    `json:"title" gorm:"not null"`
	Description   string    `json:"description" gorm:"not null"`
	StreamingTime uint      `json:"streaming_time"`
	ParentID      uint      `json:"parent_id" gorm:"null"`
	ImDbID        uint      `json:"imdb_id"`
	ReleasedAt    time.Time `json:"release_date"`
	gorm.Model
}
