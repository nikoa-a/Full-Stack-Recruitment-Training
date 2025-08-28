package main

import (
	"html/template"
	"net/http"
)

type Item struct {
	itemType string
	count    int
	price    int
}

type ShoppingData struct {
	shoppingList string
	items        []Item
}

func main() {
	tmpl := template.Must(template.ParseFiles("layout.html"))
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		data := ShoppingData{
			shoppingList: "My List",
			items: []Item{
				{itemType: "Banana", count: 10, price: 10},
				{itemType: "Beer", count: 12, price: 12},
				{itemType: "Apple", count: 5, price: 10},
			},
		}
		tmpl.Execute(w, data)
	})
	http.ListenAndServe(":3000", nil)
}
