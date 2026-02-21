pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                sh 'npm install'
            }
        }

        stage('Docker Build & Push') {
            steps {
                script {
                    // This uses your specific 'docker-hub-creds'
                    withCredentials([usernamePassword(credentialsId: 'docker-hub-creds', passwordVariable: 'DOCKER_PASSWORD', usernameVariable: 'DOCKER_USERNAME')]) {
                        sh "docker build -t harishdockeremc/node-js-app:latest ."
                        sh "echo \$DOCKER_PASSWORD | docker login -u \$DOCKER_USERNAME --password-stdin"
                        sh "docker push harishdockeremc/node-js-app:latest"
                    }
                }
            }
        }

        stage('Deploy') {
            steps {
                // This stops the old container and starts the new one automatically
                sh 'docker rm -f node-app || true'
                sh 'docker run -d --name node-app -p 3000:3000 harishdockeremc/node-js-app:latest'
            }
        }
    }
}
