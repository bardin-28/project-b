provider "aws" {
  region = "eu-central-1"
}

resource "aws_instance" "vps" {
  ami           = "ami-08ec94f928cf25a9d"
  instance_type = "t2.micro"
  key_name      = "mac"

  user_data = <<-EOF
    #!/bin/bash
    sudo yum update -y
    sudo yum install -y docker git

    # Start Docker service
    sudo service docker start
    sudo usermod -aG docker ec2-user

    # Install Docker Compose
    sudo curl -L "https://github.com/docker/compose/releases/download/v2.3.3/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    sudo chmod +x /usr/local/bin/docker-compose

    # Clone your repository
    git clone https://github.com/bardin-28/project-b /home/ec2-user/project

    # Create .env file with environment variables
    echo "STAGE_ENV='${var.STAGE_ENV}'" > /home/ec2-user/project/.env

    # Change to the project directory and start Docker Compose
    cd /home/ec2-user/project
    sudo docker-compose up -d
  EOF

  tags = {
    Name = "Project-B"
  }

  security_groups = [aws_security_group.vps_sg.name]
}

resource "aws_security_group" "vps_sg" {
  name        = "vps_sg"
  description = "Allow ports for Docker services"

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 5432
    to_port     = 5432
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 8081
    to_port     = 8081
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 9090
    to_port     = 9090
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 9187
    to_port     = 9187
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 6379
    to_port     = 6379
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

variable "STAGE_ENV" {
  description = "Stage environment variable"
  type        = string
}

output "instance_public_ip" {
  value = aws_instance.vps.public_ip
}
