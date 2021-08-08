-- MariaDB dump 10.18  Distrib 10.5.8-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: kuzzydb
-- ------------------------------------------------------
-- Server version	10.5.8-MariaDB-1:10.5.8+maria~focal

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `kata_entity`
--

DROP TABLE IF EXISTS `kata_entity`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `kata_entity` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `completions` text NOT NULL,
  `cwId` text NOT NULL,
  `description` text NOT NULL,
  `kyu` text NOT NULL,
  `name` text NOT NULL,
  `stars` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `kata_entity`
--

LOCK TABLES `kata_entity` WRITE;
/*!40000 ALTER TABLE `kata_entity` DISABLE KEYS */;
INSERT INTO `kata_entity` VALUES (1,'109.527','54bf1c2cd5b56cc47f0007a1','### Count the number of Duplicates\\\\n\\\\nWrite a function that will return the count of **distinct case-insensitive** alphabetic characters and numeric digits that occur more than \\\\nonce in the input string. \\\\nThe input string can be assumed to contain only alphabets (both uppercase and lowercase) and numeric digits.\\\\n\\\\n\\\\n### Example\\\\n\\\\\\\"abcde\\\\\\\" -\\\\u003e 0             `# no characters repeats more than once`  \\\\n\\\\\\\"aabbcde\\\\\\\" -\\\\u003e 2           `# \'a\' and \'b\'`  \\\\n\\\\\\\"aabBcde\\\\\\\" -\\\\u003e 2           ``# \'a\' occurs twice and \'b\' twice (`b` and `B`)``  \\\\n\\\\\\\"indivisibility\\\\\\\" -\\\\u003e 1    `# \'i\' occurs six times`  \\\\n\\\\\\\"Indivisibilities\\\\\\\" -\\\\u003e 2  `# \'i\' occurs seven times and \'s\' occurs twice`  \\\\n\\\\\\\"aA11\\\\\\\" -\\\\u003e 2              `# \'a\' and \'1\'`  \\\\n\\\\\\\"ABBA\\\\\\\" -\\\\u003e 2              `# \'A\' and \'B\' each occur twice`\\\\n\\','6','Counting Duplicates','2456');
/*!40000 ALTER TABLE `kata_entity` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `kata_language_entity`
--

DROP TABLE IF EXISTS `kata_language_entity`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `kata_language_entity` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `completions` text NOT NULL,
  `language` text NOT NULL,
  `testCases` text NOT NULL,
  `kataEntityId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_5e5ab05e3dc27b548c539686e70` (`kataEntityId`),
  CONSTRAINT `FK_5e5ab05e3dc27b548c539686e70` FOREIGN KEY (`kataEntityId`) REFERENCES `kata_entity` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `kata_language_entity`
--

LOCK TABLES `kata_language_entity` WRITE;
/*!40000 ALTER TABLE `kata_language_entity` DISABLE KEYS */;
INSERT INTO `kata_language_entity` VALUES (8,'32.966','javascript','describe(&quot;Example tests&quot;, function(){\n  Test.assertEquals(duplicateCount(&quot;&quot;), 0);\n  Test.assertEquals(duplicateCount(&quot;abcde&quot;), 0);\n  Test.assertEquals(duplicateCount(&quot;aabbcde&quot;), 2);\n  Test.assertEquals(duplicateCount(&quot;aabBcde&quot;), 2, &quot;should ignore case&quot;);\n  Test.assertEquals(duplicateCount(&quot;Indivisibility&quot;), 1)\n  Test.assertEquals(duplicateCount(&quot;Indivisibilities&quot;), 2, &quot;characters may not be adjacent&quot;)\n})\n\n\ndescribe(&quot;More tests&quot;, function(){\n  let lowers = &quot;abcdefghijklmnopqrstuvwxyz&quot;, uppers = lowers.toUpperCase();\n  Test.assertEquals(duplicateCount(lowers), 0)\n  Test.assertEquals(duplicateCount(lowers + &quot;baaAAB&quot;), 2, &quot;characters may not be adjacent&quot;)\n\n  Test.assertEquals(duplicateCount(lowers+lowers), 26)\n  Test.assertEquals(duplicateCount(lowers+uppers), 26, &quot;should ignore case&quot;)\n\n  let rnd = function(x){ return ~~(Math.random()*x) };\n\n  console.log(&quot;Random tests&quot;);\n  for( let t=0, times=5+rnd(4); t&lt;times; t++ ){\n    let len = 3+rnd(5), i=len+1, str = lowers.slice(0,len*2);\n    if( rnd(100)&lt;70 ){\n      while( i-- ) str += ([lowers,uppers][rnd(2)]).slice(0,i);\n    }else{\n      str += lowers.slice(-len);\n      len = 0;\n    }\n    console.log(&quot;&gt; &quot;+str+&quot; ?&quot;)\n    Test.assertEquals(duplicateCount(str),len)\n  }\n})',1);
/*!40000 ALTER TABLE `kata_language_entity` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `solution_entity`
--

DROP TABLE IF EXISTS `solution_entity`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `solution_entity` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `bestPractices` text NOT NULL,
  `clever` text NOT NULL,
  `code` text NOT NULL,
  `kataLanguageEntityId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_4fb1e68db2734b3011d683859f5` (`kataLanguageEntityId`),
  CONSTRAINT `FK_4fb1e68db2734b3011d683859f5` FOREIGN KEY (`kataLanguageEntityId`) REFERENCES `kata_language_entity` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=81 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `solution_entity`
--

LOCK TABLES `solution_entity` WRITE;
/*!40000 ALTER TABLE `solution_entity` DISABLE KEYS */;
INSERT INTO `solution_entity` VALUES (71,'300','1062','function duplicateCount(text){\n  return (text.toLowerCase().split(&#39;&#39;).sort().join(&#39;&#39;).match(/([^])\\1+/g) || []).length;\n}',8),(72,'139','272','function duplicateCount(text){\n  return text.toLowerCase().split(&#39;&#39;).filter(function(val, i, arr){\n    return arr.indexOf(val) !== i &amp;&amp; arr.lastIndexOf(val) === i;\n  }).length;\n}',8),(73,'70','15','function duplicateCount(text){\n  var lower = text.toLowerCase();\n  var count = 0;\n  var used = [];\n\n  lower.split(&#39;&#39;).forEach(function(letter) {\n    if (!used.includes(letter) &amp;&amp; (lower.split(letter).length - 1) &gt; 1) {\n      count++;\n      used.push(letter);\n    }\n  });\n\n  return count;\n}',8),(74,'32','9','function duplicateCount(text){\n\n  var input = text.toLowerCase().split(&#39;&#39;);\n\n  var obj = {};\n\n  for( var i in input) {\n\n  	if(!obj[ input[i] ]){\n\n  		obj[ input[i] ] = 1;\n\n  	} else{\n  		obj[ input[i] ] += 1;\n  	}\n  }\n\n  var result = 0;\n\n  for( var prop in obj) {\n\n    if(obj[prop] &gt; 1){\n  	 result++;\n    }\n  }\n\n  return result;\n\n}',8),(75,'22','53','function duplicateCount(text){\n  return text\n      .toLowerCase()\n      .split(&#39;&#39;)\n      .reduce(function(a, l) {\n        a[l] = a[l] ? a[l]+1 : 1;\n        if(a[l] === 2) a.count++;\n        return a;\n      }, {count:0}).count;\n}',8),(76,'16','23','function duplicateCount(text){\n  var count = text.toLowerCase().split(&#39;&#39;).reduce((accum, curr) =&gt; {\n    accum[curr] ? accum[curr] += 1 : accum[curr] = 1;\n    return accum;\n  }, {});\n  return Object.keys(count).filter(key =&gt; count[key] &gt; 1).length;\n}',8),(77,'13','14','function duplicateCount(text) {\n  var dup = [];\n  text.toLowerCase().split(&#39;&#39;).forEach(function(v, i, arr) {if(i != arr.lastIndexOf(v) &amp;&amp; dup.indexOf(v) == -1) dup.push(v);});\n  return dup.length;\n}',8),(78,'9','58','function duplicateCount(text){\n  return new Set(text.toLowerCase().match(/(.)(?=.*\\1)/gi)).size\n}',8),(79,'9','26','const _ = require(&#39;lodash&#39;);\n\nfunction duplicateCount(text) {\n  return _(text).countBy(_.toUpper).values().map(x =&gt; x &gt; 1).sum();\n}',8),(80,'5','33','const duplicateCount = (text) =&gt; (text.match(/(\\w)(?=(?!.*\\1.*\\1).*\\1)/gi) || []).length;',8);
/*!40000 ALTER TABLE `solution_entity` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-08-08  8:39:34
