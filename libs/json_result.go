package libs

type JSONResult struct {
	Success    bool        `json:"success,omitempty" `
	Message    string      `json:"message,omitempty" `
	Data       interface{} `json:"data,omitempty"`
	Pagination *Pagination `json:"pagination,omitempty"`
}
