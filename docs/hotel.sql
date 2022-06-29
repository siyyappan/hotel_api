-- phpMyAdmin SQL Dump
-- version 4.7.9
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Jun 29, 2022 at 10:53 AM
-- Server version: 5.7.21
-- PHP Version: 7.2.4
SET
  SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET
  AUTOCOMMIT = 0;
START TRANSACTION;
SET
  time_zone = "+00:00";
  /*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
  /*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
  /*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
  /*!40101 SET NAMES utf8mb4 */;
--
  -- Database: `hotel`
  --
  DROP DATABASE IF EXISTS `hotel`;
CREATE DATABASE IF NOT EXISTS `hotel` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `hotel`;
-- --------------------------------------------------------
  --
  -- Table structure for table `hotels`
  --
  DROP TABLE IF EXISTS `hotels`;
CREATE TABLE IF NOT EXISTS `hotels` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `name` varchar(500) NOT NULL,
    `sharing` int(11) NOT NULL DEFAULT '2',
    `checkout` int(11) NOT NULL DEFAULT '24',
    `rent` int(11) NOT NULL,
    `amenities` text NOT NULL,
    `discount` int(11) NOT NULL DEFAULT '0',
    `distance` int(11) NOT NULL,
    `rooms` int(11) NOT NULL,
    `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `modified` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`)
  ) ENGINE = InnoDB AUTO_INCREMENT = 12 DEFAULT CHARSET = latin1;
--
  -- Dumping data for table `hotels`
  --
INSERT INTO
  `hotels` (
    `id`,
    `name`,
    `sharing`,
    `checkout`,
    `rent`,
    `amenities`,
    `discount`,
    `distance`,
    `rooms`,
    `created`,
    `modified`
  )
VALUES
  (
    1,
    'Acrod',
    4,
    12,
    7000,
    'Wifi, Swimming pool, Including Breakfast, Including Lunch, Including Dinner, Bar',
    12,
    10,
    20,
    '2022-06-28 16:15:45',
    '2022-06-29 07:02:20'
  ),
  (
    2,
    'Taj',
    3,
    12,
    3500,
    'Wifi, Swimming pool, Including Breakfast, Including Lunch, Including Dinner, Bar, Gym',
    15,
    25,
    50,
    '2022-06-28 17:40:54',
    '2022-06-29 07:02:49'
  ),
  (
    9,
    'Le Royal',
    3,
    12,
    3500,
    'Wifi, Swimming pool, Including Breakfast, Including Dinner, Bar, Gym',
    8,
    50,
    15,
    '2022-06-28 17:40:54',
    '2022-06-29 07:02:49'
  ),
  (
    10,
    'Promenade',
    2,
    12,
    3000,
    'Wifi, Swimming pool, Including Breakfast, Bar, Gym',
    17,
    1,
    10,
    '2022-06-28 17:40:54',
    '2022-06-29 07:02:49'
  ),
  (
    11,
    'Villa Rock',
    3,
    12,
    5000,
    'Wifi, Swimming pool, Including Breakfast, Bar, Gym',
    14,
    8,
    10,
    '2022-06-28 17:40:54',
    '2022-06-29 07:02:49'
  );
COMMIT;
  /*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
  /*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
  /*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;