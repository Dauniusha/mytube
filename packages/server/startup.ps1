$path = Get-Location;

Start-Process -WorkingDirectory "C:\kafka_2.13-3.4.0\bin\windows" .\zookeeper-server-start.bat ..\..\config\zookeeper.properties;

cd C:\kafka_2.13-3.4.0\bin\windows;

.\kafka-server-start.bat ..\..\config\server.properties;

.\kafka-topics.bat --create --topic my-topic --bootstrap-server localhost:9092 --replication-factor 1 --partitions 3;

cd $path;