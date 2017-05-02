const issues = t => `\
SELECT I.number, I.title, I.publication_date, I.on_sale_date,
       I.price, I.page_count, I.indicia_frequency, I.notes,
       I.rating, S.name AS Story_title, P.name AS Publisher_name,
       I.isbn, I.barcode
FROM ((Issues I LEFT JOIN Series S ON I.serie_id = S.serie_id) LEFT JOIN Indicia_Publishers P ON I.published_by = P.indicia_publisher_id)
WHERE I.title LIKE "%${t}%" OR I.notes LIKE "%${t}%"
`;

const countries = t => `\
SELECT C.name
FROM Countries C
WHERE C.name LIKE "%${t}%"
`;

const brandgroups = t => `\
SELECT B.name, B.notes, B.year_began, B.year_ended, P.name AS publisher, B.url 
FROM Brand_Groups B LEFT JOIN Publishers P ON B.publisher_id = P.publisher_id
WHERE B.name LIKE "%${t}%" OR B.notes LIKE "%${t}%"
`;

const people = t => `\
SELECT P.name
FROM People P
WHERE P.name LIKE "%${t}%"
`;

const languages = t => `\
SELECT L.name
FROM Languages L 
WHERE L.name LIKE "%${t}%"
`;

const indicia_publishers = t => `\
SELECT I.name, I.notes, I.year_began, I.year_ended, I.url, I.is_surrogate, C.name AS country, P.name AS Publisher
FROM (Indicia_Publishers I LEFT JOIN Publishers P ON I.publisher_id = P.publisher_id) LEFT JOIN Countries C ON I.country_code = P.country_code
WHERE I.name LIKE "%${t}%" OR I.notes LIKE "%${t}%"
`;

const publishers = t => `\
SELECT P.name, P.year_began, P.year_ended, P.url, P.notes, C.name AS Country
FROM Publishers P LEFT JOIN Countries C ON P.country_code = C.country_code
WHERE P.name LIKE "%${t}%" OR P.notes LIKE "%${t}%"
`;
const series = t => `\
SELECT
    S.name,
    S.binding,
    S.color,
    S.dimensions,
    F.title AS first_issue,
    LA.title AS last_issue,
    S.format,
    S.notes,
    S.paper_stock,
    S.publication_begin,
    S.publication_end,
    T.publication_type_name AS publication_type,
    P.name AS publisher,
    S.publishing_format,
    S.year_began,
    S.year_ended,
    C.name AS country,
    L.name AS language
FROM
    (
        (
            (
                (
                    (
                        (
                            Series S
                        LEFT JOIN Issues F ON
                            S.first_issue_id = F.issue_id
                        )
                    LEFT JOIN Issues LA ON
                        S.last_issue_id = LA.issue_id
                    )
                LEFT JOIN Publication_types T ON
                    S.publication_type = T.publication_type_id
                )
            LEFT JOIN Publishers P ON
                S.published_by = P.publisher_id
            )
        LEFT JOIN Countries C ON
            S.country_code = C.country_code
        )
    LEFT JOIN Languages L ON
        S.language_code = L.language_code
    )
WHERE
    S.name LIKE "%${t}%" OR S.format LIKE "%${t}%" OR S.notes LIKE "%${t}%" OR S.paper_stock LIKE "%${t}%" OR T.publication_type_name LIKE "%${t}%" OR P.name LIKE "%${t}%" OR S.publishing_format LIKE "%${t}%"
`;

const queries = {
    'Issues' : issues,
    'Countries': countries,
    'Brand Groups': brandgroups,
    'People' : people,
    'Languages': languages,
    'Indicia Publishers': indicia_publishers,
    'Publishers': publishers,
    'Series': series,
};

module.exports = queries;
