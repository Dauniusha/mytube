$path = Get-Location;

cd C:\kafka_2.13-3.4.0\bin\windows;

.\kafka-server-stop.bat;

.\zookeeper-server-stop.bat;

cd $path;
