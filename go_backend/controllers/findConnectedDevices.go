package controllers

import (
	"fmt"
	"os/exec"
	"strings"

	"github.com/gofiber/fiber/v2"
)

func GetConnectedDevices(c *fiber.Ctx) error {
	clientIP := c.IP()
	ipParts := strings.Split(clientIP, ".")
	subnet := fmt.Sprintf("%s.%s.%s", ipParts[0], ipParts[1], ipParts[2])

	connectedDevices := scanSubnet(subnet)
	return c.JSON(connectedDevices)
}

func scanSubnet(subnet string) []map[string]string {
	var connectedDevices []map[string]string

	for i := 1; i <= 255; i++ {
		ip := fmt.Sprintf("%s.%d", subnet, i)
		deviceInfo:=map[string]string{"IP":ip}

		pingErr:=pingDevice(ip)
		if pingErr==nil{
			deviceInfo["Status"]="On"
		}else{
			deviceInfo["Status"]="Unknown"
		}

		macAddress:=getMacAddress(ip)
		if macAddress!=""{
			deviceInfo["MAC"]=macAddress
		}

		if macAddress!=""{
			connectedDevices=append(connectedDevices, deviceInfo)
		}
	}

	return connectedDevices
}

func pingDevice(ip string)error{
	cmd:=exec.Command("ping","-c","1","-W","1",ip)
	return cmd.Run()
}

func getMacAddress(ip string)string{
	cmd := exec.Command("arp", "-a", ip)
	output, err := cmd.Output()
	if err != nil {
		fmt.Println("Error executing arp command:", err)
		return ""
	}

	outputStr := string(output)
	lines := strings.Split(outputStr, "\n")
	for _, line := range lines {
		if strings.Contains(line, ip) {
			fields := strings.Fields(line)
			if len(fields) >= 2 {
				return fields[1]
				}
		}
	}
	return ""
}

