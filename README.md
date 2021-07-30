# hola papu

acá un nuevo archivo readme de notas
pero en este caso seran sobre next js
asi que comencemos

## conexion de nuevos componentes al servidor automatica (?) *c sonroja*

WTF weon esto parece puta magia

simplemente creando un componente en pages se crea una nueva extencion con el nombre que tenga el archivo

## no `<a>` sino `<Link>`

para crear enlaces locales se tendra que hacer con el componente `<Link>` que tiene next js

        import Link from "next/link"

y listo se puede usar como si fuera la etiqueta `<a>`

        <a href="/otra-pagina">Ir a la otra pagina</a>

## variables de entorno

habrán veces en las cuales usaremos el mismo texto, pero eso significa que estamos haciendo algo mal

en este caso podemos poner de ejemplo los titulos de las paginas

        <title>Home | nombre del sitio</title>
        <title>About | nombre del sitio</title>

para guardar el texto "nombre del sitio" como variable lo tendremos que poner en un archivo externo llamado "next.config.js"

        module.exports = {
                env: {
                        SITIO_NOMBRE: "nombre del sitio"
                }
        }

- lo que hacemos es que module.exports sea igual a un objeto donde pondremos las constantes
- y las variables tienen que ser escritas en mayusculas podas imponentes B)

despues de eso para usarlas se hace asi

        <title>Seccion | {process.env.NOMBRE_DEL_SITIO}</title>

- aca decimos que en el script que inserte la variable NOMBRE_DEL_SITIO de el objeto env que esta en el objeto process.

## uso de variables para conexiones a APIs

esto es un poco mas complicado de explicar, ya que se me hace un poco dificil los servidores, pero voy a explicarlo como lo entiendo por ahora

se sabe que tus conexiones a las base de datos cuando estes trabajando en paralelo con otras personas en backend, no seran posibles porque aun no estan terminadas

asi que tendras que tener variables condicionales a el estado del proyecto

ya sea si esta en desarrollo o este ya en produccion

nextjs nos ayuda en eso dandonos constantes que detectan en que estado estas y que este cambio de conexiones sea auntomatico

para eso lo primero es exportar en nuestro archivo next.config.js las constantes de next

y guardarlas en las que necesitemos en una constante, o simplemente desestructutarlo como en el siguiente ejemplo

        const { PHASE_DEVELOPMENT_SERVER } = require("next/constants")

- NOTA para ver el contenido de una redireccion podemos seleccionarla y presionar F12
- si hacemos eso con la redireccion del require nos llevara a las constantes

ahora, te recuerdas de los estados que puede tener un proyecto, pues eso se llama fase como la fase del proyecto

pero obvia mente tiene que ser escrita en ingles, o sea PHASE

y esta fase se guardara en un valor llamado phase que lo usaremos en el module.exports de antes

pero module.exports no es una funcion para que use propiedades

pues conviertela en una

        module.exports = phase => {

        }

y ya esta

ahora hay que crear una vareable pero para eso se necesita a env pero en este caso ya no sera un objeto sin declaracion, sino que tendremos que declararla como constante, y la retornamos

        module.exports = phase => {
           const env = {
            }

            return {
                env
            }
        }

ok ahora hay que usar la constante PHASE_DEVELOPMENT_SERVER para saber si esta en desarrollo o no

para ello hacemos una constante que almacene un booleano que tenga el resultado de la comparacion de PHASE_DEVELOPMENT_SERVER con la propiedad phase

        module.exports = phase => {
           const faseDeDesarrollo = phase === PHASE_DEVELOPMENT_SERVER
           const env = {
            }

            return {
                env
            }
        }

pero para que hicimos eso, pues para usarlo como condicional
si es true significa que esta en fase de desarrollo, si no entonces esta en ela case real

pues ahora a crear la vareable esta la va almacenar env como si fuera un json y la variable tiene que almacenar una doble funcion ()(), en la cual el primer par de parentesis almacenara la funcion condicional

        module.exports = phase => {
           const faseDeDesarrollo = phase === PHASE_DEVELOPMENT_SERVER
           const env = {
                VARIABLE_API: ( () => {
                    if (faseDeDesarrollo) {
                        return "https://api.com/dev"
                    } else {
                        return "https://api.com/final"
                    }
                })()
            }

            return {
                env
            }
        }

