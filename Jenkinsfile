pipeline {
    agent any

    stages {

        stage('Checkout') {
            steps {
                git 'https://github.com/AnilSphere/OrangeHRM.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm install'
            }
        }

        stage('Install Playwright Browsers') {
            steps {
                bat 'npx playwright install'
            }
        }

        stage('Run Tests') {
            steps {
                bat 'npx playwright test'
            }
        }
    }
}