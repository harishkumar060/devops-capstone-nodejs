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
                // This builds the image and tags it for your Docker Hub account
                sh 'docker build -t harishdockeremc/node-js-app:latest .'
            }
        }

        stage('Docker Push') {
            steps {
                script {
                    // Replace 'docker-hub-credentials' with the exact ID you used in Jenkins Credentials
                    withCredentials([usernamePassword(credentialsId: 'docker-hub-credentials', passwordVariable: 'DOCKER_PASSWORD', usernameVariable: 'DOCKER_USERNAME')]) {
                        sh "echo \$DOCKER_PASSWORD | docker login -u \$DOCKER_USERNAME --password-stdin"
                        sh "docker push harishdockeremc/node-js-app:latest"
                    }
                }
            }
        }
    }
}
