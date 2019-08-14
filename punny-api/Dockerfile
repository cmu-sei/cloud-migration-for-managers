FROM openjdk:11

COPY ./build/libs/punny-api-0.0.1-SNAPSHOT.jar /usr/src/punny-api/app.jar
WORKDIR /usr/src/punny-api
EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]

