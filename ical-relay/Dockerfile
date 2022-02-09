FROM golang

RUN apt-get update && apt-get install golang-rice git -y

WORKDIR /app
RUN git clone --branch staging https://github.com/JM-Lemmi/ical-relay ical-relay
RUN git clone --branch issue52 https://github.com/arran4/golang-ical golang-ical

WORKDIR /app/ical-relay
RUN rice embed-go && go build .

WORKDIR /config

CMD /app/ical-relay/ical-relay
