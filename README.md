# Proyecto NEOCover
Chatbot orientado a realizar partes de accidentes.

# Generar aplicción web

El proyecto esta realizado con Ionic 3. Este esta basado en cordova.
Debes tener instalado a nivel global ionic y cordova:
```sh
$ npm install -g cordova
$ npm install -g ionic
```

Puesta en marcha:
## 1.-Descargar el proyecto:
```sh
$ git clone http://gitlab.cemobile.eu/neoris/des-mapfre.git
```
## 2.-Instalar las dependencias del proyecto:
```sh
$ cd des-mapfre
$ npm install
```

## 3.-Instalar las plataformas que se deseen:
### Android
```sh
$ ionic cordova platform add android
```
### IOS
```sh
$ ionic cordova platform add ios
```
## 4.-Instalar los plugins que necesita el poryecto proyecto
Mirar en el config.xml en los tags plugin para ver los ultimos cambios.
```sh
$ ionic cordova plugin add cordova-plugin-file-transfer
$ ionic cordova plugin add cordova-plugin-camera
$ ionic cordova plugin add cordova-plugin-x-toast
$ ionic cordova plugin add cordova-plugin-media-capture
$ ionic cordova plugin add cordova-plugin-whitelist
$ ionic cordova plugin add cordova-plugin-device
$ ionic cordova plugin add cordova-plugin-splashscreen
$ ionic cordova plugin add cordova-plugin-ionic-webview
$ ionic cordova plugin add cordova-plugin-ionic-keyboard
$ ionic cordova plugin add cordova-plugin-nativeaudio
$ ionic cordova plugin add cordova-plugin-media
$ ionic cordova plugin add cordova-plugin-file
$ ionic cordova plugin add facephi-plugin-widget
$ ionic cordova plugin add cordova-android-support-gradle-release
```

## 5.-Generar el proyecto nativo:
### Android
```sh
$ ionic cordova prepare android
$ ionic cordova build android
```
### IOS
```sh
$ ionic cordova prepare ios
$ ionic cordova build ios
```
NOTA: Apareceran errores al ejecutar el ultimo comando debido a que falta el certificado de desarrollo. Veremos como se soluciona en el siguiente punto.

## 6.-Generar el instalador:
### Android
Si se han ejecutado los comandos del punto anterior.
Basta con ir al siguiente directorio para obtener el apk:
```sh
des-mapfre/platforms/android/build/outputs/apk/android-debug.apk
```
`Importante!!` Cada vez que se realizen cambios en el proyecto ejecutar el comando:
```sh
$ ionic cordova prepare ios
```
Antes de ejecutar:
```sh
$ ionic cordova build ios
```

### IOS
Hay que abrir el xcode (se debe tener el proyecto en un mac) e importar el proyecto xcode que ha generado ionc:
```sh
des-mapfre/platforms/ios/NEO Cover.xcodeproj
```
En el apartado Signing, en el campo Team hay que añadir el certificado de desarrollo (en nuestro caso NEORIS ESPAÑA SL) este certificado debe de estar instalado previamente en mac.
- - -
![Signing](/screenshots/signing.png)
- - -
Seleccionamos del menu la siguiente opcion: "Product" -> "Destination" -> "Generic iOS Device".
- - -
![Destination](/screenshots/destination.png)
- - -
Despues seleccionamos del menu la opcion: "Product" -> "Archive" y esperamos a que termine de compilar.
- - -
![Archive](/screenshots/archive.png)
- - -
Nos aparecera una ventana con el historico de las versiones que hemos generado y estara selecionado la ultima que vamos a generar. Hacemos click en el boton "Export..."
- - -
![Export](/screenshots/export.png)
- - -
A continuacion selecionaremos la opcion "Enterprise" y hacemos click en el boton "Next".
![Distribution](/screenshots/distribution.png)
- - -
Seguiremos dandole al boton "Next" hasta que nos encontremos con la siguiente ventana que aparece a continuación. Hacemos click en el boton "Export"
- - -
![Review](/screenshots/review.png)
- - -
Finalizaremos indicando donde queremos que se genere el ipa.

## 8.-Distribución de los instaladores
Tanto para distribuir el .ipa como el .apk lo haremos mediante diawi (https://www.diawi.com/).

## 9.-Otros comandos de interes:
 - Para ejecutar el proyecto en local:
```sh
ionic serve
```
NOTA: Cuando estamos en local en modo navegador muchos de los servicios y clases que gestionan la parte nativa de los dispositivos (camara, microfono,...) estan mockeados para poder desarrollar con mas rapidez.
 - Para instalar directamente un apk en el dispositivo:
```sh
ionic cordova run android --device
```
