#!/usr/bin/env node

const { Octokit } = require("@octokit/rest");
const fs = require("fs").promises;
const path = require("path");

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

const REPO_OWNER = "ScienceArtist";
const REPO_NAME = "civic-issues-database";

async function commentOnIssue(issueNumber) {
  try {
    console.log(`Adding analytics comment to issue #${issueNumber}...`);
    
    const analyticsDir = path.join(process.cwd(), "analytics");
    const summaryPath = path.join(analyticsDir, "summary.json");
    
    let analyticsData;
    try {
      analyticsData = JSON.parse(await fs.readFile(summaryPath, "utf8"));
    } catch (error) {
      console.log("No analytics data available yet, skipping comment");
      return;
    }
    
    const comment = `##  Analytics Update

Your civic issue has been added to our community database!

**Current Community Stats:**
-  **Total Reports:** ${analyticsData.totalReports.toLocaleString()}
-  **Open Issues:** ${analyticsData.openReports.toLocaleString()}
-  **Resolved Issues:** ${analyticsData.closedReports.toLocaleString()}

---
*This comment is automatically generated. Analytics update every 6 hours.*`;

    await octokit.issues.createComment({
      owner: REPO_OWNER,
      repo: REPO_NAME,
      issue_number: issueNumber,
      body: comment,
    });
    
    console.log(`Successfully commented on issue #${issueNumber}`);
    
  } catch (error) {
    console.error("Error commenting on issue:", error);
  }
}

async function main() {
  const issueNumber = process.argv[2];
  
  if (!issueNumber) {
    console.error("Usage: node comment-analytics.js <issue-number>");
    process.exit(1);
  }
  
  await commentOnIssue(parseInt(issueNumber));
}

if (require.main === module) {
  main();
}

module.exports = { commentOnIssue };
