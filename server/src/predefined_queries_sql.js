const codes = [
    `SELECT B.name
FROM Brand_Groups B 
INNER JOIN (SELECT I.publisher_id
		   FROM Indicia_Publishers I 
		   WHERE I.country_code = (SELECT C.country_code FROM Countries C WHERE C.name = 'Belgium') 				
		   GROUP BY I.publisher_id
		   ORDER BY Count(*) DESC) AS A ON B.publisher_id = A.publisher_id`,

    `SELECT P.publisher_id, P.name 
FROM Publishers P 
INNER JOIN (SELECT DISTINCT(S.published_by)
						FROM Series S 
                        INNER JOIN Countries ON S.country_code = Countries.country_code
                        INNER JOIN Publication_types ON S.publication_type = Publication_types.publication_type_id
						WHERE Countries.name = 'Denmark' AND Publication_types.publication_type_name LIKE '%book%') AS A
			ON P.publisher_id = A.published_by`,

    `SELECT S.name
FROM Series S
WHERE S.country_code IN (SELECT C.country_code
 FROM Countries C
 WHERE C.name = 'Switzerland') AND
S.publication_type = (SELECT P.publication_type_id
    FROM Publication_types P
    WHERE P.publication_type_name = 'magazine')`,

    `SELECT Count(*)
FROM Issues I
WHERE Year(I.publication_date) >= 1990
GROUP BY Year(I.publication_date)`,

    `SELECT COUNT(S.serie_id), I.name
FROM Series S, Indicia_Publishers I
WHERE I.name LIKE '%DC Comics%' AND
S.published_by = (SELECT P.publisher_id
FROM Publishers P
WHERE P.publisher_id = I.publisher_id)
GROUP BY I.name`,

    `SELECT DISTINCT S.title, A.Amount
FROM Stories S 
INNER JOIN (SELECT R.original_story_id, COUNT(*) AS Amount
		   FROM Story_reprint R
		   GROUP BY R.original_story_id  
		   ORDER BY Amount DESC
		   LIMIT 10) As A ON S.story_id = A.original_story_id LIMIT 10`,

    `SELECT DISTINCT P.name
FROM People P, Pencil_by D, Script_by W, Color_by C
WHERE P.people_id = D.drawer_id AND
	P.people_id = W.author_id AND
      P.people_id = C.colorist_id AND
      D.story_id = W.story_id AND
      W.story_id = C.story_id`,

    `SELECT S.title
FROM Stories S
WHERE S.story_id IN (SELECT S2.story_id
                     FROM Stories S2
                     WHERE S2.feature NOT LIKE '%Batman%' AND
                     S2.story_id IN (SELECT H.story_id
                                     FROM Has_character H
                                     WHERE H.character_id = (SELECT C.character_id
                                                             FROM Characters C
                                                             WHERE C.name = 'Batman'))) AND
      S.story_id NOT IN (SELECT R.original_story_id
                         FROM Story_reprint R)`,

/*a*/    `SELECT DISTINCT(SE.name)
FROM Series SE
INNER JOIN (SELECT I.serie_id, COUNT(*)
					  FROM Issues I
					  INNER JOIN (SELECT DISTINCT(S2.issue_id)
										   FROM Stories S2 USE INDEX(issue_id_index)
										   WHERE S2.story_type_id != (SELECT S.story_type_id 
																	  FROM Stories S
																      GROUP BY S.story_type_id
																      ORDER BY COUNT(*) DESC
																      LIMIT 1)) AS X ON  I.issue_id = X.issue_id
					 GROUP BY I.issue_id
					 ORDER BY COUNT(*) DESC) AS Y ON SE.serie_id = Y.serie_id`,

/*b*/    `SELECT Pub.name
FROM Publishers Pub
INNER JOIN (SELECT T.published_by
			FROM (SELECT S.published_by, S.publication_type
				  FROM Series S
				  INNER JOIN Publication_types ON S.publication_type = Publication_types.publication_type_id) AS T
			GROUP BY T.published_by
			HAVING COUNT(DISTINCT T.publication_type) = (SELECT COUNT(DISTINCT P.publication_type_id)
														 FROM Publication_types P)) AS X ON Pub.publisher_id = X.published_by`,
                
/*c*/    `SELECT DISTINCT(C.name)
FROM Characters C
INNER JOIN (SELECT HC.character_id, HC.story_id
			FROM Has_character HC
            INNER JOIN (SELECT R.original_story_id
						 FROM Story_reprint R
						 INNER JOIN Script_by ON R.original_story_id = Script_by.story_id
						 WHERE Script_by.author_id = (SELECT P.people_id
													   FROM People P
													   WHERE P.name LIKE 'Alan Moore')
						 GROUP BY R.original_story_id
						 ORDER BY COUNT(*) DESC) AS Y ON HC.story_id = Y.original_story_id) AS X ON C.character_id = X.character_id

LIMIT 10`,

/*d*/    `SELECT DISTINCT(P.name)
FROM Stories S, People P, Script_by W, Pencil_by PB
WHERE (S.synopsis LIKE '%nature%') AND S.story_id = W.story_id AND S.story_id = PB.story_id AND W.author_id = PB.drawer_id AND P.people_id = W.author_id`,

/*e*/    `SELECT X.pname, X.lname, X.amount
FROM
(SELECT P.name AS pname, L.name AS lname, COUNT(L.name) AS amount,
@rn := IF(@prev = P.name, @rn + 1, 1) AS rn,
@prev := P.name
FROM Publishers P, Series S, Languages L, (SELECT P.publisher_id, COUNT(*)
											FROM Publishers P, Series S
											WHERE P.publisher_id = S.published_by
											GROUP BY P.publisher_id
											ORDER BY COUNT(*) DESC
											LIMIT 10) AS Y
WHERE P.publisher_id = Y.publisher_id and P.publisher_id = S.published_by AND S.language_code = L.language_code
GROUP BY S.published_by, L.name
ORDER BY P.publisher_id, COUNT(L.name) DESC) AS X
WHERE rn <= 3`,

/*f*/    `SELECT *
FROM (SELECT L.name, Count(*) as amount
		FROM Stories S, Issues I, Series SE, Publication_types P, Languages L
		WHERE S.issue_id = I.issue_id AND I.serie_id = SE.serie_id AND P.publication_type_name LIKE 'magazine' AND P.publication_type_id = SE.publication_type AND L.language_code = SE.language_code
		GROUP BY SE.language_code
		ORDER BY COUNT(*) DESC) AS X
WHERE X.amount >= 10000`,

/*g*/    `SELECT DISTINCT(ST.story_type_name)
FROM Story_types ST, Stories S, Issues I
WHERE ST.story_type_id = S.story_type_id AND S.issue_id = I.issue_id 
	AND I.serie_id NOT IN (SELECT SE.serie_id
						   FROM Series SE
						   INNER JOIN (SELECT P.publication_type_id
									   FROM Publication_types P
									   WHERE P.publication_type_name LIKE 'magazine') AS X ON SE.publication_type = X.publication_type_id
						   INNER JOIN (SELECT L.language_code
									   FROM Languages L
									   WHERE L.name LIKE 'Italian') AS Y ON SE.language_code = Y.language_code)`,
        
/*h*/    `SELECT X.name
FROM (SELECT P.name, IP.indicia_publisher_id, W.story_id
		FROM Script_by W, People P, Stories S, Issues I, Indicia_Publishers IP
		WHERE W.author_id = P.people_id 
		AND W.story_id = S.story_id AND S.issue_id = I.issue_id AND I.published_by = IP.indicia_publisher_id) AS X
INNER JOIN (SELECT S.story_id
			FROM Stories S, Story_types ST
			WHERE S.story_type_id = ST.story_type_id AND ST.story_type_name LIKE 'cartoon') AS Y ON X.story_id = Y.story_id
GROUP BY X.name
HAVING COUNT(DISTINCT(X.indicia_publisher_id)) > 1`,

/*i*/    `SELECT B.name
FROM Brand_Groups B
INNER JOIN (SELECT IP.publisher_id, COUNT(*) as amount
			FROM Indicia_Publishers IP
            GROUP BY IP.publisher_id) AS A ON B.publisher_id = A.publisher_id
ORDER BY amount DESC
LIMIT 10`,

/*j*/    `SELECT IP.name, AVG(S.year_ended - S.year_began)
FROM Indicia_Publishers IP, Series S, Issues I
WHERE IP.indicia_publisher_id = I.published_by AND I.serie_id = S.serie_id AND S.year_began IS NOT NULL AND S.year_ended IS NOT NULL
GROUP BY IP.name
ORDER BY AVG(S.year_ended - S.year_began) DESC`,

/*k*/    `SELECT IP.name, COUNT(*)
FROM Indicia_Publishers IP, Issues I, Series S
WHERE IP.indicia_publisher_id = I.published_by AND S.first_issue_id = S.last_issue_id AND I.serie_id = S.serie_id
GROUP BY IP.indicia_publisher_id
ORDER BY COUNT(*) DESC
LIMIT 10;`,

/*l*/    `SELECT DISTINCT(IP.name)
FROM Indicia_Publishers IP, Issues I, Stories S
INNER JOIN (SELECT SB.story_id
			FROM  Script_by SB
			GROUP BY SB.story_id
			ORDER BY COUNT(*) DESC) AS X ON X.story_id = S.story_id
WHERE I.issue_id = S.issue_id AND IP.publisher_id = I.published_by
LIMIT 10`,

/*m*/    `SELECT DISTINCT(C.name)
FROM Characters C, Has_character HC, Stories S, Issues I, Indicia_Publishers IP
WHERE IP.name LIKE '%Marvel%' AND IP.name LIKE '%DC%' AND IP.indicia_publisher_id = I.published_by AND I.issue_id = S.issue_id 
	  AND S.story_id = HC.story_id AND HC.character_id = C.character_id`,

/*n*/    `SELECT S.name, COUNT(*)
FROM Issues I, Series S
WHERE I.serie_id = S.serie_id
GROUP BY S.serie_id
ORDER BY COUNT(*) DESC
LIMIT 5`
];


