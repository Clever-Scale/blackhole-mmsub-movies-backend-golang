package models

import (
	"time"

	"gorm.io/gorm"
)

type MovieSource struct {
	ID         uint           `json:"id" gorm:"primary_key"`
	Name       string         `json:"name"`
	Link       string         `json:"link"`
	Resolution string         `json:"resolution"`
	MovieID    uint           `json:"movie_id"`
	CreatedAt  time.Time      `json:"created_at"`
	UpdatedAt  time.Time      `json:"updated_at"`
	DeletedAt  gorm.DeletedAt `json:"deleted_at" gorm:"index"`
}
