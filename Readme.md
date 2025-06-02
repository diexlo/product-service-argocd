# **Sistema de Seguimiento de Tráfico Aéreo en Tiempo Real Modernizando aplicaciones**

Este README comenta brevemente el contenido del repositorio

# **Información del repositorio**

* Repositorio en el cual se demuestra cómo integrar el consumo de datos del servicio OpenSky Network con Apache Kafka y escalar dinámicamente los consumidores utilizando KEDA (Kubernetes Event-Driven Autoscaling).
* Version 1.0
* [Repo](https://github.com/diexlo/opensky)

# **OpenSky Kafka KEDA**


# **Descripción del proyecto**

* El objetivo principal es consumir datos de tráfico aéreo en tiempo real proporcionados por OpenSky Network, procesarlos a través de Apache Kafka y utilizar KEDA para escalar automáticamente los consumidores de Kafka en función del retraso (lag) del consumidor.

# **Arquitectura Implementada**

La arquitectura del proyecto se compone de los siguientes componentes:

* Productor de OpenSky: Una aplicación que se conecta a la API de OpenSky Network y publica datos en un topico de Kafka.

* Apache Kafka: Sistema de mensajería que actúa como intermediario entre el productor y los consumidores.

* Consumidor de Kafka: Aplicación que consume los mensajes del tema de Kafka y realiza el procesamiento necesario.

* KEDA: Herramienta que monitorea el retraso del consumidor en Kafka y escala automáticamente el número de réplicas del consumidor según sea necesario.

# **Instrucciones de Uso y Verificación**
# Prerrequisitos

* Cluster de Kubernetes en funcionamiento.

* Herramientas de línea de comandos instaladas: kubectl, helm.

* Despliegue de Kafka

* Crear un espacio de nombres para Kafka:

`kubectl create namespace kafka`

* Instalar el operador de Kafka utilizando Helm:

`helm repo add strimzi https://strimzi.io/charts/`

`helm install strimzi strimzi/strimzi-kafka-operator --version 0.45.0 -n kafka --create-namespace`

* Desplegar una instancia de Kafka:

`kubectl apply -f kafka-cluster.yaml -n kafka`

* Despliegue de KEDA

Agregar el repositorio de Helm de KEDA:

`helm repo add kedacore https://kedacore.github.io/charts`
`helm repo update`

* Instalar KEDA en el cluster:

`helm install keda kedacore/keda --namespace keda --create-namespace`

* Despliegue del Productor de OpenSky
Aplicar el manifiesto del productor:

`kubectl apply -f opensky-producer.yaml -n kafka`

* Despliegue del Consumidor de Kafka con KEDA
Aplicar el manifiesto del consumidor:

`kubectl apply -f kafka-consumer.yaml -n kafka`

* Aplicar el objeto ScaledObject de KEDA:

`kubectl apply -f kafka-scaledobject.yaml -n kafka`

# **Verificación**
* Verificar que los pods estén en ejecución:

`kubectl get pods -n kafka`

* Observar los logs del consumidor:

`kubectl logs -f deployment/kafka-consumer -n kafka`

* Verificar que KEDA esté escalando los consumidores según el retraso:

`kubectl get hpa -n kafka`

# **Comandos de Solución de Problemas**

Describir el estado de un pod específico:

`kubectl describe pod <nombre-del-pod> -n kafka`

Verificar los eventos recientes en el espacio de nombres:

`kubectl get events -n kafka`

Reiniciar un pod específico:

`kubectl delete pod <nombre-del-pod> -n kafka`

Verificar los logs del operador de KEDA:

`kubectl logs deployment/keda-operator -n keda`

