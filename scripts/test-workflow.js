#!/usr/bin/env node

const fs = require('fs').promises;
const path = require('path');

async function testWorkflowSetup() {
  console.log('🧪 Testing GitHub Actions Workflow Setup...\n');
  
  try {
    // Check if .github/workflows directory exists
    const workflowsDir = path.join(process.cwd(), '.github', 'workflows');
    try {
      await fs.access(workflowsDir);
      console.log('✅ .github/workflows directory exists');
    } catch (error) {
      console.log('❌ .github/workflows directory missing');
      return false;
    }
    
    // Check if analytics.yml exists
    const analyticsWorkflow = path.join(workflowsDir, 'analytics.yml');
    try {
      await fs.access(analyticsWorkflow);
      console.log('✅ analytics.yml workflow file exists');
    } catch (error) {
      console.log('❌ analytics.yml workflow file missing');
      return false;
    }
    
    // Check if package.json exists and has required dependencies
    const packageJsonPath = path.join(process.cwd(), 'package.json');
    try {
      const packageJson = JSON.parse(await fs.readFile(packageJsonPath, 'utf8'));
      console.log('✅ package.json exists');
      
      if (packageJson.dependencies && packageJson.dependencies['@octokit/rest']) {
        console.log('✅ @octokit/rest dependency found');
      } else {
        console.log('❌ @octokit/rest dependency missing');
        return false;
      }
    } catch (error) {
      console.log('❌ package.json missing or invalid');
      return false;
    }
    
    // Check if all required scripts exist
    const requiredScripts = ['analytics.js', 'create-summary.js', 'comment-analytics.js'];
    const scriptsDir = path.join(process.cwd(), 'scripts');
    
    for (const script of requiredScripts) {
      const scriptPath = path.join(scriptsDir, script);
      try {
        await fs.access(scriptPath);
        console.log(`✅ ${script} exists`);
      } catch (error) {
        console.log(`❌ ${script} missing`);
        return false;
      }
    }
    
    // Check if analytics directory exists (will be created by workflow)
    const analyticsDir = path.join(process.cwd(), 'analytics');
    try {
      await fs.access(analyticsDir);
      console.log('✅ analytics directory exists');
    } catch (error) {
      console.log('ℹ️  analytics directory will be created by workflow');
    }
    
    console.log('\n🎉 All checks passed! Your GitHub Actions workflow is properly configured.');
    console.log('\n📋 Next steps:');
    console.log('1. Commit and push these changes to GitHub');
    console.log('2. Go to Settings → Actions → General in your repository');
    console.log('3. Ensure "Read and write permissions" is selected');
    console.log('4. The workflow will run automatically every 6 hours');
    console.log('5. You can also trigger it manually from the Actions tab');
    
    return true;
    
  } catch (error) {
    console.error('❌ Error during workflow setup test:', error.message);
    return false;
  }
}

if (require.main === module) {
  testWorkflowSetup();
}

module.exports = { testWorkflowSetup };
