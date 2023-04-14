# Como ejecutar el app

1. Clonar repositorio - ```git clone https://github.com/lleopardi/itune.git```
2. Instalar dependencias - ```npm install```
3. Iniciar el servidor - ```npm run start```

## CORS
Los servicios usados no soportan CORS por lo que se esta usando https://allorigins.win/ para solventar ese problema.

# Mode
Si se desea crear el bundle, solo hay que ejecutar ```npm run build```
La app puede ser empaquetada minimificada o no, los 2 modos estan includios en los script del package.json.

* Ejecutar ```npm run build``` y la app se empaquetará en modo producción
* Ejecutar ```npm run build:debug``` y la app se empaquetará en modo desarrollo son minimificar