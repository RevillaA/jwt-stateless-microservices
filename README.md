# Investigacion Teorica

En esta practica el JWT se maneja con una duracion de un minuto. Esto ayuda a reducir el riesgo en caso de que el token llegue a ser expuesto, ya que tendria muy poco tiempo de validez. Sin embargo, si solo existiera este token, el usuario tendria que iniciar sesion nuevamente cada vez que expire.

Para solucionar este problema se utiliza un Refresh Token. Cuando el Access Token caduca, el cliente puede usar el Refresh Token para solicitar uno nuevo sin volver a autenticarse. De esta manera se mejora la experiencia del usuario y al mismo tiempo se mantiene la seguridad, porque los Access Tokens continuan teniendo una vida util corta. Ademas, los microservicios siguen funcionando de forma stateless, ya que unicamente verifican la firma del JWT mediante la llave publica y no necesitan almacenar sesiones ni consultar un servidor central para validar cada solicitud.

Respecto al almacenamiento del Refresh Token, las buenas practicas recomiendan evitar localStorage y sessionStorage debido a los riesgos asociados a ataques XSS. Una alternativa mas segura es utilizar cookies configuradas como HttpOnly, Secure y SameSite. Aunque la cookie se almacena en el cliente, el ciclo de vida del Refresh Token debe ser gestionado por el servidor de identidad, ya que este es el responsable de emitirlo, renovarlo y revocarlo cuando sea necesario.

# Proyecto

API simple en Node.js con Express para generar y validar JWT, proteger endpoints privados y simular dos microservicios autenticados.
