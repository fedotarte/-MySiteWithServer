package mysitewithserver

import (
	//	"MySiteWithServer/dbservice"
	"encoding/json"
	"fmt"
	"google.golang.org/appengine"
	"log"
	"net/http"
)


type RequestSubscribe struct {
	Email   string `json:"email"`

}

type RequestMessage struct {
	Client  string `json:"client"`
	Email   string `json:"email"`
	Phone   string `json:"phone"`
	Message string `json:"message"`
}

type CourseCatalog struct {
	CourseId string
	CourseDescription string
}

var bodym string
//var book = dbservice.Book{"asas","asasas","asas", 1}


func init() {
	http.HandleFunc("/requestSubscribe", requestSubscribeHandler)
	http.HandleFunc("/sendMessage", sendMessageHandler)
	http.HandleFunc("/getCatalog", requestCatalogHandler)
	appengine.Main() // Starts the server to receive requests

}



func requestSubscribeHandler(w http.ResponseWriter, r *http.Request) {
	var rs RequestSubscribe
	rs.Email = r.FormValue("email")
	var subscriberEmail = rs.Email
	//fmt.Fprintln(w, "Hello from the Go app")
	log.Println(subscriberEmail)
}

//#TODO how to get Catalog as a value and send it as a respobse
func requestCatalogHandler(w http.ResponseWriter, r *http.Request){
	jData := CourseCatalog{CourseId:"test", CourseDescription:"secTest"}
	response, err := json.Marshal(jData)
	if err!=nil {
		panic(err)
	}
	w.Header().Set("Content-Type", "application/json")
	fmt.Print(response)


}


func sendMessageHandler(rw http.ResponseWriter, req *http.Request) {
	var rm RequestMessage
	json.NewDecoder(req.Body).Decode(&rm)

	log.Printf("here the data:", "%s and %s and %s and %s", rm.Client, rm.Email, rm.Phone, rm.Message)
	bodym = rm.Client + rm.Email + rm.Phone + rm.Message
	log.Println("Here the data: " + bodym)
	if len(bodym)<1 {
		rm.Client = req.FormValue("client")
		log.Println(rm.Client)

	}


	//fmt.Println(rm.Client, rm.Email, rm.Phone, rm.Request)
	//fmt.Fprintf(rw, "%s and %s and %s and %s", rm.Client, rm.Email, rm.Phone, rm.Request)

}



//func getJsonResponse(catalog CourseCatalog)  {
//	jsonResp, err := json.Marshal(catalog)
//	if err != nil {
//		panic(err)
//	}
//}
