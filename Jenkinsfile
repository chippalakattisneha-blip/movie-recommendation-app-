pipeline {
    agent any
    
    environment {
        DOCKER_HUB_USER = 'snnehahaa'
        IMAGE_NAME      = 'moviematch'
        IMAGE_TAG       = "${BUILD_NUMBER}"
    }
    
    tools {
        nodejs "node"
        "hudson.plugins.sonar.SonarRunnerInstallation" "sonar-scanner"
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
                    // Uses your named SonarQube configuration and injects the authorization token directly
                    withSonarQubeEnv('SonarQube-Server') {
                        sh "sonar-scanner -Dsonar.projectKey=moviematch -Dsonar.sources=src -Dsonar.token=sqa_2cd500a1de1864a811658d632dc9a381fde6d094"
                    }
                }
            }
        }
        
        stage('Build Docker Image') {
            steps {
                // Injects the macOS local application paths so Jenkins can locate Docker Desktop
                withEnv(["PATH+DOCKER=/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin"]) {
                    sh "docker build -t ${DOCKER_HUB_USER}/${IMAGE_NAME}:${IMAGE_TAG} ."
                }
            }
        }

        stage('Push to Docker Hub') {
            steps {
                // Injects macOS paths and pulls masked credentials securely from Jenkins credential manager
                withEnv(["PATH+DOCKER=/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin"]) {
                    withCredentials([usernamePassword(credentialsId: 'dockerhub-credentials', passwordVariable: 'DOCKER_HUB_PASSWORD', usernameVariable: 'DOCKER_HUB_USERNAME')]) {
                        sh "echo \$DOCKER_HUB_PASSWORD | docker login -u \$DOCKER_HUB_USERNAME --password-stdin"
                        sh "docker push ${DOCKER_HUB_USER}/${IMAGE_NAME}:${IMAGE_TAG}"
                    }
                }
            }
        }
    }
}