# **Despliegue de Microservicio con ArgoCD y GitHub Actions**

Este README comenta brevemente el contenido del repositorio

# **Información del repositorio**

* Repositorio en el cual se registran el código, plantillas para desplegar un microservicio con ArgoCD y GitHub Actions.
* Version 1.0
* [Repo](https://github.com/diexlo/product-service-argocd)

# **Descripción del proyecto**
* Este proyecto implementa un microservicio REST llamado **Product Service**, diseñado con Node.js, Express y Sequelize, que se despliega automáticamente en un clúster de Kubernetes usando **ArgoCD** y **GitHub Actions**.

# **Tecnología utilizada**

* Node.js + Express – Backend API para productos.
* Sequelize – ORM para conexión con PostgreSQL.
* PostgreSQL – Base de datos relacional.
* Docker – Contenedor para empaquetar la aplicación.
* Kubernetes – Plataforma de orquestación.
* ArgoCD – GitOps para despliegue continuo.

# **Flujo de CI/CD**

* Se realiza un push o pull request a la rama main.
* GitHub Actions construye y sube la imagen a Docker Hub.
* Si el secreto ARGOCD_SERVER está configurado, se ejecuta el despliegue. El workflow deploy.yml contiene la configuración de ARGOCD_SERVER.
* ArgoCD sincroniza la aplicación en el clúster.
* La app queda accesible desde el clúster (por puerto o Ingress).
* GitHub Actions – Automatización del build y despliegue de contenedores.

 
# **Instrucciones de uso**
* Clonar el repositorio.

`git clone https://github.com/diexlo/product-service-argocd.git`

* Construir imágenes y subir al repositorio.

`docker build -t diexlo/product-service-argo-cd:latest .`

* Publicar imágenes.

`docker push diexlo/product-service-argo-cd:latest`

# Configurar ArgoCD
* Crear namespace

`kubectl create namespace argocd`

* Instalar ArgoCD

`helm repo add argo https://argoproj.github.io/argo-helm`

`helm install my-release argo/argocd-apps`

`kubectl apply -n argocd -f - https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml`

* verificar pods funcionando 

`kubectl get pods -n argocd -w`

* Ingresar a la consola de argocd

`kubectl port-forward svc/argocd-server -n argocd 8080:443`
* Acceso a la consola argocd

`kubectl port-forward svc/product-servic -n default 8090:80`
* Crear al app en argoCD apuntando a este repositorio

`kubectl apply -f argocd-application.yaml`

* Verificar despliegue

`kubectl get pods -n argocd`

`kubectl get svc -n argocd`

# Instalar Postgresql en modo cluster

`helm repo add bitnami https://charts.bitnami.com/bitnami`

`helm repo update`

`helm install postgresql bitnami/postgresql -n default -f k8s/postgres.yml`

# Troubleshooting
* Ver errores de despliegue en ArgoCD

`kubectl get events -n argocd`

`kubectl logs deploy/argocd-server -n argocd`

* Revisar logs de argo CD

`kubectl logs -n argocd deployment/argocd-repo-server`

* Ver logs de la aplicación

`kubectl logs deploy/product-service`

#Acceso a PostgreSQL desde CLI#

`kubectl port-forward svc/postgresql 5432:5432`

`psql -h localhost -U postgres -d inventario_db`

* Creación de base de datos

`CREATE DATABASE inventario_db;`

 * Ver repositorios 

 `helm repo list`

# Instalar ngrok
* Es necesario instalar ngrok para que permita acceso de github a argoCD en un ambiente local.

Ejecutar el siguiente comando para instalar

`choco install ngrok`

* Posteriomente se debe generar el token y ejecutarlo

`ngrok config add-authtoken 2xuyM5mZecYkirTj5eASGKTLYX2_7Yf5LoAXyHKSqQu2Uhg9V`

* Obtener la url pública asignada por ngrok

`ngrok http https://localhost:8080 --host-header=rewrite`
* Para este caso devuelve la url que puede tener acceso al dominio desde github
https://ac32-2800-bf0-6-1027-f567-6873-7c71-7523.ngrok-free.app



---

## 📐 Arquitectura implementada

```plaintext
+----------------+       GitHub Push        +------------------+       Sync        +----------------------+
| Desarrollador  |  -------------------->  | GitHub Actions    | ---------------> |     ArgoCD           |
+----------------+                        +------------------+                   +-----------+----------+
                                                                               |        Kubernetes       |
                                                                               +---+---------------+-----+
                                                                                   |               |
                                                                               +---v--+        +---v--+
                                                                               | App  |        | Postgres |
                                                                               +------+        +----------+
