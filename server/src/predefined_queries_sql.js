const codes = [
    `SELECT B.name
FROM Brand_Groups B
WHERE B.publisher_id IN (SELECT A.publisher_id
                         FROM (SELECT COUNT(*) AS amount, I.publisher_id
 							   FROM Indicia_Publishers I
 							   WHERE I.country_code = (SELECT C.country_code FROM Countries C WHERE C.name = 'Belgium')
 GROUP BY I.publisher_id
 				 ORDER BY amount DESC) AS A)`,

    `SELECT P.publisher_id, P.name
FROM Publishers P
WHERE P.publisher_id IN (SELECT S.published_by
FROM Series S
WHERE S.country_code IN (SELECT C.country_code
 FROM Countries C
 WHERE C.name = 'Denmark'))`,

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

    `SELECT DISTINCT S.title
FROM Stories S
WHERE S.story_id IN (SELECT A.original_story_id
   			   FROM (SELECT R.original_story_id, COUNT(*) AS Amount
   		  		   FROM Story_reprint R
         			   GROUP BY R.original_story_id
         			   ORDER BY Amount  DESC) As A)
LIMIT 10`,

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
                         FROM Story_reprint R)`
];


const queries = [
    {
        description: 'Brand group names with the highest number of Belgian indicia publishers.',
        code: codes[0]
    }, {
        description: 'IDs and names of publishers of Danish book series',
        code: codes[1]
    }, {
        description: 'Names of all Swiss series that have been published in magazines',
        code: codes[2]
    }, {
        description: 'Number of issues published each year starting from 1990',
        code: codes[3]
    }, {
        description: 'Number of series for each indicia publisher whose name resembles ‘DC comics’',
        code: codes[4]
    }, {
        description: 'Titles of the 10 most reprinted stories',
        code: codes[5]
    }, {
        description: 'Artists that have scripted, drawn, and colored at least one of the stories they were involved in',
        code: codes[6]
    }, {
        description: 'All non-reprinted stories involving Batman as a non-featured character',
        code: codes[7]
    }
];

module.exports = queries;
