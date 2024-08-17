package controllers

import (
	"fmt"
	"os/exec"
	"strings"

	"github.com/gofiber/fiber/v2"
)

func GetipAddress(c *fiber.Ctx) error {
	clientIP := c.IP()
	ipParts := strings.Split(clientIP, ".")
	subnet := fmt.Sprintf("%s.%s.%s", ipParts[0], ipParts[1], ipParts[2])

	connectedDevices := scanSubnet(subnet)
	return c.JSON(connectedDevices)
}

func scanSubnet(subnet string) []string {
	var connectedDevices []string

	for i := 1; i <= 255; i++ {
		ip := fmt.Sprintf("%s.%d", subnet, i)

		cmd := exec.Command("arp", "-a", ip)
		output, err := cmd.Output()
		if err != nil {
			fmt.Println("Error executing arp command:", err)
			continue
		}

		outputStr := string(output)
		lines := strings.Split(outputStr, "\n")
		for _, line := range lines {
			if strings.Contains(line, ip) {
				fields := strings.Fields(line)
				if len(fields) >= 2 {
					macAddress := fields[1]
					fmt.Printf("IP: %s, MAC: %s\n", ip, macAddress)
					connectedDevices = append(connectedDevices, fmt.Sprintf("IP: %s, MAC: %s", ip, macAddress))
				}
			}
		}
	}

	return connectedDevices
}
