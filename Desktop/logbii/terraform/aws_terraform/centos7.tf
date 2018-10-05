provider "aws" {
    access_key = "AKIAIZA2ATFUTF3A6QMA"
    secret_key = "Qox2IZ8q/1ht2cvvNpJNQk/ufy2i2pmM0yWHPtqy"
    region = "ap-northeast-1"
}

resource "aws_instance" "example" {
    ami = "ami-571e3c30"
    instance_type = "t2.micro"
    key_name = "test_key_pair"
    #security_groups = ["${aws_security_group.centos7_test.name}"]
}

/*
resource "aws_security_group" "centos7_test" {
    name = "centos7_test"
    description = "Used in the terraform"

    # SSH access from anywhere
    ingress {
        from_port = 22
        to_port = 22
        protocol = "tcp"
        cidr_blocks = ["0.0.0.0/0"]

    }

    egress {
        from_port = 0
        to_port = 0
        protocol = "-1"
        cidr_blocks = ["0.0.0.0/0"]
    }
}
*/