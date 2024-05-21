 node('buildnode'){
	stage('Checkout'){
		echo 'brick_back拉代码'
		checkout([$class: 'GitSCM', branches: [[name: '*/master']], doGenerateSubmoduleConfigurations: false, extensions: [], submoduleCfg: [], userRemoteConfigs: [[credentialsId: '', url: '']]])
	}
    stage('build'){
        echo '开始编译'
        sh 'cd $WORKSPACE/ && pnpm i && pnpm run build'
        echo ' 编译完成...! '
    }
    stage('deploy~~~'){
        echo 'deploy brick_back'
        sh '''
          rm -rf /opt/src/dist
          /bin/cp -ra  $WORKSPACE/packages/lowcode-platform/dist /opt/src/
          /bin/cp -ra  $WORKSPACE/packages/lowcode-platform/dist /opt/src/
        '''
        echo 'deploy brick_back complete!!!  ...! '
        sh 'rm -rf $WORKSPACE/*'
    }
}
