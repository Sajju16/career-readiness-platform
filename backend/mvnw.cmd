@REM ----------------------------------------------------------------------------
@REM Licensed to the Apache Software Foundation (ASF) under one
@REM or more contributor license agreements.  See the NOTICE file
@REM distributed with this work for additional information
@REM regarding copyright ownership.  The ASF licenses this file
@REM to you under the Apache License, Version 2.0 (the
@REM "License"); you may not use this file except in compliance
@REM with the License.  You may obtain a copy of the License at
@REM
@REM    https://www.apache.org/licenses/LICENSE-2.0
@REM
@REM Unless required by applicable law or agreed to in writing,
@REM software distributed under the License is distributed on an
@REM "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
@REM KIND, either express or implied.  See the License for the
@REM specific language governing permissions and limitations
@REM under the License.
@REM ----------------------------------------------------------------------------

@REM ----------------------------------------------------------------------------
@REM Apache Maven Wrapper startup batch script, version 3.3.2
@REM ----------------------------------------------------------------------------

@IF "%MAVEN_BATCH_ECHO%"=="on"  echo %MAVEN_BATCH_ECHO%

@REM Set local scope for the variables with windows NT shell
@SETLOCAL

@REM ==== START VALIDATION ====
IF NOT "%JAVA_HOME%"=="" GOTO OkJHome

FOR %%i IN (java.exe) DO SET JAVACMD=%%~$PATH:i
IF NOT "%JAVACMD%"=="" GOTO OkJavaCmd

echo.
echo Error: JAVA_HOME not found in your environment. >&2
echo Please set the JAVA_HOME variable in your environment to match the >&2
echo location of your Java installation. >&2
echo.
GOTO error

:OkJHome
SET JAVACMD=%JAVA_HOME%\bin\java.exe

IF NOT EXIST "%JAVACMD%" (
    echo Error: JAVA_HOME is set to an invalid directory: %JAVA_HOME% >&2
    GOTO error
)

:OkJavaCmd
@REM ==== END VALIDATION ====

@REM Find the project base directory i.e. the directory that contains the folder ".mvn".
@REM Fallback to current directory if not found.

SET MAVEN_PROJECTBASEDIR=%MAVEN_BASEDIR%
IF NOT "%MAVEN_PROJECTBASEDIR%"=="" GOTO endDetectBaseDir

SET EXEC_DIR=%CD%
SET WDIR=%EXEC_DIR%
:findBaseDir
IF EXIST "%WDIR%"\.mvn GOTO baseDirFound
IF "%WDIR%"=="%WDIR:~0,3%" GOTO baseDirNotFound
FOR %%i IN ("%WDIR%\..") DO SET WDIR=%%~fni
GOTO findBaseDir

:baseDirFound
SET MAVEN_PROJECTBASEDIR=%WDIR%
GOTO endDetectBaseDir

:baseDirNotFound
SET MAVEN_PROJECTBASEDIR=%EXEC_DIR%
GOTO endDetectBaseDir

:endDetectBaseDir
IF NOT EXIST "%MAVEN_PROJECTBASEDIR%\.mvn\wrapper\maven-wrapper.properties" (
    echo Error: Could not find .mvn\wrapper\maven-wrapper.properties >&2
    GOTO error
)

@REM Read the maven-wrapper.properties to get distributionUrl
SET WRAPPER_PROPERTIES=%MAVEN_PROJECTBASEDIR%\.mvn\wrapper\maven-wrapper.properties
SET MVNW_VERBOSE=false
IF "%MVNW_VERBOSE%"=="true" (
    echo Executing Maven Wrapper ...
)

@REM Determine the distribution directory based on distributionUrl
FOR /F "usebackq tokens=1,* delims==" %%A IN ("%WRAPPER_PROPERTIES%") DO (
    IF "%%A"=="distributionUrl" SET DISTRIBUTION_URL=%%B
)

@REM Calculate the distribution hash and path
SET DISTRIBUTION_ID=apache-maven-3.9.6
SET MAVEN_HOME_PARENT=%USERPROFILE%\.m2\wrapper\dists
SET MAVEN_HOME=%MAVEN_HOME_PARENT%\%DISTRIBUTION_ID%

@REM Check if Maven is already extracted
IF EXIST "%MAVEN_HOME%\bin\mvn.cmd" GOTO launchMaven
IF EXIST "%MAVEN_HOME%\bin\mvn" GOTO launchMaven

@REM Need to download Maven – use Java to run the wrapper jar
SET WRAPPER_JAR="%MAVEN_PROJECTBASEDIR%\.mvn\wrapper\maven-wrapper.jar"
IF NOT EXIST %WRAPPER_JAR% (
    echo Downloading maven-wrapper.jar...
    "%JAVACMD%" -classpath "%MAVEN_PROJECTBASEDIR%\.mvn\wrapper" org.apache.maven.wrapper.MavenWrapperDownloader 2>NUL
    IF NOT EXIST %WRAPPER_JAR% (
        echo Downloading via PowerShell...
        PowerShell -Command "& { [Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12; Invoke-WebRequest -Uri 'https://repo.maven.apache.org/maven2/org/apache/maven/wrapper/maven-wrapper/3.3.2/maven-wrapper-3.3.2.jar' -OutFile '%MAVEN_PROJECTBASEDIR%\.mvn\wrapper\maven-wrapper.jar' }"
    )
)

"%JAVACMD%" ^
  %JVM_CONFIG_MAVEN_PROPS% ^
  %MAVEN_OPTS% ^
  %MAVEN_DEBUG_OPTS% ^
  -classpath "%MAVEN_PROJECTBASEDIR%\.mvn\wrapper\maven-wrapper.jar" ^
  "-Dmaven.multiModuleProjectDirectory=%MAVEN_PROJECTBASEDIR%" ^
  org.apache.maven.wrapper.MavenWrapperMain %MAVEN_CONFIG% %*

IF ERRORLEVEL 1 GOTO error
GOTO end

:launchMaven
@REM Maven is already downloaded, launch it directly
SET MAVEN_BIN=%MAVEN_HOME%
@REM Scan for the actual bin dir (may be in a sub-folder)
FOR /D %%d IN ("%MAVEN_HOME%\*") DO (
    IF EXIST "%%d\bin\mvn.cmd" SET MAVEN_BIN=%%d
)

"%MAVEN_BIN%\bin\mvn.cmd" %MAVEN_CONFIG% %* ^
  "-Dmaven.multiModuleProjectDirectory=%MAVEN_PROJECTBASEDIR%"

IF ERRORLEVEL 1 GOTO error
GOTO end

:error
SET ERROR_CODE=1

:end
@ENDLOCAL & SET ERROR_CODE=%ERROR_CODE%

IF "%MAVEN_BATCH_PAUSE%"=="on" PAUSE

IF "%MAVEN_TERMINATE_CMD%"=="on" EXIT %ERROR_CODE%

EXIT /B %ERROR_CODE%
