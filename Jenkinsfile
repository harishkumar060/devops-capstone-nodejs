pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                sh 'npm install'
            }
        }

        stage('Docker Build') {
            steps {
                // We tag it with your username so Docker Hub knows where it belongs
                sh 'docker build -t harishdockeremc/node-js-app:latest .'
            }
        }

        stage('Docker Push') {
            steps {
                script {
                    // This uses your 'docker-hub-creds' from Jenkins Global Credentials
                    withCredentials([usernamePassword(credentialsId: 'docker-hub-creds', passwordVariable: 'DOCKER_PASSWORD', usernameVariable: 'DOCKER_USERNAME')]) {
                        sh "echo \$DOCKER_PASSWORD | docker login -u \$DOCKER_USERNAME --password-stdin"
                        sh "docker push harishdockeremc/node-js-app:latest"
                    }
                }
            }
        }
    }
}
