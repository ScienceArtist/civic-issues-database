# GitHub Actions Setup Guide

This guide will help you set up the GitHub Actions workflow with proper permissions to avoid the 403 error when committing analytics data back to the repository.

## 🔑 Required Permissions

The workflow needs explicit permissions to write back to the repository. These are defined in the `analytics.yml` file:

```yaml
permissions:
  contents: write      # Allow writing to repository
  issues: write        # Allow commenting on issues
  pull-requests: write # Allow creating PRs if needed
```

## ⚙️ Repository Settings

### Step 1: Access Repository Settings
1. Go to your repository on GitHub
2. Click on the **Settings** tab
3. In the left sidebar, click **Actions** → **General**

### Step 2: Configure Workflow Permissions
1. Scroll down to **Workflow permissions**
2. Select **"Read and write permissions"**
3. Check the box for **"Allow GitHub Actions to create and approve pull requests"**
4. Click **Save**

### Step 3: Verify Token Permissions
The workflow uses `${{ secrets.GITHUB_TOKEN }}` which should automatically have the correct permissions once you've configured the repository settings above.

## 🚀 Testing the Workflow

### Manual Trigger
1. Go to the **Actions** tab in your repository
2. Select **"Civic Issues Analytics"** workflow
3. Click **"Run workflow"**
4. Choose your branch and click **"Run workflow"**

### Check Workflow Logs
1. Click on the running workflow
2. Check the logs for any permission errors
3. Look for successful commits in the "Commit and push analytics results" step

## 🔍 Troubleshooting

### Error 403: Permission Denied
**Cause**: Insufficient permissions for the workflow to write to the repository.

**Solution**:
1. Verify repository settings (Steps 1-2 above)
2. Ensure the workflow has the `permissions` section
3. Check that `contents: write` permission is set

### Workflow Runs But No Commits
**Cause**: Git configuration or token issues.

**Solution**:
1. Check workflow logs for git errors
2. Verify the `GITHUB_TOKEN` is being used correctly
3. Ensure the checkout action has `fetch-depth: 0`

### Analytics Files Not Generated
**Cause**: Script execution errors or missing dependencies.

**Solution**:
1. Check Node.js setup step
2. Verify `npm install` completed successfully
3. Check script execution logs

## 📁 Expected Output

After a successful workflow run, you should see:
- New files in the `analytics/` directory
- A commit message like "🤖 Update analytics data - 2024-01-15 12:00 UTC"
- Analytics data committed to your repository

## 🔄 Workflow Schedule

The workflow runs automatically:
- **Every 6 hours** (cron: `0 */6 * * *`)
- **When issues are opened, edited, or closed**
- **Manually** via workflow dispatch

## 📞 Support

If you continue to experience issues:
1. Check the workflow logs for specific error messages
2. Verify all repository settings are correct
3. Ensure the workflow file has the correct permissions section
4. Try running the workflow manually to isolate the issue

## ✅ Verification Checklist

- [ ] Repository settings → Actions → General → "Read and write permissions" selected
- [ ] "Allow GitHub Actions to create and approve pull requests" checked
- [ ] Workflow file contains the `permissions` section
- [ ] `GITHUB_TOKEN` is being used in the workflow
- [ ] All scripts exist and are executable
- [ ] Dependencies are properly installed
- [ ] Workflow can be triggered manually
- [ ] Analytics files are generated and committed successfully
