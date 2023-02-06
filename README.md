mvn clean install

docker run --name mysqldb -e MYSQL_ROOT_PASSWORD=Password -e MYSQL_DATABASE=mydb -d -p 3306:3306 mysql:latest

mvn spring-boot:run