variable "access_key" {}
variable "secret_key" {}
variable "region" {
    default = "a-northeast-1"
}

provider "aws" {
    access_key = "${var.access_key}" 
   secret_key = "${var.secret_key}"
   region = "${var.region}"
}

resource "aws_vpc" "myVPC" {
    cidr_block = "10.1.0.0/16"
    instance_tenancy = "default"
    enable_dns_support = "true"
    enable_dns_hostnames = "false"
    tags {
        Name = "myVPC"
    }
}

resource "aws_internet_gateway" "myGW" {
    vpc_id = "${aws_vpc.myVPC.id}"
}











