package libs

import (
	"time"

	"github.com/heinkozin/blackhole-mmsub-movies/models"
	cache "github.com/morkid/gocache-redis/v8"
	"github.com/morkid/paginate"
)

type Pagination struct {
	Page       int  `json:"page,omitempty"`
	PageSize   int  `json:"page_size,omitempty"`
	Total      int  `json:"total,omitempty"`
	TotalPages int  `json:"total_pages,omitempty"`
	MaxPage    int  `json:"max_page,omitempty"`
	Last       bool `json:"last,omitempty"`
	First      bool `json:"first,omitempty"`
	Visible    int  `json:"visible,omitempty"`
}

var adapterConfig = cache.RedisCacheConfig{
	Client:    models.RedisClient,
	ExpiresIn: time.Minute / 2,
}

var PG = paginate.New(&paginate.Config{
	DefaultSize:  20,
	SizeParams:   []string{"pageSize"},
	CacheAdapter: cache.NewRedisCache(adapterConfig),
})

// func Paginate(c *gin.Context) func(db *gorm.DB) *gorm.DB {
// 	return func(db *gorm.DB) *gorm.DB {
// 		page, _ := strconv.Atoi(c.Query("page"))
// 		if page == 0 {
// 			page = 1
// 		}

// 		pageSize, _ := strconv.Atoi(c.Query("pageSize"))
// 		if pageSize == 0 {
// 			pageSize = 10
// 		}
// 		switch {
// 		case pageSize > 100:
// 			pageSize = 100
// 		case pageSize <= 0:
// 			pageSize = 10
// 		}

// 		offset := (page - 1) * pageSize
// 		return db.Offset(offset).Limit(pageSize)
// 	}
// }
