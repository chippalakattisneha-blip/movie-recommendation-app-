pipeline {
    agent any
    
    environment {
        DOCKER_HUB_USER = 'snnehahaa'
        IMAGE_NAME      = 'moviematch'
        IMAGE_TAG       = "${BUILD_NUMBER}"
    }
    
    tools {
        nodejs "node"
        sonarScanner "sonar-scanner"
    }
    
    stages {
        stage('Fetch Code') {
            steps {
                checkout scm
            }
        }
        
        stage('Dependency Check') {
            steps {
                // Runs OWASP Dependency Check scan
                dependencyCheck additionalArguments: '--format HTML --format XML', odcInstallation: 'DP-Check'
            }
        }
        
        stage('SonarQube Code Analysis') {
            steps {
                script {
                    // Triggers scanner configuration from Jenkins UI
                    withSonarQubeEnv('SonarQube-Server') {
                        sh "npm install -g sonar-scanner || true"
                        sh "sonar-scanner -Dsonar.projectKey=moviematch -Dsonar.sources=src"
                    }
                }
            }
        }
        
        stage('Build Docker Image') {
            steps {
                sh "docker build -t ${DOCKER_HUB_USER}/${IMAGE_NAME}:${IMAGE_TAG} ."
                sh "docker build -t ${DOCKER_HUB_USER}/${IMAGE_NAME}:latest ."
            }
        }
        
        stage('Push to Docker Hub') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub-credentials', passwordVariable: 'DOCKER_PASS', usernameVariable: 'DOCKER_USER')]) {
                    sh "echo \$DOCKER_PASS | docker login -u \$DOCKER_USER --password-stdin"
                    sh "docker push ${DOCKER_HUB_USER}/${IMAGE_NAME}:${IMAGE_TAG}"
                    sh "docker push ${DOCKER_HUB_USER}/${IMAGE_NAME}:latest"
                }
            }
        }
    }
}