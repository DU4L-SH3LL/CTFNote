FROM golang

RUN apt-get update && apt-get install golang-rice git -y

WORKDIR /app
RUN git clone https://github.com/JM-Lemmi/ical-relay ical-relay

WORKDIR /app/ical-relay
RUN rice embed-go && go build .

WORKDIR /config

CMD /app/ical-relay/ical-relay
