pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                sh 'npm install'
            }
        }
        stage('Docker Push') {
            steps {
                script {
                    // Using your exact credential ID: docker-hub-creds
                    withCredentials([usernamePassword(credentialsId: 'docker-hub-creds', passwordVariable: 'PASS', usernameVariable: 'USER')]) {
                        sh "docker build -t harishdockeremc/node-js-app:latest ."
                        sh "echo \$PASS | docker login -u \$USER --password-stdin"
                        sh "docker push harishdockeremc/node-js-app:latest"
                    }
                }
            }
        }
        stage('Deploy') {
            steps {
                // This forces the server to use the NEW code you just pushed
                sh 'docker rm -f node-app || true'
                sh 'docker pull harishdockeremc/node-js-app:latest'
                sh 'docker run -d --name node-app -p 3000:3000 harishdockeremc/node-js-app:latest'
            }
        }
    }
}