- si queremos agregar una variable comun como la SITIO_NOMBRE lo puedes poner normal y claro, siempre separando cada variable con una coma ","

## componentes next

next funciona como magia pero para eso tenemos que regirnos a sus reglas, pero si saber React, son las mismas, excepto por las etiquetas especiales como `<Link>` o `<Image>`

## _app.js

_app.js es un archivo especial en el cual iran los elementos basicos de cada seccion de tu pagina web

entre estos se puede encontrar tu nav o header

su estructura es asi

        function MyApp({ Component, pageProps }) {
          return(
            <>
                <Component {...pageProps} />
            </>
          ) 
        }

aca puedes excribir toda la estructura que tu quieras
pero una parte importante es

        <Component {...pageProps} />

ya que este determinadonde comenzara el contenido original de la pagina y no los componentes genericos

## _document.js

es como _app pero es para los detalles del head

su estructura basica es asi

        import Document, {Html, Head, Main, NextScript} from "next/document"

        class MyDocument extends Document {
          render() {
            return (
              <Html lang="es">
                <Head>
                  <body>
                    <Main />
                    <NextScript />
                  </body>
                </Head>
              </Html>
            )
          }
        }

        export default MyDocument

- exportamos unos componentes de next/document para estructurar esto, despues creamos una clase que renderizara el head

## NOTAS antes de continuar

ahora veremos bastantes funciones async o asincronas de peticiones de datos

he estado leyendo la documentacion de next js y parece ser que cualquiera de sus funciones async se agregan despues de la construccion de su componente

el primero que veremos es getInitialProps

este va a hacer peticiones fetch que retornara datos para el componente

## async / await

PRIMERA VEZ USANDO ESTA WEA

parece ser importante, ya que he escuchado mucho de ellas

en este caso se usara para _document.js que necesita una peticion asincrona (async) que le de elementos del servidor

asincrona significa que no esta sincronizado a la ejecucion del codigo

con esto se pueden hacer peticiones que que esperen (await) que cargen lo que necesita


        static async getInitialProps(ctx) {
          const initialProps = await Document.getInitialProps(ctx)
          return {...initialProps}
        }

- primero declaramos te tipo de componente es y en este caso es estatico static

despues se inicia con un async que usara el metodo getInitialProps() que recibira un contexto

el cual hara una funcion de recoleccion de datos para la constante initialProps

se va a esperar que cargen los datos que cargen en Document.getInitialProps()

y despues lo mandamos como retorno a esa constante

- aca hay un video que me gusto como lo explica --> https://www.youtube.com/watch?v=rKK1q7nFt7M

- esos 3 puntos creo que se ponen cuando son muchas constantes

## getInitialProps() a detalle

getInitialProps recibe un argumento llamado contexto (ctx) el cual retornara un json con todos los datos

con esto podemos recorrer con un .map() y jugar con los componentes de cada onjeto del json

este es un metodo del coponente asi que cuando se ejecuta tienes que poner primero el nombre del componente seguido de un punto

        Componente.getInitialProps = async function (context) {

          const res = await fetch(url)
          const post = await res.json()

          return {
            post
          }
        }

aqui decimos que el metodo getInitialProps va a ser async y que recibira la propiedad context

pedimos un contenido por un fetch y lo volvemos json

despues devolvemos ese json

pero que tal si queremos que esto sea mas dinamico y jugar con datos por id pues seria algo asi

        Componente.getInitialProps = async function (context) {

          const { id } = context.query
          const res = await fetch(`${url}/${id}`)
          const post = await res.json()

          return {
            post
          }
        }

context tiene muchas propiedades para su lectura, en este caso usamos query para leerlo como objeto, y le pedimos que nos saque el id

despues podemos usar la id para que busque el objeto en si con la url en conjunto de la id como identificador unico

no siempre sera asi, tienes que saber como se hacen las peticiones por id a la API que quieras, puede que tenga una extencion antes del id

## getStaticProps() al detalle

es una funcion que tiene una forma particular de ejecucion

se escribe despues de la declaracion del componente y se declara asi

        export async function getStaticProps() {}

podemos decir que vamos a exportar una funcion async que sera getStaticProps()

