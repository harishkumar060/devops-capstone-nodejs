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
                sh 'docker build -t node-app-image .'
            }
        }
    }
}
