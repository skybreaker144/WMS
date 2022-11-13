-- MySQL dump 10.13  Distrib 8.0.27, for Win64 (x86_64)
--
-- Host: localhost    Database: waste_management_system
-- ------------------------------------------------------
-- Server version	8.0.27

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `regcomp`
--

DROP TABLE IF EXISTS `regcomp`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `regcomp` (
  `ComplaintID` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `Location` varchar(255) NOT NULL,
  `Description` varchar(255) NOT NULL,
  `Type_waste` varchar(255) DEFAULT NULL,
  `Image` varchar(255) DEFAULT NULL,
  `City` varchar(255) DEFAULT NULL,
  `Date` date DEFAULT NULL,
  `Street` varchar(255) DEFAULT NULL,
  `rec_team_size` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ComplaintID`),
  UNIQUE KEY `ComplaintID_UNIQUE` (`ComplaintID`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `regcomp`
--

LOCK TABLES `regcomp` WRITE;
/*!40000 ALTER TABLE `regcomp` DISABLE KEYS */;
INSERT INTO `regcomp` VALUES (2,'sudhir','HSR Layout','Mixed waste consisting of wet and dry waste','Dry','wehwiejfnk','Bengaluru','2022-10-27','14th Cross, 24th Main','Large'),(4,'sudhir','HSR Layout','Mixed waste consisting of wet and dry waste','Dry','wehwiejfnk','Bengaluru','2022-10-27','14th Cross, 24th Main','Large');
/*!40000 ALTER TABLE `regcomp` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-11-13 14:16:53
