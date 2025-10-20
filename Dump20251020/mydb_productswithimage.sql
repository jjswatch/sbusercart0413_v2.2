CREATE DATABASE  IF NOT EXISTS `mydb` /*!40100 DEFAULT CHARACTER SET utf8mb3 */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `mydb`;
-- MySQL dump 10.13  Distrib 8.0.43, for Win64 (x86_64)
--
-- Host: localhost    Database: mydb
-- ------------------------------------------------------
-- Server version	8.0.43

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
-- Table structure for table `productswithimage`
--

DROP TABLE IF EXISTS `productswithimage`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `productswithimage` (
  `id` int NOT NULL AUTO_INCREMENT,
  `category` varchar(255) DEFAULT NULL,
  `description` varchar(2048) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `picture` longblob,
  `price` double NOT NULL,
  `rating_id` int NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `brand` varchar(255) NOT NULL,
  `stock` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productswithimage`
--

LOCK TABLES `productswithimage` WRITE;
/*!40000 ALTER TABLE `productswithimage` DISABLE KEYS */;
INSERT INTO `productswithimage` VALUES (1,'smartphones','全新 iPhone Air 出奇纖薄輕盈，握在手中，感覺若有似無。薄至 5.6 公釐、輕僅 165 公克，身為史上最薄 iPhone，不僅配備了寬大、令人沉浸的 6.5 吋顯示器，還蘊含 A19 Pro 晶片的渾厚實力。看似矛盾，卻可在你手中見證。再生鈦金屬打造邊框，讓 iPhone Air 既堅固，又美得奪目','https://storage.googleapis.com/landtop_prod/productimage/3891/image/c7e550f90e5dd0b85a634f9bd4bcb1d3.png',NULL,36900,1,'iPhone Air','Apple',25),(2,'smartphones','見識一下全新 iPhone 17。擁有弧形邊緣以及更纖細的邊框設計，以諸多耐用材質打造，如機身正面採用超瓷晶盾面板，讓這款 iPhone 外觀絢麗，且經久耐看。6.3 吋超 Retina XDR 顯示器，讓你一覽更多精彩，完成更多想做的事。具備自動適應更新頻率最高達 120Hz 的 ProMotion 技術，滑手機捲動畫面時更順暢，玩起遊戲來也更加投入。立刻出手，試看看。','https://storage.googleapis.com/landtop_prod/productimage/3876/image/5df875c957ade789da47eca6f3d07a09.png',NULL,29900,2,'iPhone 17','Apple',60),(3,'smartphones','探索 iPhone 17 Pro 的整個相機系統，處處可見長足進步的創新。其中包括 iPhone 歷來最長望遠，等效焦距最長可達 200 公釐，並採用我們的新一代四重反射稜鏡設計，以及加大 56% 的感光元件。為你的創意，開拓更寬廣的揮灑空間，並以 16 倍光學變焦範圍，為你的構圖延伸更遠的取景視野。此外，還能拍出令人驚豔的低光源照片，以及震撼人心的影片。 彷彿隨身攜帶 8 個專業級鏡頭，張張照片都預設 2400 萬像素超高解析度。','https://storage.googleapis.com/landtop_prod/productimage/3897/image/6584d4a2a6d478994877fbfb4058a43b.png',NULL,39900,3,'iPhone 17 Pro','Apple',56),(4,'smartphones','探索 iPhone 17 Pro 的整個相機系統，處處可見長足進步的創新。其中包括 iPhone 歷來最長望遠，等效焦距最長可達 200 公釐，並採用我們的新一代四重反射稜鏡設計，以及加大 56% 的感光元件。為你的創意，開拓更寬廣的揮灑空間，並以 16 倍光學變焦範圍，為你的構圖延伸更遠的取景視野。此外，還能拍出令人驚豔的低光源照片，以及震撼人心的影片。 彷彿隨身攜帶 8 個專業級鏡頭，張張照片都預設 2400 萬像素超高解析度。','https://storage.googleapis.com/landtop_prod/productimage/3899/image/bac1f30281125e93c6c3a19dab855534.png',NULL,44900,4,'iPhone 17 Pro Max','Apple',37),(5,'smartphones','iPhone 14 配備速度超快的晶片。內部設計也經過更新，散熱效率更好，做什麼都能快快快，快很久。','https://storage.googleapis.com/landtop_prod/productimage/1/image/3dc021d10a35aeb3532a132166ca09d8.png',NULL,18490,5,'iPhone 14','Apple',22),(6,'smartphones','iPhone 16e 設計出眾，從裡到外處處精彩。備有黑白兩款優雅外觀可供選擇。機身以堅固耐用的航太等級鋁金屬精製而成，經得起時間考驗，面對日常各種碰撞也無所畏懼。同時，還能防潑、抗水又防塵。','https://storage.googleapis.com/landtop_prod/productimage/3466/image/d4e19dfe036184d2d3d39cbf4036e552.png',NULL,21900,6,'iPhone 16e','Apple',43),(7,'smartphones','全新 iPhone 16 相機系統靈活多用，不論近拍、遠拍，都能拍出絕美大作。二合一的 4800 萬像素 Fusion 相機可拍攝震撼的超高解析度影像，還能用 2 倍光學品質望遠功能來拉近取景畫面；超廣角相機拍超大特寫的微距照片很拿手，捕捉更寬廣壯闊的場面也很罩。此外，有了空間拍攝功能，你甚至能拍攝 3D 照片和影片，並在 Apple Vision Pro 上欣賞。','https://cdn.dummyjson.com/product-images/smartphones/oppo-k1/2.webp',NULL,29900,7,'iPhone 16','Apple',26),(8,'smartphones','全新 iPhone 16 相機系統靈活多用，不論近拍、遠拍，都能拍出絕美大作。二合一的 4800 萬像素 Fusion 相機可拍攝震撼的超高解析度影像，還能用 2 倍光學品質望遠功能來拉近取景畫面；超廣角相機拍超大特寫的微距照片很拿手，捕捉更寬廣壯闊的場面也很罩。此外，有了空間拍攝功能，你甚至能拍攝 3D 照片和影片，並在 Apple Vision Pro 上欣賞。','https://storage.googleapis.com/landtop_prod/productimage/2995/image/9941885809d9302f3ea52d81b425135d.png',NULL,32900,8,'iPhone 16 Plus','Apple',78),(9,'smartphones','全新 iPhone 16 相機系統靈活多用，不論近拍、遠拍，都能拍出絕美大作。二合一的 4800 萬像素 Fusion 相機可拍攝震撼的超高解析度影像，還能用 2 倍光學品質望遠功能來拉近取景畫面；超廣角相機拍超大特寫的微距照片很拿手，捕捉更寬廣壯闊的場面也很罩。此外，有了空間拍攝功能，你甚至能拍攝 3D 照片和影片，並在 Apple Vision Pro 上欣賞。','https://cdn.dummyjson.com/product-images/smartphones/realme-x/2.webp',NULL,44900,9,'iPhone 16 Pro Max','Apple',43),(10,'accessories','這款 Apple 設計的保護殼纖薄、輕巧，且輕鬆好握，不但展現 iPhone 17 系列色彩亮麗的外觀，還能提供額外的保護。保護殼採用透明聚碳酸酯及彈性材料製成，可緊密貼合各個按鈕，操作方便順手。這款保護殼能和「相機控制」功能順暢合作，配備帶傳導層的藍寶石玻璃，可將手指動作傳遞到「相機控制」按鈕。保護殼的內外表層均塗有抗刮外膜。所有材料與外膜均經過最佳化處理，可避免長期使用造成的黃變。保護殼內含磁石，可與 iPhone 17 系列 完美對位，讓你每次使用都能巧妙貼合，無線充電更快捷。充電時，只要把 iPhone 貼合在 MagSafe 充電器或放在 Qi2 25W 或 Qi 認證的充電器上，無須取下保護殼。如同 Apple 設計的每一款保護殼，這款保護殼在設計和製造過程中歷經數千小時的測試。因此它不僅外型出眾，更能保護 iPhone，減少因刮傷與掉落的損害。','https://storage.googleapis.com/landtop_prod/productimage/3961/image/6568e0e6a40cc5fcc4eaf8bf8e426320.png',NULL,1490,10,'MagSafe 透明保護殼','Apple',34),(11,'accessories','MagSafe 是 Apple 無線充電標準，自 2020 起支援 iPhone 12 以上機型，最新 25W Qi2 MagSafe 充電器支援 USB‑C 快充。地標網通販售 MagSafe 充電器、外接電池與支架配件，並整理 MagSafe 功能、缺點、更新資訊與使用教學，讓你掌握磁吸生活。','https://storage.googleapis.com/landtop_prod/product/2233/product_image/7574f3cc3cb08d19a77c2119a5cb1fde.png',NULL,1290,11,'MagSafe 充電器','Apple',56),(12,'accessories','Apple 充電頭 20W 讓你無論在家中、辦公室或外出時，都能快速有效地充電。與 iPhone 裝置搭配使用進行快速充電，充電大約 35 分鐘，電量最高可達 50%；或是與 iPad Pro 及 iPad Air 搭配使用，以發揮最佳充電效能。支援 USB-C 裝置相容。','https://storage.googleapis.com/landtop_prod/product/2234/product_image/ef69ed01cf402b280902176cc390f66b.png',NULL,590,12,'充電頭 20W','Apple',23),(13,'accessories','這款 40W 動態電源轉接器 (最高輸出 60W) 採用獨特設計，可動態提供最高達 60W 功率輸出，大幅提升充電速度。透過動態電源，就能在精巧、袖珍的尺寸條件下，為你帶來與較高功率充電器相同的諸多好處，讓你在家中、辦公室或外出時，都能比以往更快速、方便地充電。想要快速充電時，將動態電源轉接器與 iPhone 17 機型搭配使用，充電 20 分鐘，電量可達 50%；與 iPhone Air 搭配使用，充電 30 分鐘，電量可達 50%。','https://storage.googleapis.com/landtop_prod/product/3348/product_image/85ffa6af56a91277a066f34635adfe0a.png',NULL,1290,13,'40W 動態電源轉接器','Apple',53),(14,'accessories','採用編織設計，兩端皆配備 USB-C 連接器，非常適合用於 USB-C 裝置間充電、同步及傳輸資料。它支援最高可達 60 瓦特的充電功率，並以 USB 2 速率傳輸資料。將 USB-C 充電連接線搭配相容的 USB-C 電源轉接器，即可充分利用它的快速充電功能，從牆壁電源插座方便地為你的裝置充電。','https://storage.googleapis.com/landtop_prod/product/2988/product_image/6a1aa5d60c2abe0b9787e722fb93fdab.png',NULL,590,14,'充電連接線 USB-C','Apple',12),(15,'smartphones','寬廣而光滑的 6.7吋螢幕，具有生動的 Super AMOLED 和 90Hz 更新頻率，這意味著你的世界將會十分豐富、明亮且身歷其境。','https://storage.googleapis.com/landtop_prod/productimage/3812/image/428809f02fd9b95644b1830ec08490cd.png',NULL,7490,15,'A17','Samsung',54),(16,'smartphones','6.7吋 Super AMOLED 螢幕搭配纖細的極窄邊框，生動清晰的視覺效果帶你進入最愛的娛樂世界 ― 從最喜愛創作者的最新影片到摯愛親人的照片。','https://storage.googleapis.com/landtop_prod/productimage/3562/image/7d71e1cde2cf5c0029b165cbc7e0feab.png',NULL,11990,16,'A26','Samsung',78),(17,'smartphones','極簡設計與堅固耐用的 Galaxy A36 5G 讓你展現自我風格。採用俐落的直列鏡頭設計，搭配質感玻璃背面。更窄的邊框與平整側面，展現纖薄、時尚的外觀風格。','https://storage.googleapis.com/landtop_prod/productimage/3560/image/ee26dae4fc9abd987d834616b37ce23b.png',NULL,13990,17,'A36','Samsung',43),(18,'smartphones','Galaxy A56 5G 隆重登場。厚度僅 7.4mm，重量僅 198g 的 Galaxy A56 5G 握感絕佳。升級相機與全新直列設計完美結合','https://storage.googleapis.com/landtop_prod/productimage/3545/image/23847c97dc36d1886c633e46c089c79b.png',NULL,16990,18,'A56','Samsung',24),(19,'smartphones','加入 Galaxy AI 的全新 Galaxy S24 FE，讓每張照片都展現無窮創意。盡情享受 Galaxy AI 的完整體驗，解鎖無限可能的想像力。拍攝、圈選、點擊 – 了解為什麼這一切如此值得擁有。','https://storage.googleapis.com/landtop_prod/productimage/3233/image/6a9b8d89fb3f0322e3ed264e1682ca6b.png',NULL,22990,19,'S24 FE','Samsung',56),(20,'smartphones','Galaxy S25 FE 厚度僅 7.4 mm，重量僅 190 克，是迄今最薄和最輕的 FE 手機。具有最窄的邊框，搭配浮動相機設計下，外觀顯得更時尚，並可提供更身臨其境的觀賞體驗。攜帶上更輕便，享受卻更多。','https://storage.googleapis.com/landtop_prod_cache/productimage/image/2e6f4c509ef953889186d2b2f921e0ac.png',NULL,22990,20,'S25 FE','Samsung',34),(21,'accessories','全新快充通用型旅充頭可為與 USB Type-C 傳輸線相容的裝置，提供高達 25W 的超快速充電，大幅提升您工作站的效能。','https://storage.googleapis.com/landtop_prod_cache/product/product_image/9595b8e64cfd56f543b6d1559bf9f4ee.png',NULL,590,21,'25W 快充通用型旅充','Samsung',12),(22,'accessories','USB to Type C接頭，正反面可插，原廠三星配件品質穩定可靠。','https://storage.googleapis.com/landtop_prod/product/2790/product_image/e05a34cda8e851535ed08e57acc6fb87.png',NULL,390,22,'USB Type-C 傳輸線','Samsung',42),(23,'accessories','全新透明保護殼是迄今最薄的透明保護殼，提供更纖薄、更精準的貼合，絲毫不顯得厚重。','https://storage.googleapis.com/landtop_prod/productimage/3682/image/5aa1c1c4e2655a9bd55784607ce9f0c3.png',NULL,590,23,'A36 透明保護殼','Samsung',8);
/*!40000 ALTER TABLE `productswithimage` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-10-20 13:37:33
