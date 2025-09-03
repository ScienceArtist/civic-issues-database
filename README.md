# Civic Issues Database

[![Civic Issues Analytics](https://github.com/ScienceArtist/civic-issues-database/workflows/Civic%20Issues%20Analytics/badge.svg)](https://github.com/ScienceArtist/civic-issues-database/actions/workflows/analytics.yml)

A free, unlimited database for civic issues using GitHub Issues with automated analytics.

## Features
- Unlimited storage for civic reports
- Automated analytics every 6 hours
- Real-time dashboard
- Zero cost forever!

## How It Works
1. Users report civic issues on reportcard.fun
2. Reports are stored as GitHub Issues
3. Analytics are generated automatically every 6 hours via GitHub Actions
4. Dashboard shows real-time insights

## GitHub Actions Workflow

### Analytics Workflow (`analytics.yml`)
The repository includes an automated workflow that runs every 6 hours to:
- Process all GitHub Issues and generate analytics
- Create JSON data files in the `analytics/` directory
- Generate a markdown summary (`analytics/summary.md`)
- Add analytics comments to new issues
- Automatically commit and push analytics data back to the repository

### Workflow Triggers
- **Scheduled**: Every 6 hours (`0 */6 * * *`)
- **Manual**: Via `workflow_dispatch` in GitHub Actions tab
- **Issue Events**: When issues are opened, edited, or closed

### Required Permissions
The workflow requires explicit permissions to avoid 403 errors:
```yaml
permissions:
  contents: write      # Allow writing to repository
  issues: write        # Allow commenting on issues
  pull-requests: write # Allow creating PRs if needed
```

### Troubleshooting 403 Permission Errors
If you encounter permission errors in GitHub Actions:

1. **Check Repository Settings**: Go to Settings → Actions → General
2. **Workflow Permissions**: Ensure "Read and write permissions" is selected
3. **Allow GitHub Actions to create and approve pull requests**: Enable this option
4. **Verify Token**: The workflow uses `${{ secrets.GITHUB_TOKEN }}` which should have write access

### Manual Workflow Execution
To run the analytics manually:
1. Go to Actions tab in your repository
2. Select "Civic Issues Analytics" workflow
3. Click "Run workflow" button
4. Choose the branch and click "Run workflow"

## Scripts

### `scripts/analytics.js`
Main analytics processor that:
- Fetches all GitHub Issues
- Parses issue data and extracts structured information
- Generates comprehensive analytics
- Saves data to JSON files

### `scripts/create-summary.js`
Creates a human-readable markdown summary from analytics data.

### `scripts/comment-analytics.js`
Adds analytics comments to GitHub Issues with community statistics.

## Analytics Output
The workflow generates several files in the `analytics/` directory:
- `summary.json` - Complete analytics data
- `summary.md` - Human-readable markdown summary
- `issue-types.json` - Breakdown by issue type
- `locations.json` - Geographic distribution
- `daily-activity.json` - Activity over time
- `recent-activity.json` - Latest reports

## Dependencies
- Node.js 18+
- `@octokit/rest` - GitHub API client

## Setup
1. Clone the repository
2. Run `npm install` to install dependencies
3. Set up GitHub Actions permissions as described above
4. The workflow will run automatically every 6 hours

Made with ❤️ by @Mehonestperson
