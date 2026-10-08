resource "aws_security_group" "allow_tls" {
  name        = "allow_tls"
  description = "Allow TLS inbound traffic and all outbound traffic"
  vpc_id      = aws_vpc.demovpc.id

  tags = {
    Name = "project-SG"
  }
}

resource "aws_vpc_security_group_ingress_rule" "allow-http" {
  security_group_id = aws_security_group.allow_tls.id

  cidr_ipv4   = "0.0.0.0/0"
  from_port   = 80
  ip_protocol = "tcp"
  to_port     = 80
}
resource "aws_vpc_security_group_ingress_rule" "allow-ssh" {
  security_group_id = aws_security_group.allow_tls.id

  cidr_ipv4   = "0.0.0.0/0"
  from_port   = 22
  ip_protocol = "tcp"
  to_port     = 22
}

resource "aws_vpc_security_group_ingress_rule" "allow_https" {
  security_group_id = aws_security_group.allow_tls.id

  cidr_ipv4   = "0.0.0.0/0"
  from_port   = 443
  ip_protocol = "tcp"
  to_port     = 443
}

resource "aws_instance" "web_1" {
  ami           = "ami-0b6d9d3d33ba97d99" 
  instance_type = "t3.micro"
  key_name      = "jonahnew"

  subnet_id = aws_subnet.pub-sub1.id

  vpc_security_group_ids = [
    aws_security_group.allow_tls.id
  ]

 user_data = <<-EOF
  #!/bin/bash

  apt update -y
  apt install -y docker.io

  systemctl enable docker
  systemctl start docker

  usermod -aG docker ubuntu
EOF

  tags = {
    Name = "instance-1"
  }
}

resource "aws_instance" "web_2" {
  ami           = "ami-0b6d9d3d33ba97d99"
  instance_type = "t3.micro"
  key_name      = "jonahnew"

  subnet_id = aws_subnet.pub-sub2.id

  vpc_security_group_ids = [
    aws_security_group.allow_tls.id
  ]

  user_data = <<-EOF
  #!/bin/bash

  apt update -y
  apt install -y docker.io

  systemctl enable docker
  systemctl start docker

  usermod -aG docker ubuntu
EOF

  tags = {
    Name = "instance-2"
  }
}