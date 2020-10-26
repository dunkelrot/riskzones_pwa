@echo off

setlocal

set PATH=%PATH%;C:\Program Files\ImageMagick-7.0.10-Q16
set CMD=magick.exe

set SIZE=72
%CMD% .\icon.png -resize %SIZE%x%SIZE% ..\src\\assets\\icons\\icon-%SIZE%x%SIZE%.png
set SIZE=96
%CMD% .\icon.png -resize %SIZE%x%SIZE% ..\src\\assets\\icons\\icon-%SIZE%x%SIZE%.png
set SIZE=128
%CMD% .\icon.png -resize %SIZE%x%SIZE% ..\src\\assets\\icons\\icon-%SIZE%x%SIZE%.png
set SIZE=144
%CMD% .\icon.png -resize %SIZE%x%SIZE% ..\src\\assets\\icons\\icon-%SIZE%x%SIZE%.png
set SIZE=152
%CMD% .\icon.png -resize %SIZE%x%SIZE% ..\src\\assets\\icons\\icon-%SIZE%x%SIZE%.png
set SIZE=192
%CMD% .\icon.png -resize %SIZE%x%SIZE% ..\src\\assets\\icons\\icon-%SIZE%x%SIZE%.png
set SIZE=384
%CMD% .\icon.png -resize %SIZE%x%SIZE% ..\src\\assets\\icons\\icon-%SIZE%x%SIZE%.png
set SIZE=512
%CMD% .\icon.png -resize %SIZE%x%SIZE% ..\src\\assets\\icons\\icon-%SIZE%x%SIZE%.png

set SIZE=32
%CMD% .\icon.png -resize %SIZE%x%SIZE% ..\src\\favicon.ico

endlocal

