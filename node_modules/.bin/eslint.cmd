@IF EXIST "%~dp0\node.exe" (
  "%~dp0\node.exe --max-old-space-size=10240"  "%~dp0\..\eslint\bin\eslint.js" %*
) ELSE (
  @SETLOCAL
  @SET PATHEXT=%PATHEXT:;.JS;=;%
  node --max-old-space-size=10240  "%~dp0\..\eslint\bin\eslint.js" %*
)
