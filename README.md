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

- aca si no se porque se pondra static al principio
se inicia con un async que usara el metodo getInitialProps() que recibira un contexto

el cual hara una funcion de recoleccion de datos para la constante initialProps

se va a esperar que cargen los datos que cargen en Document.getInitialProps()

y despues lo mandamos como retorno a esa constante

- aca hay un video que me gusto como lo explica --> https://www.youtube.com/watch?v=rKK1q7nFt7M

- esos 3 puntos creo que se ponen cuando son muchas constantes