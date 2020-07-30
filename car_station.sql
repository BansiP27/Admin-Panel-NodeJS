-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 30, 2020 at 05:11 AM
-- Server version: 10.4.6-MariaDB
-- PHP Version: 7.3.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `car_station`
--

-- --------------------------------------------------------

--
-- Table structure for table `tbl_area`
--

CREATE TABLE `tbl_area` (
  `id` int(11) NOT NULL,
  `area_name` varchar(100) NOT NULL,
  `city_name` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_area`
--

INSERT INTO `tbl_area` (`id`, `area_name`, `city_name`) VALUES
(4, 'Juhu', 'Mumbai'),
(5, 'Thaltej', 'Ahmedabad'),
(6, 'Sarkhej', 'Ahmedabad');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_booking_master`
--

CREATE TABLE `tbl_booking_master` (
  `booking_id` int(11) NOT NULL,
  `booking_date` date NOT NULL,
  `booking_status` varchar(50) NOT NULL,
  `service_master_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `service_charge` int(11) NOT NULL,
  `service_date_time` varchar(50) NOT NULL,
  `service_address` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_booking_master`
--

INSERT INTO `tbl_booking_master` (`booking_id`, `booking_date`, `booking_status`, `service_master_id`, `user_id`, `service_charge`, `service_date_time`, `service_address`) VALUES
(1, '2018-12-18', '', 0, 1, 0, '', ''),
(2, '2018-12-18', '', 0, 1, 0, '', '');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_category`
--

CREATE TABLE `tbl_category` (
  `id` int(11) NOT NULL,
  `category_name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_category`
--

INSERT INTO `tbl_category` (`id`, `category_name`) VALUES
(26, 'Laptop'),
(27, 'P.C.'),
(28, 'T.V.'),
(29, 'Mobile');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_city`
--

CREATE TABLE `tbl_city` (
  `id` int(11) NOT NULL,
  `city_name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_city`
--

INSERT INTO `tbl_city` (`id`, `city_name`) VALUES
(4, 'Mumbai'),
(5, 'Ahmedabad'),
(6, 'Banglore');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_contactus`
--

CREATE TABLE `tbl_contactus` (
  `contact_id` int(11) NOT NULL,
  `contact_name` varchar(100) NOT NULL,
  `contact_email` varchar(150) NOT NULL,
  `contact_mobile` bigint(12) NOT NULL,
  `contact_message` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_contactus`
--

INSERT INTO `tbl_contactus` (`contact_id`, `contact_name`, `contact_email`, `contact_mobile`, `contact_message`) VALUES
(1, 'lalit', 'lalit@gmail.com', 8765468908, 'good admin panel'),
(2, 'lalit', 'lalit@gmail.com', 8765468908, 'good admin panel'),
(3, 'lalit', 'lalit@gmail.com', 8765468908, 'good admin panel');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_faq`
--

CREATE TABLE `tbl_faq` (
  `id` int(11) NOT NULL,
  `faq_question` varchar(500) NOT NULL,
  `faq_answer` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_faq`
--

INSERT INTO `tbl_faq` (`id`, `faq_question`, `faq_answer`) VALUES
(8, 'Question 1', 'Answer 1'),
(9, 'Question 2', 'Answer 2');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_feedback`
--

CREATE TABLE `tbl_feedback` (
  `id` int(11) NOT NULL,
  `feedback_message` varchar(300) NOT NULL,
  `feedback_date` varchar(50) NOT NULL,
  `user_rating` float NOT NULL,
  `user_name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_feedback`
--

INSERT INTO `tbl_feedback` (`id`, `feedback_message`, `feedback_date`, `user_rating`, `user_name`) VALUES
(11, 'Good Service', '4/7/2020, 10:30:04 AM', 5, 'Lay'),
(12, 'Bad Service', '4/7/2020, 10:30:17 AM', 1, 'Bansi');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_product`
--

CREATE TABLE `tbl_product` (
  `id` int(11) NOT NULL,
  `product_name` varchar(25) NOT NULL,
  `product_description` varchar(300) NOT NULL,
  `product_price` int(10) NOT NULL,
  `product_image` varchar(150) NOT NULL DEFAULT '',
  `sub_category_name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_product`
--

INSERT INTO `tbl_product` (`id`, `product_name`, `product_description`, `product_price`, `product_image`, `sub_category_name`) VALUES
(14, 'iPhone 11 PRO', 'A smart phone.', 93900, 'vinoth-ragunathan-zSXMNCf4szU-unsplash.jpg', 'Smart Phone'),
(15, 'OMEN', 'A gaming laptop.', 80000, 'wp2513495-hp-omen-wallpapers.jpg', 'Gaming Laptop');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_service_master`
--

CREATE TABLE `tbl_service_master` (
  `service_master_id` int(11) NOT NULL,
  `service_master_name` varchar(100) NOT NULL,
  `service_master_details` varchar(150) NOT NULL,
  `service_master_price` int(11) NOT NULL,
  `service_master_image` varchar(150) NOT NULL,
  `sub_category_id` int(11) NOT NULL,
  `is_active` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_service_master`
--

INSERT INTO `tbl_service_master` (`service_master_id`, `service_master_name`, `service_master_details`, `service_master_price`, `service_master_image`, `sub_category_id`, `is_active`) VALUES
(1, 'Kurti', 'new green kurti', 1000, 'upload/women1.jpg', 2, 0),
(2, 'Kurti Orange', 'new orange kurti design', 1200, 'upload/women2.jpg', 2, 0),
(3, 'kurti Maroon', 'new Maroon kurti design', 1500, 'upload/women3.jpg', 2, 0),
(4, 'kurti Grey', 'new grey kurti design', 1700, 'upload/women4.jpg', 2, 0),
(5, 'Maniac Men Black Checked Round Neck T-shirt\r\nMaroon', 'Maniac Men Black Checked Round Neck T-shirt\r\n', 500, 'upload/1.jpg', 4, 0),
(6, 'HRX by Hrithik Roshan Men Teal Blue Striped T-shirt\r\n', 'HRX by Hrithik Roshan Men Teal Blue Striped T-shirt\r\n', 500, 'upload/2.jpg', 4, 0);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_service_photo`
--

CREATE TABLE `tbl_service_photo` (
  `service_photo_id` int(11) NOT NULL,
  `service_master_id` int(11) NOT NULL,
  `photo_path` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_subcategory`
--

CREATE TABLE `tbl_subcategory` (
  `id` int(11) NOT NULL,
  `sub_category_name` varchar(100) NOT NULL,
  `category_name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_subcategory`
--

INSERT INTO `tbl_subcategory` (`id`, `sub_category_name`, `category_name`) VALUES
(32, 'Gaming Laptop', 'Laptop'),
(33, 'Gaming P.C.', 'P.C.'),
(34, 'Smart Phone', 'Mobile'),
(35, 'Smart T.V.', 'T.V.');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_user_master`
--

CREATE TABLE `tbl_user_master` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `user_gender` varchar(30) NOT NULL,
  `email` varchar(200) NOT NULL,
  `phone` bigint(12) NOT NULL,
  `password` varchar(50) NOT NULL,
  `user_address` varchar(250) NOT NULL,
  `area_id` int(11) NOT NULL,
  `filename` varchar(100) NOT NULL DEFAULT 'noimage.png',
  `mobile_otp_number` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_user_master`
--

INSERT INTO `tbl_user_master` (`id`, `name`, `user_gender`, `email`, `phone`, `password`, `user_address`, `area_id`, `filename`, `mobile_otp_number`) VALUES
(26, 'Bansi S. Patel', '', 'bansip1997@gmail.com', 8460724972, '1111', '', 0, '1144487-man-of-steel-superman.jpg', 0),
(27, 'Bansi S. Patel', '', 'b@g', 8460724972, '1111', '', 0, '1.jpg', 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tbl_area`
--
ALTER TABLE `tbl_area`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_booking_master`
--
ALTER TABLE `tbl_booking_master`
  ADD PRIMARY KEY (`booking_id`);

--
-- Indexes for table `tbl_category`
--
ALTER TABLE `tbl_category`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_city`
--
ALTER TABLE `tbl_city`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_contactus`
--
ALTER TABLE `tbl_contactus`
  ADD PRIMARY KEY (`contact_id`);

--
-- Indexes for table `tbl_faq`
--
ALTER TABLE `tbl_faq`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_feedback`
--
ALTER TABLE `tbl_feedback`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_product`
--
ALTER TABLE `tbl_product`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_service_master`
--
ALTER TABLE `tbl_service_master`
  ADD PRIMARY KEY (`service_master_id`);

--
-- Indexes for table `tbl_service_photo`
--
ALTER TABLE `tbl_service_photo`
  ADD PRIMARY KEY (`service_photo_id`);

--
-- Indexes for table `tbl_subcategory`
--
ALTER TABLE `tbl_subcategory`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_user_master`
--
ALTER TABLE `tbl_user_master`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tbl_area`
--
ALTER TABLE `tbl_area`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `tbl_booking_master`
--
ALTER TABLE `tbl_booking_master`
  MODIFY `booking_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `tbl_category`
--
ALTER TABLE `tbl_category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT for table `tbl_city`
--
ALTER TABLE `tbl_city`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `tbl_contactus`
--
ALTER TABLE `tbl_contactus`
  MODIFY `contact_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `tbl_faq`
--
ALTER TABLE `tbl_faq`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `tbl_feedback`
--
ALTER TABLE `tbl_feedback`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `tbl_product`
--
ALTER TABLE `tbl_product`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `tbl_service_master`
--
ALTER TABLE `tbl_service_master`
  MODIFY `service_master_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `tbl_service_photo`
--
ALTER TABLE `tbl_service_photo`
  MODIFY `service_photo_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `tbl_subcategory`
--
ALTER TABLE `tbl_subcategory`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT for table `tbl_user_master`
--
ALTER TABLE `tbl_user_master`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
