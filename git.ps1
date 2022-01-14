param($commitMsg, $branchName)

Write-Host "Status before staging for commit"
git status

Write-Host "Staging for commit"
git add .

Write-Host "Status after staging for commit"
git status

Write-Host "Commiting the changes"
git commit -m $commitMsg

Write-Host "Pushing the changes to the repository"
git push origin $branchName

