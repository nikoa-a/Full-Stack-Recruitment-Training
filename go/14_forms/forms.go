package main

import (
	"html/template"
	"net/http"
)

type Item struct {
	Itemtype string
	Count    string
	Price    string
}

type ShoppingData struct {
	Shoppinglist string
	Items        []Item
	Success      bool
}

func main() {
	data := ShoppingData{"My List", []Item{}, false}
	tmpl := template.Must(template.ParseFiles("layout.html"))

	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		if r.Method != http.MethodPost {
			tmpl.Execute(w, nil)
			data.Success = true
			return
		}
		details := Item{
			Itemtype: r.FormValue("itemtype"),
			Count:    r.FormValue("count"),
			Price:    r.FormValue("price"),
		}
		data.Items = append(data.Items, details)
		tmpl.Execute(w, data)
		data.Success = false
	})
	http.ListenAndServe(":3000", nil)
}
