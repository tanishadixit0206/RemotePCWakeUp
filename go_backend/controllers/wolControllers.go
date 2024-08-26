package controllers

import (
	"bytes"
	"fmt"
	"net"
	// "github.com/gofiber/fiber/v2"
	// "os/exec"

	// "github.com/sabhiram/go-wol/wol"
	// "github.com/starudream/wake-on-lan"
	// "github.com/starudream/wake-on-lan/wol"
)

func Wol(mac string)error {
	// var body RequestBody

	// if err := c.BodyParser(&body); err != nil {
	// 	return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
	// 		"error": "Cannot parse JSON",
	// 	})
	// }

	parsedMac, err := net.ParseMAC(mac)
	if err!=nil{
		return fmt.Errorf("invalid mac address:%v",err)
	}

	var packet bytes.Buffer
	packet.Write(bytes.Repeat([]byte{0xFF},6))

	// macbyte:=[]byte(mac)
	for i:=0;i<16;i++{
		packet.Write(parsedMac)
	}

	conn,err:=net.Dial("udp","255.255.255.255:9")
	if err!=nil{
		return fmt.Errorf("failed to dial udp:%v",err)
	}
	defer conn.Close()

	if _,err:=conn.Write(packet.Bytes()); err!=nil{
		return fmt.Errorf("failed to write packet over connection:%v",err)
	}

	return nil

	// err:=wol.Send("255.255.255.255","9",mac)
	// if(err!=nil){
	// 	return err
	// }
	// return nil

}

type RequestBody struct {
      Mac string `json:"mac"`
}