const queries = [
    {
        description: '2a) Brand group names with the highest number of Belgian indicia publishers.',
        code: codes[0]
    }, {
        description: '2b) IDs and names of publishers of Danish book series',
        code: codes[1]
    }, {
        description: '2c) Names of all Swiss series that have been published in magazines',
        code: codes[2]
    }, {
        description: '2d) Number of issues published each year starting from 1990',
        code: codes[3]
    }, {
        description: '2e) Number of series for each indicia publisher whose name resembles ‘DC comics’',
        code: codes[4]
    }, {
        description: '2f) Titles of the 10 most reprinted stories',
        code: codes[5]
    }, {
        description: '2g) Artists that have scripted, drawn, and colored at least one of the stories they were involved in',
        code: codes[6]
    }, {
        description: '2h) All non-reprinted stories involving Batman as a non-featured character',
        code: codes[7]
    }, {
        description: '3a) Names of the series that have the highest number of issues which contain a story whose type\
         is not the one occurring most frequently in the database',
        code: codes[8]
    }, {
        description: '3b) Names of publishers who have series with all series types',
        code: codes[9]
    }, {
        description: '3c) 10 most-reprinted characters from Alan Moore\'s stories',
        code: codes[10]
    }, {
        description: '3d) Writers of nature-related stories that have also done the pencilwork\
        in all their nature-related stories',
        code: codes[11]
    }, {
        description: '3e) For each of the top-10 publishers in terms of published series, print the 3\
         most popular languages of their series',
        code: codes[12]
    }, {
        description: '3f) Languages that have more than 10000 original stories published in magazines\
         along with the number of those stories',
        code: codes[13]
    }, {
        description: '3g) All story types that have not been published as a part of Italian magazine series',
        code: codes[14]
    }, {
        description: '3h) Writers of cartoon stories who have worked as writers for more than one \
        indicia publisher',
        code: codes[15]
    }, {
        description: '3i) The 10 brand groups with the highest number of indicia publiser.',
        code: codes[16]
    }, {
        description: '3j) The average series length (in term of years) per indicia publisher',
        code: codes[17]
    }, {
        description: '3k) The top 10 indicia publishers that have published the most single-issue series',
        code: codes[18]
    }, {
        description: '3l) The 10 indicia publishers with the highest number of script writers in a single story',
        code: codes[19]
    }, {
        description: '3m) All Marvel heroes that appear in Marvel-DC story crossover',
        code: codes[20]
    }, {
        description: '3n) The top 5 series with most issues',
        code: codes[21]
    }
];

module.exports = queries;
