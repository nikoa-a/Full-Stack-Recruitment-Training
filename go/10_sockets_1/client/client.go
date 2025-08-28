package main

import (
	"bufio"
	"fmt"
	"net"
	"os"
)

func main() {
	conn, _ := net.Dial("tcp", "127.0.0.1:5000")

	reader := bufio.NewReader(os.Stdin)
	fmt.Print("Message to server:")
	text, _ := reader.ReadString('\n')
	fmt.Fprintf(conn, "%s", text+"\n")
	message, _ := bufio.NewReader(conn).ReadString('\n')
	fmt.Print("Message from server:", message)
}
