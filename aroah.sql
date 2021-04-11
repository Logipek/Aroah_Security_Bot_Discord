-- phpMyAdmin SQL Dump
-- version 4.5.4.1deb2ubuntu2.1
-- http://www.phpmyadmin.net
--
-- Client :  localhost
-- Généré le :  Dim 11 Avril 2021 à 18:25
-- Version du serveur :  5.7.33-0ubuntu0.16.04.1
-- Version de PHP :  7.0.33-0ubuntu0.16.04.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `aroah`
--

-- --------------------------------------------------------

--
-- Structure de la table `config`
--

CREATE TABLE `config` (
  `serverID` varchar(50) NOT NULL DEFAULT '',
  `dlinks` varchar(50) NOT NULL DEFAULT 'no',
  `server` varchar(50) NOT NULL DEFAULT '',
  `logs` varchar(50) NOT NULL DEFAULT '',
  `cases` double DEFAULT '0',
  `raidmode` varchar(50) NOT NULL DEFAULT 'off',
  `securitylvl` varchar(50) NOT NULL DEFAULT 'medium',
  `maxban` double(22,0) DEFAULT '3',
  `maxkick` double(22,0) DEFAULT '3',
  `maxraid` double(22,0) DEFAULT '10',
  `maxspam` double(22,0) DEFAULT '5',
  `antispam` varchar(50) DEFAULT 'yes',
  `antiraid` varchar(50) DEFAULT 'yes'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Structure de la table `moderation`
--

CREATE TABLE `moderation` (
  `server_id` varchar(50) NOT NULL DEFAULT '',
  `user_id` varchar(50) NOT NULL DEFAULT '',
  `reason` longtext,
  `modd` varchar(50) NOT NULL DEFAULT '',
  `cases` varchar(50) NOT NULL DEFAULT '',
  `actions` varchar(50) NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Structure de la table `server`
--

CREATE TABLE `server` (
  `serverID` varchar(50) DEFAULT NULL,
  `logs` varchar(50) DEFAULT NULL,
  `prefix` longtext,
  `lang` varchar(50) DEFAULT 'en'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
