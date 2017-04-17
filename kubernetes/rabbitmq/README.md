
```bash
kubectl create secret generic rabbitmq-config \
  --from-literal=erlang-cookie=c-is-for-cookie-thats-good-enough-for-me

kubectl apply -f rabbitmq-service.yml
kubectl apply -f rabbitmq-statefulset.yml
```
