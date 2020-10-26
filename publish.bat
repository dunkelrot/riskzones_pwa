@echo off

call ng build --prod

tar -cvf risk_zones_dist.tar .\dist\CoronaRiskZones
scp risk_zones_dist.tar arndt@bunte-dimensionen.de:/home/arndt
del risk_zones_dist.tar

rmdir /S /Q dist



