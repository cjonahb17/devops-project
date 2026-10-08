resource "aws_vpc" "demovpc" {
  cidr_block       = "11.0.0.0/16"
  instance_tenancy = "default"

  tags = {
    Name = "projectvpc"
  }
}
resource "aws_subnet" "pub-sub1" {
  vpc_id                  = aws_vpc.demovpc.id
  cidr_block              = "11.0.1.0/24"
  availability_zone       = "us-east-1a" 
  map_public_ip_on_launch = true
  tags = {
    Name = "public subnet 1"
  }
}

resource "aws_subnet" "pub-sub2" {
  vpc_id                  = aws_vpc.demovpc.id
  cidr_block              = "11.0.2.0/24"
  availability_zone       = "us-east-1b"
  map_public_ip_on_launch = true
  tags = {
    Name = "public subnet 2"
  }
}

resource "aws_internet_gateway" "igw" {
  vpc_id = aws_vpc.demovpc.id

  tags = {
    Name = "project-igw"
  }
}
resource "aws_route_table" "route-table" {
  vpc_id = aws_vpc.demovpc.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.igw.id
  }

  tags = {
    Name = "project-rt"
  }
}

resource "aws_route_table_association" "rt-association-1" {
  subnet_id      = aws_subnet.pub-sub1.id
  route_table_id = aws_route_table.route-table.id
}

resource "aws_route_table_association" "rt-association-2" {
  subnet_id      = aws_subnet.pub-sub2.id
  route_table_id = aws_route_table.route-table.id
}