# OCRRecognitionBill

The application which I developed is a validation module for the Mall Coupon Management application. This module is developed for Sysberries located in Abu Dhabi which specializes in developing real-world IT solutions in the Middle East. It is a web application where the customers can enter their invoices to apply for coupons which can be used to avail discounts. The application uses Optical Character Recognition API to read the text content of the invoice image which is uploaded by the customer and it will compare this content with the data entered by the user. The information entered by the customer is invoice number, Invoice date, Invoice Amount, and Shop name. Depending upon the accuracy of data entered the application will assign a score in the range of 1 to 5.This score ease the process of validation for the coupon provider.It also provides validation to check for duplicate entries.

## Following are the Tools Used:

1.	Node JS
2.	Express 
3.	Multer
4.	EJS
5.	MySQL
6.	JavaScript
7.	Optical Recognition API (Google Cloud Vision API)

## Database Tables used:

1)bill_details

CREATE TABLE `bill_details` (
  `bill_id` int(11) NOT NULL AUTO_INCREMENT,
  `customer_bill_no` varchar(20) NOT NULL,
  `customer_name` varchar(45) NOT NULL,
  `bill_date` varchar(45) NOT NULL,
  `shop_name` varchar(45) NOT NULL,
  `bill_amount` int(11) NOT NULL,
  `bill_image` varchar(100) NOT NULL,
  `bill_creation_time` datetime NOT NULL,
  `bill_rating` int(11) NOT NULL,
  PRIMARY KEY (`bill_id`)
) ENGINE=InnoDB AUTO_INCREMENT=112 DEFAULT CHARSET=utf8mb4;

2) shops


CREATE TABLE `shops` (
  `shopid` int(11) NOT NULL,
  `shopname` varchar(45) NOT NULL,
  PRIMARY KEY (`shopid`,`shopname`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

## Sample Images:

<img src="https://user-images.githubusercontent.com/51241236/103434618-19caf180-4c2a-11eb-953a-c94193e94e0e.png" >
<img src="https://user-images.githubusercontent.com/51241236/103434592-ae811f80-4c29-11eb-8af0-acda699ac18c.png" >
<img src="https://user-images.githubusercontent.com/51241236/103434596-b9d44b00-4c29-11eb-8e95-fa4a0ac38036.png" >
<img src="https://user-images.githubusercontent.com/51241236/103434600-c2c51c80-4c29-11eb-8150-a4000fdf811f.png" >
<img src="https://user-images.githubusercontent.com/51241236/103434623-2a7b6780-4c2a-11eb-8112-1a80d7351fac.png" >


