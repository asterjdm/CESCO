-- phpMyAdmin SQL Dump
-- version 4.6.6deb4+deb9u2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jan 21, 2024 at 11:31 AM
-- Server version: 10.1.48-MariaDB-0+deb9u2
-- PHP Version: 5.6.40-68+freexian9.0.1+php+1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cescoDB`
--

-- --------------------------------------------------------

--
-- Table structure for table `cesco_posts`
--

CREATE TABLE `cesco_posts` (
  `ID` int(11) NOT NULL,
  `content` longtext NOT NULL,
  `date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `USER_FK` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cesco_posts`
--
ALTER TABLE `cesco_posts`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cesco_posts`
--
ALTER TABLE `cesco_posts`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=590;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

--
-- Table structure for table `cesco_users`
--

CREATE TABLE `cesco_users` (
  `ID` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `passwd` varchar(255) NOT NULL,
  `grade` varchar(20) NOT NULL DEFAULT 'user',
  `profile_picture` varchar(255) DEFAULT 'https://rmbi.ch/cesco/images/example.png'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cesco_users`
--
ALTER TABLE `cesco_users`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cesco_users`
--
ALTER TABLE `cesco_users`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=265;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

--
-- Table structure for table `cesco_comments`
--

CREATE TABLE `cesco_comments` (
  `COMMENT_ID` int(11) NOT NULL,
  `USER_FK` int(11) NOT NULL,
  `content` varchar(1000) NOT NULL,
  `POST_FK` int(11) NOT NULL,
  `datetime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cesco_comments`
--
ALTER TABLE `cesco_comments`
  ADD PRIMARY KEY (`COMMENT_ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cesco_comments`
--
ALTER TABLE `cesco_comments`
  MODIFY `COMMENT_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=178;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

--
-- Table structure for table `cesco_votes`
--

CREATE TABLE `cesco_votes` (
  `vote_type` int(11) NOT NULL,
  `USER_FK` int(11) NOT NULL,
  `POST_FK` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

--
-- Table structure for table `cesco_reports`
--

CREATE TABLE `cesco_reports` (
  `POST_FK` int(11) NOT NULL,
  `reason` varchar(500) NOT NULL,
  `datetime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `count` int(11) NOT NULL,
  `ID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cesco_reports`
--
ALTER TABLE `cesco_reports`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cesco_reports`
--
ALTER TABLE `cesco_reports`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

--
-- Table structure for table `cesco_followers`
--

CREATE TABLE `cesco_followers` (
  `follower_id` int(11) NOT NULL,
  `followed_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;