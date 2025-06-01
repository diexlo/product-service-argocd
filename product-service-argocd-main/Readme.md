#ArgoCD#
docker build -t diexlo/product-service-argo-cd:latest .

product-service-argo-cd:latest

Publicar imágenes
docker push diexlo/product-service-argo-cd:latest


instalar ArgoCD

helm repo add argo https://argoproj.github.io/argo-helm

 helm install my-release argo/argocd-apps

 ver repositorios 
 helm repo list

 crear namespace
 kubectl create namespace argocd

 kubectl apply -n argocd -f - https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml

ver pods funcionando 
kubectl get pods -n argocd -w

Ingresar a la consola de argocd
 kubectl port-forward svc/argocd-server -n argocd 8080:443

Traer password
kubectl -n argocd get secret argocd-initial-admin-secret -o jsonpath="{.data.password}" | base64 -d

clave de argocd 
Q3zU8R9-aKy02m2m
Ajustes
kubectl get all

revisar los logs de argo cd

kubectl logs -n argocd deployment/argocd-repo-server


Instalar postgres en modo cluster
helm repo add bitnami https://charts.bitnami.com/bitnami
helm repo update

helm install postgresql bitnami/postgresql -n default -f k8s/postgres.yml
helm install postgres bitnami/postgresql -f postgres.yml     


export POSTGRES_PASSWORD=$(kubectl get secret --namespace default postgres-postgresql -o jsonpath="{.data.postgres-password}" | base64 -d)
cG9zdGdyZXM=
pass base de datos en base 64
Y0c5emRHZHlaWE09

kubectl run postgres-postgresql-client --rm --tty -i --restart="Never" --namespace default --image docker.io/bitnami/postgresql:17.5.0-debian-12-r8 --env="PGPASSWORD=postgres" --command -- psql --host postgres-postgresql -U postgres -d inventario_db -p 5432

ejecutar 

/opt/bitnami/scripts/postgresql/entrypoint.sh /bin/bash

kubectl port-forward --namespace default svc/postgres-postgresql 5432:5432 & PGPASSWORD="postgres" psql --host 127.0.0.1 -U postgres -d inventario_db -p 5432


