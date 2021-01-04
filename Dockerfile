FROM library/postgres

ENV POSTGRES_PASSWORD eor
ENV POSTGRES_DB eor

COPY *.sql /docker-entrypoint-initdb.d/