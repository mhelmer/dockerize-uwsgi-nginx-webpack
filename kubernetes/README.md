Orchestration with Kubernetes
=============================

Postgres
--------

```bash
gcloud compute disks create pg-data-disk --size 50GB 

kubectl create -f postgres-persistence.yml
kubectl create -f postgres-claim.yml
kubectl create -f postgres-pod.yml 
kubectl create -f postgres-service.yml 
```

Django
------

```bash
VERSION="1.2"
PROJECT_ID="<my-project-id>"

docker-compose -f docker-compose.yml -f docker-compose.prod.yml build django
docker tag django-image gcr.io/$PROJECT_ID/django-image:$VERSION
gcloud docker -- push gcr.io/xs-amiable-bonus-6/django-image:$VERSION

kubectl create -f postgres-deployment.yml 
kubectl create -f postgres-service.yml 
```
