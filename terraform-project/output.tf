output "web_1_public_ip" {
  description = "Public IP of EC2 instance 1"
  value       = aws_instance.web_1.public_ip
}


output "web_2_public_ip" {
  description = "Public IP of EC2 instance 2"
  value       = aws_instance.web_2.public_ip
}