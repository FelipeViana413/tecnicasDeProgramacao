FROM jenkins/jenkins:lts
USER root

# Instalar NodeJS e npm
RUN curl -fsSL https://deb.nodesource.com/setup_23.x | bash - && apt-get install -y nodejs npm && apt-get clean

# Retorne o controle para o usuário Jenkins
USER jenkins