esta funcion se ejecutara cuando se compila y le permite pasar los datos obtenidos a una propiedad llamada {props} para el componente

y como obtiene datos tambien usara fetch

        export async function getStaticProps() {
          const res = await fetch('https://.../posts')
          const posts = await res.json()

          return {
            props: {
              posts,
            },
          }
        }

en este caso estamos trayendo datos de posts y los guardamos en una constante

despues retornamos el objeto posts del objeto props que dijimos que seria el que reciviria todo

y ahora tenemos un json con datos que podemos usar en recorridos .map() y asi crear componente dinamicos

## crear componente para datos dinamicos

antes de continuar estaria bueno decir que next funciona renderizando todos los componentes de la carpeta pages en paginas html, y cuando creamos una carpeta estamos creando una extencion de ella

es decir que los archivos que esten en la carpeta pages su direccion sera asi

        localhost:3000/nombre-del-archivo

y cuando esta el archivo dentro de otra carpeta que esta en pages sera asi

        localhost:3000/nombre-de-carpeta/nombre-del-archivo

parece magia papus

y para que sirve saber esto, pues se pueden crear componentes dinamicos poniendo entre corchetes[] el dato dinamico

por ejemplo 

        [id].js

te recuerdas de getInitialProps(), pues es el que necesita este componente para que identifique la id del componente a elaborar con

        const { id } = context.query

como ejemplo practico en este caso se uso jsonplaceholder que es una api fake o de prueba, que tiene elementos en formato json

y la use para renderizar posts fakes puse la url en next.config.js y una extencion

        (`${process.env.API_BLOG}posts/${id}`)

y se nos vincula mediante nuestras vareables de entorno y la id que sacamos con el context.query

## carpeta public

es una carpeta que estara directamente conectada con pages en la cual se pondran todos los archivos estaticos, como imagenes, videos, archivos, SVGs, etc.

## createRef

createRef es para determinar el estados de una etiqueta y poder cambiar sus propiedades conm funciones

es decir que puedo podemos generar como in identificador para que pueda ser manipulado con funciones

por ejemplo podemos hacer que un cuadrado se se vuelva de otro color cuando presionamos un boton o incluso el mismo componente

### primero exportamos la funcion createRef desde react

        import React, {createRed} from "react"
        
### despues hacemos una constante que almacenara el identificador para el ref

        const cuadrado = createRef()

### ahora haremos la funcion que ejecutara cuando sea presionado

        const swithColor = () =>{
          cuadrado.current.classList.toggle("color-red")
        }

- acá estamos agarrando la propiedad current que sera su estado actual despues vamos a sus clases y le damos un toggle que seria como una propiedad para quitar y poner
y le decimos que ponga la clase "color-red" la cual en un css externo le dara el background-color:red;

### ahora dentro del componente escribiremos nuestro elemento

        <div
          className="cuadrado"
          ref="cuadrado"
          onClick ( () => switchColor() )
        />

- y por ultimo en las propiedades del elemento estata el ref con el createRef que hicimos

- aparte de eso el elemento que ejecutara la funcion tiene que tener un detector de eventos, en este caso un onClick

- en este caso se pone el onClick en el propio cuadrado ya que este sera el que lo active

- puede ser otro elemento sin problema como aca

        <div
          className="cuadrado"
          ref="cuadrado"
        />
        <buttom onClick ( () => switchColor() )>
          cambiar color
        </buttom>

## next seo

el seo

el seo

el puto seo

bueno, que es el seo.

pues es esa wea que catagoriza tu pagina web si es buena o es mala

si no te preocupas por ella, pues literal google le da shadowban y nadie podra verlo

asi que es importante

se instala la libreria con

        yarn add next-seo

y se enfoca en los metadatos

y para comenzar a usarla tienes que esportarla con

        import { NextSeo } from 'next-seo'

despues tus elementos Head tienes que cambiarlos a NextSeo

esta sera una etiqueta sin una parte con cierre, solo ca a ser una

y en ella de declararan propiedades para agregarlas en el head

por el ejemplo tittle o description

pero tambien hay mas avanzadas que contendran objetos llenos de mas datos, como el open graph

hay un ejemplo practico en index

y para mas conocimientos de esto, esta la documentacion de npm --> https://www.npmjs.com/package/next-seo

